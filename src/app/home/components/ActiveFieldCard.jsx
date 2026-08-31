import { useT } from '../../../i18n/context.js'
import Icon from '../../lib/icons.jsx'

function formatValue(value) {
  if (!value) return null
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/** Uses the real field/crop the farmer entered during onboarding — "sown on" date is a stand-in. */
export default function ActiveFieldCard({ profile }) {
  const t = useT()
  const fieldName = formatValue(profile?.fieldName) ?? t('home.yourField')
  const cropKey = profile?.crop ? `crops.${profile.crop}` : null
  const translated = cropKey ? t(cropKey) : null
  // t() returns the key itself when there's no entry — fall back to the raw value then.
  const crop = translated && translated !== cropKey ? translated : (formatValue(profile?.crop) ?? t('home.noCrop'))

  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="bg-sky flex h-10 w-10 items-center justify-center rounded-full">
          <Icon name="sprout" className="text-leaf-dark h-5 w-5" />
        </span>
        <div>
          <p className="text-[10px] text-gray-500">{t('home.activeField')}</p>
          <p className="text-sm font-bold text-black">
            {fieldName} · {crop}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[10px] text-gray-400">{t('home.sownOn')}</p>
        <p className="text-xs font-semibold text-black">18 Aug 2026</p>
        <p className="text-[10px] text-gray-400">{t('common.daysAgo', { n: 10 })}</p>
      </div>
    </div>
  )
}
