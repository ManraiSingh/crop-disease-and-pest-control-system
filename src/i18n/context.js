import { createContext, useContext } from 'react'

/**
 * Kept separate from LanguageProvider.jsx so that file only exports a component —
 * mixing components and plain functions in one module breaks Vite's fast refresh.
 */
export const LanguageContext = createContext(null)

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}

/** Convenience hook for components that only need the translate function. */
export function useT() {
  return useLanguage().t
}
