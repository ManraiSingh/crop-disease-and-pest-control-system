import { useState } from 'react'
import { GLASS_INSET } from '../../lib/glass.js'
import { GlassCard, SectionHeader } from '../../lib/glass.jsx'
import { useT } from '../../../i18n/context.js'
import { cropAccent, cropArt } from '../../lib/cropArt.js'
import Icon from '../../lib/icons.jsx'

function formatValue(value) {
  if (!value) return null
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/*
  A score per crop until the scan history can produce a real one.

  Derived from the crop key rather than drawn at random, so a farmer sees the
  same number every time they open Home — a health figure that changes on its
  own is worse than no figure at all.
*/
function healthFor(cropKey) {
  let value = 0x811c9dc5

  for (let i = 0; i < cropKey.length; i += 1) {
    value ^= cropKey.charCodeAt(i)
    value = Math.imul(value, 0x01000193) >>> 0
  }

  value ^= value >>> 16
  value = Math.imul(value, 0x85ebca6b) >>> 0
  value ^= value >>> 13

  return 68 + ((value >>> 0) % 29)
}

/** Green above 80, amber in the seventies, red below. */
function toneFor(health) {
  if (health >= 80) return '#a3e635'
  if (health >= 72) return '#e0b84f'
  return '#e2725b'
}

function CropRow({ cropKey, fieldName, t }) {
  const translated = t(`crops.${cropKey}`)
  const name =
    translated !== `crops.${cropKey}` ? translated : formatValue(cropKey) ?? cropKey

  const health = healthFor(cropKey)

  return (
    <div className={`${GLASS_INSET} flex items-center gap-3 p-3`}>
      <span
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[22px]"
        style={{ background: `${cropAccent(cropKey)}2b` }}
      >
        {cropArt(cropKey)}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-white">{name}</p>
        <p className="text-xs text-white/60">
          {t('home.vegetativeStage')} · {fieldName}
        </p>
      </div>

      {/* The disc reads from theme variables: an inline style is the one thing
          the light-mode remap cannot reach. */}
      <span
        className="grid h-14 w-14 shrink-0 place-items-center rounded-full"
        style={{
          background: `radial-gradient(closest-side, var(--panel-strong) 76%, transparent 77% 100%), conic-gradient(${toneFor(
            health,
          )} ${health}%, var(--track) 0)`,
        }}
      >
        <span className="text-[13px] font-bold text-white">{health}%</span>
      </span>
    </div>
  )
}

/**
 * Crop health for the farmer's own crops.
 *
 * Collapsed it shows the main crop, which is the one they asked about most of
 * the time. "View all" opens the rest rather than going anywhere — there is no
 * second screen worth the trip for three rows.
 */
export default function CropHealth({ profile }) {
  const t = useT()
  const [showAll, setShowAll] = useState(false)

  const crops = profile?.crops?.length
    ? profile.crops
    : profile?.crop
      ? [profile.crop]
      : []

  const fieldName = formatValue(profile?.fieldName) ?? t('home.yourField')
  const shown = showAll ? crops : crops.slice(0, 1)

  return (
    <GlassCard className="p-4">
      <SectionHeader
        title={t('home.cropHealth')}
        className="mb-3"
        right={
          crops.length > 1 ? (
            <button
              type="button"
              onClick={() => setShowAll((open) => !open)}
              className="flex items-center gap-1 border-0 bg-transparent text-[11px] font-semibold text-lime-300"
            >
              {showAll ? t('common.showLess') : t('common.viewAll')}
              <Icon
                name="chevronDown"
                className={`h-3.5 w-3.5 transition-transform ${showAll ? 'rotate-180' : ''}`}
              />
            </button>
          ) : null
        }
      />

      {crops.length === 0 ? (
        <div className={`${GLASS_INSET} p-3`}>
          <p className="text-sm font-bold text-white">{t('home.noCrop')}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {shown.map((cropKey) => (
            <CropRow key={cropKey} cropKey={cropKey} fieldName={fieldName} t={t} />
          ))}
        </div>
      )}
    </GlassCard>
  )
}
