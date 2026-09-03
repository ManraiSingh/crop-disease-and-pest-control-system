import { Link, Outlet } from 'react-router-dom'
import PhoneFrame from './PhoneFrame.jsx'

/**
 * Wraps everything past the landing page's "Set up my farm" button in a phone mockup —
 * this is a product demo, not a responsive site, so the content behind the glass is
 * always the fixed mobile layout regardless of the actual browser window size.
 */
export default function PhoneDemoLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-neutral-100 py-12">
      {/* The frame is laid out at a fixed 418x872; scaling it up preserves the screen ratio and
          every inner offset. The wrapper reserves the scaled box so the page still sizes right. */}
      <div className="flex h-[1003px] w-[481px] shrink-0 items-center justify-center">
        <div className="scale-[1.15]">
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
