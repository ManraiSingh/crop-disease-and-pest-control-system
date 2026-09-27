/* =========================================================
   SEED CATALOGUE

   Varieties farmers in Maharashtra actually sow — public ICAR /
   state-university releases and long-established hybrids, not
   invented product names. Prices are the ranges these sell at
   through agri-input dealers.

   Only the numbers and the variety names live here. Pack size,
   the one-line description and the seller are wording, so they
   live in public/locales/ keyed by seed id (seeds.packs.*,
   seeds.notes.*) and by seller (seeds.sellers.*) — a farmer
   reading the app in Hindi should not hit an English shelf.

   Ordered per farmer at render time: whatever they grow comes
   first, so the shelf reads as theirs rather than as a list.
========================================================= */

export const SEEDS = [
  {
    id: 'tomato-arka-rakshak',
    crop: 'tomato',
    variety: 'Arka Rakshak',
    price: 249,
    mrp: 310,
    rating: 4.6,
    reviews: 412,
    sellerKey: 'iihr',
  },
  {
    id: 'tomato-pusa-ruby',
    crop: 'tomato',
    variety: 'Pusa Ruby',
    price: 130,
    mrp: 160,
    rating: 4.3,
    reviews: 286,
    sellerKey: 'krishiBhandar',
  },
  {
    id: 'wheat-hd-2967',
    crop: 'wheat',
    variety: 'HD 2967',
    price: 430,
    mrp: 495,
    rating: 4.7,
    reviews: 1240,
    sellerKey: 'stateSeed',
  },
  {
    id: 'wheat-hd-3086',
    crop: 'wheat',
    variety: 'HD 3086',
    price: 465,
    mrp: 520,
    rating: 4.5,
    reviews: 738,
    sellerKey: 'stateSeed',
  },
  {
    id: 'rice-pusa-basmati-1121',
    crop: 'rice',
    variety: 'Pusa Basmati 1121',
    price: 690,
    mrp: 780,
    rating: 4.6,
    reviews: 903,
    sellerKey: 'krishiBhandar',
  },
  {
    id: 'onion-bhima-super',
    crop: 'onion',
    variety: 'Bhima Super',
    price: 720,
    mrp: 850,
    rating: 4.4,
    reviews: 521,
    sellerKey: 'dogr',
  },
  {
    id: 'sugarcane-co-86032',
    crop: 'sugarcane',
    variety: 'Co 86032',
    price: 950,
    mrp: 1100,
    rating: 4.5,
    reviews: 344,
    sellerKey: 'sugarMill',
  },
  {
    id: 'soybean-js-9560',
    crop: 'soybean',
    variety: 'JS 9560',
    price: 780,
    mrp: 890,
    rating: 4.4,
    reviews: 617,
    sellerKey: 'stateSeed',
  },
  {
    id: 'maize-dhm-117',
    crop: 'maize',
    variety: 'DHM 117',
    price: 560,
    mrp: 640,
    rating: 4.3,
    reviews: 298,
    sellerKey: 'krishiBhandar',
  },
  {
    id: 'chilli-pusa-jwala',
    crop: 'chilli',
    variety: 'Pusa Jwala',
    price: 210,
    mrp: 260,
    rating: 4.2,
    reviews: 455,
    sellerKey: 'krishiBhandar',
  },
  {
    id: 'potato-kufri-jyoti',
    crop: 'potato',
    variety: 'Kufri Jyoti',
    price: 1150,
    mrp: 1320,
    rating: 4.5,
    reviews: 389,
    sellerKey: 'cpri',
  },
  {
    id: 'cotton-suraj',
    crop: 'cotton',
    variety: 'Suraj',
    price: 640,
    mrp: 730,
    rating: 4.1,
    reviews: 172,
    sellerKey: 'stateSeed',
  },
  {
    id: 'grapes-thompson-seedless',
    crop: 'grapes',
    variety: 'Thompson Seedless',
    price: 78,
    mrp: 92,
    rating: 4.6,
    reviews: 512,
    sellerKey: 'stateSeed',
  },
  {
    id: 'grapes-sonaka',
    crop: 'grapes',
    variety: 'Sonaka',
    price: 85,
    mrp: 99,
    rating: 4.4,
    reviews: 287,
    sellerKey: 'krishiBhandar',
  },
  {
    id: 'carrot-pusa-rudhira',
    crop: 'carrot',
    variety: 'Pusa Rudhira',
    price: 340,
    mrp: 410,
    rating: 4.5,
    reviews: 398,
    sellerKey: 'iihr',
  },
  {
    id: 'carrot-pusa-kesar',
    crop: 'carrot',
    variety: 'Pusa Kesar',
    price: 290,
    mrp: 350,
    rating: 4.2,
    reviews: 214,
    sellerKey: 'krishiBhandar',
  },
]

/**
 * The farmer's own crops first, then the rest — so someone growing sugarcane and
 * onion opens Home to sugarcane and onion seed, not to whatever happens to be first
 * in the list.
 */
export function seedsFor(profile) {
  const mine = profile?.crops ?? (profile?.crop ? [profile.crop] : [])
  if (!mine.length) return SEEDS

  const rank = (seed) => {
    const index = mine.indexOf(seed.crop)
    return index === -1 ? mine.length : index
  }

  return [...SEEDS].sort((a, b) => rank(a) - rank(b))
}

export function formatRupees(value) {
  return `₹${value.toLocaleString('en-IN')}`
}
