import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import LanguagePicker from '../../i18n/LanguagePicker.jsx'
import { useT } from '../../i18n/context.js'
import Icon from '../lib/icons.jsx'
import { loadProfile } from '../lib/profile.js'
import { lastSeenAt, markAlertsSeen, subscribeAlerts } from '../../shared/services/alerts.js'
import { FrameContext } from '../lib/frame.js'
import { ThemeContext, readTheme, storeTheme } from '../lib/theme.js'
import useForecast from '../lib/useForecast.js'
import { timeAgo } from '../community/timeAgo.js'
import WeatherCard from '../home/components/WeatherCard.jsx'
import WeatherMetrics from '../home/components/WeatherMetrics.jsx'
import { formatName } from '../profile/format.js'
import { PageTransition, Pressable } from '../../design/motion.jsx'
import { SPRING } from '../../design/springs.js'

// `primary` is the raised centre tab, not a particular destination — Scan itself
// still opens from the Scan Crop card on Home.
const NAV = [
  { key: 'home', tKey: 'nav.home', icon: 'home', to: '/home' },
  { key: 'community', tKey: 'nav.community', icon: 'community', to: '/community' },
  { key: 'advisory', tKey: 'nav.advisory', icon: 'leaf', to: '/advisory', primary: true },
  { key: 'history', tKey: 'nav.history', icon: 'history', to: '/history' },
  { key: 'me', tKey: 'nav.me', icon: 'profile', to: '/profile' },
]

/** Home identifies the farmer; every other tab identifies itself. */
const PAGE_TITLES = {
  '/community': 'community.title',
  '/advisory': 'advisory.title',
  '/scan': 'scan.title',
  '/history': 'history.title',
  '/profile': 'drawer.profile',
}

const NOTIFICATIONS = [
  { key: 'disease', title: 'notif.diseaseTitle', body: 'notif.diseaseBody', time: 'notif.diseaseTime' },
  { key: 'weather', title: 'notif.weatherTitle', body: 'notif.weatherBody', time: 'notif.weatherTime' },
  { key: 'follow', title: 'notif.followTitle', body: 'notif.followBody', time: 'notif.followTime' },
]

/** Header control — a hairline outline on paper, not a filled chip. */
const CTRL = 'flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs'
const ctrlStyle = () => ({
  border: '1px solid var(--line)',
  background: 'var(--surface)',
  color: 'var(--ink)',
  fontFamily: 'var(--font)',
  fontWeight: 500,
})

