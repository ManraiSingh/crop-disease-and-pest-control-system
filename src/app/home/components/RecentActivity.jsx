import { Link } from 'react-router-dom'
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
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-bold text-black">{t('home.recentActivity')}</h2>
        <Link to="/history" className="text-leaf-dark text-xs font-semibold">
          {t('common.viewAll')}
        </Link>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white">
        {ACTIVITY.map((item, i) => (
          <div
            key={item.key}
            className={`flex items-center gap-3 px-4 py-3 ${i !== ACTIVITY.length - 1 ? 'border-b border-gray-50' : ''}`}
          >
            <span className="bg-sky flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
              <Icon name={item.icon} className="text-leaf-dark h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-black">{t(item.title)}</p>
              <p className="text-[10px] text-gray-400">{item.time ? t(item.time) : t('common.daysAgo', { n: 2 })}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
