const STORAGE_KEY = 'krishiai.profile'

/**
 * The onboarding flow carries its data forward via React Router's `location.state`, which
 * doesn't survive a page refresh or a direct visit to /home. This persists it to localStorage
 * once onboarding completes, so the app (dashboard, profile, etc.) has something durable to
 * read the farmer's name/crop/field from.
 */
export function saveProfile(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage unavailable (private browsing, etc.) — non-fatal, just won't persist
  }
}

export function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}
