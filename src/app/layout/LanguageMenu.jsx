import { GLASS_SURFACE_STRONG } from '../lib/glass.js'
import Icon from '../lib/icons.jsx'
import { LANGUAGES, saveLanguage } from './language.js'

/**
 * The "EN ⌄" pill in the app header and its menu.
 *
 * The selection is stored but nothing is translated yet: the app's copy is still hardcoded
 * English on this branch. Once the i18n layer lands, this becomes a thin shell — read
 * `language`/`setLanguage` from that provider instead of the props below and drop
 * language.js; the codes, short labels and storage key already line up.
 */
export default function LanguageMenu({ language, onChange, open, onToggle, onClose }) {
  const current = LANGUAGES.find((lang) => lang.code === language) ?? LANGUAGES[0]

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className="flex items-center gap-1 rounded-full border border-solid border-white/20 bg-white/12 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md"
      >
        {current.short}
        <Icon name="chevronDown" className="h-3 w-3 text-white/80" />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+8px)] right-0 z-50 w-40">
          <ul role="listbox" aria-label="Language" className={`${GLASS_SURFACE_STRONG} rounded-2xl py-1`}>
            {LANGUAGES.map((lang) => {
              const selected = lang.code === current.code
              return (
                <li key={lang.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      saveLanguage(lang.code)
                      onChange(lang.code)
                      onClose()
                    }}
                    className="flex w-full items-center justify-between gap-2 bg-transparent px-3.5 py-2.5 text-left"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-semibold text-white">{lang.native}</span>
                      <span className="block truncate text-[10px] text-white/50">{lang.label}</span>
                    </span>
                    {selected && <Icon name="checkCircle" className="h-4 w-4 shrink-0 text-lime-300" />}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
