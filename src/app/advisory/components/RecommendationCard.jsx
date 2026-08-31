import Icon from '../../lib/icons.jsx'

const TONES = {
  green: { icon: 'bg-green-100 text-leaf-dark', badge: 'bg-green-100 text-leaf-dark' },
  blue: { icon: 'bg-blue-100 text-blue-500', badge: 'bg-blue-100 text-blue-600' },
  amber: { icon: 'bg-amber-100 text-amber-600', badge: 'bg-amber-100 text-amber-700' },
}

export default function RecommendationCard({ item, isLast }) {
  const tone = TONES[item.tone]

  return (
    <button
      type="button"
      className={`flex w-full items-start gap-3 border-0 bg-transparent px-4 py-3 text-left ${
        isLast ? '' : 'border-b border-solid border-gray-50'
      }`}
    >
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${tone.icon}`}>
        <Icon name={item.icon} className="h-4 w-4" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-black">{item.title}</p>
        <p className="mt-0.5 text-[11px] text-gray-500">{item.description}</p>
        <div className="mt-1 flex items-center gap-2 text-[10px] text-gray-400">
          <span className="flex items-center gap-1">
            <Icon name="calendar" className="h-3 w-3" />
            {item.when}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="leaf" className="h-3 w-3" />
            {item.crop} · {item.field}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold whitespace-nowrap ${tone.badge}`}>
          {item.risk}
        </span>
        <Icon name="chevronRight" className="h-3.5 w-3.5 text-gray-300" />
      </div>
    </button>
  )
}
