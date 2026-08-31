import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import Icon from '../lib/icons.jsx'
import { loadProfile } from '../lib/profile.js'

const NAV = [
  { label: 'Home', icon: 'home', to: '/home' },
  { label: 'Advisory', icon: 'leaf', to: '/advisory' },
  { label: 'Scan', icon: 'scan', to: '/scan' },
  { label: 'History', icon: 'history', to: '/history' },
  { label: 'Me', icon: 'profile', to: '/profile' },
]

const NOTIFICATIONS = [
  { title: 'Disease alert: Early blight', body: 'Detected on North Field — 18% affected.', time: '2h ago' },
  { title: 'Weather update', body: 'Rain expected tomorrow — check irrigation plan.', time: '5h ago' },
  { title: 'Follow-up reminder', body: 'How is North Field looking after treatment?', time: '1d ago' },
]

const DRAWER_ITEMS = [
  { label: 'Profile', icon: 'profile', to: '/profile' },
  { label: 'My Farms', icon: 'field', to: '/profile' },
  { label: 'Language', icon: 'globe', to: '/profile' },
  { label: 'Help & Support', icon: 'help', to: '/profile' },
  { label: 'Settings', icon: 'settings', to: '/profile' },
]

export default function AppShell() {
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const profile = loadProfile()

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-white">
      <header className="relative z-30 flex items-center justify-between border-b border-gray-100 px-4 pt-8 pb-3">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          className="flex h-8 w-8 items-center justify-center border-0 bg-transparent text-gray-700"
        >
          <Icon name="menu" className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="bg-sky flex h-8 w-8 items-center justify-center rounded-lg">
            <Icon name="leaf" className="text-leaf h-4 w-4" />
          </span>
          <div className="text-left">
            <p className="text-leaf-dark text-xs leading-tight font-bold">Farmer's Companion</p>
            <p className="text-[9px] text-gray-500">Smarter Farming, Better Tomorrow</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setNotifOpen((open) => !open)}
          aria-label="Notifications"
          className="relative flex h-8 w-8 items-center justify-center border-0 bg-transparent text-gray-700"
        >
          <Icon name="bell" className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
        </button>
      </header>

      {notifOpen && (
        <>
          <button
            type="button"
            aria-label="Close notifications"
            onClick={() => setNotifOpen(false)}
            className="absolute inset-0 z-30 border-0 bg-black/20"
          />
          <div className="absolute top-20 right-4 z-40 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
            <div className="border-b border-gray-100 px-4 py-2 text-xs font-bold text-gray-700">
              Notifications
            </div>
            {NOTIFICATIONS.map((n) => (
              <div key={n.title} className="border-b border-gray-50 px-4 py-2.5 last:border-0">
                <p className="text-xs font-semibold text-black">{n.title}</p>
                <p className="mt-0.5 text-[11px] text-gray-500">{n.body}</p>
                <p className="mt-1 text-[10px] text-gray-400">{n.time}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {drawerOpen && (
        <div className="absolute inset-0 z-40 flex">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 border-0 bg-black/30"
          />
          <div className="relative z-10 flex h-full w-64 flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 pt-8 pb-4">
              <div>
                <p className="text-leaf-dark text-sm font-bold">
                  {profile?.name || 'Farmer'}
                </p>
                <p className="text-[10px] text-gray-500">
                  {profile?.fieldName ? `${profile.fieldName}` : 'No field added yet'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close"
                className="flex h-7 w-7 items-center justify-center border-0 bg-transparent text-gray-500"
              >
                <Icon name="x" className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col py-2">
              {DRAWER_ITEMS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false)
                    navigate(item.to)
                  }}
                  className="flex items-center gap-3 border-0 bg-transparent px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Icon name={item.icon} className="h-[18px] w-[18px] text-gray-500" />
                  <span className="flex-1">{item.label}</span>
                  <Icon name="chevronRight" className="h-3.5 w-3.5 text-gray-300" />
                </button>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => {
                setDrawerOpen(false)
                navigate('/')
              }}
              className="flex items-center gap-3 border-0 border-t border-gray-100 bg-transparent px-4 py-3 text-left text-sm text-red-500"
            >
              <Icon name="logout" className="h-[18px] w-[18px]" />
              Log out
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>

      <nav
        aria-label="Main navigation"
        className="relative z-10 flex items-end justify-around rounded-t-[28px] bg-white px-3 pt-2 pb-4 shadow-[0_-4px_18px_rgba(0,0,0,0.06)]"
      >
        {NAV.map(({ label, icon, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 border-0 bg-transparent ${
                isActive ? 'text-leaf-dark' : 'text-gray-400'
              }`
            }
          >
            {label === 'Scan' ? (
              <span className="bg-leaf ring-white -mt-8 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg ring-4">
                <Icon name={icon} className="h-6 w-6" />
              </span>
            ) : (
              <span className="flex h-6 w-6 items-center justify-center">
                <Icon name={icon} className="h-[18px] w-[18px]" />
              </span>
            )}
            <small className="text-[9px] font-semibold">{label}</small>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
