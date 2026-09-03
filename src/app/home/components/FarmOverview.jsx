import { GLASS_INSET, GLASS_SHEEN, GLASS_SURFACE_STRONG } from '../../lib/glass.js'
import { SectionHeader } from '../../lib/glass.jsx'
import Icon from '../../lib/icons.jsx'

/** Mock aggregate stats — real values would be computed across all of the farmer's fields. */
const STATS = [
  { icon: 'sprout', label: 'Total Area', value: '125 ha', sub: '+5 ha this month' },
  { icon: 'wheat', label: 'Crops', value: '4', sub: 'Active crops' },
  { icon: 'heart', label: 'Field Health', value: '85%', sub: 'Good condition' },
  { icon: 'trendingUp', label: 'Estimated Yield', value: '8.4 t/ha', sub: '+12% vs last season' },
]

export default function FarmOverview() {
  return (
    <section className={`${GLASS_SURFACE_STRONG} rounded-3xl p-4`}>
      <div aria-hidden="true" className={GLASS_SHEEN} />
      <div className="pointer-events-none absolute -top-10 -right-8 h-40 w-40 rounded-full bg-lime-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-emerald-300/10 blur-3xl" />

      <div className="relative">
        <SectionHeader title="Farm Overview" action="View All" className="mb-3" />
      </div>

      <div className="relative grid grid-cols-2 gap-3">
        {STATS.map((stat) => (
          <div key={stat.label} className={`${GLASS_INSET} flex items-center justify-between gap-2 p-3`}>
            <div className="min-w-0">
              <p className="truncate text-[10px] font-medium text-white/60">{stat.label}</p>
              <p className="mt-1 text-base font-bold text-white">{stat.value}</p>
              <p className="truncate text-[9px] text-white/50">{stat.sub}</p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-400/20 text-lime-200 shadow-[0_0_18px_rgba(163,230,53,0.3)]">
              <Icon name={stat.icon} className="h-[18px] w-[18px]" />
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
