import ProgressDots from './ProgressDots.jsx'

const TOTAL_STEPS = 5

/**
 * Responsive wrapper for onboarding steps.
 * - Desktop (lg+): true 50/50 split — illustration fills the full left half on blue, the
 *   entire right half is a solid white panel (no floating card), progress + form centered in it.
 * - Mobile/tablet: the whole screen is locked to the viewport height (`h-dvh`, no scrolling) —
 *   illustration gets a fixed share of that height instead of its own aspect ratio, and the
 *   form panel below compacts its own spacing/type scale to fit the rest without overflowing.
 *   Progress bar floats over the illustration itself; white panel gets rounded top corners.
 *
 * `hero` is a full React node (e.g. a layered scene — ground/bushes/character/clouds), not
 * just an image path — this lets each screen compose its own illustration freely while the
 * shell only provides the sized, clipped panel it sits in.
 */
export default function OnboardingShell({ hero, activeCount, onBack, onForward, children }) {
  return (
    <div className="h-dvh w-full overflow-hidden lg:flex lg:h-auto lg:min-h-screen lg:items-stretch lg:overflow-visible">
      <div className="bg-sky relative h-[65dvh] w-full overflow-hidden sm:h-[60dvh] lg:aspect-auto lg:h-auto lg:w-1/2 lg:flex-shrink-0">
        {hero}

        <div className="absolute inset-x-0 top-2 z-20 flex justify-center px-4 sm:top-4 lg:hidden">
          <div className="flex flex-col items-center gap-0.5 px-4 py-1">
            <ProgressDots activeCount={activeCount} onBack={onBack} onForward={onForward} />
            <span className="text-[9px] font-semibold tracking-wide text-gray-600 uppercase">
              Step {activeCount} of {TOTAL_STEPS}
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-5 flex h-[35dvh] flex-col rounded-t-[28px] bg-white sm:h-[40dvh] lg:mt-0 lg:h-auto lg:flex-1 lg:w-1/2 lg:rounded-none">
        <header className="hidden w-full px-4 pt-6 sm:px-8 lg:block lg:px-16 lg:pt-10">
          <div className="mx-auto flex w-full max-w-md flex-col items-center gap-2 lg:max-w-xl">
            <ProgressDots activeCount={activeCount} onBack={onBack} onForward={onForward} />
            <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Step {activeCount} of {TOTAL_STEPS}
            </span>
          </div>
        </header>

        <div className="flex flex-1 items-center justify-center overflow-hidden px-4 py-3 sm:px-8 sm:py-8 lg:px-16">
          <div className="mx-auto w-full max-w-md lg:max-w-xl">
            {children}

            <p className="mt-2 hidden border-t border-gray-100 pt-2 text-[10px] leading-relaxed text-gray-400 sm:block sm:mt-6 sm:pt-6 sm:text-xs">
              We only use these details to tailor crop and pest alerts to your farm — you can
              update them anytime from your profile, and they're never shared with anyone
              outside the advisory team.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
