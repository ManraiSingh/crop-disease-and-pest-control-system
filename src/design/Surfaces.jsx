import { motion } from 'motion/react'
import { Pressable } from './motion.jsx'

/**
 * Surfaces — the shape language.
 *
 * Two materials only: GROUND (deep planted green, the page itself) and BONE (the light
 * panels that sit in it). What makes it read as one system is that panels *notch* into the
 * ground rather than floating above it — the corner curves the wrong way, the way a cleared
 * field cuts into a treeline.
 */

/** Light panel. `notch` picks which corner cuts back into the ground behind it. */
export function Panel({
  notch = 'tr',
  tone = 'bone',
  className = '',
  children,
  as = 'section',
  ...rest
}) {
  const Tag = as
  const fill = tone === 'bone' ? 'var(--bone-50)' : 'var(--canopy-700)'
  const radius = notch === 'tr' ? 'rounded-[30px] rounded-tr-none' : 'rounded-[30px]'

  return (
    <Tag
      className={`relative ${radius} ${className}`}
      style={{ background: fill, ...rest.style }}
      {...rest}
    >
      {notch && <span aria-hidden="true" className={`notch-${notch}`} style={{ '--notch-fill': fill }} />}
      {children}
    </Tag>
  )
}

/**
 * A card sitting on the green ground. Slightly lighter than the page so it separates without
 * a border, with an inner top highlight so the edge catches light like a leaf.
 */
export function GroundCard({ className = '', children, tone = 'raised', ...rest }) {
  const bg =
    tone === 'raised'
      ? 'linear-gradient(168deg, var(--canopy-700) 0%, var(--canopy-800) 100%)'
      : 'linear-gradient(168deg, var(--canopy-800) 0%, var(--canopy-850) 100%)'

  return (
    <section
      className={`relative overflow-hidden rounded-[26px] ${className}`}
      style={{ background: bg, boxShadow: 'var(--lift-md)', ...rest.style }}
      {...rest}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)' }}
      />
      {children}
    </section>
  )
}

/** Section heading. Cream over green, with a rule that grows in from the label. */
export function SectionLabel({ children, action = null, onAction, className = '' }) {
  return (
    <div className={`flex items-end justify-between gap-3 ${className}`}>
      <h2
        className="display text-[15px] tracking-[0.01em]"
        style={{ color: 'var(--butter-200)', fontWeight: 700 }}
      >
        {children}
      </h2>
      {action && (
        <Pressable
          type="button"
          onClick={onAction}
          className="shrink-0 border-0 bg-transparent p-0 text-[11px] font-semibold"
          style={{ color: 'var(--sprout-400)', fontFamily: 'var(--font-body)' }}
        >
          {action}
        </Pressable>
      )}
    </div>
  )
}

/** Counter pill from the reference — a filled dot with a number, for tab counts. */
export function CountPill({ value, active = false }) {
  return (
    <motion.span
      layout
      className="grid h-[22px] min-w-[22px] place-items-center rounded-full px-1.5 text-[10px] font-bold"
      style={{
        background: active ? 'var(--ink-900)' : 'rgba(255,255,255,0.14)',
        color: active ? 'var(--butter-200)' : 'rgba(255,255,255,0.7)',
        fontFamily: 'var(--font-body)',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {value}
    </motion.span>
  )
}

/* ------------------------------------------------------------------ *
 * Illustrations — drawn here rather than shipped as images, so they
 * recolour with the theme, scale without blur, and cost no bytes.
 * ------------------------------------------------------------------ */

/** Layered leaf cluster. Used as the ambient mark behind headings. */
export function LeafCluster({ className = '', opacity = 1 }) {
  return (
    <svg viewBox="0 0 220 220" className={className} aria-hidden="true" style={{ opacity }}>
      <defs>
        <linearGradient id="lc-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--sprout-400)" />
          <stop offset="100%" stopColor="var(--canopy-500)" />
        </linearGradient>
        <linearGradient id="lc-b" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--canopy-400)" />
          <stop offset="100%" stopColor="var(--canopy-600)" />
        </linearGradient>
      </defs>
      <path
        d="M110 196C110 196 46 172 40 112C36 68 62 34 110 24C158 34 184 68 180 112C174 172 110 196 110 196Z"
        fill="url(#lc-b)"
        opacity="0.55"
      />
      <path
        d="M110 188C110 188 62 166 58 118C55 82 76 54 110 46C144 54 165 82 162 118C158 166 110 188 110 188Z"
        fill="url(#lc-a)"
      />
      <path d="M110 46V188" stroke="var(--canopy-800)" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      <path
        d="M110 82L84 66M110 110L78 92M110 138L84 122M110 82L136 66M110 110L142 92M110 138L136 122"
        stroke="var(--canopy-800)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  )
}

/** A single sprout breaking soil — the "healthy / growing" mark. */
export function Sprout({ className = '' }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <path d="M22 96C46 88 74 88 98 96" stroke="var(--canopy-600)" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M60 96V52" stroke="var(--sprout-600)" strokeWidth="5" strokeLinecap="round" />
      <path
        d="M60 62C60 62 38 62 32 44C50 38 60 48 60 62Z"
        fill="var(--sprout-500)"
      />
      <path
        d="M60 54C60 54 80 50 84 32C66 28 58 40 60 54Z"
        fill="var(--sprout-400)"
      />
    </svg>
  )
}

/** Magnifier over a leaf — the scan mark. */
export function ScanLeaf({ className = '' }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" fill="none">
      <path
        d="M78 26C50 28 32 44 32 68C32 76 34 82 37 87C63 84 80 66 82 40L78 26Z"
        fill="var(--sprout-500)"
        opacity="0.9"
      />
      <path d="M34 90C44 72 56 60 74 48" stroke="var(--canopy-800)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="72" cy="72" r="24" stroke="var(--butter-200)" strokeWidth="6" />
      <path d="M90 90L104 104" stroke="var(--butter-200)" strokeWidth="7" strokeLinecap="round" />
    </svg>
  )
}

/** Soil layers with a moisture drop — the soil-reading mark. */
export function SoilLayers({ className = '' }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" fill="none">
      <path d="M14 52H106" stroke="var(--canopy-500)" strokeWidth="6" strokeLinecap="round" />
      <path d="M20 74H100" stroke="var(--canopy-600)" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
      <path d="M28 94H92" stroke="var(--canopy-700)" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
      <path
        d="M60 14C60 14 76 32 76 42C76 51 69 58 60 58C51 58 44 51 44 42C44 32 60 14 60 14Z"
        fill="var(--sky)"
      />
    </svg>
  )
}
