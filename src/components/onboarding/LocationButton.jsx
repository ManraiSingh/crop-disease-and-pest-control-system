function PinIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth={2} />
    </svg>
  )
}

export default function LocationButton({ label = 'Use current location', onClick, status }) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="border-leaf-dark bg-location-bg text-leaf-dark flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-solid px-4 py-2.5 text-xs font-bold tracking-wide uppercase transition hover:brightness-95 sm:px-5 sm:py-4 sm:text-sm"
      >
        <PinIcon className="h-4 w-4" />
        {label}
      </button>
      {status && <p className="mt-2 text-center text-xs text-gray-500 sm:text-left">{status}</p>}
    </div>
  )
}
