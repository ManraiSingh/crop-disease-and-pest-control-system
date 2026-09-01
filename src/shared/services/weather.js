/**
 * Weather service — the boundary between the dashboard and the FastAPI backend.
 *
 * The endpoints below don't exist yet (the backend, weather integration and risk engine are
 * another team member's part), so every call falls back to generated mock data and the UI keeps
 * working offline. When the API goes live, set VITE_API_BASE_URL and delete `mockForecast`;
 * nothing in the components needs to change, because they only ever see the shape returned by
 * `normalizeForecast`.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''

/**
 * Backend contract this UI expects. Query params: `day` (today|tomorrow|dayAfter), plus the
 * farmer's `lat`/`lon` from onboarding.
 *
 *   GET {forecast} -> { condition: string,
 *                       metrics: { humidity: string, clouds: string, uvIndex: string },
 *                       hours: [{ time: ISO-8601 string, temp: number }] }
 *   GET {current}  -> { temperature: number, condition: string, metrics: {...} }
 */
export const WEATHER_ENDPOINTS = {
  forecast: '/api/weather/forecast',
  current: '/api/weather/current',
}

export const FORECAST_DAYS = [
  { key: 'today', label: 'Today', dayOffset: 0 },
  { key: 'tomorrow', label: 'Tomorrow', dayOffset: 1 },
  { key: 'dayAfter', label: 'Day After', dayOffset: 2 },
]

/** How many hourly readings the track shows at once. */
const HOURS_IN_WINDOW = 8

/** Readings are hourly but the design only labels some of the times — this picks which. */
const TIME_LABEL_COUNT = 5

function toDate(value) {
  return value instanceof Date ? value : new Date(value)
}

/** "9 AM", "12 PM" — matches the design's label format. */
export function formatHourLabel(value) {
  const date = toDate(value)
  const hour = date.getHours()
  const suffix = hour < 12 ? 'AM' : 'PM'
  const twelve = hour % 12 === 0 ? 12 : hour % 12
  return `${twelve} ${suffix}`
}

/**
 * Index of the reading closest to `now` — the "approx hour" the marker sits on. Clamps to the
 * ends, so a forecast for a future day highlights its first reading rather than nothing.
 */
export function activeHourIndex(hours, now = new Date()) {
  if (!hours?.length) return 0
  let best = 0
  let bestGap = Infinity
  hours.forEach((hour, i) => {
    const gap = Math.abs(toDate(hour.time).getTime() - now.getTime())
    if (gap < bestGap) {
      bestGap = gap
      best = i
    }
  })
  return best
}

/** Evenly spaced subset of the readings' times, for the sparser label row under the track. */
export function pickTimeLabels(hours, count = TIME_LABEL_COUNT) {
  if (!hours?.length) return []
  if (hours.length <= count) return hours.map((hour) => formatHourLabel(hour.time))
  const step = (hours.length - 1) / (count - 1)
  return Array.from({ length: count }, (_, i) => formatHourLabel(hours[Math.round(i * step)].time))
}

/** Guards against a backend that returns partial data — the UI must never render undefined. */
function normalizeForecast(raw) {
  const hours = (raw?.hours ?? [])
    .filter((hour) => hour?.time != null && Number.isFinite(Number(hour.temp)))
    .map((hour) => ({ time: hour.time, temp: Math.round(Number(hour.temp)) }))

  return {
    condition: raw?.condition ?? 'Unavailable',
    metrics: {
      humidity: raw?.metrics?.humidity ?? '—',
      clouds: raw?.metrics?.clouds ?? '—',
      uvIndex: raw?.metrics?.uvIndex ?? '—',
    },
    hours,
  }
}

/** Mock day shapes, keyed the same way the backend will be. */
const MOCK_DAYS = {
  today: { condition: 'Partly Cloudy', metrics: { humidity: '78%', clouds: '65%', uvIndex: 'Low' }, base: 20, rise: 1 },
  tomorrow: { condition: 'Sunny', metrics: { humidity: '64%', clouds: '30%', uvIndex: 'High' }, base: 23, rise: 1 },
  dayAfter: { condition: 'Light Rain', metrics: { humidity: '86%', clouds: '90%', uvIndex: 'Low' }, base: 18, rise: 0.5 },
}

/**
 * Builds a window of real, dated hours so the marker lands on the actual current hour — a
 * hardcoded index would drift out of sync with the clock the moment the demo is opened.
 * Today's window starts two hours back so "now" sits inside it; other days start at 9 AM.
 */
function mockForecast(dayKey) {
  const shape = MOCK_DAYS[dayKey] ?? MOCK_DAYS.today
  const day = FORECAST_DAYS.find((entry) => entry.key === dayKey) ?? FORECAST_DAYS[0]

  const start = new Date()
  start.setMinutes(0, 0, 0)
  if (day.dayOffset === 0) {
    start.setHours(start.getHours() - 2)
  } else {
    start.setDate(start.getDate() + day.dayOffset)
    start.setHours(9)
  }

  const hours = Array.from({ length: HOURS_IN_WINDOW }, (_, i) => {
    const time = new Date(start)
    time.setHours(start.getHours() + i)
    return { time: time.toISOString(), temp: Math.round(shape.base + i * shape.rise) }
  })

  return { condition: shape.condition, metrics: shape.metrics, hours }
}

/**
 * @param {{ day: string, latitude?: number, longitude?: number, signal?: AbortSignal }} params
 * @returns {Promise<{ condition: string, metrics: object, hours: {time: string, temp: number}[] }>}
 */
export async function fetchForecast({ day = 'today', latitude, longitude, signal } = {}) {
  if (!API_BASE) return normalizeForecast(mockForecast(day))

  const url = new URL(WEATHER_ENDPOINTS.forecast, API_BASE)
  url.searchParams.set('day', day)
  if (latitude != null) url.searchParams.set('lat', String(latitude))
  if (longitude != null) url.searchParams.set('lon', String(longitude))

  try {
    const response = await fetch(url, { signal })
    if (!response.ok) throw new Error(`Weather API ${response.status}`)
    return normalizeForecast(await response.json())
  } catch (error) {
    if (error.name === 'AbortError') throw error
    // Backend down or not built yet — the dashboard still has to render something.
    return normalizeForecast(mockForecast(day))
  }
}
