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
      className="bg-sky/25 flex w-full flex-col gap-3 rounded-2xl border border-solid border-green-100 p-4 text-left"
    >
      <div className="flex items-start gap-3">
        <Icon name="cloudSun" className="text-leaf-dark mt-0.5 h-8 w-8 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-leaf-dark text-xs font-bold">Weather Outlook</p>
          <p className="text-sm font-bold text-black">Partly Cloudy</p>
          <p className="text-xs text-gray-500">28°C / 20°C</p>
        </div>
        <Icon name="chevronRight" className="mt-1 h-4 w-4 shrink-0 text-gray-400" />
      </div>

      <div className="flex items-center justify-around border-t border-solid border-green-100 pt-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1">
            <Icon name={stat.icon} className="text-leaf-dark h-4 w-4" />
            <p className="text-xs font-bold text-black">{stat.value}</p>
            <p className="text-[10px] text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <span className="text-leaf-dark flex items-center justify-end gap-0.5 text-xs font-bold">
        View full forecast
        <Icon name="chevronRight" className="h-3 w-3" />
      </span>
    </button>
  )
}
