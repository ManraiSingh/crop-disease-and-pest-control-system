import Icon from '../../lib/icons.jsx'
import { useT } from '../../../i18n/context.js'

/**
 * Read-aloud control for a block of advice.
 *
 * Renders nothing when the device has no speech synthesis, rather than offering a
 * button that would do nothing. `build` is a function so the script is only assembled
 * when someone actually asks to hear it.
 */
export default function SpeakButton({ build, speech, className = '' }) {
  const t = useT()

  if (!speech.supported) return null

  const active = speech.speaking

  return (
    <button
      type="button"
      onClick={() => (active ? speech.stop() : speech.speak(build()))}
      aria-label={t(active ? 'advisory.stopListening' : 'advisory.listen')}
      className={`flex shrink-0 items-center gap-1.5 rounded-full border border-solid px-3 py-1.5 text-[11px] font-semibold transition ${
        active
          ? 'border-lime-300/60 bg-lime-400/20 text-white'
          : 'border-white/15 bg-white/8 text-white/70'
      } ${className}`}
    >
      <Icon name={active ? 'stopCircle' : 'speaker'} className="h-3.5 w-3.5" />
      {t(active ? 'advisory.stop' : 'advisory.listen')}
    </button>
  )
}
