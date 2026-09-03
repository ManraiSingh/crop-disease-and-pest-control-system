import { useLanguage } from '../../i18n/context.js'
import { loadProfile } from '../lib/profile.js'
import AlertCard from './components/AlertCard.jsx'
import CropHealth from './components/CropHealth.jsx'
import FarmOverview from './components/FarmOverview.jsx'
import RecentActivity from './components/RecentActivity.jsx'
import ScanCropCard from './components/ScanCropCard.jsx'
import SoilStatus from './components/SoilStatus.jsx'

// Date formatting follows the active language, so Marathi shows a Marathi date.
const DATE_LOCALES = { en: 'en-GB', hi: 'hi-IN', mr: 'mr-IN' }

export default function HomePage() {
  const profile = loadProfile()
  const { t, language } = useLanguage()
  const today = new Date().toLocaleDateString(DATE_LOCALES[language] ?? 'en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })

  return (
    <div className="h-full overflow-y-auto px-4 pt-1 pb-6">
      <p className="mb-3 text-[11px] text-white/70 drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)]">
        {today} · {t('home.subtitle')}
      </p>

      <div className="flex flex-col gap-4">
        <ScanCropCard />
        <AlertCard />
        <SoilStatus />
        <CropHealth profile={profile} />
        <FarmOverview />
        <RecentActivity />
      </div>
    </div>
  )
}