/** The sprout mark — thin stroke, the way the reference draws its logo. */
function Mark({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M12 21V11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M12 12C12 12 5.5 12 5.5 6C11 5 12 8.5 12 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 13C12 13 18.5 12.5 18.5 7C13 6.5 12 9.5 12 13Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * The app frame.
 *
 * Paper ground, no photograph, no glass. Everything that used to be a translucent pane is now
 * either the paper itself or a solid card in the deck — which is what lets the lime/green/black
 * cards carry the identity instead of competing with a background.
 *
 * The dock floats free of the screen edge: a pill with the centre tab lifted into its own
 * circle, so the primary action is reachable by thumb without hunting.
 */
export default function AppShell() {
  // Only one header panel is open at a time, so opening one closes the other.
  const [panel, setPanel] = useState(null)
  const profile = loadProfile()
  const weather = useForecast(profile?.location)

  /*
    Field alerts raised by an agriculture officer for this farmer's taluka. They
    stream in, so an alert sent from the portal appears without a refresh.
  */
  const [alerts, setAlerts] = useState([])
  const [seenAt, setSeenAt] = useState(lastSeenAt)

  /* Light / dark for the in-app screens; remembered per device. */
  const [theme, setTheme] = useState(readTheme)

  /*
    The frame node itself, so a screen deep inside a card can portal a full-screen
    sheet out to here. Held as state rather than a ref because consumers have to re-render
    once the node exists.
  */
  const [frame, setFrame] = useState(null)

  function toggleTheme() {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      storeTheme(next)
      return next
    })
  }

  const light = theme === 'light'

  const district = profile?.district
  const taluka = profile?.taluka

  useEffect(() => subscribeAlerts({ district, taluka }, setAlerts), [district, taluka])

  const unreadAlerts = alerts.filter((alert) => alert.createdAt > seenAt).length

  const togglePanel = (name) => setPanel((open) => (open === name ? null : name))

  function openNotifications() {
    togglePanel('notifications')

    // Opening the panel is what marks them read.
    if (panel !== 'notifications' && alerts.length) {
      markAlertsSeen(alerts[0].createdAt)
      setSeenAt(alerts[0].createdAt)
    }
  }

  const { pathname } = useLocation()
  const t = useT()
  // Nested routes (a single community post) belong to their tab's title.
  const pageTitleKey =
    PAGE_TITLES[pathname] ??
    (pathname.startsWith('/community/') ? PAGE_TITLES['/community'] : undefined)

  // Advisory and the seed market render their own masthead, so the header keeps only the controls.
  const inMarket = pathname.startsWith('/seeds')
  const ownsHeader = pathname.startsWith('/advisory') || inMarket

  // Close an open panel when the tab changes — adjusted during render rather than in an
  // effect, so the stale panel never paints over the new screen.
  const [panelPath, setPanelPath] = useState(pathname)
  if (panelPath !== pathname) {
    setPanelPath(pathname)
    setPanel(null)
  }

  const sheet = {
    background: 'var(--surface)',
    border: '1px solid var(--line)',
    boxShadow: 'var(--lift-md)',
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        ref={setFrame}
        data-theme={theme}
        className={`relative flex h-full w-full flex-col overflow-hidden ${inMarket ? 'mk-page' : ''}`}
        style={
          inMarket
            ? undefined
            : {
                background: 'var(--ground)',
                fontFamily: 'var(--font)',
              }
        }
      >
        {inMarket && <div aria-hidden="true" className="mk-page pointer-events-none absolute inset-0" />}

        <header className="relative z-40 flex items-center justify-between gap-3 px-5 pt-9 pb-2">
          {ownsHeader ? (
            <span />
          ) : pageTitleKey ? (
            <motion.h1
              key={pageTitleKey}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={SPRING.settle}
              className="t-display min-w-0 truncate text-[34px]"
              style={{ color: 'var(--ink)' }}
            >
              {t(pageTitleKey)}
            </motion.h1>
          ) : (
            <motion.span
              className="flex min-w-0 items-center gap-2"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={SPRING.settle}
            >
              <Mark className="h-6 w-6 shrink-0" style={{ color: 'var(--ink)' }} />
              <span
                className="t-label truncate text-[13px]"
                style={{ color: 'var(--ink-mid)' }}
              >
                {formatName(profile?.name) ?? t('app.farmer')}
              </span>
            </motion.span>
          )}

          <span className="flex shrink-0 items-center gap-1.5">
            {weather.ready && (
              <Pressable
                type="button"
                onClick={() => togglePanel('weather')}
                aria-expanded={panel === 'weather'}
                aria-label={`${t('home.weather')}, ${weather.temperature}°C`}
                className={CTRL}
                style={ctrlStyle()}
              >
                <Icon name={weather.icon} className="h-4 w-4" />
                {weather.temperature}°
              </Pressable>
            )}

            <LanguagePicker triggerClassName={CTRL} triggerStyle={ctrlStyle()} />

            <Pressable
              type="button"
              onClick={toggleTheme}
              aria-label={t(light ? 'app.darkMode' : 'app.lightMode')}
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={ctrlStyle()}
            >
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={SPRING.snap}
              >
                <Icon name={light ? 'moon' : 'sun'} className="h-4 w-4" />
              </motion.span>
            </Pressable>

            <Pressable
              type="button"
              onClick={openNotifications}
              aria-expanded={panel === 'notifications'}
              aria-label={t('app.notifications')}
              className="relative flex h-8 w-8 items-center justify-center rounded-full"
              style={ctrlStyle()}
            >
              <Icon name="bell" className="h-4 w-4" />
              {unreadAlerts > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={SPRING.snap}
                  className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-semibold"
                  style={{ background: 'var(--alarm)', color: 'var(--on-pitch)' }}
                >
                  {unreadAlerts}
                </motion.span>
              )}
            </Pressable>
          </span>
        </header>

        <AnimatePresence>
          {panel === 'weather' && (
            <>
              <motion.button
                type="button"
                aria-label="Close weather"
                onClick={() => setPanel(null)}
                className="absolute inset-0 z-30 border-0"
                style={{ background: 'rgba(10, 14, 10, 0.4)', backdropFilter: 'blur(3px)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                className="absolute top-[84px] right-4 left-4 z-50"
                initial={{ opacity: 0, y: -12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={SPRING.settle}
              >
                <div className="rounded-[26px] p-4" style={sheet}>
                  <WeatherCard
                    surface="none"
                    temperatures={weather.temperatures}
                    activeIndex={weather.activeIndex}
                    timeLabels={weather.timeLabels}
                    condition={weather.condition}
                    selectedDay={weather.selectedDay}
                    onDayChange={weather.onDayChange}
                    days={weather.days}
                    place={profile?.location?.place}
                  />
                  <div className="mt-4 border-t pt-4" style={{ borderColor: 'var(--line)' }}>
                    <WeatherMetrics surface="none" metrics={weather.metrics} />
                  </div>
                </div>
              </motion.div>
            </>
          )}

          {panel === 'notifications' && (
            <>
              <motion.button
                type="button"
                aria-label="Close notifications"
                onClick={() => setPanel(null)}
                className="absolute inset-0 z-30 border-0"
                style={{ background: 'rgba(10, 14, 10, 0.4)', backdropFilter: 'blur(3px)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                className="absolute top-[84px] right-4 z-50 w-[17rem]"
                initial={{ opacity: 0, y: -10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={SPRING.settle}
                style={{ transformOrigin: 'top right' }}
              >
                <div className="overflow-hidden rounded-[22px]" style={sheet}>
                  <div className="t-title px-4 py-3 text-[14px]" style={{ color: 'var(--ink)' }}>
                    {t('app.notifications')}
                  </div>

                  {alerts.map((alert, i) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...SPRING.settle, delay: 0.04 * i }}
                      className="border-t px-4 py-2.5"
                      style={{
                        borderColor: 'var(--line)',
                        background: 'color-mix(in srgb, var(--alarm) 8%, transparent)',
                      }}
                    >
                      <p className="t-label flex items-center gap-1.5 text-xs" style={{ color: 'var(--ink)' }}>
                        <Icon name="warning" className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--alarm)' }} />
                        {t('notif.alertTitle', { disease: alert.disease })}
                      </p>
                      <p className="mt-0.5 text-[11px]" style={{ color: 'var(--ink-mid)' }}>
                        {t('notif.alertBody', { taluka: alert.taluka, farm: alert.sourceFarm || '—' })}
                      </p>
                      <p className="mt-1 text-[10px]" style={{ color: 'var(--ink-soft)' }}>
                        {alert.issuedBy} · {timeAgo(alert.createdAt, t)}
                      </p>
                    </motion.div>
                  ))}

                  {NOTIFICATIONS.map((n, i) => (
                    <motion.div
                      key={n.key}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...SPRING.settle, delay: 0.04 * (alerts.length + i) }}
                      className="border-t px-4 py-2.5"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      <p className="t-label text-xs" style={{ color: 'var(--ink)' }}>
                        {t(n.title)}
                      </p>
                      <p className="mt-0.5 text-[11px]" style={{ color: 'var(--ink-mid)' }}>
                        {t(n.body)}
                      </p>
                      <p className="mt-1 text-[10px]" style={{ color: 'var(--ink-soft)' }}>
                        {t(n.time)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="relative z-10 flex-1 overflow-hidden">
          <FrameContext.Provider value={frame}>
            <PageTransition routeKey={pathname} className="h-full">
              <Outlet />
            </PageTransition>
          </FrameContext.Provider>
        </div>

        {/* The dock. Floats clear of the edges; the centre tab is lifted into its own
            circle so the primary action sits under the thumb. */}
        <nav
          aria-label="Main navigation"
          className="relative z-20 mx-auto mb-4 flex items-center gap-1 rounded-full px-2 py-2"
          style={{ background: 'var(--pitch)', boxShadow: 'var(--lift-md)' }}
        >
          {NAV.map(({ key, tKey, icon, to, primary }) => (
            <NavLink key={key} to={to} aria-label={t(tKey)} className="relative block">
              {({ isActive }) =>
                primary ? (
                  <motion.span
                    className="mx-1 flex h-[52px] w-[52px] items-center justify-center rounded-full"
                    style={{
                      // The dock is always pitch, in both themes, so this circle takes a
                      // fixed light value rather than --paper — which goes near-black in
                      // dark mode and made the button disappear into the bar.
                      // The dock sits on --pitch, so its raised circle is the inverse
                      // of that surface — not --ink, which tracks the page and would
                      // put a near-white glyph on a near-white circle in dark mode.
                      background: 'var(--on-pitch)',
                      color: 'var(--pitch)',
                    }}
                    animate={{ scale: isActive ? 1.04 : 1 }}
                    whileTap={{ scale: 0.92 }}
                    transition={SPRING.snap}
                  >
                    <Icon name={icon} className="h-[22px] w-[22px]" />
                  </motion.span>
                ) : (
                  <motion.span
                    className="relative flex h-[46px] w-[46px] items-center justify-center rounded-full"
                    whileTap={{ scale: 0.9 }}
                    transition={SPRING.snap}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="dock-active"
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'var(--on-pitch-line)' }}
                        transition={SPRING.settle}
                      />
                    )}
                    <Icon
                      name={icon}
                      className="relative h-[20px] w-[20px]"
                      style={{ color: isActive ? 'var(--on-pitch)' : 'var(--on-pitch-soft)' }}
                    />
                  </motion.span>
                )
              }
            </NavLink>
          ))}
        </nav>
      </div>
    </ThemeContext.Provider>
  )
}
