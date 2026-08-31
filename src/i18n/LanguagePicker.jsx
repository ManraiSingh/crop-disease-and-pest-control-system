import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './context.js'

/**
 * The "EN ⌄" pill in the app header. Opens a small menu of every language that has
 * translations — the list is served by the localization endpoint, so adding a language
 * server-side makes it appear here automatically.
 */
export default function LanguagePicker() {
  const { language, setLanguage, languages, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  const current = languages.find((l) => l.code === language) ?? languages[0]

  // Close on outside click and on Escape.
  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={wrapRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('common.selectLanguage')}
        className="flex items-center gap-1 rounded-full border-2 border-solid border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600"
      >
        {current.short}
        <span aria-hidden="true" className="text-[9px]">
          ▾
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t('common.selectLanguage')}
          className="absolute right-0 z-50 mt-1 w-36 overflow-hidden rounded-xl border border-solid border-gray-100 bg-white py-1 shadow-xl"
        >
          {languages.map((lang) => {
            const isActive = lang.code === language
            return (
              <li key={lang.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    setLanguage(lang.code)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between border-0 bg-transparent px-3 py-2 text-left text-xs ${
                    isActive ? 'text-leaf-dark font-bold' : 'font-medium text-gray-600'
                  }`}
                >
                  {lang.native}
                  {isActive && <span aria-hidden="true">✓</span>}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
