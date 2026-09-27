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
  { key: 'today', label: 'common.today', dayOffset: 0 },
  { key: 'tomorrow', label: 'common.tomorrow', dayOffset: 1 },
  { key: 'dayAfter', label: 'home.dayAfter', dayOffset: 2 },
]

/** How many hourly readings the track shows at once. */
const HOURS_IN_WINDOW = 8

/** Readings are hourly but the design only labels some of the times — this picks which. */
const TIME_LABEL_COUNT = 5

function toDate(value) {
  return value instanceof Date ? value : new Date(value)
}

/** Maps a backend condition string onto one of the app's line icons. */
export function conditionIcon(condition = '') {
  const text = condition.toLowerCase()
  if (text.includes('rain') || text.includes('shower') || text.includes('storm')) return 'umbrella'
  if (text.includes('sun') || text.includes('clear')) return 'sun'
  if (text.includes('partly') || text.includes('fair')) return 'cloudSun'
  if (text.includes('cloud') || text.includes('overcast')) return 'cloud'
  return 'cloudSun'
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
  today: { condition: 'Partly Cloudy', metrics: { humidity: '78%', clouds: '65%', uvIndex: 'home.uvLow' }, base: 20, rise: 1 },
  tomorrow: { condition: 'Sunny', metrics: { humidity: '64%', clouds: '30%', uvIndex: 'home.uvHigh' }, base: 23, rise: 1 },
  dayAfter: { condition: 'Light Rain', metrics: { humidity: '86%', clouds: '90%', uvIndex: 'home.uvLow' }, base: 18, rise: 0.5 },
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


/* ------------------------------------------------------------------ *
 * Open-Meteo: real weather with no API key and no backend.
 * Used whenever the farmer has given us a location but VITE_API_BASE_URL
 * is not set yet. Falls back to mock data if the request fails.
 * ------------------------------------------------------------------ */

const OPEN_METEO = 'https://api.open-meteo.com/v1/forecast'

/** WMO weather codes -> the plain condition strings conditionIcon() already understands. */
function describeCode(code) {
  if (code === 0) return 'Clear'
  if (code === 1 || code === 2) return 'Partly Cloudy'
  if (code === 3) return 'Overcast'
  if (code === 45 || code === 48) return 'Fog'
  if (code >= 51 && code <= 57) return 'Drizzle'
  if (code >= 61 && code <= 67) return 'Rain'
  if (code >= 71 && code <= 77) return 'Snow'
  if (code >= 80 && code <= 82) return 'Rain Showers'
  if (code >= 95) return 'Thunderstorm'
  return 'Partly Cloudy'
}

function describeUv(value) {
  if (!Number.isFinite(value)) return '—'
  if (value < 3) return 'home.uvLow'
  if (value < 6) return 'home.uvModerate'
  if (value < 8) return 'home.uvHigh'
  return 'home.uvVeryHigh'
}

/**
 * Picks the 8-hour window to show: today starts two hours back so "now" sits inside it,
 * other days start at 9 AM — same rule the mock uses, so the widget behaves identically.
 */
function windowStartIndex(times, dayOffset) {
  const target = new Date()
  if (dayOffset === 0) {
    target.setHours(target.getHours() - 2, 0, 0, 0)
  } else {
    target.setDate(target.getDate() + dayOffset)
    target.setHours(9, 0, 0, 0)
  }
  let best = 0
  let bestGap = Infinity
  times.forEach((time, i) => {
    const gap = Math.abs(new Date(time).getTime() - target.getTime())
    if (gap < bestGap) {
      bestGap = gap
      best = i
    }
  })
  return Math.min(best, Math.max(times.length - HOURS_IN_WINDOW, 0))
}

async function fetchOpenMeteo({ day, latitude, longitude, signal }) {
  const dayEntry = FORECAST_DAYS.find((entry) => entry.key === day) ?? FORECAST_DAYS[0]

  const url = new URL(OPEN_METEO)
  url.searchParams.set('latitude', String(latitude))
  url.searchParams.set('longitude', String(longitude))
  url.searchParams.set('hourly', 'temperature_2m,relative_humidity_2m,cloud_cover,weather_code')
  url.searchParams.set('daily', 'uv_index_max')
  url.searchParams.set('forecast_days', '4')
  url.searchParams.set('timezone', 'auto')

  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`Open-Meteo ${res.status}`)
  const data = await res.json()

  const times = data?.hourly?.time ?? []
  if (!times.length) throw new Error('Open-Meteo: no hourly data')

  const start = windowStartIndex(times, dayEntry.dayOffset)
  const slice = (arr) => (arr ?? []).slice(start, start + HOURS_IN_WINDOW)

  const temps = slice(data.hourly.temperature_2m)
  const hours = slice(times).map((time, i) => ({ time, temp: temps[i] }))

  const humidity = slice(data.hourly.relative_humidity_2m)[0]
  const clouds = slice(data.hourly.cloud_cover)[0]
  const code = slice(data.hourly.weather_code)[0]
  const uv = data?.daily?.uv_index_max?.[dayEntry.dayOffset]

  return {
    condition: describeCode(code),
    metrics: {
      humidity: Number.isFinite(humidity) ? `${Math.round(humidity)}%` : '—',
      clouds: Number.isFinite(clouds) ? `${Math.round(clouds)}%` : '—',
      uvIndex: describeUv(uv),
    },
    hours,
  }
}

/**
 * @param {{ day: string, latitude?: number, longitude?: number, signal?: AbortSignal }} params
 * @returns {Promise<{ condition: string, metrics: object, hours: {time: string, temp: number}[] }>}
 */
export async function fetchForecast({ day = 'today', latitude, longitude, signal } = {}) {
  if (!API_BASE) {
    // No backend yet. With a real location we can still show real weather; without one
    // there is nothing to look up, so fall back to the generated sample day.
    if (latitude == null || longitude == null) return normalizeForecast(mockForecast(day))
    try {
      return normalizeForecast(await fetchOpenMeteo({ day, latitude, longitude, signal }))
    } catch (error) {
      if (error.name === 'AbortError') throw error
      return normalizeForecast(mockForecast(day))
    }
  }

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
