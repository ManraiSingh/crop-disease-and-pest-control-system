import { useState } from 'react'
import AlertBanner from './components/AlertBanner.jsx'
import FilterChips from './components/FilterChips.jsx'
import QuickTips from './components/QuickTips.jsx'
import RecommendationCard from './components/RecommendationCard.jsx'
import WeatherOutlookCard from './components/WeatherOutlookCard.jsx'

/** Mock advisory content — real entries would come from the risk-scoring/advisory engine. */
const RECOMMENDATIONS = [
  {
    category: 'pests',
    tone: 'green',
    icon: 'leaf',
    title: 'Aphids Risk in Tomato',
    description: 'Aphids population may increase in the current weather.',
    when: 'Today',
    crop: 'Tomato',
    field: 'North Field',
    risk: 'High',
  },
  {
    category: 'irrigation',
    tone: 'blue',
    icon: 'droplet',
    title: 'Irrigation Advisory',
    description: 'Light irrigation recommended in the evening hours.',
    when: 'Today',
    crop: 'Wheat',
    field: 'North Field',
    risk: 'Medium',
  },
  {
    category: 'soil',
    tone: 'amber',
    icon: 'bottle',
    title: 'Fertilizer Recommendation',
    description: 'Top dress your crop with Urea for better yield.',
    when: 'Tomorrow',
    crop: 'Wheat',
    field: 'South Field',
    risk: 'Medium',
  },
  {
    category: 'crops',
    tone: 'green',
    icon: 'shield',
    title: 'Disease Prevention',
    description: 'Early blight risk detected. Take preventive measures.',
    when: '2 days ago',
    crop: 'Potato',
    field: 'East Field',
    risk: 'Low',
  },
]

export default function AdvisoryPage() {
  const [filter, setFilter] = useState('all')

  const items =
    filter === 'all' ? RECOMMENDATIONS : RECOMMENDATIONS.filter((item) => item.category === filter)

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-4 pt-3">
        <h1 className="text-xl font-bold text-black">Advisory</h1>
        <p className="text-[11px] text-gray-500">Personalized recommendations for your farm</p>
        <div className="mt-3">
          <FilterChips active={filter} onChange={setFilter} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-4">
        <div className="flex flex-col gap-4">
          <AlertBanner />

          <section>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-bold text-black">Recommended for You</h2>
              <span className="text-leaf-dark text-xs font-semibold">View all</span>
            </div>
            <div className="overflow-hidden rounded-2xl border border-solid border-gray-100 bg-white">
              {items.length === 0 ? (
                <p className="px-4 py-6 text-center text-xs text-gray-400">Nothing in this category yet.</p>
              ) : (
                items.map((item, i) => (
                  <RecommendationCard key={item.title} item={item} isLast={i === items.length - 1} />
                ))
              )}
            </div>
          </section>

          <WeatherOutlookCard />
          <QuickTips />
        </div>
      </div>
    </div>
  )
}
