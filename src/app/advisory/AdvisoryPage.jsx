import { useState } from 'react'
import { GLASS_SURFACE } from '../lib/glass.js'
import { SectionHeader } from '../lib/glass.jsx'
import { useT } from '../../i18n/context.js'
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
    title: 'advisory.r1Title',
    description: 'advisory.r1Desc',
    when: 'common.today',
    crop: 'crops.tomato',
    field: 'North Field',
    risk: 'common.high',
  },
  {
    category: 'irrigation',
    tone: 'blue',
    icon: 'droplet',
    title: 'advisory.r2Title',
    description: 'advisory.r2Desc',
    when: 'common.today',
    crop: 'crops.wheat',
    field: 'North Field',
    risk: 'common.medium',
  },
  {
    category: 'soil',
    tone: 'amber',
    icon: 'bottle',
    title: 'advisory.r3Title',
    description: 'advisory.r3Desc',
    when: 'common.tomorrow',
    crop: 'crops.wheat',
    field: 'South Field',
    risk: 'common.medium',
  },
  {
    category: 'crops',
    tone: 'green',
    icon: 'shield',
    title: 'advisory.r4Title',
    description: 'advisory.r4Desc',
    when: null,
    crop: 'crops.potato',
    field: 'East Field',
    risk: 'common.low',
  },
]

export default function AdvisoryPage() {
  const [filter, setFilter] = useState('all')
  const t = useT()

  const items =
    filter === 'all' ? RECOMMENDATIONS : RECOMMENDATIONS.filter((item) => item.category === filter)

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-4">
        <p className="text-[11px] text-white/70 drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)]">
          {t('advisory.subtitle')}
        </p>
        <div className="mt-3">
          <FilterChips active={filter} onChange={setFilter} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-4">
        <div className="flex flex-col gap-4">
          <AlertBanner />

          <section>
            <div className={`${GLASS_SURFACE} rounded-3xl`}>
              <SectionHeader title={t('advisory.recommended')} action={t('common.viewAll')} className="px-4 pt-4 pb-3" />
              {items.length === 0 ? (
                <p className="px-4 pb-6 text-center text-xs text-white/50">{t('advisory.empty')}</p>
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
