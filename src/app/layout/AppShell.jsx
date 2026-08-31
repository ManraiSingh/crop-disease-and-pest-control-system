import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useT } from '../../i18n/context.js'
import Icon from '../lib/icons.jsx'
import { loadProfile } from '../lib/profile.js'

const NAV = [
  { key: 'home', tKey: 'nav.home', icon: 'home', to: '/home' },
  { key: 'advisory', tKey: 'nav.advisory', icon: 'leaf', to: '/advisory' },
  { key: 'scan', tKey: 'nav.scan', icon: 'scan', to: '/scan' },
  { key: 'history', tKey: 'nav.history', icon: 'history', to: '/history' },
  { key: 'me', tKey: 'nav.me', icon: 'profile', to: '/profile' },
]

const NOTIFICATIONS = [
  { key: 'disease', title: 'notif.diseaseTitle', body: 'notif.diseaseBody', time: 'notif.diseaseTime' },
  { key: 'weather', title: 'notif.weatherTitle', body: 'notif.weatherBody', time: 'notif.weatherTime' },
  { key: 'follow', title: 'notif.followTitle', body: 'notif.followBody', time: 'notif.followTime' },
]

const DRAWER_ITEMS = [
  { key: 'profile', tKey: 'drawer.profile', icon: 'profile', to: '/profile' },
  { key: 'farms', tKey: 'drawer.myFarms', icon: 'field', to: '/profile' },
  { key: 'language', tKey: 'drawer.language', icon: 'globe', to: '/profile' },
  { key: 'help', tKey: 'drawer.help', icon: 'help', to: '/profile' },
  { key: 'settings', tKey: 'drawer.settings', icon: 'settings', to: '/profile' },
]

export default function AppShell() {
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const profile = loadProfile()
  const t = useT()

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-white">
      <header className="relative z-30 flex items-center justify-between border-b border-gray-100 px-4 pt-8 pb-3">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label={t('app.openMenu')}
          className="flex h-8 w-8 items-center justify-center border-0 bg-transparent text-gray-700"
        >
          <Icon name="menu" className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="bg-sky flex h-8 w-8 items-center justify-center rounded-lg">
            <Icon name="leaf" className="text-leaf h-4 w-4" />
          </span>
          <div className="text-left">
            <p className="text-leaf-dark text-xs leading-tight font-bold">{t('app.name')}</p>
            <p className="text-[9px] text-gray-500">{t('app.tagline')}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setNotifOpen((open) => !open)}
          aria-label={t('app.notifications')}
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
              {t('app.notifications')}
            </div>
            {NOTIFICATIONS.map((n) => (
              <div key={n.key} className="border-b border-gray-50 px-4 py-2.5 last:border-0">
                <p className="text-xs font-semibold text-black">{t(n.title)}</p>
                <p className="mt-0.5 text-[11px] text-gray-500">{t(n.body)}</p>
                <p className="mt-1 text-[10px] text-gray-400">{t(n.time)}</p>
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
                  {profile?.name || t('app.farmer')}
                </p>
                <p className="text-[10px] text-gray-500">
                  {profile?.fieldName ? `${profile.fieldName}` : t('app.noField')}
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
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false)
                    navigate(item.to)
                  }}
                  className="flex items-center gap-3 border-0 bg-transparent px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Icon name={item.icon} className="h-[18px] w-[18px] text-gray-500" />
                  <span className="flex-1">{t(item.tKey)}</span>
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
              {t('app.logOut')}
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
        {NAV.map(({ key, tKey, icon, to }) => (
          <NavLink
            key={key}
            to={to}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 border-0 bg-transparent ${
                isActive ? 'text-leaf-dark' : 'text-gray-400'
              }`
            }
          >
            {key === 'scan' ? (
              <span className="bg-leaf ring-white -mt-8 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg ring-4">
                <Icon name={icon} className="h-6 w-6" />
              </span>
            ) : (
              <span className="flex h-6 w-6 items-center justify-center">
                <Icon name={icon} className="h-[18px] w-[18px]" />
              </span>
            )}
            <small className="text-[9px] font-semibold">{t(tKey)}</small>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
