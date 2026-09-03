import { useNavigate } from 'react-router-dom'
import { GLASS_SURFACE, SCAN_CARD_BACKGROUND } from '../../lib/glass.js'
import Icon from '../../lib/icons.jsx'

/**
 * The dashboard's primary call to action, and deliberately the tallest card on Home — it keeps
 * the same glass pane, border and radius as every other card so it reads as part of the set,
 * but takes the height it needs for the vineyard photo to actually be legible behind the copy.
 * The scrim is what keeps the white text readable, so don't lighten it without re-checking.
 */
export default function ScanCropCard() {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate('/scan')}
      className={`${GLASS_SURFACE} flex min-h-[270px] rounded-3xl w-full flex-col justify-between p-5 text-left`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${SCAN_CARD_BACKGROUND}')` }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.58)_48%,rgba(0,0,0,0.34)_100%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_8%,rgba(255,255,255,0.16),transparent_46%)]"
      />

      <span className="relative flex items-start gap-3.5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-solid border-white/20 bg-white/12 backdrop-blur-md">
          <Icon name="scan" className="h-6 w-6 text-lime-200" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-bold tracking-wide text-lime-300 uppercase">
            AI Crop Scanner
          </span>
          <span className="mt-1.5 block text-xl leading-tight font-bold text-white drop-shadow-[0_1px_5px_rgba(0,0,0,0.55)]">
            Scan your crop for instant insights
          </span>
          <span className="mt-1.5 block text-xs text-white/75">
            Detect disease, pests &amp; nutrient deficiencies
          </span>
        </span>
      </span>

      <span className="relative mt-5 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-5 py-2.5 text-sm font-bold text-[#12200c] shadow-[0_8px_22px_rgba(163,230,53,0.4)]">
          <Icon name="scan" className="h-[18px] w-[18px]" />
          Scan Crop
        </span>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-solid border-white/20 bg-white/12 text-white backdrop-blur-md">
          <Icon name="camera" className="h-[18px] w-[18px]" />
        </span>
      </span>
    </button>
  )
}
