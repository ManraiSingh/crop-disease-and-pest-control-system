import { GLASS_SURFACE } from '../../lib/glass.js'
import Icon from '../../lib/icons.jsx'
import { formatDaysWithUs } from '../format.js'

/**
 * Fields/Crops counts are real (derived from what was actually entered in onboarding) rather
 * than mock numbers — this is "My Fields/Crops", so a fake count would visibly mismatch the
 * My Fields/My Crops screens below. "Days with us" is a real elapsed-time calculation too.
 */
export default function StatsRow({ profile }) {
  const stats = [
    { icon: 'field', value: profile?.fieldName ? '1' : '0', label: 'Fields' },
    { icon: 'leaf', value: profile?.crop ? '1' : '0', label: 'Crops' },
    { icon: 'calendar', value: formatDaysWithUs(profile?.joinedAt), label: 'Days with us' },
  ]

  return (
    <div className={`${GLASS_SURFACE} mx-4 grid grid-cols-3 divide-x divide-white/15 rounded-2xl py-4`}>
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col items-center gap-1.5 px-2 text-center">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-solid border-white/15 bg-white/10">
            <Icon name={stat.icon} className="h-4 w-4 text-lime-200" />
          </span>
          <p className="text-base font-bold text-white">{stat.value}</p>
          <p className="text-[10px] text-white/60">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
