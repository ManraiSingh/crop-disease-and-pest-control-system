import { createContext, useContext } from 'react'

/**
 * Light / dark for the in-app screens.
 *
 * The whole app is written dark-first with literal colour utilities (text-white/60,
 * bg-white/8 and so on) rather than tokens. Rewriting 270 of those across 33 files
 * would be a lot of churn for no behaviour change, so instead the theme is a single
 * `data-theme` attribute on the app frame, and one stylesheet remaps that small set
 * of utilities underneath it. Inline styles can't be reached that way, so the shared
 * surface helpers read CSS variables instead of hard-coded colours.
 */
export const THEME_KEY = 'cropcare.theme'

export const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} })

export function useTheme() {
  return useContext(ThemeContext)
}

/** Read once on mount so the first paint is already the right theme. */
export function readTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    return stored === 'light' || stored === 'dark' ? stored : 'dark'
  } catch {
    // Dark is the identity: the Night Garden ground. Light ("Morning Paper")
    // is the preference a farmer can switch to.
    return 'dark'
  }
}

export function storeTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // Storage unavailable — the theme just won't persist.
  }
}
