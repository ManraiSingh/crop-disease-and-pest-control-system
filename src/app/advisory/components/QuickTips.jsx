import { GLASS_INSET } from '../../lib/glass.js'
import { GlassCard, SectionHeader } from '../../lib/glass.jsx'
import { useT } from '../../../i18n/context.js'
import Icon from '../../lib/icons.jsx'

const TIPS = [
  {
    icon: 'sprout',
    tone: 'bg-lime-400/20 text-lime-200',
    key: 't1',
    title: 'advisory.t1Title',
    description: 'advisory.t1Desc',
  },
  {
    icon: 'sun',
    tone: 'bg-amber-400/20 text-amber-200',
    key: 't2',
    title: 'advisory.t2Title',
    description: 'advisory.t2Desc',
  },
  {
    icon: 'sprout',
    tone: 'bg-sky-400/20 text-sky-200',
    key: 't3',
    title: 'advisory.t3Title',
    description: 'advisory.t3Desc',
  },
]

export default function QuickTips() {
  const t = useT()

  return (
    <GlassCard className="p-4">
      <SectionHeader title={t('advisory.quickTips')} action={t('common.viewAll')} className="mb-3" />

      {/* Negative margin lets the row scroll edge-to-edge inside the card's padding. */}
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
        {TIPS.map((tip) => (
          <div key={tip.key} className={`${GLASS_INSET} w-40 shrink-0 p-3`}>
            <span className={`flex h-8 w-8 items-center justify-center rounded-full ${tip.tone}`}>
              <Icon name={tip.icon} className="h-4 w-4" />
            </span>
            <p className="mt-2 text-xs font-bold text-white">{t(tip.title)}</p>
            <p className="mt-0.5 text-[10px] text-white/60">{t(tip.description)}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
