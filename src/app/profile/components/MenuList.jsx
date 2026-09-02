import { useNavigate } from 'react-router-dom'
import { GLASS_SURFACE } from '../../lib/glass.jsx'
import { useT } from '../../../i18n/context.js'
import Icon from '../../lib/icons.jsx'

const ITEMS = [
  { key: 'personal', icon: 'profile', title: 'profile.personalInfo', subtitle: 'profile.personalInfoSub' },
  { key: 'fields', icon: 'field', title: 'profile.myFields', subtitle: 'profile.myFieldsSub' },
  { key: 'crops', icon: 'leaf', title: 'profile.myCrops', subtitle: 'profile.myCropsSub' },
  { key: 'notifs', icon: 'bell', title: 'profile.notifications', subtitle: 'profile.notificationsSub' },
  { key: 'privacy', icon: 'shield', title: 'profile.privacy', subtitle: 'profile.privacySub' },
  { key: 'help', icon: 'help', title: 'profile.help', subtitle: 'profile.helpSub' },
  { key: 'settings', icon: 'settings', title: 'profile.settings', subtitle: 'profile.settingsSub' },
]

export default function MenuList() {
  const navigate = useNavigate()
  const t = useT()

  return (
    <div className={`${GLASS_SURFACE} mx-4 rounded-2xl`}>
      {ITEMS.map((item, i) => (
        <button
          key={item.key}
          type="button"
          className={`flex w-full items-center gap-3 border-0 bg-transparent px-4 py-3 text-left ${
            i !== ITEMS.length - 1 ? 'border-b border-solid border-white/10' : ''
          }`}
        >
          <Icon name={item.icon} className="h-5 w-5 shrink-0 text-lime-200" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white">{t(item.title)}</p>
            <p className="text-[11px] text-white/55">{t(item.subtitle)}</p>
          </div>
          <Icon name="chevronRight" className="h-4 w-4 shrink-0 text-white/35" />
        </button>
      ))}

      <button
        type="button"
        onClick={() => navigate('/')}
        className="relative flex w-full items-center gap-3 border-0 border-t border-solid border-white/10 bg-transparent px-4 py-3 text-left"
      >
        <Icon name="logout" className="h-5 w-5 shrink-0 text-red-300" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-red-300">{t('profile.logOut')}</p>
          <p className="text-[11px] text-white/55">{t('profile.logOutSub')}</p>
        </div>
        <Icon name="chevronRight" className="h-4 w-4 shrink-0 text-white/35" />
      </button>
    </div>
  )
}
