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

/** We only capture GPS coordinates during onboarding, not a geocoded place name. */
export function formatLocation(location) {
  if (!location) return 'Location not set'
  return `${location.latitude.toFixed(2)}°, ${location.longitude.toFixed(2)}°`
}
