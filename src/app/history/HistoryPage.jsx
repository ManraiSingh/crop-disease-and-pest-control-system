import { useState } from 'react'
import { useT } from '../../i18n/context.js'
import Icon from '../lib/icons.jsx'
import ActivityItem from './components/ActivityItem.jsx'
import FilterChips from './components/FilterChips.jsx'

/** Mock activity log — real entries would come from scan/advisory/irrigation/expert history. */
const TIMELINE = [
  {
    date: 'common.today',
    items: [
      {
        category: 'alert',
        icon: 'shield',
        tint: 'bg-red-400/20 text-red-200',
        title: 'history.h1',
        meta: 'crops.tomato',
        metaSuffix: ' · North Field',
        time: '08:15 AM',
        badge: { label: 'history.h1Badge', tone: 'red' },
        note: 'history.h1Note',
      },
      {
        category: 'scan',
        icon: 'scan',
        tint: 'bg-lime-400/20 text-lime-200',
        title: 'history.h2',
        meta: 'crops.tomato',
        metaSuffix: ' · North Field',
        time: '07:45 AM',
        note: 'history.h2Note',
      },
      {
        category: 'weather',
        icon: 'cloudSun',
        tint: 'bg-sky-400/20 text-sky-200',
        title: 'history.h3',
        meta: null,
        metaPrefix: '29°C',
        time: '06:30 AM',
        note: 'history.h3Note',
      },
    ],
  },
  {
    date: 'common.yesterday',
    items: [
      {
        category: 'treatment',
        icon: 'bottle',
        tint: 'bg-amber-400/20 text-amber-200',
        title: 'history.h4',
        meta: 'history.h4Meta',
        time: '05:00 PM',
        badge: { label: 'history.h4Badge', tone: 'amber' },
        note: 'history.h4Note',
      },
      {
        category: 'weather',
        icon: 'droplet',
        tint: 'bg-sky-400/20 text-sky-200',
        title: 'history.h5',
        meta: 'crops.tomato',
        metaPrefix: 'North Field · ',
        time: '04:20 PM',
        note: 'history.h5Note',
      },
    ],
  },
  {
    date: null,
    items: [
      {
        category: 'treatment',
        icon: 'leaf',
        tint: 'bg-lime-400/20 text-lime-200',
        title: 'history.h6',
        meta: 'history.h6Meta',
        time: '11:10 AM',
        note: 'history.h6Note',
      },
      {
        category: 'scan',
        icon: 'scan',
        tint: 'bg-lime-400/20 text-lime-200',
        title: 'history.h2',
        meta: 'crops.tomato',
        metaSuffix: ' · North Field',
        time: '09:30 AM',
        note: 'history.h7Note',
      },
    ],
  },
]

export default function HistoryPage() {
  const [filter, setFilter] = useState('all')
  const t = useT()

  const groups = TIMELINE.map((group) => ({
    ...group,
    items: filter === 'all' ? group.items : group.items.filter((item) => item.category === filter),
  })).filter((group) => group.items.length > 0)

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] text-white/70 drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)]">
            {t('history.subtitle')}
          </p>
          <button
            type="button"
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-solid border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md"
          >
            <Icon name="filter" className="h-3.5 w-3.5" />
            {t('history.filters')}
            <Icon name="chevronDown" className="h-3 w-3" />
          </button>
        </div>

        <div className="mt-3">
          <FilterChips active={filter} onChange={setFilter} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-4">
        {groups.length === 0 && (
          <p className="mt-8 text-center text-xs text-white/50">{t('history.empty')}</p>
        )}

        {groups.map((group) => (
          <div key={group.date ?? 'older'} className="mb-4">
            <p className="mb-2 text-xs font-semibold text-white/65 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">{group.date ? t(group.date) : t('common.daysAgo', { n: 2 })}</p>
            {group.items.map((item, i) => (
              <ActivityItem key={item.title + item.time} item={item} isLast={i === group.items.length - 1} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
