import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useLanguage } from '../../i18n/context.js'
import { cropAccent, cropArt } from '../lib/cropArt.js'
import Icon from '../lib/icons.jsx'
import { loadProfile } from '../lib/profile.js'
import useForecast from '../lib/useForecast.js'
import { CROPS, CROP_KEYS, SCALES, monthName, rankDiseases } from './cropKnowledge.js'
import { SPRING } from '../../design/springs.js'
import { LeafLens } from '../../design/Illustrations.jsx'
import { Gauge } from '../../design/Tilt.jsx'

/**
 * Advisory: pick a crop, see what it needs, what to plant beside it, and what is likely to go
 * wrong right now.
 *
 * Built as a dark object on a light page rather than another list. The near-black panel holds
 * everything that belongs to the selected crop, so switching crop visibly re-skins one object
 * instead of repainting the screen — and the four condition dials read at a glance without
 * anyone having to parse a table.
 *
 * Risk is the only thing allowed to use warm colour, and it is computed from the live forecast.
 */

const TONES = {
  temp: '#f0a93c',
  water: '#4da3e0',
  sow: '#8fdc1f',
  harvest: '#e8b53c',
}

/* The wash is black, not a tint of the badge's own colour. Tinting the badge with its own
   hue lightened the ground toward the text it carries — "High" measured 2.5:1 that way.
   Darkening the ground instead separates the badge AND lifts its label. */
const RISK = {
  high: { fg: '#ff8a8a', bg: 'rgba(0,0,0,0.25)', label: 'advisory.risk_high' },
  watch: { fg: '#f5b73f', bg: 'rgba(0,0,0,0.25)', label: 'advisory.risk_watch' },
  low: { fg: '#a8f033', bg: 'rgba(0,0,0,0.25)', label: 'advisory.risk_low' },
}

/**
 * One condition, as a dial.
 *
 * The ring shows where this crop's comfortable band falls on the whole plausible scale, so
 * "20–27 °C" is a visible slice rather than a number to interpret. Bands without a numeric
 * scale (sowing, harvest) render the ring full and lean on the label instead.
 */
function Dial({ tone, icon, label, value, range, scale, index }) {
  return (
    <div
      className="enter-rise flex min-w-0 flex-1 flex-col items-center gap-2"
      style={{ animationDelay: `${70 * index}ms` }}
    >
      {range && scale ? (
        <Gauge from={range[0]} to={range[1]} scale={scale} tone={tone} delay={0.12 * index}>
          <Icon name={icon} className="h-[18px] w-[18px]" />
        </Gauge>
      ) : (
        <span
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid var(--paper-edge)', color: tone }}
        >
          <Icon name={icon} className="h-[18px] w-[18px]" />
        </span>
      )}

      <span className="t-label text-center text-[10px]" style={{ color: 'var(--on-pitch-soft)' }}>
        {label}
      </span>
      <span className="t-num text-center text-[13px] leading-tight" style={{ color: 'var(--on-pitch)' }}>
        {value}
      </span>
    </div>
  )
}

