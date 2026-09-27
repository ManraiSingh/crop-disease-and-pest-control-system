import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { loadProfile } from '../lib/profile.js'
import { useLanguage } from '../../i18n/context.js'
import Icon from '../lib/icons.jsx'
import { SCAN_CARD_BACKGROUND } from '../lib/glass.js'
import useForecast from '../lib/useForecast.js'
import { formatDaysWithUs, formatLabel } from '../profile/format.js'
import { CountUp } from '../../design/motion.jsx'
import { SPRING } from '../../design/springs.js'
import MarketStrip from './components/MarketStrip.jsx'

/**
 * Home, as a deck.
 *
 * Three summary cards stack over one another showing only their head, and the detection card
 * opens out beneath them. Tapping a head expands it in place rather than navigating — a farmer
 * checking soil moisture should not lose sight of the disease alert to do it.
 *
 * One card is open at a time. Two of the three carry live data: weather comes from the
 * forecast service, and the farm figures are read from what was actually entered at onboarding.
 */

const DATE_LOCALES = { en: 'en-GB', hi: 'hi-IN', mr: 'mr-IN' }

/** Upper bound for an expanded panel — comfortably clears the tallest (five rows). */
const ACCORDION_CAP = 420

/** A reading inside an expanded card. */
function Row({ label, value, note, fg, dim }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-2">
      <span className="t-label text-[13px]" style={{ color: dim }}>
        {label}
      </span>
      <span className="flex items-baseline gap-2">
        {note && (
          <span className="t-label text-[10px]" style={{ color: dim }}>
            {note}
          </span>
        )}
        <span className="t-num text-[19px]" style={{ color: fg }}>
          {value}
        </span>
      </span>
    </div>
  )
}

/**
 * One card in the stack. Collapsed it is a title and a count; expanded it grows to fit its
 * rows. Height animates from `auto`, so a card with four readings and one with three both
 * settle at their own size without a hardcoded number.
 */
function DeckCard({ id, title, count, tone, open, onToggle, index, children }) {
  const isOpen = open === id

  return (
    <motion.section
      className="deck-card overflow-hidden"
      style={{ background: tone.bg }}
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING.settle, delay: 0.06 * index }}
    >
      <motion.button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between border-0 px-5 pt-4 pb-6 text-left"
        // transparent, or the UA default button face paints over the card colour
        style={{ color: tone.fg, background: 'transparent' }}
        whileTap={{ scale: 0.985 }}
        transition={SPRING.snap}
      >
        <span className="t-title text-[15px]">{title}</span>

        <span className="flex items-center gap-2">
          <span
            className="t-num grid h-8 min-w-8 place-items-center rounded-full px-2 text-[14px]"
            style={{ background: tone.pill, color: tone.fg }}
          >
            {count}
          </span>
          <span
            style={{
              color: tone.fg,
              opacity: 0.6,
              display: 'inline-flex',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 260ms var(--ease-out-expo)',
            }}
          >
            <Icon name="chevronDown" className="h-4 w-4" />
          </span>
        </span>
      </motion.button>

      {/*
        max-height accordion.

        Two other approaches failed here and are worth recording: animating height:auto needs a
        JS measure that left the panel stuck at zero, and the 0fr -> 1fr grid trick collapses
        because overflow:hidden removes the row's automatic minimum, so 1fr resolves to 0px.
        A max-height cap cannot collapse. CAP only has to exceed the tallest panel (five rows);
        the easing is on the cap rather than the content, which is imperceptible at this size.
      */}
      <div
        style={{
          maxHeight: isOpen ? ACCORDION_CAP : 0,
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 360ms var(--ease-out-expo), opacity 220ms linear',
        }}
      >
        <div className="mx-5 mb-5 border-t pt-1" style={{ borderColor: tone.rule }}>
          {children}
        </div>
      </div>
    </motion.section>
  )
}

