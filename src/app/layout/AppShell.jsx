import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { APP_BACKGROUND, GLASS_SHEEN, GLASS_SURFACE_STRONG } from '../lib/glass.js'
import Icon from '../lib/icons.jsx'
import { loadProfile } from '../lib/profile.js'
import useForecast from '../lib/useForecast.js'
import WeatherCard from '../home/components/WeatherCard.jsx'
import WeatherMetrics from '../home/components/WeatherMetrics.jsx'
import avatar from '../profile/assets/avatar.jpg'
import { formatName } from '../profile/format.js'

const NAV = [
  { label: 'Home', icon: 'home', to: '/home' },
  { label: 'Advisory', icon: 'leaf', to: '/advisory' },
  { label: 'Scan', icon: 'scan', to: '/scan' },
  { label: 'History', icon: 'history', to: '/history' },
  { label: 'Me', icon: 'profile', to: '/profile' },
]

/** Home identifies the farmer; every other tab identifies itself. */
const PAGE_TITLES = {
  '/advisory': 'Advisory',
  '/scan': 'Scan Crop',
  '/history': 'History',
  '/profile': 'Profile',
}

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

const NOTIFICATIONS = [
  { title: 'Disease alert: Early blight', body: 'Detected on North Field — 18% affected.', time: '2h ago' },
  { title: 'Weather update', body: 'Rain expected tomorrow — check irrigation plan.', time: '5h ago' },
  { title: 'Follow-up reminder', body: 'How is North Field looking after treatment?', time: '1d ago' },
]

/**
 * The app frame: one full-bleed farm photo behind every tab, a transparent header, and the
 * floating glass tab bar. Menu items that used to live in a side drawer now live on the
 * Profile tab, so the header stays as light as the design.
 */
export default function AppShell() {
  // Only one header panel is open at a time, so opening one closes the other.
  const [panel, setPanel] = useState(null)
  const profile = loadProfile()
  const weather = useForecast(profile?.location)

  const togglePanel = (name) => setPanel((open) => (open === name ? null : name))
  const { pathname } = useLocation()
  const pageTitle = PAGE_TITLES[pathname]

  // Close an open panel when the tab changes — adjusted during render rather than in an
  // effect, so the stale panel never paints over the new screen.
  const [panelPath, setPanelPath] = useState(pathname)
  if (panelPath !== pathname) {
    setPanelPath(pathname)
    setPanel(null)
  }

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#16210e]">
      {/* Background photo + the wash that keeps white text readable over it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${APP_BACKGROUND}')` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,20,8,0.66)_0%,rgba(10,22,9,0.4)_26%,rgba(8,18,7,0.66)_70%,rgba(6,14,5,0.9)_100%)]"
      />

      <header className="relative z-40 flex items-center justify-between gap-3 px-4 pt-9 pb-3">
        {pageTitle ? (
          <h1 className="min-w-0 truncate text-xl font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            {pageTitle}
          </h1>
        ) : (
          <span className="flex min-w-0 items-center gap-2.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-solid border-white/25 bg-white">
              <img src={avatar} alt="" className="h-full w-full scale-[1.45] object-cover object-center" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[15px] leading-tight font-bold text-white">
                {formatName(profile?.name) ?? 'Farmer'}
              </span>
              <span className="block truncate text-[11px] text-white/75">{greeting()} 👋</span>
            </span>
          </span>
        )}

        <span className="flex shrink-0 items-center gap-1.5">
          {weather.ready && (
            <button
              type="button"
              onClick={() => togglePanel('weather')}
              aria-expanded={panel === 'weather'}
              aria-label={`Weather, ${weather.temperature} degrees Celsius`}
              className="flex items-center gap-1.5 rounded-full border border-solid border-white/20 bg-white/12 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md"
            >
              <Icon name={weather.icon} className="h-4 w-4" />
              {weather.temperature}°C
            </button>
          )}

          <button
            type="button"
            className="rounded-full border border-solid border-white/20 bg-white/12 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md"
          >
            EN ⌄
          </button>

          <button
            type="button"
            onClick={() => togglePanel('notifications')}
            aria-expanded={panel === 'notifications'}
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-solid border-white/15 bg-white/12 text-white backdrop-blur-md"
          >
            <Icon name="bell" className="h-[18px] w-[18px]" />
            <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-400 ring-2 ring-[#22301a]" />
          </button>
        </span>
      </header>

      {panel === 'weather' && (
        <>
          <button
            type="button"
            aria-label="Close weather"
            onClick={() => setPanel(null)}
            className="absolute inset-0 z-30 border-0 bg-black/30"
          />
          {/* Anchored under the header and near full width — the hourly chart needs the room.
              One frosted panel holds the chart and the metrics; the two render bare inside it,
              since nesting glass surfaces muddies both. */}
          <div className={`${GLASS_SURFACE_STRONG} absolute top-[88px] right-3 left-3 z-50 p-4`}>
            <span aria-hidden="true" className={GLASS_SHEEN} />
            <div className="relative">
              <WeatherCard
                surface="none"
                temperatures={weather.temperatures}
                activeIndex={weather.activeIndex}
                timeLabels={weather.timeLabels}
                condition={weather.condition}
                selectedDay={weather.selectedDay}
                onDayChange={weather.onDayChange}
                days={weather.days}
              />
              <div className="mt-4 border-t border-solid border-white/12 pt-4">
                <WeatherMetrics surface="none" metrics={weather.metrics} />
              </div>
            </div>
          </div>
        </>
      )}

      {panel === 'notifications' && (
        <>
          <button
            type="button"
            aria-label="Close notifications"
            onClick={() => setPanel(null)}
            className="absolute inset-0 z-30 border-0 bg-black/30"
          />
          <div className={`absolute top-[88px] right-4 z-50 w-64 ${GLASS_SURFACE_STRONG} rounded-2xl`}>
            <div className="border-b border-solid border-white/10 px-4 py-2.5 text-xs font-bold text-white">
              Notifications
            </div>
            {NOTIFICATIONS.map((n) => (
              <div key={n.title} className="border-b border-solid border-white/8 px-4 py-2.5 last:border-0">
                <p className="text-xs font-semibold text-white">{n.title}</p>
                <p className="mt-0.5 text-[11px] text-white/65">{n.body}</p>
                <p className="mt-1 text-[10px] text-white/45">{n.time}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="relative z-10 flex-1 overflow-hidden">
        <Outlet context={{ weather }} />
      </div>

      <nav
        aria-label="Main navigation"
        className="relative z-20 mx-3 mb-3 flex items-end justify-around rounded-full border border-solid border-white/12 bg-[#12200c]/70 px-3 pt-2 pb-2 shadow-[0_16px_36px_rgba(4,14,6,0.5)] backdrop-blur-2xl"
      >
        {NAV.map(({ label, icon, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 border-0 bg-transparent ${
                isActive ? 'text-white' : 'text-white/45'
              }`
            }
          >
            {label === 'Scan' ? (
              <span className="-mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-lime-400 text-[#12200c] shadow-[0_0_0_5px_rgba(18,32,12,0.75),0_10px_24px_rgba(163,230,53,0.5)]">
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
