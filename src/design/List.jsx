import { motion } from 'motion/react'
import { SPRING } from './springs.js'

/**
 * Grouped-list primitives.
 *
 * Modelled on the way Apple builds settings and detail screens: content sits in rounded inset
 * groups on a plain ground, rows are separated by hairlines that start after the icon rather
 * than spanning the full width, and colour is reserved for meaning. The restraint is the
 * point — the deck on Home is the loud surface, so every other tab stays quiet and legible.
 */

/** Section caption above a group. Small, upper-case, muted — never a heavy heading. */
export function GroupLabel({ children, className = '' }) {
  return (
    <p
      className={`t-label px-5 pb-2 text-[11px] uppercase ${className}`}
      style={{ color: 'var(--ink-soft)', letterSpacing: '0.08em' }}
    >
      {children}
    </p>
  )
}

/** Rounded inset group. Rows inside are separated automatically. */
export function Group({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING.settle, delay }}
      className={`mx-3 overflow-hidden rounded-[18px] ${className}`}
      style={{ background: 'var(--paper-dim)', border: '1px solid var(--paper-edge)' }}
    >
      {children}
    </motion.div>
  )
}

/**
 * One row. `leading` is an icon tile, `value` sits at the right, `chevron` marks it as
 * navigable. Rows render as a button only when they actually do something — a static row
 * should not be focusable.
 */
export function Row({
  leading,
  title,
  subtitle,
  value,
  chevron = false,
  onClick,
  danger = false,
  last = false,
}) {
  const Tag = onClick ? motion.button : 'div'
  const interactive = onClick ? { whileTap: { scale: 0.99 }, transition: SPRING.snap, type: 'button' } : {}

  return (
    <Tag
      {...interactive}
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-3 text-left"
      style={{ background: 'transparent', border: 0 }}
    >
      {leading && (
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px]"
          style={{
            background: danger
              ? 'color-mix(in srgb, var(--alarm) 14%, transparent)'
              : 'color-mix(in srgb, var(--green) 14%, transparent)',
            color: danger ? 'var(--alarm)' : 'var(--green)',
          }}
        >
          {leading}
        </span>
      )}

      <span className="min-w-0 flex-1">
        <span
          className="t-label block truncate text-[15px]"
          style={{ color: danger ? 'var(--alarm)' : 'var(--ink)' }}
        >
          {title}
        </span>
        {subtitle && (
          <span className="block truncate text-[12px]" style={{ color: 'var(--ink-soft)' }}>
            {subtitle}
          </span>
        )}
      </span>

      {value != null && (
        <span className="t-num shrink-0 text-[15px]" style={{ color: 'var(--ink-mid)' }}>
          {value}
        </span>
      )}

      {chevron && (
        <span aria-hidden="true" className="shrink-0" style={{ color: 'var(--ink-soft)' }}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}

      {/* Hairline, inset to start under the text rather than the icon. */}
      {!last && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 h-px"
          style={{ left: leading ? 60 : 16, background: 'var(--paper-edge)' }}
        />
      )}
    </Tag>
  )
}

/** Wrapper that gives each row a positioning context for its hairline. */
export function Rows({ children }) {
  return (
    <div className="flex flex-col">
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div key={i} className="relative">
              {child}
            </div>
          ))
        : <div className="relative">{children}</div>}
    </div>
  )
}

/**
 * Large title that shrinks as the screen scrolls, the way a navigation bar collapses. Takes
 * the scroll position rather than owning a listener, so the page stays in control of its own
 * scroller.
 */
export function LargeTitle({ children, subtitle, className = '' }) {
  return (
    <div className={`px-5 pt-1 pb-4 ${className}`}>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="t-display text-[34px]"
        style={{ color: 'var(--ink)' }}
      >
        {children}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="mt-1 text-[13px]"
          style={{ color: 'var(--ink-mid)' }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

/** Segmented control — the iOS filter pattern, with the selection sliding between options. */
export function Segmented({ options, value, onChange, className = '' }) {
  return (
    <div
      className={`mx-3 flex gap-1 rounded-[14px] p-1 ${className}`}
      style={{ background: 'var(--paper-dim)', border: '1px solid var(--paper-edge)' }}
      role="tablist"
    >
      {options.map((opt) => {
        const active = opt.key === value
        return (
          <button
            key={opt.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.key)}
            className="relative flex-1 rounded-[10px] px-2 py-1.5 text-[12px]"
            style={{ background: 'transparent', border: 0 }}
          >
            {active && (
              <motion.span
                layoutId="segmented-pill"
                className="absolute inset-0 rounded-[10px]"
                style={{ background: 'var(--paper)', boxShadow: 'var(--lift-sm)' }}
                transition={SPRING.settle}
              />
            )}
            <span
              className="t-label relative"
              style={{ color: active ? 'var(--ink)' : 'var(--ink-soft)' }}
            >
              {opt.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
