/**
 * Language list and the stored choice.
 *
 * Mirrors what the localization endpoint serves, so the codes and short labels already match
 * what the i18n layer expects, and the storage key is the one i18next's language detector
 * reads — a choice made now survives that wiring.
 */
export const LANGUAGES = [
  { code: 'en', short: 'EN', native: 'English', label: 'English' },
  { code: 'hi', short: 'हि', native: 'हिन्दी', label: 'Hindi' },
  { code: 'mr', short: 'मर', native: 'मराठी', label: 'Marathi' },
]

const STORAGE_KEY = 'krishiai.language'

export function loadLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return LANGUAGES.some((lang) => lang.code === stored) ? stored : 'en'
  } catch {
    return 'en'
  }
}

export function saveLanguage(code) {
  try {
    localStorage.setItem(STORAGE_KEY, code)
  } catch {
    // Storage unavailable (private browsing) — the choice just won't persist.
  }
}