/** Expandable section, the "About / How to plant" rows from the reference. */
function Fold({ title, children, open, onToggle }) {
  return (
    <div className="border-t" style={{ borderColor: 'var(--on-pitch-line)' }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-3.5 text-left"
        style={{ background: 'transparent', border: 0 }}
      >
        <span className="t-label text-[15px]" style={{ color: 'var(--on-pitch)' }}>
          {title}
        </span>
        <span
          style={{
            color: 'var(--on-pitch-mid)',
            display: 'inline-flex',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 260ms var(--ease-out-expo)',
          }}
        >
          <Icon name="chevronDown" className="h-4 w-4" />
        </span>
      </button>

      <div
        style={{
          maxHeight: open ? 520 : 0,
          opacity: open ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 380ms var(--ease-out-expo), opacity 220ms linear',
        }}
      >
        <div className="pb-4">{children}</div>
      </div>
    </div>
  )
}

export default function AdvisoryPage() {
  const { t } = useLanguage()
  const profile = loadProfile()
  const weather = useForecast(profile?.location)

  const [cropKey, setCropKey] = useState(profile?.crop && CROPS[profile.crop] ? profile.crop : CROP_KEYS[0])
  const [fold, setFold] = useState('about')

  const crop = CROPS[cropKey]
  const accent = cropAccent(cropKey)

  const month = new Date().getMonth() + 1
  const risks = useMemo(
    () =>
      rankDiseases(cropKey, {
        month,
        temperature: weather.temperature,
        humidity: Number.parseInt(weather.metrics?.humidity, 10),
        condition: weather.condition,
      }),
    [cropKey, month, weather.temperature, weather.metrics?.humidity, weather.condition],
  )

  const topRisk = risks?.[0]
  const riskTone = RISK[topRisk?.risk] ?? RISK.low

  const cropName = (() => {
    const translated = t(`crops.${cropKey}`)
    return translated === `crops.${cropKey}` ? cropKey : translated
  })()

  return (
    <div className="h-full overflow-y-auto px-3 pb-8">
      {/* ---------- HERO: two-tone headline on paper ---------- */}
      <div className="relative px-2 pt-1 pb-4">
        <motion.h1
          className="t-hero relative"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ color: 'var(--ink)' }}
        >
          {t('advisory.subtitle')}
        </motion.h1>
      </div>

      {/* ---------- CROP PICKER ---------- */}
      <div className="-mx-1 mb-3 flex gap-2 overflow-x-auto px-1 pb-1">
        {CROP_KEYS.map((key) => {
          const active = key === cropKey
          const label = t(`crops.${key}`)
          return (
            <motion.button
              key={key}
              type="button"
              onClick={() => setCropKey(key)}
              whileTap={{ scale: 0.94 }}
              transition={SPRING.snap}
              className="t-label flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-[12px]"
              style={{
                background: active ? 'var(--pitch)' : 'var(--paper-dim)',
                color: active ? 'var(--paper)' : 'var(--ink-mid)',
                border: `1px solid ${active ? 'var(--pitch)' : 'var(--paper-edge)'}`,
              }}
            >
              <span aria-hidden="true">{cropArt(key)}</span>
              {label === `crops.${key}` ? key : label}
            </motion.button>
          )
        })}
      </div>

      {/* ---------- THE CROP OBJECT ---------- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cropKey}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className=""
        >
        <section
          className="plane-ink relative overflow-hidden"
          style={{ borderRadius: 26 }}
        >
          {/* masthead: huge ghost name behind the crop mark */}
          <div className="relative px-5 pt-5 pb-2">
            <span
              aria-hidden="true"
              className="t-display pointer-events-none absolute -top-2 left-4 text-[76px] whitespace-nowrap"
              style={{ color: 'color-mix(in srgb, var(--on-pitch) 7%, transparent)' }}
            >
              {cropName}
            </span>

            <div className="layer-2 relative flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p
                  className="t-label text-[11px] uppercase"
                  style={{ color: 'var(--on-pitch-mid)', letterSpacing: '0.1em' }}
                >
                  {crop.season}
                </p>
                <h2 className="t-display mt-0.5 text-[30px]" style={{ color: 'var(--on-pitch)' }}>
                  {cropName}
                </h2>
                <p className="mt-1 text-[12px]" style={{ color: 'var(--on-pitch-mid)' }}>
                  {crop.duration}
                </p>
              </div>

              <motion.span
                className="layer-3 flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-full text-[42px]"
                style={{ background: `${accent}26` }}
                initial={{ scale: 0.72, rotate: -10 }}
                animate={{ scale: 1, rotate: 0, y: [0, -5, 0] }}
                transition={{
                  scale: { ...SPRING.settle, delay: 0.08 },
                  rotate: { ...SPRING.settle, delay: 0.08 },
                  y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
                }}
                aria-hidden="true"
              >
                {cropArt(cropKey)}
              </motion.span>
            </div>
          </div>

          {/* ---------- FOUR DIALS ---------- */}
          <div className="layer-2 relative flex gap-2 px-4 pt-3 pb-5">
            <Dial index={0} tone={TONES.temp} icon="thermometer" label={t('home.temp')} value={crop.temp} range={crop.tempRange} scale={SCALES.temp} />
            <Dial index={1} tone={TONES.water} icon="droplet" label={t('advisory.water')} value={crop.water} range={crop.waterRange} scale={SCALES.water} />
            <Dial index={2} tone={TONES.sow} icon="sprout" label={t('advisory.sowing')} value={crop.sow} />
            <Dial index={3} tone={TONES.harvest} icon="calendar" label={t('advisory.harvest')} value={crop.harvest} />
          </div>

          {/* ---------- LIVE RISK BAND ---------- */}
          {topRisk && (
            <div
              className="enter-rise mx-4 mb-4 flex items-center gap-3 rounded-[20px] px-4 py-3"
              style={{ background: riskTone.bg, animationDelay: '160ms' }}
            >
              <LeafLens className="h-11 w-11 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="t-label text-[11px] uppercase" style={{ color: riskTone.fg, letterSpacing: '0.08em' }}>
                  {t(riskTone.label)}
                </p>
                <p className="t-label truncate text-[15px]" style={{ color: 'var(--on-pitch)' }}>
                  {topRisk.name}
                </p>
                <p className="mt-0.5 text-[11px]" style={{ color: 'var(--on-pitch-mid)' }}>
                  {monthName(month)} · {weather.condition || '—'}
                </p>
              </div>
            </div>
          )}

          {/* ---------- FOLDS ---------- */}
          <div className="layer-1 relative px-5 pb-2">
            <Fold
              title={t('advisory.tabCrops')}
              open={fold === 'about'}
              onToggle={() => setFold((f) => (f === 'about' ? null : 'about'))}
            >
              <dl className="flex flex-col gap-2.5">
                {[
                  [t('home.soilStatus'), crop.soil],
                  [t('home.phLevel'), crop.soilPh],
                  [t('advisory.water'), crop.waterNote],
                  [t('home.temp'), crop.tempNote],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3">
                    <dt className="t-label w-24 shrink-0 text-[12px]" style={{ color: 'var(--on-pitch-mid)' }}>
                      {k}
                    </dt>
                    <dd className="min-w-0 flex-1 text-[13px]" style={{ color: 'var(--on-pitch)' }}>
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Fold>

            <Fold
              title={t('advisory.tabCompanion')}
              open={fold === 'companion'}
              onToggle={() => setFold((f) => (f === 'companion' ? null : 'companion'))}
            >
              <div className="flex flex-col gap-2">
                {crop.companions?.map((c) => (
                  <div
                    key={c.name}
                    className="rounded-[16px] px-3.5 py-2.5"
                    style={{ background: 'var(--on-pitch-fill)' }}
                  >
                    <p className="t-label text-[13px]" style={{ color: 'var(--on-pitch)' }}>
                      {c.name}
                    </p>
                    <p className="mt-0.5 text-[12px]" style={{ color: 'var(--on-pitch-mid)' }}>
                      {c.why}
                    </p>
                  </div>
                ))}
              </div>
            </Fold>

            <Fold
              title={t('advisory.tabRisks')}
              open={fold === 'risks'}
              onToggle={() => setFold((f) => (f === 'risks' ? null : 'risks'))}
            >
              <div className="flex flex-col gap-2">
                {risks?.slice(0, 5).map((r) => {
                  const tone = RISK[r.risk] ?? RISK.low
                  return (
                    <div
                      key={r.name}
                      className="flex items-center gap-3 rounded-[16px] px-3.5 py-2.5"
                      style={{ background: 'var(--on-pitch-fill)' }}
                    >
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ background: tone.fg }}
                      />
                      <p className="min-w-0 flex-1 truncate text-[13px]" style={{ color: 'var(--on-pitch)' }}>
                        {r.name}
                      </p>
                      <span className="t-label shrink-0 text-[11px]" style={{ color: tone.fg }}>
                        {t(tone.label)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </Fold>
          </div>
        </section>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
