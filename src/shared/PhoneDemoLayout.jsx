import { Link, Outlet } from 'react-router-dom'
import PhoneFrame from './PhoneFrame.jsx'

/**
 * Wraps everything past the landing page's "Set up my farm" button in a phone mockup —
 * this is a product demo, not a responsive site, so the content behind the glass is
 * always the fixed mobile layout regardless of the actual browser window size.
 */
export default function PhoneDemoLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-neutral-100 py-10">
      <Link to="/" className="text-sm font-medium text-gray-500 transition hover:text-gray-900">
        ← Back to site
      </Link>
      <PhoneFrame>
        <Outlet />
      </PhoneFrame>
      <p className="text-xs text-gray-400">Demo preview — this is how the app looks on a phone</p>
    </div>
  )
}
