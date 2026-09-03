import { GLASS_SHEEN, GLASS_SURFACES } from '../../lib/glass.js'
import Icon from '../../lib/icons.jsx'

const METRIC_ICONS = {
  humidity: 'droplet',
  clouds: 'cloud',
  uvIndex: 'sun',
}

const METRIC_LABELS = {
  humidity: 'Humidity',
  clouds: 'Clouds',
  uvIndex: 'UV Index',
}

/**
 * Current-conditions strip. On the dashboard it is its own glass panel; inside the header's
 * weather popover it renders bare (`surface="none"`) beneath the chart, sharing that panel.
 * Controlled — `metrics` comes from whatever the weather source provides.
 */
export default function WeatherMetrics({ metrics, surface = 'default' }) {
  const bare = surface === 'none'

  return (
    <section className={`${GLASS_SURFACES[surface]} w-full text-white ${bare ? '' : 'px-2 py-4'}`}>
      {!bare && <div aria-hidden="true" className={GLASS_SHEEN} />}
      <dl className="relative grid grid-cols-3 divide-x divide-white/15">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="flex flex-col items-center gap-1.5 px-1 text-center">
            <Icon name={METRIC_ICONS[key]} className="h-4 w-4 text-white" aria-hidden="true" />
            <dt className="text-[11px] text-white/60">{METRIC_LABELS[key]}</dt>
            <dd className="text-base font-bold text-white">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
