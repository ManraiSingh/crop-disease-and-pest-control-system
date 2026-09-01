import { GLASS_INSET, GlassCard, SectionHeader } from '../../lib/glass.jsx'
import Icon from '../../lib/icons.jsx'

const TIPS = [
  {
    icon: 'sprout',
    tone: 'bg-lime-400/20 text-lime-200',
    title: 'Mulching',
    description: 'Helps retain soil moisture and control weeds.',
  },
  {
    icon: 'sun',
    tone: 'bg-amber-400/20 text-amber-200',
    title: 'Harvest Time',
    description: 'Perfect time to harvest wheat in 7-10 days.',
  },
  {
    icon: 'sprout',
    tone: 'bg-sky-400/20 text-sky-200',
    title: 'Crop Rotation',
    description: 'Practice crop rotation for better soil health.',
  },
]

export default function QuickTips() {
  return (
    <GlassCard className="p-4">
      <SectionHeader title="Quick Tips" action="View all" className="mb-3" />

      {/* Negative margin lets the row scroll edge-to-edge inside the card's padding. */}
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
        {TIPS.map((tip) => (
          <div key={tip.title} className={`${GLASS_INSET} w-40 shrink-0 p-3`}>
            <span className={`flex h-8 w-8 items-center justify-center rounded-full ${tip.tone}`}>
              <Icon name={tip.icon} className="h-4 w-4" />
            </span>
            <p className="mt-2 text-xs font-bold text-white">{tip.title}</p>
            <p className="mt-0.5 text-[10px] text-white/60">{tip.description}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
