import { useT } from '../../../i18n/context.js'
import Icon from '../../lib/icons.jsx'
import { formatDaysWithUs } from '../format.js'

/**
 * Fields/Crops counts are real (derived from what was actually entered in onboarding) rather
 * than mock numbers — this is "My Fields/Crops", so a fake count would visibly mismatch the
 * My Fields/My Crops screens below. "Days with us" is a real elapsed-time calculation too.
 */
export default function StatsRow({ profile }) {
  const t = useT()

  const stats = [
    { icon: 'field', value: profile?.fieldName ? '1' : '0', label: 'profile.fields' },
    { icon: 'leaf', value: profile?.crop ? '1' : '0', label: 'profile.crops' },
    { icon: 'calendar', value: formatDaysWithUs(profile?.joinedAt), label: 'profile.daysWithUs' },
  ]

  return (
    <div className="mx-4 flex items-center justify-around rounded-2xl border border-solid border-gray-100 bg-white py-3 shadow-sm">
      {stats.map((stat, i) => (
        <div key={stat.label} className="flex items-center gap-2">
          {i > 0 && <span className="mr-2 h-8 w-px bg-gray-100" />}
          <span className="bg-sky flex h-8 w-8 items-center justify-center rounded-full">
            <Icon name={stat.icon} className="text-leaf-dark h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-bold text-black">{stat.value}</p>
            <p className="text-[10px] text-gray-500">{t(stat.label)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
