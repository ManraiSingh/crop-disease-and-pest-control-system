import { GLASS_SHEEN, GLASS_SURFACE_SOFT } from '../../app/lib/glass.js'
import { useT } from '../../i18n/context.js'
import Icon from '../../app/lib/icons.jsx'
import { TOTAL_STEPS, stepNumber, stepPhoto } from '../steps.js'

function RoundButton({ icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      aria-label={label}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-solid border-white/25 bg-white/9 text-white backdrop-blur-md transition disabled:opacity-30"
    >
      <Icon name={icon} className="h-5 w-5" />
    </button>
  )
}

/** The green circle that straddles the top edge of the sheet. */
function SproutBadge() {
  return (
    <span className="absolute -top-7 left-1/2 z-10 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border border-solid border-white/25 bg-[#5b8c2a] shadow-[0_8px_20px_rgba(6,20,12,0.45)]">
      <Icon name="sprout" className="h-7 w-7 text-white" />
    </span>
  )
}

/** Leaf flanked by two hairlines, closing off the bottom of the sheet. */
function LeafRule() {
  return (
    <div aria-hidden="true" className="mt-5 flex items-center justify-center gap-3">
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-lime-300/40" />
      <Icon name="sprout" className="h-4 w-4 text-lime-300/70" />
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-lime-300/40" />
    </div>
  )
}

/**
 * Shared frame for every onboarding step: the step's photo full-bleed, the progress header
 * floating over it, and a dark glass sheet anchored to the bottom holding the form.
 *
 * This renders inside PhoneFrame's fixed 390x844 screen, not the real viewport, so there is no
 * responsive logic here — the sheet sizes to its content and the photo takes whatever is left.
 */
export default function OnboardingShell({ step, title, subtitle, onBack, children }) {
  const current = stepNumber(step)
  const t = useT()

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#16210e]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${stepPhoto(step)}')` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,20,8,0.5)_0%,rgba(10,22,9,0.15)_28%,rgba(8,18,7,0.45)_72%,rgba(6,14,5,0.75)_100%)]"
      />

      <header className="relative z-10 px-4 pt-9">
        <div className="flex items-center gap-3">
          <RoundButton icon="chevronLeft" label={t('onboarding.back')} onClick={onBack} />

          <div className="flex flex-1 items-center gap-2">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full ${
                  i < current ? 'bg-lime-400' : 'bg-white/25'
                }`}
              />
            ))}
          </div>

          <RoundButton icon="chevronRight" label={t('onboarding.next')} />
        </div>

        <p className="mt-3 text-center text-[11px] font-semibold tracking-[0.18em] text-white/80 uppercase">
          {t('onboarding.step', { n: current, total: TOTAL_STEPS })}
        </p>
      </header>

      <div className="relative z-10 mt-auto px-3 pb-3">
        <SproutBadge />

        <div className={`${GLASS_SURFACE_SOFT} rounded-3xl px-5 pt-10 pb-5`}>
          <span aria-hidden="true" className={GLASS_SHEEN} />

          <h1 className="relative text-2xl leading-tight font-bold text-white">{title}</h1>
          {subtitle && <p className="relative mt-1.5 text-xs text-white/65">{subtitle}</p>}

          <div className="relative mt-5">{children}</div>

          <div className="relative">
            <LeafRule />
          </div>
        </div>
      </div>
    </div>
  )
}
