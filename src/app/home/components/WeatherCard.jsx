import { Link } from 'react-router-dom'
import { useT } from '../../../i18n/context.js'
import Icon from '../../lib/icons.jsx'

/** Mock weather data — swap for a real weather API response once one exists. */
export default function WeatherCard() {
  const t = useT()

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
      <span className="bg-sky flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
        <Icon name="cloudSun" className="text-leaf-dark h-6 w-6" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] text-gray-500">{t('home.weatherToday')}</p>
        <p className="text-sm font-bold text-black">
          29°C <span className="font-normal text-gray-500">{t('home.weatherCondition')}</span>
        </p>
        <p className="text-[10px] text-gray-400">{t('home.weatherDetail')}</p>
      </div>
      <Link
        to="/advisory"
        className="text-leaf-dark flex shrink-0 items-center gap-0.5 text-xs font-semibold whitespace-nowrap"
      >
        {t('home.viewForecast')}
        <Icon name="chevronRight" className="h-3 w-3" />
      </Link>
    </div>
  )
}
