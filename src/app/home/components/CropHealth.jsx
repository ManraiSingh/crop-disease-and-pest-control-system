import { GLASS_INSET } from '../../lib/glass.js'
import { GlassCard, SectionHeader } from '../../lib/glass.jsx'
import { useT } from '../../../i18n/context.js'
import Icon from '../../lib/icons.jsx'

function formatValue(value) {
  if (!value) return null
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Uses the real crop/field the farmer entered during onboarding — "stage" and the health %
 * are stand-ins until the risk-scoring engine can derive them from actual scan history.
 */
export default function CropHealth({ profile }) {
  const t = useT()
  // Prefer the translated crop name; fall back to the raw value for anything unlisted.
  const cropKey = profile?.crop ? `crops.${profile.crop}` : null
  const translated = cropKey ? t(cropKey) : null
  const crop =
    translated && translated !== cropKey ? translated : (formatValue(profile?.crop) ?? t('home.noCrop'))
  const fieldName = formatValue(profile?.fieldName) ?? t('home.yourField')
  const health = 85

  return (
    <GlassCard className="p-4">
      <SectionHeader title={t('home.cropHealth')} action={t('common.viewAll')} className="mb-3" />

      <div className={`${GLASS_INSET} flex items-center gap-3 p-3`}>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-solid border-white/15 bg-white/10">
          <Icon name="wheat" className="h-5 w-5 text-lime-200" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-white">{crop}</p>
          <p className="text-xs text-white/60">{t('home.vegetativeStage')} · {fieldName}</p>
        </div>

        <span
          className="grid h-14 w-14 shrink-0 place-items-center rounded-full"
          style={{
            background: `radial-gradient(closest-side, rgba(28,40,18,0.9) 76%, transparent 77% 100%), conic-gradient(#a3e635 ${health}%, rgba(255,255,255,0.18) 0)`,
          }}
        >
          <span className="text-[13px] font-bold text-white">{health}%</span>
        </span>
      </div>
    </GlassCard>
  )
}
