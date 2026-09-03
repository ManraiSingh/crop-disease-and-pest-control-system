import { GLASS_INSET } from '../../lib/glass.js'
import { GlassCard, SectionHeader } from '../../lib/glass.jsx'
import { useT } from '../../../i18n/context.js'
import Icon from '../../lib/icons.jsx'

const TONES = {
  amber: 'border-amber-200/30 bg-amber-300/20 text-amber-100',
  green: 'border-lime-200/30 bg-lime-300/20 text-lime-100',
}

/** Mock soil-sensor readings — real values would come from the field sensor / risk-scoring engine. */
const STATS = [
  { key: 'moisture', icon: 'droplet', label: 'home.moisture', value: '32%', status: 'home.lowLevel', tone: 'amber' },
  { key: 'ph', icon: 'pulse', label: 'home.phLevel', value: '6.5', status: 'home.optimal', tone: 'green' },
  { key: 'nitrogen', icon: 'flask', label: 'home.nitrogen', valueKey: 'home.nitrogenHigh', status: 'home.good', tone: 'green' },
  { key: 'temp', icon: 'thermometer', label: 'home.temp', value: '68°F', status: 'home.normal', tone: 'green' },
]

export default function SoilStatus() {
  const t = useT()

  return (
    <GlassCard className="p-4">
      <SectionHeader title={t('home.soilStatus')} action={t('home.detailedReport')} className="mb-3" />

      <div className="grid grid-cols-2 gap-3">
        {STATS.map((stat) => (
          <div key={stat.key} className={`${GLASS_INSET} p-3`}>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-white/55 uppercase">
              <Icon name={stat.icon} className="h-3.5 w-3.5" />
              {t(stat.label)}
            </div>
            <p className="mt-1.5 text-2xl font-bold text-white">{stat.valueKey ? t(stat.valueKey) : stat.value}</p>
            <span className={`mt-2 inline-block rounded-full border border-solid px-2.5 py-1 text-[10px] font-semibold ${TONES[stat.tone]}`}>
              {t(stat.status)}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
