const TOTAL_STEPS = 5

function ChevronIcon({ direction = 'left', className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d={direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ProgressDots({ activeCount, onBack, onForward }) {
  return (
    <div className="flex w-full items-center justify-center gap-3 px-4">
      <button
        type="button"
        onClick={onBack}
        aria-label="Previous step"
        className="text-leaf-dark rounded-full border-0 bg-transparent p-1 transition hover:opacity-70 disabled:opacity-30"
        disabled={!onBack}
      >
        <ChevronIcon direction="left" className="text-leaf-dark h-5 w-5" />
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <span
            key={i}
            className={`h-2 w-8 rounded-full transition-colors ${
              i < activeCount ? 'bg-leaf-dark' : 'bg-dot-inactive'
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onForward}
        aria-label="Next step"
        className="text-leaf-dark rounded-full border-0 bg-transparent p-1 transition hover:opacity-70 disabled:opacity-30"
        disabled={!onForward}
      >
        <ChevronIcon direction="right" className="text-leaf-dark h-5 w-5" />
      </button>
    </div>
  )
}
