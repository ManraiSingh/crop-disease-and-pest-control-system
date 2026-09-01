import { GLASS_SHEEN, GLASS_SURFACE } from '../../lib/glass.jsx'
import Icon from '../../lib/icons.jsx'

const STATS = [
  { icon: 'droplet', label: 'Humidity', value: '62%' },
  { icon: 'wind', label: 'Wind', value: '12 km/h' },
  { icon: 'umbrella', label: 'Rain Chance', value: '10%' },
]

export default function WeatherOutlookCard() {
  return (
    <button
      type="button"
      className={`${GLASS_SURFACE} flex w-full flex-col gap-3 p-4 text-left`}
    >
      <span aria-hidden="true" className={GLASS_SHEEN} />
      <div className="relative flex items-start gap-3">
        <Icon name="cloudSun" className="mt-0.5 h-8 w-8 shrink-0 text-lime-200" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-lime-300">Weather Outlook</p>
          <p className="text-sm font-bold text-white">Partly Cloudy</p>
          <p className="text-xs text-white/60">28°C / 20°C</p>
        </div>
        <Icon name="chevronRight" className="mt-1 h-4 w-4 shrink-0 text-white/45" />
      </div>

      <div className="relative flex items-center justify-around border-t border-solid border-white/12 pt-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1">
            <Icon name={stat.icon} className="h-4 w-4 text-lime-200" />
            <p className="text-xs font-bold text-white">{stat.value}</p>
            <p className="text-[10px] text-white/55">{stat.label}</p>
          </div>
        ))}
      </div>

      <span className="relative flex items-center justify-end gap-0.5 text-xs font-bold text-lime-300">
        View full forecast
        <Icon name="chevronRight" className="h-3 w-3" />
      </span>
    </button>
  )
}
