import { useT } from '../../../i18n/context.js'
import Icon from '../../lib/icons.jsx'

const TIPS = [
  {
    icon: 'sprout',
    tone: 'bg-green-100 text-leaf-dark',
    title: 'advisory.t1Title',
    description: 'advisory.t1Desc',
  },
  {
    icon: 'sun',
    tone: 'bg-amber-100 text-amber-600',
    title: 'advisory.t2Title',
    description: 'advisory.t2Desc',
  },
  {
    icon: 'sprout',
    tone: 'bg-blue-100 text-blue-500',
    title: 'advisory.t3Title',
    description: 'advisory.t3Desc',
  },
]

export default function QuickTips() {
  const t = useT()

  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-bold text-black">{t('advisory.quickTips')}</h2>
        <span className="text-leaf-dark text-xs font-semibold">{t('common.viewAll')}</span>
      </div>

      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
        {TIPS.map((tip) => (
          <div
            key={tip.title}
            className="w-40 shrink-0 rounded-2xl border border-solid border-gray-100 bg-white p-3"
          >
            <span className={`flex h-8 w-8 items-center justify-center rounded-full ${tip.tone}`}>
              <Icon name={tip.icon} className="h-4 w-4" />
            </span>
            <p className="mt-2 text-xs font-bold text-black">{t(tip.title)}</p>
            <p className="mt-0.5 text-[10px] text-gray-500">{t(tip.description)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
