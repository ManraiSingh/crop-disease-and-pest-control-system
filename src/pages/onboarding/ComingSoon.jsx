import { Link } from 'react-router-dom'

export default function ComingSoon() {
  return (
    <div className="bg-sky flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-leaf-dark text-2xl font-bold">Next step coming soon</h1>
      <p className="max-w-sm text-sm text-gray-700">
        The crop-details screen hasn&apos;t been built yet — this placeholder confirms the flow
        so far works end to end.
      </p>
      <Link to="/onboarding/about-you" className="text-leaf-dark text-sm font-bold underline">
        Back to start
      </Link>
    </div>
  )
}
