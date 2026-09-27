import { cropArt } from '../../app/lib/cropArt.js'
import Icon from '../../app/lib/icons.jsx'
import { useT } from '../../i18n/context.js'
import FieldLabel from './FieldLabel.jsx'

/**
 * Crop chooser for the onboarding flow.
 *
 * Built for farmers on a phone, often outdoors: each crop is a large tile with a
 * picture on it, so a crop can be recognised at a glance instead of read. Tiles are
 * finger-sized rather than text-sized, and selection is shown three ways at once —
 * the tile lights up, a tick appears, and the running summary underneath names what
 * has been picked.
 *
 * Selection order is meaningful: the first crop chosen is the farmer's main crop and
 * is badged MAIN, since that is what Home and the government portal lead with.
 */

export default function CropPicker({ cropKeys, selected, onToggle }) {
  const t = useT()

  const mainCrop = selected[0]

  return (
    <div>
      <FieldLabel icon="leaf">{t('onboarding.crops')}</FieldLabel>

      <p className="mb-3 text-[11px] leading-relaxed text-white/55">
        {t('onboarding.cropsHint')}
      </p>

      <div className="grid grid-cols-4 gap-2">
        {cropKeys.map((key) => {
          const position = selected.indexOf(key)
          const isSelected = position !== -1
          const isMain = position === 0

          return (
            <button
              key={key}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onToggle(key)}
              className={`relative flex flex-col items-center justify-center gap-1 rounded-2xl border border-solid px-1 py-3 backdrop-blur-md transition ${
                isSelected
                  ? 'border-lime-300/70 bg-lime-400/18 shadow-[0_0_0_1px_rgba(163,230,53,0.35)]'
                  : 'border-white/15 bg-white/8'
              }`}
            >
              {/* One badge slot, so the tick and MAIN never collide. */}
              {isSelected && (
                <span
                  className={`absolute -top-2 -right-1 flex items-center justify-center rounded-full bg-lime-400 text-[#12200c] shadow-[0_2px_8px_rgba(6,20,12,0.5)] ${
                    isMain ? 'px-2 py-0.5' : 'h-5 w-5'
                  }`}
                >
                  {isMain ? (
                    <span className="text-[8px] font-extrabold tracking-wide">
                      {t('onboarding.mainCrop')}
                    </span>
                  ) : (
                    <Icon name="checkCircle" className="h-3.5 w-3.5" />
                  )}
                </span>
              )}

              <span aria-hidden="true" className="text-[22px] leading-none">
                {cropArt(key)}
              </span>

              <span
                className={`text-center text-[10px] leading-tight font-semibold ${
                  isSelected ? 'text-white' : 'text-white/70'
                }`}
              >
                {t(`crops.${key}`)}
              </span>
            </button>
          )
        })}
      </div>

      {/* Plain-language confirmation of what the tiles above are saying. */}
      <p className="mt-3 min-h-[16px] text-[11px] font-semibold text-lime-300">
        {mainCrop
          ? t('onboarding.cropsChosen', {
              count: String(selected.length),
              main: t(`crops.${mainCrop}`),
            })
          : ''}
      </p>
    </div>
  )
}
