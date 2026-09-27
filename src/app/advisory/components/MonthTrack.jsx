const LETTERS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

/**
 * The crop's months across the whole year, with the active ones lit.
 *
 * A five-month window would read more cleanly, but several of these crops are sown in
 * two or three separate seasons — maize goes in around Jun, Oct and Jan — and a window
 * can only ever show one of them. The full year is the only honest axis.
 */
export default function MonthTrack({ months, accent }) {
  const active = new Set(months)

  return (
    <div className="w-[92px] shrink-0">
      <div className="flex items-center justify-between">
        {LETTERS.map((letter, index) => {
          const on = active.has(index + 1)
          return (
            <span
              key={`${letter}-${index}`}
              className="h-1 w-1 rounded-full"
              style={{ background: on ? accent : 'var(--track-off)' }}
            />
          )
        })}
      </div>

      <div className="mt-1 flex items-center justify-between">
        {LETTERS.map((letter, index) => (
          <span
            key={`${letter}-label-${index}`}
            className="text-[7.5px] font-semibold"
            style={{ color: active.has(index + 1) ? accent : 'var(--track-off-text)' }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  )
}
