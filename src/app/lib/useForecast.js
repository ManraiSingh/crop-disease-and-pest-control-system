import { useEffect, useMemo, useState } from 'react'
import {
  FORECAST_DAYS,
  activeHourIndex,
  conditionIcon,
  fetchForecast,
  pickTimeLabels,
} from '../../shared/services/weather.js'

/**
 * Loads a day's forecast and turns it into what the weather widget renders: the hourly
 * temperature series, which reading is "now", and the sparser row of time labels.
 *
 * The active hour is derived from the clock rather than stored, so the marker stays on the
 * right hour no matter when the app is opened.
 */
export default function useForecast(location) {
  const [dayKey, setDayKey] = useState(FORECAST_DAYS[0].key)
  const [forecast, setForecast] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    fetchForecast({
      day: dayKey,
      latitude: location?.latitude,
      longitude: location?.longitude,
      signal: controller.signal,
    })
      .then(setForecast)
      .catch((error) => {
        if (error.name !== 'AbortError') setForecast(null)
      })
    return () => controller.abort()
  }, [dayKey, location?.latitude, location?.longitude])

  const view = useMemo(() => {
    const hours = forecast?.hours ?? []
    const activeIndex = activeHourIndex(hours)
    const condition = forecast?.condition ?? ''
    return {
      condition,
      icon: conditionIcon(condition),
      metrics: forecast?.metrics ?? { humidity: '—', clouds: '—', uvIndex: '—' },
      temperatures: hours.map((hour) => hour.temp),
      activeIndex,
      /** Reading for the current hour — what the header chip shows. */
      temperature: hours[activeIndex]?.temp ?? null,
      timeLabels: pickTimeLabels(hours),
    }
  }, [forecast])

  const selectedDay = FORECAST_DAYS.find((day) => day.key === dayKey) ?? FORECAST_DAYS[0]

  return {
    ...view,
    ready: (forecast?.hours?.length ?? 0) > 0,
    days: FORECAST_DAYS.map((day) => day.label),
    selectedDay: selectedDay.label,
    onDayChange: (label) => {
      const match = FORECAST_DAYS.find((day) => day.label === label)
      if (match) setDayKey(match.key)
    },
  }
}
