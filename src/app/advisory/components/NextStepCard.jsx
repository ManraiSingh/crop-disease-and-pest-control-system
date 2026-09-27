import Icon from '../../lib/icons.jsx'
import { PANEL_SHADOW, tinted } from '../surface.js'

/**
 * The hand-off at the foot of a crop's details — a card that carries the crop
 * through into the next tab, so the three screens read as one flow.
 */
export default function NextStepCard({ icon, label, title, body, cta, onClick, tone = 'lime' }) {
  const accent = tone === 'amber' ? '#f0b74a' : '#a3e635'

  return (
    <button
      type="button"
      onClick={onClick}
      style={tinted(accent)}
      className={`mb-3 flex w-full items-center gap-3.5 rounded-[26px] border border-solid p-4 text-left ${PANEL_SHADOW}`}
    >
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
        style={{ background: `${accent}24` }}
      >
        <Icon name={icon} className="h-6 w-6" style={{ color: accent }} />
      </span>

      <span className="min-w-0 flex-1">
        <span
          className="block text-[9px] font-semibold tracking-[0.14em] uppercase"
          style={{ color: accent }}
        >
          {label}
        </span>
        <span className="mt-1 block text-[14.5px] leading-tight font-semibold text-white">{title}</span>
        <span className="mt-1 block text-[11px] leading-snug text-white/60">{body}</span>
      </span>

      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#12200c]"
        style={{ background: accent }}
      >
        <Icon name="chevronRight" className="h-4 w-4" />
      </span>
      <span className="sr-only">{cta}</span>
    </button>
  )
}
