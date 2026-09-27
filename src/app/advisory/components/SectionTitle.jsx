/**
 * A section heading that actually reads as one: a short accent bar, the title set
 * large and tight, and a muted line underneath carrying the explanation that used
 * to be crammed into the heading itself.
 */
export default function SectionTitle({
  children,
  sub,
  accent = '#a3e635',
  className = '',
  /*
    Drops the bottom margin. A passed-in `mb-0` would not win: two utilities from the
    same group resolve by stylesheet order, not by the order they are written.
  */
  flush = false,
}) {
  return (
    <div className={`${flush ? '' : 'mb-4'} ${className}`}>
      <span
        aria-hidden="true"
        className="mb-2.5 block h-1 w-9 rounded-full"
        style={{ background: accent }}
      />

      <h2 className="text-[23px] leading-[1.15] font-semibold tracking-[-0.005em] text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]">
        {children}
      </h2>

      {sub && (
        <p className="mt-1.5 text-[12px] leading-snug text-white/50">{sub}</p>
      )}
    </div>
  )
}
