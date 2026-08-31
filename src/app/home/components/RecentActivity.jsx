import { Link } from 'react-router-dom'
import Icon from '../../lib/icons.jsx'

const ACTIVITY = [
  { icon: 'scan', title: 'Scanned North Field', time: 'Today, 9:12 AM' },
  { icon: 'shield', title: 'Early blight confirmed by expert', time: 'Yesterday' },
  { icon: 'leaf', title: 'Advisory: Apply copper fungicide', time: '2 days ago' },
]

/** Mock activity feed — real entries would come from scan/advisory/expert-review history. */
export default function RecentActivity() {
  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-bold text-black">Recent Activity</h2>
        <Link to="/history" className="text-leaf-dark text-xs font-semibold">
          View all
        </Link>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white">
        {ACTIVITY.map((item, i) => (
          <div
            key={item.title}
            className={`flex items-center gap-3 px-4 py-3 ${i !== ACTIVITY.length - 1 ? 'border-b border-gray-50' : ''}`}
          >
            <span className="bg-sky flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
              <Icon name={item.icon} className="text-leaf-dark h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-black">{item.title}</p>
              <p className="text-[10px] text-gray-400">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
