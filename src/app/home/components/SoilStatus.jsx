import { GLASS_INSET, GlassCard, SectionHeader } from '../../lib/glass.jsx'
import Icon from '../../lib/icons.jsx'

const TONES = {
  amber: 'border-amber-200/30 bg-amber-300/20 text-amber-100',
  green: 'border-lime-200/30 bg-lime-300/20 text-lime-100',
}

/** Mock soil-sensor readings — real values would come from the field sensor / risk-scoring engine. */
const STATS = [
  { icon: 'droplet', label: 'Moisture', value: '32%', status: 'Low Level', tone: 'amber' },
  { icon: 'pulse', label: 'pH Level', value: '6.5', status: 'Optimal', tone: 'green' },
  { icon: 'flask', label: 'Nitrogen', value: 'High', status: 'Good', tone: 'green' },
  { icon: 'thermometer', label: 'Temp', value: '68°F', status: 'Normal', tone: 'green' },
]

export default function SoilStatus() {
  return (
    <GlassCard className="p-4">
      <SectionHeader title="Soil Status" action="Detailed Report" className="mb-3" />

      <div className="grid grid-cols-2 gap-3">
        {STATS.map((stat) => (
          <div key={stat.label} className={`${GLASS_INSET} p-3`}>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-white/55 uppercase">
              <Icon name={stat.icon} className="h-3.5 w-3.5" />
              {stat.label}
            </div>
            <p className="mt-1.5 text-2xl font-bold text-white">{stat.value}</p>
            <span className={`mt-2 inline-block rounded-full border border-solid px-2.5 py-1 text-[10px] font-semibold ${TONES[stat.tone]}`}>
              {stat.status}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
