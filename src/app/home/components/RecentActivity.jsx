import { Link } from 'react-router-dom'
import { GLASS_INSET } from '../../lib/glass.js'
import { GlassCard, SectionHeader } from '../../lib/glass.jsx'
import { useT } from '../../../i18n/context.js'
import Icon from '../../lib/icons.jsx'

const ACTIVITY = [
  { key: 'a1', icon: 'scan', title: 'home.act1', time: 'home.act1Time' },
  { key: 'a2', icon: 'shield', title: 'home.act2', time: 'common.yesterday' },
  { key: 'a3', icon: 'leaf', title: 'home.act3', time: null },
]

/** Mock activity feed — real entries would come from scan/advisory/expert-review history. */
export default function RecentActivity() {
  const t = useT()

  return (
    <GlassCard className="p-4">
      <SectionHeader
        title={t('home.recentActivity')}
        className="mb-3"
        right={
          <Link to="/history" className="text-[11px] font-semibold text-lime-300">
            {t('common.viewAll')}
          </Link>
        }
      />

      <div className="flex flex-col gap-2">
        {ACTIVITY.map((item) => (
          <div key={item.key} className={`${GLASS_INSET} flex items-center gap-3 px-3 py-2.5`}>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-solid border-white/15 bg-white/10">
              <Icon name={item.icon} className="h-4 w-4 text-lime-200" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-white">{t(item.title)}</p>
              <p className="text-[10px] text-white/50">{item.time ? t(item.time) : t('common.daysAgo', { n: 2 })}</p>
            </div>
            <Icon name="chevronRight" className="h-3.5 w-3.5 shrink-0 text-white/35" />
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
