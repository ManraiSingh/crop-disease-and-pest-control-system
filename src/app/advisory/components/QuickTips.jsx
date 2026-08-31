import Icon from '../../lib/icons.jsx'

const TIPS = [
  {
    icon: 'sprout',
    tone: 'bg-green-100 text-leaf-dark',
    title: 'Mulching',
    description: 'Helps retain soil moisture and control weeds.',
  },
  {
    icon: 'sun',
    tone: 'bg-amber-100 text-amber-600',
    title: 'Harvest Time',
    description: 'Perfect time to harvest wheat in 7-10 days.',
  },
  {
    icon: 'sprout',
    tone: 'bg-blue-100 text-blue-500',
    title: 'Crop Rotation',
    description: 'Practice crop rotation for better soil health.',
  },
]

export default function QuickTips() {
  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-bold text-black">Quick Tips</h2>
        <span className="text-leaf-dark text-xs font-semibold">View all</span>
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
            <p className="mt-2 text-xs font-bold text-black">{tip.title}</p>
            <p className="mt-0.5 text-[10px] text-gray-500">{tip.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
