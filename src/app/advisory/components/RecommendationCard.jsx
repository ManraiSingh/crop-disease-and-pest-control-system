import { useT } from '../../../i18n/context.js'
import Icon from '../../lib/icons.jsx'

const TONES = {
  green: { icon: 'bg-lime-400/20 text-lime-200', badge: 'border-lime-200/30 bg-lime-300/20 text-lime-100' },
  blue: { icon: 'bg-sky-400/20 text-sky-200', badge: 'border-sky-200/30 bg-sky-300/20 text-sky-100' },
  amber: { icon: 'bg-amber-400/20 text-amber-200', badge: 'border-amber-200/30 bg-amber-300/20 text-amber-100' },
}

export default function RecommendationCard({ item, isLast }) {
  const tone = TONES[item.tone]
  const t = useT()

  return (
    <button
      type="button"
      className={`flex w-full items-start gap-3 border-0 bg-transparent px-4 py-3 text-left ${
        isLast ? '' : 'border-b border-solid border-white/10'
      }`}
    >
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${tone.icon}`}>
        <Icon name={item.icon} className="h-4 w-4" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-white">{t(item.title)}</p>
        <p className="mt-0.5 text-[11px] text-white/65">{t(item.description)}</p>
        <div className="mt-1 flex items-center gap-2 text-[10px] text-white/45">
          <span className="flex items-center gap-1">
            <Icon name="calendar" className="h-3 w-3" />
            {item.when ? t(item.when) : t('common.daysAgo', { n: 2 })}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="leaf" className="h-3 w-3" />
            {t(item.crop)} · {item.field}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <span className={`rounded-full border border-solid px-2 py-0.5 text-[10px] font-bold whitespace-nowrap ${tone.badge}`}>
          {t(item.risk)}
        </span>
        <Icon name="chevronRight" className="h-3.5 w-3.5 text-white/35" />
      </div>
    </button>
  )
}
