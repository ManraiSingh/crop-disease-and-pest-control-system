import { useT } from '../../i18n/context.js'
import { loadProfile } from '../lib/profile.js'
import KeepGrowingCard from './components/KeepGrowingCard.jsx'
import MenuList from './components/MenuList.jsx'
import ProfileHeader from './components/ProfileHeader.jsx'
import StatsRow from './components/StatsRow.jsx'

export default function ProfilePage() {
  const profile = loadProfile()
  const t = useT()

  return (
    <div className="bg-sky/20 flex h-full flex-col overflow-y-auto pb-4">
      <ProfileHeader profile={profile} />

      <div className="mt-3 flex flex-col gap-3">
        <StatsRow profile={profile} />
        <MenuList />
        <KeepGrowingCard />
      </div>

      <p className="mt-3 text-center text-[10px] text-gray-400">{t('profile.version')} 1.0.0</p>
    </div>
  )
}
