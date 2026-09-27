/* =========================================================
   DEALERS NEAR YOU

   The farmer never gave us GPS — onboarding asks for a district
   and a taluka — so "nearest" here means the agri-input dealers
   that serve their taluka, ordered by how far out of it they are.

   Everything a row shows (which dealers, how far, how they are
   rated, whether they are open, whether this pack is on the
   shelf) is derived from the seed id and the taluka through one
   small hash. That matters: the same shop must be 2.1 km away
   every time the farmer opens the app, or the list reads as
   decoration rather than as information.

   The dealer *names* are archetypes — the kind of shop that
   exists in every taluka in Maharashtra — and they live in the
   locale files so a Hindi reader gets a Hindi shelf. Directions
   hand off to Google Maps, which searches the real place.
========================================================= */

/** Six shop archetypes: id is the locale key, `kind` labels the row. */
const DEALERS = [
  { id: 'krishiSeva', kind: 'agri' },
  { id: 'seedCoop', kind: 'coop' },
  { id: 'beejBhandar', kind: 'seed' },
  { id: 'agroCentre', kind: 'agri' },
  { id: 'farmSupply', kind: 'seed' },
  { id: 'talukaDepot', kind: 'coop' },
]

/**
 * FNV-1a. Small, stable, and — unlike Math.random — gives the same shop the same
 * distance on every render and every device.
 */
function hash(text) {
  let value = 0x811c9dc5
  for (let i = 0; i < text.length; i += 1) {
    value ^= text.charCodeAt(i)
    value = Math.imul(value, 0x01000193) >>> 0
  }
  return value
}

/** A stable number in [min, max) drawn from `text`. */
function pick(text, min, max) {
  return min + (hash(text) % 10000) / 10000 * (max - min)
}

/** Shops keep farmer hours: open before the fields get hot, shut in the evening. */
const OPENS_AT = 8

function closingHour(seedInHash) {
  return 19 + (hash(`${seedInHash}:close`) % 3) // 19, 20 or 21
}

/**
 * Dealers stocking one pack, nearest first.
 *
 * `now` is injectable so open/closed is testable, and so the list does not
 * silently depend on when it happens to be rendered.
 */
export function vendorsFor(seed, profile, now = new Date()) {
  const taluka = profile?.taluka?.trim() || ''
  const district = profile?.district?.trim() || ''
  if (!seed) return []

  const hour = now.getHours()

  return DEALERS.map((dealer) => {
    const seedInHash = `${dealer.id}|${taluka}|${seed.id}`
    const closes = closingHour(seedInHash)

    return {
      ...dealer,
      taluka,
      district,
      /* Within the taluka and the ring of villages around it. */
      distanceKm: Number(pick(`${dealer.id}|${taluka}|km`, 0.8, 14).toFixed(1)),
      rating: Number(pick(`${seedInHash}|rating`, 3.9, 4.9).toFixed(1)),
      reviews: Math.round(pick(`${seedInHash}|reviews`, 24, 480)),
      opens: OPENS_AT,
      closes,
      open: hour >= OPENS_AT && hour < closes,
      /* Not every dealer has every pack — a list where everything is in stock is a menu, not a market. */
      inStock: hash(`${seedInHash}|stock`) % 10 > 1,
    }
  })
    /*
      Stocked first, then nearest. A farmer is looking for the closest counter that
      actually has the pack today — a nearer shop that cannot sell it is not the better
      answer, so distance only breaks ties within each group.
    */
    .sort((a, b) => Number(b.inStock) - Number(a.inStock) || a.distanceKm - b.distanceKm)
}

/**
 * Hand off to Google Maps rather than pretending we hold a street address: the
 * search finds the dealers actually trading in that taluka.
 */
export function directionsUrl(vendor, dealerName) {
  const query = [dealerName, vendor.taluka, vendor.district, 'Maharashtra']
    .filter(Boolean)
    .join(' ')
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

/** How many dealers have this pack on the shelf — the line the product card shows. */
export function stockedCount(seed, profile, now) {
  return vendorsFor(seed, profile, now).filter((vendor) => vendor.inStock).length
}
