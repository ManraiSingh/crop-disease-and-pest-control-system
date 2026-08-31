import { useT } from '../../../i18n/context.js'
import Icon from '../../lib/icons.jsx'

export default function AlertBanner() {
  const t = useT()

  return (
    <button
      type="button"
      className="relative flex w-full items-start gap-3 rounded-2xl border border-solid border-orange-100 bg-orange-50 p-4 text-left"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500">
        <Icon name="warning" className="h-5 w-5" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold tracking-wide text-orange-500 uppercase">{t('advisory.alertLabel')}</p>
        <p className="text-sm font-bold text-black">{t('advisory.alertTitle')}</p>
        <p className="mt-0.5 text-xs text-gray-600">
          {t('advisory.alertBody')}
        </p>
        <span className="mt-2 inline-flex items-center gap-0.5 text-xs font-bold text-orange-500">
          {t('advisory.alertCta')}
          <Icon name="chevronRight" className="h-3 w-3" />
        </span>
      </div>

      <div className="flex shrink-0 flex-col items-center gap-1 text-orange-400">
        <div className="flex items-center gap-1">
          <Icon name="sun" className="h-5 w-5" />
          <Icon name="thermometer" className="h-6 w-6" />
        </div>
      </div>
    </button>
  )
}
