import { GlassCard } from './glass.jsx'
import Icon from './icons.jsx'

/** Shared glass empty-state for tabs that don't have a real design yet — currently just Scan. */
export default function ComingSoon({ icon, title, description }) {
  return (
    <div className="flex h-full items-center justify-center px-6">
      <GlassCard className="w-full p-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-solid border-white/15 bg-white/10">
            <Icon name={icon} className="h-8 w-8 text-lime-300" />
          </span>
          <h1 className="text-lg font-bold text-white">{title}</h1>
          <p className="text-xs text-white/65">{description}</p>
        </div>
      </GlassCard>
    </div>
  )
}
