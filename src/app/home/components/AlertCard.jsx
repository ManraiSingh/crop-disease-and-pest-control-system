import { Link } from 'react-router-dom'
import { useT } from '../../../i18n/context.js'
import Icon from '../../lib/icons.jsx'

/** Mock alert — this is what a real disease-detection result would populate. */
export default function AlertCard() {
  const t = useT()

  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-bold text-black">{t('home.attention')}</h2>
        <span className="flex items-center gap-1 text-[11px] font-semibold text-green-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          {t('common.live')}
        </span>
      </div>

      <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500">
            <Icon name="shield" className="h-[18px] w-[18px]" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold tracking-wide text-red-500 uppercase">{t('home.diseaseDetected')}</p>
            <p className="text-sm font-bold text-black">{t('home.diseaseName')}</p>
            <p className="text-[11px] text-gray-500">{t('crops.tomato')} · North Field</p>
          </div>
          <span className="shrink-0 rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-bold text-red-500">
            {t('common.medium')}
          </span>
        </div>

        <div className="mt-3">
          <p className="text-[11px] text-gray-600">
            <span className="font-bold text-black">18%</span> {t('home.fieldAffected')}
          </p>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-red-100">
            <div className="h-full w-[18%] rounded-full bg-red-500" />
          </div>
        </div>

        <Link
          to="/advisory"
          className="mt-3 flex items-center gap-0.5 text-xs font-bold text-red-500"
        >
          {t('home.viewTreatment')}
          <Icon name="chevronRight" className="h-3 w-3" />
        </Link>
      </div>
    </section>
  )
}
