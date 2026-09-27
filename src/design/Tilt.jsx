import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'

/**
 * A card that tilts toward the pointer, with a glare that tracks across it.
 *
 * This is what turns a rectangle into an object: the card rotates on two axes, and anything
 * wearing `.layer-1/2/3` inside it sits at a different depth, so the parallax between them
 * reads as volume rather than skew. The parent must carry `.scene` for the perspective.
 *
 * On touch there is no pointer to follow, so the tilt simply never fires — the card is still
 * fully usable, it just sits flat. Reduced motion does the same.
 */
export function TiltCard({
  children,
  className = '',
  max = 9,
  glare = true,
  style,
  ...rest
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  // -0.5 .. 0.5 across the card
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const rotX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 220, damping: 22 })
  const rotY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 220, damping: 22 })

  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })

  function handleMove(event) {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (event.clientX - r.left) / r.width
    const y = (event.clientY - r.top) / r.height
    px.set(x - 0.5)
    py.set(y - 0.5)
    if (glare) setGlarePos({ x: x * 100, y: y * 100 })
  }

  function handleLeave() {
    px.set(0)
    py.set(0)
    setGlarePos({ x: 50, y: 50 })
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`tilt-card ${className}`}
      style={{ rotateX: reduce ? 0 : rotX, rotateY: reduce ? 0 : rotY, ...style }}
      {...rest}
    >
      {children}
      {glare && (
        <span
          aria-hidden="true"
          className="glare"
          style={{ '--gx': `${glarePos.x}%`, '--gy': `${glarePos.y}%` }}
        />
      )}
    </motion.div>
  )
}

/**
 * Radial gauge.
 *
 * Shows where a crop's comfortable band sits on the whole possible scale, rather than just
 * printing the number — so "20–27 °C" becomes a visible slice of an arc, and two crops can be
 * compared at a glance. The arc draws itself on mount via stroke-dashoffset, which is a real
 * SVG property and animates reliably even when a JS frame loop stalls.
 */
export function Gauge({ from, to, scale, tone, children, size = 64, delay = 0 }) {
  const R = 26
  const C = 2 * Math.PI * R
  // 270° of sweep, leaving a gap at the bottom like a dial
  const SWEEP = 0.75

  const lo = Math.max(0, Math.min(1, (from - scale[0]) / (scale[1] - scale[0])))
  const hi = Math.max(0, Math.min(1, (to - scale[0]) / (scale[1] - scale[0])))
  const span = Math.max(hi - lo, 0.04)

  const trackLen = C * SWEEP
  const bandLen = trackLen * span
  const bandOffset = trackLen * lo

  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 64 64" className="absolute inset-0 -rotate-[225deg]" aria-hidden="true">
        {/* the whole possible range */}
        <circle
          cx="32"
          cy="32"
          r={R}
          fill="none"
          stroke="var(--on-pitch-line)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${trackLen} ${C}`}
        />
        {/* this crop's band within it */}
        <motion.circle
          cx="32"
          cy="32"
          r={R}
          fill="none"
          stroke={tone}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${bandLen} ${C}`}
          initial={{ strokeDashoffset: -trackLen }}
          animate={{ strokeDashoffset: -bandOffset }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
        />
      </svg>
      <span className="relative" style={{ color: tone }}>
        {children}
      </span>
    </span>
  )
}

/** Rising motes. Purely atmospheric — the garden has air in it. */
export function Pollen({ count = 14 }) {
  const reduce = useReducedMotion()
  if (reduce) return null

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }, (_, i) => {
        const left = (i * 37) % 100
        const size = 2 + (i % 3)
        return (
          <span
            key={i}
            className="pollen"
            style={{
              left: `${left}%`,
              bottom: `-${6 + (i % 5) * 4}%`,
              width: size,
              height: size,
              background: i % 3 === 0 ? 'var(--lime)' : 'var(--green)',
              '--pd': `${16 + (i % 7) * 3}s`,
              '--pdel': `${(i % 9) * 1.7}s`,
              '--px': `${((i % 5) - 2) * 14}px`,
              '--po': 0.28 + (i % 4) * 0.08,
            }}
          />
        )
      })}
    </div>
  )
}
