import { loadProfile } from '../lib/profile.js'
import AlertCard from './components/AlertCard.jsx'
import CropHealth from './components/CropHealth.jsx'
import FarmOverview from './components/FarmOverview.jsx'
import RecentActivity from './components/RecentActivity.jsx'
import ScanCropCard from './components/ScanCropCard.jsx'
import SoilStatus from './components/SoilStatus.jsx'

const TODAY = new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })

export default function HomePage() {
  const profile = loadProfile()

  return (
    <div className="h-full overflow-y-auto px-4 pt-1 pb-6">
      <p className="mb-3 text-[11px] text-white/70 drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)]">
        {TODAY} · Here's your farm update
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
