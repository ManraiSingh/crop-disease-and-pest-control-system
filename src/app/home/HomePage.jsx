import LanguagePicker from '../../i18n/LanguagePicker.jsx'
import { useT } from '../../i18n/context.js'
import { loadProfile } from '../lib/profile.js'
import ActiveFieldCard from './components/ActiveFieldCard.jsx'
import AlertCard from './components/AlertCard.jsx'
import FieldIntelligence from './components/FieldIntelligence.jsx'
import RecentActivity from './components/RecentActivity.jsx'
import ScanCropCard from './components/ScanCropCard.jsx'
import WeatherCard from './components/WeatherCard.jsx'

function formatName(name) {
  if (!name) return ''
  return name.charAt(0).toUpperCase() + name.slice(1)
}

const TODAY = 'Sat, 30 Aug'

export default function HomePage() {
  const profile = loadProfile()
  const t = useT()

  return (
    <div className="h-full overflow-y-auto px-4 pt-3 pb-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-black">{t('home.greeting', { name: formatName(profile?.name) || t('app.farmer') })}</h1>
          <p className="text-[11px] text-gray-500">{TODAY} · {t('home.subtitle')}</p>
        </div>
        <LanguagePicker />
      </div>

      <div className="flex flex-col gap-4">
        <ScanCropCard />
        <WeatherCard />
        <AlertCard />
        <FieldIntelligence />
        <ActiveFieldCard profile={profile} />
        <RecentActivity />
      </div>
    </div>
  )
}
