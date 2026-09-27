import { useState } from 'react'
import { motion } from 'motion/react'
import { useT } from '../../i18n/context.js'
import Icon from '../lib/icons.jsx'
import { Group, GroupLabel, Segmented } from '../../design/List.jsx'
import { SPRING } from '../../design/springs.js'

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

  const filters = [
    { key: 'all', label: t('history.fAll') },
    { key: 'alert', label: t('history.fAlerts') },
    { key: 'scan', label: t('history.fScans') },
    { key: 'treatment', label: t('history.fTreatments') },
    { key: 'weather', label: t('history.fWeather') },
  ]

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="pb-3">
        <p className="px-5 pb-3 text-[13px]" style={{ color: 'var(--ink-mid)' }}>
          {t('history.subtitle')}
        </p>
        <Segmented options={filters} value={filter} onChange={setFilter} />
      </div>

      <div className="flex-1 overflow-y-auto pt-2 pb-6">
        {groups.length === 0 && (
          <p className="mt-10 text-center text-[13px]" style={{ color: 'var(--ink-soft)' }}>
            {t('history.empty')}
          </p>
        )}

        {/*
          One group per day. The day is the caption above its group rather than a heading
          inside it, so the eye can run down the left edge and find a date without reading
          the entries — the same reason a settings screen captions its sections.
        */}
        {groups.map((group, gi) => (
          <div key={group.date ?? 'older'} className={gi ? 'mt-6' : ''}>
            <GroupLabel>{group.date ? t(group.date) : t('common.daysAgo', { n: 2 })}</GroupLabel>
            <Group delay={0.04 * gi}>
              {group.items.map((item, i) => (
                <motion.div
                  key={item.title + item.time}
                  className="relative flex items-start gap-3 px-4 py-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...SPRING.settle, delay: 0.04 * i }}
                >
                  <span
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px]"
                    style={{
                      background:
                        item.category === 'alert'
                          ? 'color-mix(in srgb, var(--alarm) 14%, transparent)'
                          : 'color-mix(in srgb, var(--green) 14%, transparent)',
                      color: item.category === 'alert' ? 'var(--alarm)' : 'var(--green)',
                    }}
                  >
                    <Icon name={item.icon} className="h-4 w-4" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="t-label truncate text-[15px]" style={{ color: 'var(--ink)' }}>
                        {t(item.title)}
                      </p>
                      <span className="t-num shrink-0 text-[11px]" style={{ color: 'var(--ink-soft)' }}>
                        {item.time}
                      </span>
                    </div>

                    {(item.meta || item.metaPrefix) && (
                      <p className="truncate text-[12px]" style={{ color: 'var(--ink-mid)' }}>
                        {item.metaPrefix ?? ''}
                        {item.meta ? t(item.meta) : ''}
                        {item.metaSuffix ?? ''}
                      </p>
                    )}

                    {(item.badge || item.note) && (
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        {item.badge && (
                          <span
                            className="t-label rounded-full px-2 py-0.5 text-[10px]"
                            style={{
                              background:
                                item.badge.tone === 'red'
                                  ? 'color-mix(in srgb, var(--alarm) 14%, transparent)'
                                  : 'color-mix(in srgb, var(--warn) 16%, transparent)',
                              color: item.badge.tone === 'red' ? 'var(--alarm)' : 'var(--warn)',
                            }}
                          >
                            {t(item.badge.label)}
                          </span>
                        )}
                        {item.note && (
                          <span className="text-[12px]" style={{ color: 'var(--ink-soft)' }}>
                            {t(item.note)}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {i !== group.items.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-0 bottom-0 left-[60px] h-px"
                      style={{ background: 'var(--paper-edge)' }}
                    />
                  )}
                </motion.div>
              ))}
            </Group>
          </div>
        ))}
      </div>
    </div>
  )
}
