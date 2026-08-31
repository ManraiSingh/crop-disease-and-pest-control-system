import { useNavigate } from 'react-router-dom'
import { useT } from '../../../i18n/context.js'
import Icon from '../../lib/icons.jsx'

/**
 * PLACEHOLDER background: the mockup uses a real photo of crop rows. We don't have one, so
 * this fakes the look with a gradient + repeating diagonal "furrow" pattern instead of leaving
 * it flat. Swap for a real photo (via a CSS background-image) whenever one is available —
 * nothing else about this component needs to change.
 */
export default function ScanCropCard() {
  const navigate = useNavigate()
  const t = useT()

  return (
    <button
      type="button"
      onClick={() => navigate('/scan')}
      className="relative block w-full overflow-hidden rounded-3xl border-0 bg-gradient-to-br from-[#2f6b3c] via-[#1f4d2a] to-[#12301b] p-5 text-left"
    >
      <svg className="absolute inset-0 h-full w-full opacity-25" preserveAspectRatio="none" viewBox="0 0 300 180">
        <defs>
          <pattern id="rows" width="26" height="180" patternUnits="userSpaceOnUse">
            <path d="M13 180 L22 0 L18 0 L9 180 Z" fill="#a8d98a" />
          </pattern>
        </defs>
        <rect width="300" height="180" fill="url(#rows)" />
      </svg>

      <span className="relative inline-block rounded-full bg-black/40 px-3 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
        {t('home.scannerBadge')}
      </span>

      <h2 className="relative mt-3 text-lg leading-snug font-bold text-white">
        {t('home.scanTitle')}
      </h2>
      <p className="relative mt-1 text-xs text-white/80">{t('home.scanSubtitle')}</p>

      <span className="relative mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-black">
        <Icon name="scan" className="h-4 w-4" />
        {t('home.scanCta')}
      </span>

      <span className="absolute right-4 bottom-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white">
        <Icon name="camera" className="h-4 w-4" />
      </span>
    </button>
  )
}
