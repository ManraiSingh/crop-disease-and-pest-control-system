import { loadProfile } from '../lib/profile.js'
import ActiveFieldCard from './components/ActiveFieldCard.jsx'
import AlertCard from './components/AlertCard.jsx'
import FieldIntelligence from './components/FieldIntelligence.jsx'
import RecentActivity from './components/RecentActivity.jsx'
import ScanCropCard from './components/ScanCropCard.jsx'
import WeatherCard from './components/WeatherCard.jsx'

function formatName(name) {
  if (!name) return 'Farmer'
  return name.charAt(0).toUpperCase() + name.slice(1)
}

const TODAY = 'Sat, 30 Aug'

export default function HomePage() {
  const profile = loadProfile()

  return (
    <div className="h-full overflow-y-auto px-4 pt-3 pb-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-black">Good morning, {formatName(profile?.name)} 👋</h1>
          <p className="text-[11px] text-gray-500">{TODAY} · Here's your farm update</p>
        </div>
        <span className="rounded-full border-2 border-solid border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600">
          EN ⌄
        </span>
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
