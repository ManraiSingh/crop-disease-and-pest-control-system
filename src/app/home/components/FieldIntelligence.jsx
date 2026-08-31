import { Link } from 'react-router-dom'
import { useT } from '../../../i18n/context.js'
import Icon from '../../lib/icons.jsx'

const STATS = [
  { key: 'soilHealth', label: 'home.soilHealth', value: '82%', status: 'home.healthy', icon: 'droplet', tint: 'bg-amber-50 text-amber-600' },
  { key: 'soilMoisture', label: 'home.soilMoisture', value: '64%', status: 'home.good', icon: 'droplet', tint: 'bg-blue-50 text-blue-500' },
  { key: 'cropSafety', label: 'home.cropSafety', value: '92%', status: 'home.optimal', icon: 'shield', tint: 'bg-green-50 text-leaf-dark' },
]

/** Mock stats — real values would come from soil sensors / the risk-scoring engine. */
export default function FieldIntelligence() {
  const t = useT()

  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-bold text-black">{t('home.intelligence')}</h2>
        <Link to="/advisory" className="text-leaf-dark text-xs font-semibold">
          {t('common.viewAll')}
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {STATS.map((stat) => (
          <div key={stat.key} className="rounded-2xl border border-gray-100 bg-white p-3">
            <span className={`flex h-8 w-8 items-center justify-center rounded-full ${stat.tint}`}>
              <Icon name={stat.icon} className="h-4 w-4" />
            </span>
            <p className="mt-2 text-[10px] text-gray-500">{t(stat.label)}</p>
            <p className="text-sm font-bold text-black">{stat.value}</p>
            <p className="text-leaf-dark text-[10px] font-semibold">{t(stat.status)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
