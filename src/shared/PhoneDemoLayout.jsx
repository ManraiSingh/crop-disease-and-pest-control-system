import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import PhoneFrame from './PhoneFrame.jsx'

/** PhoneFrame's own fixed layout box — everything inside it is positioned against these. */
const FRAME_WIDTH = 418
const FRAME_HEIGHT = 872

/** Breathing room above and below the phone, and a ceiling so it can't get comically large. */
const VERTICAL_MARGIN = 72
const MAX_SCALE = 1.3

function fitScale() {
  if (typeof window === 'undefined') return 1
  return Math.min(MAX_SCALE, (window.innerHeight - VERTICAL_MARGIN) / FRAME_HEIGHT)
}

/**
 * Wraps everything past the landing page's "Set up my farm" button in a phone mockup —
 * this is a product demo, not a responsive site, so the content behind the glass is
 * always the fixed mobile layout regardless of the actual browser window size.
 *
 * The frame is scaled rather than resized: its measurements are all fixed pixels, so one
 * transform keeps the screen ratio and every inner offset exact. Scaling to the viewport
 * height is what keeps the phone centred on screen instead of overflowing into a scroll.
 */
export default function PhoneDemoLayout() {
  const [scale, setScale] = useState(fitScale)

  useEffect(() => {
    const onResize = () => setScale(fitScale())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-neutral-100">
      {/* Transforms don't affect layout, so the wrapper reserves the scaled box. */}
      <div
        className="flex items-center justify-center"
        style={{ width: FRAME_WIDTH * scale, height: FRAME_HEIGHT * scale }}
      >
        <div style={{ transform: `scale(${scale})` }}>
          <PhoneFrame>
            <Outlet />
          </PhoneFrame>
        </div>
      </div>

      <Link
        to="/"
        className="fixed bottom-5 left-5 rounded-full border border-solid border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition hover:text-gray-900"
      >
        ← Back to site
      </Link>
    </div>
  )
}
