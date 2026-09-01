import { useState } from 'react'
import Icon from '../lib/icons.jsx'
import ActivityItem from './components/ActivityItem.jsx'
import FilterChips from './components/FilterChips.jsx'

/** Mock activity log — real entries would come from scan/advisory/irrigation/expert history. */
const TIMELINE = [
  {
    date: 'Today, 30 Aug 2025',
    items: [
      {
        category: 'alert',
        icon: 'shield',
        tint: 'bg-red-400/20 text-red-200',
        title: 'Early blight detected',
        meta: 'Tomato · North Field',
        time: '08:15 AM',
        badge: { label: 'Medium Risk', tone: 'red' },
        note: '18% of field affected',
      },
      {
        category: 'scan',
        icon: 'scan',
        tint: 'bg-lime-400/20 text-lime-200',
        title: 'Crop scanned',
        meta: 'Tomato · North Field',
        time: '07:45 AM',
        note: 'AI analysis completed',
      },
      {
        category: 'weather',
        icon: 'cloudSun',
        tint: 'bg-sky-400/20 text-sky-200',
        title: 'Weather update',
        meta: '29°C · Partly cloudy',
        time: '06:30 AM',
        note: 'Humidity 62% · Rain chance 10%',
      },
    ],
  },
  {
    date: 'Yesterday, 29 Aug 2025',
    items: [
      {
        category: 'treatment',
        icon: 'bottle',
        tint: 'bg-amber-400/20 text-amber-200',
        title: 'Fertilizer reminder',
        meta: 'Urea application',
        time: '05:00 PM',
        badge: { label: 'Pending', tone: 'amber' },
        note: 'Due in 1 day',
      },
      {
        category: 'weather',
        icon: 'droplet',
        tint: 'bg-sky-400/20 text-sky-200',
        title: 'Irrigation scheduled',
        meta: 'North Field · Tomato',
        time: '04:20 PM',
        note: 'Scheduled for tomorrow, 6:00 AM',
      },
    ],
  },
  {
    date: '28 Aug 2025',
    items: [
      {
        category: 'treatment',
        icon: 'leaf',
        tint: 'bg-lime-400/20 text-lime-200',
        title: 'Pest control advisory',
        meta: 'Aphids detected risk high',
        time: '11:10 AM',
        note: 'Use Neem oil or recommended pesticide',
      },
      {
        category: 'scan',
        icon: 'scan',
        tint: 'bg-lime-400/20 text-lime-200',
        title: 'Crop scanned',
        meta: 'Tomato · North Field',
        time: '09:30 AM',
        note: 'No major issues detected',
      },
    ],
  },
]

export default function HistoryPage() {
  const [filter, setFilter] = useState('all')

  const groups = TIMELINE.map((group) => ({
    ...group,
    items: filter === 'all' ? group.items : group.items.filter((item) => item.category === filter),
  })).filter((group) => group.items.length > 0)

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] text-white/70 drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)]">
            Your farm activity and alerts
          </p>
          <button
            type="button"
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-solid border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md"
          >
            <Icon name="filter" className="h-3.5 w-3.5" />
            Filters
            <Icon name="chevronDown" className="h-3 w-3" />
          </button>
        </div>

        <div className="mt-3">
          <FilterChips active={filter} onChange={setFilter} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-4">
        {groups.length === 0 && (
          <p className="mt-8 text-center text-xs text-white/50">No activity in this category yet.</p>
        )}

        {groups.map((group) => (
          <div key={group.date} className="mb-4">
            <p className="mb-2 text-xs font-semibold text-white/65 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">{group.date}</p>
            {group.items.map((item, i) => (
              <ActivityItem key={item.title + item.time} item={item} isLast={i === group.items.length - 1} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