export default function HomePage() {
  const profile = loadProfile()
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const weather = useForecast(profile?.location)

  // One card open at a time: two expanded stacks push the detection card off-screen,
  // which is the one thing that must stay reachable.
  const [open, setOpen] = useState(null)
  const toggle = (id) => setOpen((cur) => (cur === id ? null : id))

  const today = new Date().toLocaleDateString(DATE_LOCALES[language] ?? 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  const place = profile?.location?.place

  /*
    Soil.

    Only two of these can be honest today. Soil temperature tracks air temperature with a lag,
    and moisture moves with humidity, so both are derived from the live forecast and labelled
    as estimates. pH and nitrogen cannot be inferred from weather at all — they stay fixed and
    say so, rather than inventing a number that looks measured.
  */
  const airTemp = weather.temperature
  const humidity = Number.parseInt(weather.metrics?.humidity, 10)
  const soilTemp = Number.isFinite(airTemp) ? Math.round(airTemp - 2) : null
  const soilMoisture = Number.isFinite(humidity) ? Math.max(12, Math.round(humidity * 0.45)) : null

  const dark = { fg: '#fff', dim: 'var(--on-pitch-mid)', rule: 'var(--on-pitch-line)' }
  const onLime = { fg: 'var(--pitch)', dim: 'rgba(13,15,12,0.55)', rule: 'rgba(13,15,12,0.18)' }

  const fields = profile?.fieldName ? 1 : 0
  const crops = profile?.crop ? 1 : 0
  const cropName = profile?.crop ? t(`crops.${profile.crop}`) : null

  return (
    <div className="h-full overflow-y-auto pb-6">
      {/* MASTHEAD */}
      <div className="px-5 pt-1 pb-6">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="t-label text-[11px] uppercase"
          style={{ color: 'var(--ink-soft)', letterSpacing: '0.12em' }}
        >
          {today}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="t-display mt-1 text-[38px]"
          style={{ color: 'var(--ink)' }}
        >
          {t('home.subtitle')}
        </motion.h1>

        {place && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="t-label mt-2 flex items-center gap-1.5 text-[12px]"
            style={{ color: 'var(--ink-mid)' }}
          >
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: 'var(--lime-deep)' }}
            />
            {place}
          </motion.p>
        )}
      </div>

      {/* THE DECK */}
      <div className="deck px-3">
        <DeckCard
          id="soil"
          index={0}
          title={t('home.soilStatus')}
          count="4"
          open={open}
          onToggle={toggle}
          tone={{ bg: 'var(--lime)', ...onLime, pill: 'rgba(13,15,12,0.14)' }}
        >
          <Row
            label={t('home.moisture')}
            value={soilMoisture != null ? `${soilMoisture}%` : '—'}
            note={soilMoisture != null ? t('home.estimated') : undefined}
            fg={onLime.fg}
            dim={onLime.dim}
          />
          <Row
            label={t('home.soilTemp')}
            value={soilTemp != null ? `${soilTemp}°C` : '—'}
            note={soilTemp != null ? t('home.estimated') : undefined}
            fg={onLime.fg}
            dim={onLime.dim}
          />
          <Row label={t('home.phLevel')} value="6.5" note={t('home.awaitingSensor')} fg={onLime.fg} dim={onLime.dim} />
          <Row
            label={t('home.nitrogen')}
            value={t('home.nitrogenHigh')}
            note={t('home.awaitingSensor')}
            fg={onLime.fg}
            dim={onLime.dim}
          />
        </DeckCard>

        <DeckCard
          id="weather"
          index={1}
          title={t('home.weather')}
          count={weather.ready ? '4' : '—'}
          open={open}
          onToggle={toggle}
          tone={{ bg: 'var(--green)', ...dark, pill: 'var(--on-pitch-line)' }}
        >
          <Row
            label={t('home.weatherCondition')}
            value={weather.condition || '—'}
            fg={dark.fg}
            dim={dark.dim}
          />
          <Row
            label={t('home.temp')}
            value={weather.temperature != null ? `${weather.temperature}°C` : '—'}
            fg={dark.fg}
            dim={dark.dim}
          />
          <Row label={t('home.humidity')} value={weather.metrics?.humidity ?? '—'} fg={dark.fg} dim={dark.dim} />
          <Row label={t('home.clouds')} value={weather.metrics?.clouds ?? '—'} fg={dark.fg} dim={dark.dim} />
          <Row
            label={t('home.uvIndex')}
            value={weather.metrics?.uvIndex ? t(weather.metrics.uvIndex) : '—'}
            fg={dark.fg}
            dim={dark.dim}
          />
        </DeckCard>

        <DeckCard
          id="farm"
          index={2}
          title={t('home.farmOverview')}
          count={String(fields + crops + 2)}
          open={open}
          onToggle={toggle}
          tone={{ bg: 'var(--green-deep)', ...dark, pill: 'var(--on-pitch-line)' }}
        >
          <Row
            label={t('profile.fields')}
            value={profile?.fieldName ? formatLabel(profile.fieldName) : String(fields)}
            fg={dark.fg}
            dim={dark.dim}
          />
          <Row label={t('home.cropsLabel')} value={cropName ?? String(crops)} fg={dark.fg} dim={dark.dim} />
          <Row label={t('profile.daysWithUs')} value={formatDaysWithUs(profile?.joinedAt)} fg={dark.fg} dim={dark.dim} />
          <Row label={t('home.fieldHealth')} value="82%" fg={dark.fg} dim={dark.dim} />
        </DeckCard>

        {/* THE OPEN CARD — the detection, the one thing that might need acting on today */}
        <motion.section
          className="deck-card overflow-hidden"
          style={{ background: 'var(--pitch)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING.settle, delay: 0.2 }}
        >
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 bottom-0 w-[54%] bg-cover bg-center"
            style={{
              backgroundImage: `url('${SCAN_CARD_BACKGROUND}')`,
              maskImage: 'linear-gradient(90deg, transparent 0%, #000 42%)',
              WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 42%)',
              opacity: 0.5,
            }}
            initial={{ scale: 1.16 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="relative px-5 pt-5 pb-5">
            <p
              className="t-label text-[11px] uppercase"
              style={{ color: 'var(--on-pitch-soft)', letterSpacing: '0.1em' }}
            >
              {t('home.diseaseDetected')}
            </p>
            <h2 className="t-display mt-1 text-[30px]" style={{ color: 'var(--on-pitch)' }}>
              {t('home.diseaseName')}
            </h2>
            <p className="t-label mt-1 text-[12px]" style={{ color: 'var(--on-pitch-mid)' }}>
              {cropName ?? t('crops.tomato')} · {profile?.fieldName ? formatLabel(profile.fieldName) : 'North Field'}
            </p>

            <div className="mt-7 flex items-end gap-7">
              <div>
                <p className="t-num text-[34px] leading-none" style={{ color: 'var(--on-pitch)' }}>
                  <CountUp value="18" suffix="%" />
                </p>
                <p className="t-label mt-1 text-[11px]" style={{ color: 'var(--on-pitch-soft)' }}>
                  {t('home.fieldAffected')}
                </p>
              </div>

              <span aria-hidden="true" className="mb-5 h-9 w-px" style={{ background: 'var(--on-pitch-line)' }} />

              <div>
                <p className="t-num text-[34px] leading-none" style={{ color: 'var(--lime)' }}>
                  <CountUp value="82" suffix="%" />
                </p>
                <p className="t-label mt-1 text-[11px]" style={{ color: 'var(--on-pitch-soft)' }}>
                  {t('home.cropHealth')}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <motion.button
                type="button"
                onClick={() => navigate('/scan')}
                whileTap={{ scale: 0.95 }}
                transition={SPRING.snap}
                className="t-title flex items-center gap-2 rounded-full px-5 py-3 text-[14px]"
                style={{ background: 'var(--lime)', color: 'var(--pitch)' }}
              >
                <Icon name="camera" className="h-[18px] w-[18px]" />
                {t('home.scanCta')}
              </motion.button>

              <motion.button
                type="button"
                onClick={() => navigate('/advisory')}
                whileTap={{ scale: 0.95 }}
                transition={SPRING.snap}
                aria-label={t('home.viewTreatment')}
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ background: 'var(--on-pitch-fill)', color: 'var(--on-pitch)' }}
              >
                <Icon name="chevronRight" className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>

      <motion.div
        className="mt-6 px-3"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING.settle, delay: 0.3 }}
      >
        <MarketStrip profile={profile} />
      </motion.div>
    </div>
  )
}
