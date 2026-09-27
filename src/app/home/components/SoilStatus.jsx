import { useT } from '../../../i18n/context.js'
import Icon from '../../lib/icons.jsx'
import { CountUp, Stagger, StaggerItem } from '../../../design/motion.jsx'
import { SectionLabel, SoilLayers } from '../../../design/Surfaces.jsx'

/** Mock soil-sensor readings — real values would come from the field sensor / risk-scoring engine. */
const STATS = [
  { key: 'moisture', icon: 'droplet', label: 'home.moisture', value: '32', suffix: '%', status: 'home.lowLevel', tone: 'warn' },
  { key: 'ph', icon: 'pulse', label: 'home.phLevel', value: '6.5', suffix: '', status: 'home.optimal', tone: 'good' },
  { key: 'nitrogen', icon: 'flask', label: 'home.nitrogen', valueKey: 'home.nitrogenHigh', status: 'home.good', tone: 'good' },
  { key: 'temp', icon: 'thermometer', label: 'home.temp', value: '68', suffix: '°F', status: 'home.normal', tone: 'good' },
]

/** Status colour carries meaning, so it is kept separate from the accent. */
const TONES = {
  warn: { text: 'var(--ember)', fill: 'color-mix(in srgb, var(--ember) 16%, transparent)' },
  good: { text: 'var(--sprout-400)', fill: 'color-mix(in srgb, var(--sprout-500) 16%, transparent)' },
}

/**
 * Four readings as a grid of tiles. The numbers count up on first sight rather than simply
 * appearing — a reading a farmer is meant to register, not decoration, so the motion is doing
 * work: it draws the eye to the figure that changed.
 */
export default function SoilStatus() {
  const t = useT()

  return (
    <section className="relative">
      <SectionLabel className="mb-3 px-1">{t('home.soilStatus')}</SectionLabel>

      <Stagger className="grid grid-cols-2 gap-2.5">
        {STATS.map((stat) => {
          const tone = TONES[stat.tone]
          return (
            <StaggerItem key={stat.key}>
              <div
                className="relative h-full overflow-hidden rounded-[22px] p-3.5"
                style={{
                  background: 'linear-gradient(165deg, var(--canopy-700), var(--canopy-800))',
                  boxShadow: 'var(--lift-sm)',
                }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)' }}
                />

                <div
                  className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.06em] uppercase"
                  style={{ color: 'color-mix(in srgb, var(--butter-100) 55%, transparent)', fontFamily: 'var(--font-body)' }}
                >
                  <Icon name={stat.icon} className="h-3.5 w-3.5" />
                  {t(stat.label)}
                </div>

                <p className="display mt-1.5 text-[28px]" style={{ color: 'var(--butter-100)' }}>
                  {stat.valueKey ? (
                    t(stat.valueKey)
                  ) : (
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  )}
                </p>

                <span
                  className="mt-2 inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold"
                  style={{ background: tone.fill, color: tone.text, fontFamily: 'var(--font-body)' }}
                >
                  {t(stat.status)}
                </span>

                {stat.key === 'moisture' && (
                  <SoilLayers className="pointer-events-none absolute -right-3 -bottom-3 h-16 w-16 opacity-25" />
                )}
              </div>
            </StaggerItem>
          )
        })}
      </Stagger>
    </section>
  )
}
