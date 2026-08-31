import { useT } from '../../../i18n/context.js'
import Icon from '../../lib/icons.jsx'

const BADGE_TONES = {
  red: 'bg-red-100 text-red-500',
  amber: 'bg-amber-100 text-amber-700',
  green: 'bg-green-100 text-leaf-dark',
}

/** One row in the History timeline, with the connecting line drawn via a border on the icon. */
export default function ActivityItem({ item, isLast }) {
  const t = useT()

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${item.tint}`}>
          <Icon name={item.icon} className="h-4 w-4" />
        </span>
        {!isLast && <span className="w-px flex-1 bg-gray-200" />}
      </div>

      <button
        type="button"
        className="mb-3 flex-1 rounded-2xl border border-solid border-gray-100 bg-white p-3 text-left shadow-sm"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-bold text-black">{t(item.title)}</p>
            {item.meta && (
              <p className="text-[11px] text-gray-500">
                {item.metaPrefix ?? ''}
                {t(item.meta)}
                {item.metaSuffix ?? ''}
              </p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <span className="text-[10px] whitespace-nowrap text-gray-400">{item.time}</span>
            <Icon name="chevronRight" className="h-3 w-3 text-gray-300" />
          </div>
        </div>

        {(item.badge || item.note) && (
          <div className="mt-1.5 flex items-center gap-2">
            {item.badge && (
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold whitespace-nowrap ${BADGE_TONES[item.badge.tone]}`}
              >
                {t(item.badge.label)}
              </span>
            )}
            {item.note && <span className="text-[11px] text-gray-500">{t(item.note)}</span>}
          </div>
        )}
      </button>
    </div>
  )
}
