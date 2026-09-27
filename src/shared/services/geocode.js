/**
 * Reverse geocoding — turns the coordinates from "Use current location" into a place name
 * the farmer actually recognises ("Nashik" rather than "20.01°, 73.79°").
 *
 * Uses BigDataCloud's client-side endpoint: free, no API key, no signup, CORS-enabled.
 * If the backend later exposes its own geocoding, point REVERSE_ENDPOINT at it — the shape
 * returned by `reverseGeocode` is all the UI depends on.
 */

const REVERSE_ENDPOINT = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

/** Locality names are returned in this language where the provider has a translation. */
const LOCALITY_LANGUAGE = { en: 'en', hi: 'hi', mr: 'mr' }

/**
 * @returns {Promise<{city: string|null, district: string|null, state: string|null, label: string|null}>}
 * `label` is the display string; every field is null when lookup fails, so callers can fall
 * back to coordinates rather than showing a broken value.
 */
export async function reverseGeocode({ latitude, longitude, language = 'en', signal } = {}) {
  if (latitude == null || longitude == null) return empty()

  const url = new URL(REVERSE_ENDPOINT)
  url.searchParams.set('latitude', String(latitude))
  url.searchParams.set('longitude', String(longitude))
  url.searchParams.set('localityLanguage', LOCALITY_LANGUAGE[language] ?? 'en')

  try {
    const res = await fetch(url, { signal })
    if (!res.ok) throw new Error(`Geocode ${res.status}`)
    const data = await res.json()

    // In India the useful name sits in different fields depending on how rural the point is,
    // so fall through them in order of specificity.
    const city = data.city || data.locality || null
    const district = data.localityInfo?.administrative?.find((a) => a.adminLevel === 5)?.name ?? null
    const state = data.principalSubdivision || null

    const label = [city || district, state].filter(Boolean).join(', ') || null

    return { city, district, state, label }
  } catch (error) {
    if (error.name === 'AbortError') throw error
    return empty()
  }
}

function empty() {
  return { city: null, district: null, state: null, label: null }
}
