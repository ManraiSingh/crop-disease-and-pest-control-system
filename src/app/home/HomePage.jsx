import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { loadProfile } from '../lib/profile.js'
import { useLanguage } from '../../i18n/context.js'
import Icon from '../lib/icons.jsx'
import useForecast from '../lib/useForecast.js'
import { formatDaysWithUs, formatLabel, formatName } from '../profile/format.js'
import { SPRING } from '../../design/springs.js'
import MarketStrip from './components/MarketStrip.jsx'

/**
 * Home, as a bento grid.
 *
 * Each tile is one fact at one size, and size is the ranking: what a farmer most needs to act
 * on is the biggest tile, everything else is secondary by being smaller. That reads at a
 * glance in a way a scrolling list of equal cards never does.
 *
 * Every tile is a flat fill paired with its own ink token, so a tile can change colour between
 * themes without leaving its text behind.
 */

const DATE_LOCALES = { en: 'en-GB', hi: 'hi-IN', mr: 'mr-IN' }

function greetingKey() {
  const hour = new Date().getHours()
  if (hour < 12) return 'home.goodMorning'
  if (hour < 17) return 'home.goodAfternoon'
  return 'home.goodEvening'
}

/** One tile. `tone` names a fill/ink pair; nothing here picks a raw colour. */
function Tile({ tone = 'plain', span = 1, onClick, children, index = 0 }) {
  const Tag = onClick ? motion.button : motion.div

  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING.settle, delay: 0.05 * index }}
      whileTap={onClick ? { scale: 0.975 } : undefined}
      className={`relative flex flex-col justify-between rounded-[22px] p-3 text-left ${
        span === 2 ? 'col-span-2' : ''
      }`}
      style={{
        background: `var(--tile-${tone})`,
        color: `var(--on-tile-${tone})`,
        border: tone === 'plain' ? '1px solid var(--line)' : 'none',
      }}
    >
      {children}
    </Tag>
  )
}

/** The small uppercase line above a figure. */
function Caption({ children, dim = 0.82 }) {
  return (
    <span className="t-caption block" style={{ opacity: dim }}>
      {children}
    </span>
  )
}

/** The hero's conditions index: three live readings the grid below does not already show. */
const HERO_METRICS = {
  humidity: 'home.humidity',
  clouds: 'home.clouds',
  uvIndex: 'home.uvIndex',
}

function IndexCell({ label, value, first }) {
  return (
    <div className={first ? '' : 'border-l pl-3'} style={first ? undefined : { borderColor: 'var(--line)' }}>
      <p className="t-caption truncate" style={{ color: 'var(--on-bg-soft)' }}>
        {label}
      </p>
      <p className="t-num mt-1 text-[19px] leading-none" style={{ color: 'var(--on-bg)' }}>
        {value}
      </p>
    </div>
  )
}

