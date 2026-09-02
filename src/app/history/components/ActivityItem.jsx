import { GLASS_SURFACE } from '../../lib/glass.jsx'
import { useT } from '../../../i18n/context.js'
import Icon from '../../lib/icons.jsx'

const BADGE_TONES = {
  red: 'border-red-200/30 bg-red-400/20 text-red-100',
  amber: 'border-amber-200/30 bg-amber-300/20 text-amber-100',
  green: 'border-lime-200/30 bg-lime-300/20 text-lime-100',
}

/** One row in the History timeline, with the connecting line drawn via a border border-solid on the icon. */
export default function ActivityItem({ item, isLast }) {
  const t = useT()

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-solid border-white/15 backdrop-blur-md ${item.tint}`}>
          <Icon name={item.icon} className="h-4 w-4" />
        </span>
        {!isLast && <span className="w-px flex-1 bg-white/20" />}
      </div>

      <button
        type="button"
        className={`${GLASS_SURFACE} mb-3 flex-1 rounded-2xl p-3 text-left`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-bold text-white">{t(item.title)}</p>
            {(item.meta || item.metaPrefix) && (
              <p className="text-[11px] text-white/60">
                {item.metaPrefix ?? ''}
                {item.meta ? t(item.meta) : ''}
                {item.metaSuffix ?? ''}
              </p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <span className="text-[10px] whitespace-nowrap text-white/45">{item.time}</span>
            <Icon name="chevronRight" className="h-3 w-3 text-white/35" />
          </div>
        </div>

        {(item.badge || item.note) && (
          <div className="mt-1.5 flex items-center gap-2">
            {item.badge && (
              <span
                className={`rounded-full border border-solid px-2 py-0.5 text-[10px] font-bold whitespace-nowrap ${BADGE_TONES[item.badge.tone]}`}
              >
                {t(item.badge.label)}
              </span>
            )}
            {item.note && <span className="text-[11px] text-white/60">{t(item.note)}</span>}
          </div>
        )}
      </button>
    </div>
  )
}
