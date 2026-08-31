import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n, { initI18n } from './config.js'
import { LanguageContext } from './context.js'

/**
 * Boots i18next, then exposes the bits the UI needs (current language, the switcher, and
 * the list of available languages) through one small context.
 *
 * The translate function itself comes straight from react-i18next — this provider does not
 * reimplement lookup or fallback, it just wires i18next into the app and holds the language
 * list that the endpoint returned.
 */
export function LanguageProvider({ children }) {
  const [ready, setReady] = useState(false)
  const [languages, setLanguages] = useState([])

  useEffect(() => {
    let cancelled = false
    initI18n()
      .then(({ languages: list }) => {
        if (cancelled) return
        setLanguages(list)
        setReady(true)
      })
      .catch(() => {
        // Even if the index fails, i18next still has its own fallbacks — don't block the app.
        if (!cancelled) setReady(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (!ready) return <BootScreen />

  return <ReadyProvider languages={languages}>{children}</ReadyProvider>
}

/** Split out so useTranslation() only runs once i18next has been initialised. */
function ReadyProvider({ languages, children }) {
  const { t, i18n: instance } = useTranslation()

  const value = useMemo(
    () => ({
      t,
      language: instance.resolvedLanguage ?? instance.language,
      setLanguage: (code) => instance.changeLanguage(code),
      languages,
    }),
    // `t` is a fresh function on every language change, so it is the dependency that
    // actually drives this recompute.
    [t, instance, languages],
  )

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage ?? i18n.language ?? 'en'
  }, [value.language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

function BootScreen() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#f4f7f5',
        color: '#0b8654',
        fontFamily: 'system-ui, sans-serif',
        fontSize: 14,
      }}
    >
      <span>Loading…</span>
    </div>
  )
}
