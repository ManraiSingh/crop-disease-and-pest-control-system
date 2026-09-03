import { useNavigate } from 'react-router-dom'
import { GLASS_SURFACE } from '../../lib/glass.js'
import Icon from '../../lib/icons.jsx'

const ITEMS = [
  { icon: 'profile', title: 'Personal Information', subtitle: 'Manage your personal details' },
  { icon: 'field', title: 'My Fields', subtitle: 'View and manage your fields' },
  { icon: 'leaf', title: 'My Crops', subtitle: 'See your current and past crops' },
  { icon: 'bell', title: 'Notifications', subtitle: 'Manage your notification preferences' },
  { icon: 'shield', title: 'Privacy & Security', subtitle: 'Manage privacy and security settings' },
  { icon: 'help', title: 'Help & Support', subtitle: 'Get help and support' },
  { icon: 'settings', title: 'Settings', subtitle: 'Manage app settings' },
]

export default function MenuList() {
  const navigate = useNavigate()

  return (
    <div className={`${GLASS_SURFACE} mx-4 rounded-2xl`}>
      {ITEMS.map((item, i) => (
        <button
          key={item.title}
          type="button"
          className={`flex w-full items-center gap-3 border-0 bg-transparent px-4 py-3 text-left ${
            i !== ITEMS.length - 1 ? 'border-b border-solid border-white/10' : ''
          }`}
        >
          <Icon name={item.icon} className="h-5 w-5 shrink-0 text-lime-200" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white">{item.title}</p>
            <p className="text-[11px] text-white/55">{item.subtitle}</p>
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
          <p className="text-sm font-semibold text-red-300">Log Out</p>
          <p className="text-[11px] text-white/55">Sign out from your account</p>
        </div>
        <Icon name="chevronRight" className="h-4 w-4 shrink-0 text-white/35" />
      </button>
    </div>
  )
}