export default function HomePage() {
  const profile = loadProfile()
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const weather = useForecast(profile?.location)

  const today = new Date().toLocaleDateString(DATE_LOCALES[language] ?? 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  const name = formatName(profile?.name) ?? t('app.farmer')
  const place = profile?.location?.place
  const cropName = profile?.crop ? t(`crops.${profile.crop}`) : t('crops.tomato')
  const fieldName = profile?.fieldName ? formatLabel(profile.fieldName) : 'North Field'

  /* Soil moisture tracks humidity, so it is derived from the live forecast and labelled. */
  const humidity = Number.parseInt(weather.metrics?.humidity, 10)
  const moisture = Number.isFinite(humidity) ? Math.max(12, Math.round(humidity * 0.45)) : null

  return (
    <div className="screen-scroll h-full overflow-y-auto">
      {/*
        HERO.

        A masthead, not a splash: the date and conditions, who this is for, and today's three
        readings — then straight into the grid. There is no big centrepiece by design. Every
        version that had one (a photo in a box, a large crop drawing) turned the top of the
        screen into decoration the farmer had to scroll past to reach anything actionable.

        Because nothing here needs filling, the section takes its own height rather than a
        share of the screen, which is what brings the grid up into view.
      */}
      <section
        className="flex flex-col px-5"
        style={{
          color: 'var(--on-bg)',
          /* The name's `cqi` type measures against the nearest container, which has to be this
             padded section — against the unpadded scroller it is sized for 40px more width
             than it gets, and a long name overflows. */
          containerType: 'inline-size',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-baseline justify-between gap-3 border-b pt-1 pb-3"
          style={{ borderColor: 'var(--line)' }}
        >
          <p className="t-caption" style={{ color: 'var(--on-bg-soft)' }}>
            {today}
          </p>
          <p className="t-caption" style={{ color: 'var(--on-bg-soft)' }}>
            {weather.temperature != null ? `${weather.temperature}°` : '—'}
            {weather.condition ? ` · ${weather.condition}` : ''}
          </p>
        </motion.div>

        <div className="pt-3">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="t-caption"
            style={{ color: 'var(--on-bg-soft)' }}
          >
            {t(greetingKey())}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="t-hero mt-1.5"
          >
            {name}.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.22 }}
            className="t-label mt-1.5 text-[13px] leading-[1.45]"
            style={{ color: 'var(--on-bg-mid)' }}
          >
            {t('home.heroTagline')}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.24 }}
          className="mt-3 grid grid-cols-3 gap-3"
        >
          {Object.entries(HERO_METRICS).map(([key, labelKey], i) => {
            const raw = weather.metrics?.[key]
            return (
              <IndexCell
                key={key}
                first={i === 0}
                label={t(labelKey)}
                /* Banded readings (UV) arrive as translation keys; plain ones pass through. */
                value={typeof raw === 'string' && raw.includes('.') ? t(raw) : (raw ?? '—')}
              />
            )
          })}
        </motion.div>

      </section>

      {/* ---------- BELOW THE FOLD ---------- */}
      <div className="px-4 pt-4 pb-4">
        {/* ---------- THE GRID ---------- */}
        <div className="grid grid-cols-2 gap-2">
          {/* The primary action leads: scanning a leaf is what the farmer opens this app to
              do, so it takes the widest tile rather than a reading they only need to read. */}
          <Tile tone="warm" span={2} index={0} onClick={() => navigate('/scan')}>
            <div className="flex items-start justify-between">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full"
                style={{ background: 'rgba(0,0,0,0.14)' }}
              >
                <Icon name="camera" className="h-[22px] w-[22px]" />
              </span>
              <Icon name="chevronRight" className="h-4 w-4" style={{ opacity: 0.82 }} />
            </div>
            <p className="t-display mt-4 text-[30px] leading-none">{t('home.scanCta')}</p>
            <p className="t-label mt-2 text-[13px]" style={{ opacity: 0.82 }}>
              {t('home.scannerBadge')}
            </p>
          </Tile>

          {/* soil moisture — derived from the live forecast */}
          <Tile tone="plain" index={1} onClick={() => navigate('/advisory')}>
            <Caption dim={0.82}>{t('home.moisture')}</Caption>
            <p className="t-num mt-2 text-[34px] leading-none">
              {moisture != null ? `${moisture}%` : '—'}
            </p>
            <p className="t-label mt-1.5 text-[12px]" style={{ opacity: 0.82 }}>
              {t('home.estimated')}
            </p>
          </Tile>

          {/* crop health takes the slot the scan tile used to hold */}
          <Tile tone="hero" index={2} onClick={() => navigate('/advisory')}>
            <Caption>{t('home.cropHealth')}</Caption>
            <p className="t-num mt-2 text-[34px] leading-none">82%</p>
            <p className="t-label mt-1.5 text-[12px]" style={{ opacity: 0.82 }}>
              {cropName} · {fieldName}
            </p>
          </Tile>

          {/* the wide message tile — the detection */}
          <Tile tone="alarm" span={2} index={3} onClick={() => navigate('/advisory')}>
            <div className="flex items-start justify-between gap-3">
              <Caption>{t('home.diseaseDetected')}</Caption>
              <span
                className="t-caption shrink-0 rounded-full px-2 py-0.5"
                style={{ background: 'rgba(0,0,0,0.22)' }}
              >
                {t('common.medium')}
              </span>
            </div>
            <p className="t-display mt-2 text-[26px]">{t('home.diseaseName')}</p>
            <p className="t-label mt-1.5 text-[13px]" style={{ opacity: 0.82 }}>
              18% {t('home.fieldAffected')} · {t('home.viewTreatment')}
            </p>
          </Tile>

          {/* weather — live */}
          <Tile tone="cool" index={4} onClick={() => navigate('/advisory')}>
            <Caption dim={0.82}>{t('home.weather')}</Caption>
            <p className="t-num mt-2 text-[34px] leading-none">
              {weather.temperature != null ? `${weather.temperature}°` : '—'}
            </p>
            <p className="t-label mt-1.5 text-[12px]" style={{ opacity: 0.82 }}>
              {weather.condition || '—'}
            </p>
          </Tile>

          {/* days farming with us — real, from onboarding */}
          <Tile tone="deep" index={5} onClick={() => navigate('/profile')}>
            <Caption>{t('profile.daysWithUs')}</Caption>
            <p className="t-num mt-2 text-[34px] leading-none">
              {formatDaysWithUs(profile?.joinedAt)}
            </p>
            <p className="t-label mt-1.5 text-[12px]" style={{ opacity: 0.82 }}>
              {t('home.farmOverview')}
            </p>
          </Tile>
        </div>

        {/* The seed market. It sits below the grid rather than inside it, so the hero and the
            grid still land inside one screen and this is the first thing a scroll reveals. */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING.settle, delay: 0.38 }}
        >
          <MarketStrip profile={profile} />
        </motion.div>
      </div>
    </div>
  )
}
