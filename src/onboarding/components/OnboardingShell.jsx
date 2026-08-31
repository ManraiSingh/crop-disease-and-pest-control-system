import ProgressDots from "./ProgressDots.jsx";

const TOTAL_STEPS = 5;

/**
 * Fixed mobile-only layout for onboarding steps — this renders inside PhoneFrame's fixed
 * 390x844 screen, not the real browser viewport, so there is no responsive breakpoint logic
 * here at all: sizes are percentages of that fixed-height parent, not `dvh`/viewport units.
 *
 * Illustration takes the top 65% (progress bar floats over it), white sheet below takes the
 * rest with rounded top corners.
 *
 * `hero` is a full React node (e.g. a layered scene — ground/bushes/character/clouds), not
 * just an image path — this lets each screen compose its own illustration freely while the
 * shell only provides the sized, clipped panel it sits in.
 */
export default function OnboardingShell({
  hero,
  activeCount,
  onBack,
  onForward,
  children,
}) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="bg-sky relative h-[65%] w-full shrink-0 overflow-hidden">
        {hero}

        <div className="absolute inset-x-0 top-6 z-20 flex justify-center px-4">
          <div className="flex flex-col items-center gap-0.5 px-4 py-1">
            <ProgressDots
              activeCount={activeCount}
              onBack={onBack}
              onForward={onForward}
            />
            <span className="text-[9px] font-semibold tracking-wide text-gray-600 uppercase">
              Step {activeCount} of {TOTAL_STEPS}
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-5 flex flex-1 flex-col rounded-t-[28px] bg-white">
        <div className="flex flex-1 items-center justify-center overflow-hidden px-4 py-3">
          <div className="mx-auto w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
