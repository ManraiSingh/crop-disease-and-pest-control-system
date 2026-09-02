import { GLASS_SHEEN, GLASS_SURFACE } from '../../lib/glass.jsx'
import { useT } from '../../../i18n/context.js'
import Icon from '../../lib/icons.jsx'

const METRIC_ICONS = {
  humidity: 'droplet',
  clouds: 'cloud',
  uvIndex: 'sun',
}

const METRIC_LABELS = {
  humidity: 'advisory.humidity',
  clouds: 'home.clouds',
  uvIndex: 'home.uvIndex',
}

/**
 * Current-conditions strip that sits directly under the weather card as its own glass panel.
 * Controlled — `metrics` comes from whatever the weather source provides.
 */
export default function WeatherMetrics({ metrics }) {
  const t = useT()

  return (
    <section className={`${GLASS_SURFACE} w-full px-2 py-4 text-white`}>
      <div aria-hidden="true" className={GLASS_SHEEN} />
      <dl className="relative grid grid-cols-3 divide-x divide-white/15">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="flex flex-col items-center gap-1.5 px-1 text-center">
            <Icon name={METRIC_ICONS[key]} className="h-4 w-4 text-white" aria-hidden="true" />
            <dt className="text-[11px] text-white/60">{t(METRIC_LABELS[key])}</dt>
            <dd className="text-base font-bold text-white">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
