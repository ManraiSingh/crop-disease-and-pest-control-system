import { GLASS_SHEEN } from '../../lib/glass.js'
import Icon from '../../lib/icons.jsx'

export default function AlertBanner() {
  return (
    <button
      type="button"
      className="relative flex w-full items-start gap-3 overflow-hidden rounded-3xl border border-solid border-amber-200/25 bg-[linear-gradient(115deg,rgba(214,116,46,0.82),rgba(168,74,38,0.78))] p-4 text-left shadow-[0_18px_40px_rgba(60,20,6,0.4)] backdrop-blur-xl"
    >
      <span aria-hidden="true" className={GLASS_SHEEN} />
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-solid border-white/25 bg-white/20 text-white backdrop-blur-md">
        <Icon name="warning" className="h-5 w-5" />
      </span>

      <div className="relative min-w-0 flex-1">
        <p className="text-[10px] font-bold tracking-wide text-white/70 uppercase">Important Alert</p>
        <p className="text-sm font-bold text-white">High Temperature Warning</p>
        <p className="mt-0.5 text-xs text-white/75">
          Maximum temperature may reach 34°C in the next 2 days. Protect your crops from heat stress.
        </p>
        <span className="mt-2 inline-flex items-center gap-0.5 text-xs font-bold text-white">
          View full advisory
          <Icon name="chevronRight" className="h-3 w-3" />
        </span>
      </div>

      <div className="relative flex shrink-0 flex-col items-center gap-1 text-white/80">
        <div className="flex items-center gap-1">
          <Icon name="sun" className="h-5 w-5" />
          <Icon name="thermometer" className="h-6 w-6" />
        </div>
      </div>
    </button>
  )
}
