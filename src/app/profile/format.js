export function formatName(value) {
  if (!value) return null
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function formatLabel(value) {
  if (!value) return null
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/** Real elapsed time since onboarding completed — not a mock number. */
export function formatDaysWithUs(joinedAt) {
  if (!joinedAt) return '0'
  const days = Math.floor((Date.now() - joinedAt) / (1000 * 60 * 60 * 24))
  return String(Math.max(days, 0))
}

/**
 * Onboarding asks for a district and taluka rather than GPS, so the farmer's
 * place is those two. Older profiles still carry a `location` object from the
 * geolocation flow, so keep reading that as a fallback.
 */
export function formatPlace(profile, fallback = 'Location not set') {
  if (profile?.taluka && profile?.district) return `${profile.taluka}, ${profile.district}`
  if (profile?.district) return profile.district

  const location = profile?.location
  if (!location) return fallback
  if (location.place) return location.place
  if (location.latitude != null && location.longitude != null) {
    return `${location.latitude.toFixed(2)}°, ${location.longitude.toFixed(2)}°`
  }
  return fallback
}
