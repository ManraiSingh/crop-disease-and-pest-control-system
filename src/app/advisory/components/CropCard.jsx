import { cropArt, cropAccent, cropSurface } from '../../lib/cropArt.js'
import { PANEL_SHADOW } from '../surface.js'
import { useLanguage } from '../../../i18n/context.js'
import { term } from '../spokenTerms.js'
import { CROPS } from '../cropKnowledge.js'

/**
 * A crop, as a card you can actually hit: the picture leads, the name follows, and
 * the crop's own colour washes the surface so a grid of them reads at a glance.
 *
 * `size="lg"` is the two-across card for the farmer's own crops; `size="sm"` is the
 * swipeable strip of every other crop.
 */
export default function CropCard({ cropKey, onClick, size = 'lg' }) {
  const { t, language } = useLanguage()
  const crop = CROPS[cropKey]

  if (size === 'sm') {
    return (
      <button
        type="button"
        onClick={() => onClick?.(cropKey)}
        style={cropSurface(cropKey)}
        className={`flex w-full flex-col items-center gap-2 rounded-3xl border border-solid px-1.5 py-3.5 ${PANEL_SHADOW}`}
      >
        <span aria-hidden="true" className="text-[30px] leading-none">
          {cropArt(cropKey)}
        </span>
        <span className="text-center text-[11px] leading-tight font-semibold text-white">
          {t(`crops.${cropKey}`)}
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onClick?.(cropKey)}
      style={cropSurface(cropKey, 2)}
      className={`flex flex-col items-start rounded-[26px] border border-solid p-4 text-left ${PANEL_SHADOW}`}
    >
      <span
        aria-hidden="true"
        style={{ background: `${cropAccent(cropKey)}2e` }}
        className="flex h-14 w-14 items-center justify-center rounded-2xl text-[30px] leading-none"
      >
        {cropArt(cropKey)}
      </span>

      <span className="mt-3 text-[16.5px] leading-tight font-semibold text-white">
        {t(`crops.${cropKey}`)}
      </span>

      <span className="mt-1 line-clamp-1 text-[11px] text-white/55">
        {term(crop?.season, language)}
      </span>
    </button>
  )
}
