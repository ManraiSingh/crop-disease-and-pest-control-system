export default function PrimaryButton({ children, ...buttonProps }) {
  return (
    <button
      type="submit"
      {...buttonProps}
      className="bg-leaf flex w-full items-center justify-center gap-2 rounded-2xl border-0 py-2.5 text-sm font-bold text-white uppercase transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
