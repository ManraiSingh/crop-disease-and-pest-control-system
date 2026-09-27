/**
 * A crop's ideal band drawn on a fixed axis, so "1200 – 1500 mm" is not just a number
 * — you can see it sits high on the scale compared with a 450 mm crop.
 *
 * The axis is shared by every crop (see SCALES), which is what makes the bars comparable.
 */
export default function RangeMeter({ range, scale, accent, format = (v) => v }) {
  const [min, max] = scale
  const span = max - min || 1

  const clamp = (value) => Math.min(100, Math.max(0, ((value - min) / span) * 100))

  const start = clamp(range[0])
  const end = clamp(range[1])

  return (
    <div className="w-[92px] shrink-0">
      <div className="relative h-1 w-full rounded-full" style={{ background: 'var(--track)' }}>
        <span
          className="absolute top-0 h-1 rounded-full"
          style={{
            left: `${start}%`,
            width: `${Math.max(end - start, 4)}%`,
            background: accent,
          }}
        />
        <span
          className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-solid"
          style={{ left: `${end}%`, background: '#fff', borderColor: accent }}
        />
      </div>

      <div className="mt-1 flex justify-between text-[8.5px] font-semibold" style={{ color: 'var(--track-off-text)' }}>
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  )
}
