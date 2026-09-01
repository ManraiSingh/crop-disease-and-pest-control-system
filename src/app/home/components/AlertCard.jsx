import { Link } from 'react-router-dom'
import { GLASS_SHEEN, GlassCard, SectionHeader } from '../../lib/glass.jsx'
import Icon from '../../lib/icons.jsx'

/** Mock alert — this is what a real disease-detection result would populate. */
export default function AlertCard() {
  return (
    <GlassCard className="p-4">
      <SectionHeader
        title="Attention Needed"
        className="mb-3"
        right={
          <span className="flex items-center gap-1 text-[11px] font-semibold text-lime-300">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-300 shadow-[0_0_8px_rgba(163,230,53,0.9)]" />
            Live
          </span>
        }
      />

      {/* The alert itself keeps its warm tint — it's the one thing on Home meant to break the
          green palette and pull the eye. */}
      <div className="relative overflow-hidden rounded-2xl border border-solid border-amber-200/25 bg-[linear-gradient(115deg,rgba(214,116,46,0.7),rgba(168,74,38,0.62))] p-3.5 backdrop-blur-md">
        <span aria-hidden="true" className={GLASS_SHEEN} />

        <div className="relative flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-solid border-white/25 bg-white/20 text-white backdrop-blur-md">
            <Icon name="shield" className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold tracking-wide text-white/70 uppercase">Disease Detected</p>
            <p className="text-sm font-bold text-white">Early blight</p>
            <p className="text-[11px] text-white/70">Tomato · North Field</p>
          </div>
          <span className="shrink-0 rounded-full border border-solid border-white/25 bg-white/20 px-2.5 py-1 text-[10px] font-bold text-white">
            Medium
          </span>
        </div>

        <div className="relative mt-3">
          <p className="text-[11px] text-white/75">
            <span className="font-bold text-white">18%</span> of field affected
          </p>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/25">
            <div className="h-full w-[18%] rounded-full bg-white/90" />
          </div>
        </div>

        <Link to="/advisory" className="relative mt-3 flex items-center gap-0.5 text-xs font-bold text-white">
          View AI treatment
          <Icon name="chevronRight" className="h-3 w-3" />
        </Link>
      </div>
    </GlassCard>
  )
}
