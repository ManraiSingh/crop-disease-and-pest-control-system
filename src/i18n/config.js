import i18n from 'i18next'
import ChainedBackend from 'i18next-chained-backend'
import HttpBackend from 'i18next-http-backend'
import LocalStorageBackend from 'i18next-localstorage-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

/**
 * i18next setup.
 *
 * Language resources are NOT bundled into the app — they are fetched at runtime from the
 * localization endpoint (VITE_LOCALE_API, defaulting to /locales) and cached on the device.
 *
 * Backend chain, in order:
 *   1. LocalStorageBackend — instant, and the reason the app still works with no signal.
 *   2. HttpBackend         — the real source; refreshes the cache when reachable.
 *
 * Adding a language is a server-side change: drop a new <code>.json file and list it in
 * index.json. No rebuild, no code change.
 */

const BASE = import.meta.env.VITE_LOCALE_API || '/locales'
const CACHE_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000 // re-fetch weekly when online

/** Ask the endpoint which languages exist, so the app never hardcodes the list either. */
export async function loadLanguageIndex() {
  const cacheKey = 'krishiai.locale.index'
  try {
    const res = await fetch(`${BASE}/index.json`, { cache: 'no-cache' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    try {
      localStorage.setItem(cacheKey, JSON.stringify(data))
    } catch {
      // Storage unavailable — non-fatal.
    }
    return data
  } catch {
    try {
      const cached = localStorage.getItem(cacheKey)
      if (cached) return JSON.parse(cached)
    } catch {
      // fall through
    }
    return { languages: [{ code: 'en', label: 'English', short: 'EN', native: 'English' }], default: 'en' }
  }
}

export async function initI18n() {
  const index = await loadLanguageIndex()
  const codes = index.languages.map((l) => l.code)

  await i18n
    .use(ChainedBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: index.default ?? 'en',
      supportedLngs: codes,
      nonExplicitSupportedLngs: true,
      load: 'languageOnly',

      backend: {
        backends: [LocalStorageBackend, HttpBackend],
        backendOptions: [
          { prefix: 'krishiai.locale.', expirationTime: CACHE_EXPIRY_MS },
          { loadPath: `${BASE}/{{lng}}.json` },
        ],
      },

      detection: {
        order: ['localStorage', 'navigator'],
        lookupLocalStorage: 'krishiai.language',
        caches: ['localStorage'],
      },

      // Our resource files use {name} placeholders, not i18next's default {{name}}.
      interpolation: {
        escapeValue: false, // React already escapes
        prefix: '{',
        suffix: '}',
      },

      react: { useSuspense: false },
    })

  return { languages: index.languages }
}

export default i18n
