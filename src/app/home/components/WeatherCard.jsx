import { GLASS_SHEEN, GLASS_SURFACE } from '../../lib/glass.jsx'
import Icon from '../../lib/icons.jsx'

/**
 * Labels sit on an inset track rather than the full width, so the first and last of them stay
 * inside the card instead of half-hanging over its padding. The gradient bar itself still spans
 * edge to edge — that difference is what the design shows.
 */
const TRACK_INSET = 5

function trackPosition(index, count) {
  if (count <= 1) return 50
  return TRACK_INSET + (index / (count - 1)) * (100 - TRACK_INSET * 2)
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

const SEGMENT_GLOSS =
  'absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.06)_46%,rgba(0,0,0,0.1)_100%)]'

/**
 * Dark-glass weather panel for the dashboard.
 *
 * Fully controlled and fully dynamic: `temperatures` is the hourly series, `activeIndex` marks
 * the current hour within it, and `timeLabels` is its own, deliberately sparser series spread
 * across the same track — the design labels every hour's temperature but only some of the
 * times. The component owns no weather data, so a real API can be swapped in at the call site
 * without touching this file.
 */
export default function WeatherCard({
  temperatures,
  activeIndex,
  timeLabels,
  condition,
  selectedDay,
  onDayChange,
  days,
}) {
  const activePercent = trackPosition(activeIndex, temperatures.length)
  const heroPercent = clamp(activePercent, 10, 90)
  const temperature = temperatures[activeIndex]

  const chartSummary = `Hourly forecast for ${selectedDay}, ${timeLabels.at(0)} to ${timeLabels.at(-1)}: ${temperatures
    .map((temp) => `${temp} degrees`)
    .join(', ')}. Currently ${temperature} degrees and ${condition}.`

  return (
    <section className={`${GLASS_SURFACE} w-full p-4 text-white`}>
      <div aria-hidden="true" className={GLASS_SHEEN} />

      <div className="relative">
        <header className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="text-xl leading-none">
              ⛅
            </span>
            <h2 className="text-base font-medium">Weather</h2>
          </div>

          <div className="relative">
            <select
              value={selectedDay}
              onChange={(event) => onDayChange(event.target.value)}
              aria-label="Select forecast day"
              className="cursor-pointer appearance-none rounded-full border border-solid border-white/15 bg-white/10 py-1.5 pr-8 pl-3.5 text-xs font-medium text-white backdrop-blur-md focus:ring-2 focus:ring-white/50 focus:outline-none"
            >
              {days.map((day) => (
                <option key={day} value={day} className="text-black">
                  {day}
                </option>
              ))}
            </select>
            <Icon
              name="chevronDown"
              className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-white/80"
            />
          </div>
        </header>

        <figure className="mt-3">
          <div aria-hidden="true">
            {/* Hero temperature, centred over its own position on the track below. */}
            <div className="relative pb-1">
              <p className="invisible text-[34px] leading-none font-semibold">{temperature}°</p>
              <div className="absolute bottom-0 -translate-x-1/2" style={{ left: `${heroPercent}%` }}>
                <p className="text-[34px] leading-none font-semibold whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                  {temperature}°
                </p>
              </div>
            </div>

            {/* Hourly temperatures, with the dashed guide dropping from the hero to the track. */}
            <div className="relative mt-2.5">
              <span
                className="pointer-events-none absolute -top-3 -bottom-1.5 border-l-2 border-dashed border-white/55"
                style={{ left: `${activePercent}%` }}
              />

              <div className="relative h-4">
                {temperatures.map((temp, i) =>
                  i === activeIndex ? null : (
                    <span
                      key={`${temp}-${i}`}
                      className="absolute -translate-x-1/2 text-xs font-medium whitespace-nowrap text-white/85"
                      style={{ left: `${trackPosition(i, temperatures.length)}%` }}
                    >
                      {temp}°
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* The track: one continuous cool→warm ramp, split at the current hour. */}
            <div className="relative mt-1.5">
              <div
                className="grid h-8 gap-[6px]"
                style={{
                  gridTemplateColumns: `${clamp(activePercent, 4, 96)}fr ${clamp(100 - activePercent, 4, 96)}fr`,
                }}
              >
                <div className="relative overflow-hidden rounded-full bg-[linear-gradient(90deg,#4ec97d_0%,#7fd450_55%,#c2e63b_100%)]">
                  <span className={SEGMENT_GLOSS} />
                </div>
                <div className="relative overflow-hidden rounded-full bg-[linear-gradient(90deg,#d7e878_0%,#ecd75c_38%,#f2b95a_68%,#ef8f6b_100%)]">
                  <span className={SEGMENT_GLOSS} />
                </div>
              </div>

              {/* Glowing handle for the current hour, nestled in the pinch between the two
                  capsules — deliberately shorter than the track, as in the design. */}
              <span
                className="pointer-events-none absolute top-1/2 h-[58%] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.75)]"
                style={{ left: `${activePercent}%` }}
              />
            </div>

            {/* Time markers — their own, sparser series across the same track. */}
            <div className="relative mt-2.5 h-4">
              {timeLabels.map((label, i) => (
                <span
                  key={label}
                  className="absolute -translate-x-1/2 text-xs font-medium whitespace-nowrap text-white/85"
                  style={{ left: `${trackPosition(i, timeLabels.length)}%` }}
                >
                  {label}
                </span>
              ))}
              <Icon name="sparkle" className="absolute -top-2.5 right-0 h-3.5 w-3.5 text-white/50" />
            </div>
          </div>
          <figcaption className="sr-only">{chartSummary}</figcaption>
        </figure>
      </div>
    </section>
  )
}
