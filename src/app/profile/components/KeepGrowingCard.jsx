import { GLASS_SURFACE } from '../../lib/glass.js'
import Icon from '../../lib/icons.jsx'

export default function KeepGrowingCard() {
  return (
    <div className={`${GLASS_SURFACE} mx-4 flex items-center gap-3 rounded-2xl px-4 py-3`}>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-solid border-white/15 bg-white/10">
        <Icon name="sprout" className="h-5 w-5 text-lime-200" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-white">Keep Growing!</p>
        <p className="text-[11px] text-white/60">
          You're doing great. Keep monitoring your fields and improving your farm health.
        </p>
      </div>
      <Icon name="chevronRight" className="h-4 w-4 shrink-0 text-white/35" />
    </div>
  )
}
