import { useEffect, useState } from 'react'
import Icon from '../app/lib/icons.jsx'

/** The whole sequence, start to gone. Beats inside it live in styles.css. */
const LAUNCH_MS = 2100

/** Anyone who has asked for less motion gets the app, not the show. */
function wantsMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return true
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * The opening titles.
 *
 * Mounted inside the phone frame alongside the router outlet, so it plays once when
 * the app is opened and never again on a tab change — the screen underneath has
 * already rendered by the time this lifts off it.
 *
 * Tapping skips it. An animation nobody can get past stops being an animation and
 * becomes a wait.
 */
export default function AppLaunch() {
  const [playing, setPlaying] = useState(wantsMotion)

  useEffect(() => {
    if (!playing) return undefined

    const timer = setTimeout(() => setPlaying(false), LAUNCH_MS)

    return () => clearTimeout(timer)
  }, [playing])

  if (!playing) return null

  return (
    <div
      className="launch"
      role="presentation"
      onClick={() => setPlaying(false)}
    >
      <span aria-hidden="true" className="launch-sweep" />

      <div className="relative flex flex-col items-center">
        <span aria-hidden="true" className="launch-ring" />
        <span aria-hidden="true" className="launch-ring" />

        <span className="launch-mark relative flex h-[88px] w-[88px] items-center justify-center rounded-full bg-lime-400 shadow-[0_18px_50px_rgba(163,230,53,0.4)]">
          <Icon name="leaf" className="h-11 w-11 text-[#12200c]" />
        </span>

        <p className="launch-word relative mt-9 text-[30px] leading-none font-semibold tracking-[-0.03em] text-white">
          Crop Care
        </p>

        <p className="launch-sub relative mt-3 text-[10px] font-semibold tracking-[0.26em] text-lime-300 uppercase">
          Scan · Understand · Act
        </p>
      </div>
    </div>
  )
}
