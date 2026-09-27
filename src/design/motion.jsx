import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { SPRING } from './springs.js'

/**
 * Motion vocabulary.
 *
 * Everything animated in the app comes from this file, so the whole product moves with one
 * personality instead of each screen inventing its own. The personality is "growth": things
 * rise and settle, they don't slide or spin.
 *
 * Every primitive honours prefers-reduced-motion by collapsing to an instant state change —
 * a farmer who has motion turned off still gets a fully working app.
 */


/* ------------------------------------------------------------------ *
 * Reveal — the workhorse. Rises into place when it enters the viewport.
 * ------------------------------------------------------------------ */
export function Reveal({ children, delay = 0, y = 18, once = true, className = '', ...rest }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-12% 0px -8% 0px' })
  const reduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ ...SPRING.settle, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ *
 * Stagger — a list whose children arrive one after another.
 * ------------------------------------------------------------------ */
export function Stagger({ children, gap = 0.06, delay = 0.04, className = '', ...rest }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="shown"
      variants={{ shown: { transition: { staggerChildren: gap, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, y = 16, className = '', ...rest }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 1 } : { opacity: 0, y },
        shown: { opacity: 1, y: 0, transition: SPRING.settle },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ *
 * Pressable — the tap feedback. Presses in, springs back.
 * Renders a real <button>/<a> so keyboard and screen readers are unaffected.
 * ------------------------------------------------------------------ */
export function Pressable({ as = 'button', children, className = '', scale = 0.96, ...rest }) {
  const Tag = motion[as] ?? motion.button
  const reduce = useReducedMotion()
  return (
    <Tag
      className={className}
      whileTap={reduce ? undefined : { scale }}
      transition={SPRING.snap}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* ------------------------------------------------------------------ *
 * PageTransition — route changes. Content lifts in as the old one drops.
 * ------------------------------------------------------------------ */
export function PageTransition({ routeKey, children, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={routeKey}
        className={className}
        initial={reduce ? false : { opacity: 0, y: 14, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.99 }}
        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

/* ------------------------------------------------------------------ *
 * CountUp — numbers that climb to their value instead of just appearing.
 * Used for readings a farmer is meant to register, not decoration.
 * ------------------------------------------------------------------ */
export function CountUp({ value, duration = 900, suffix = '', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const target = Number.parseFloat(value)
  const numeric = Number.isFinite(target)
  const animate = numeric && !reduce
  const [shown, setShown] = useState(() => (animate ? 0 : target))

  useEffect(() => {
    // Nothing to drive when the value is not a number or motion is reduced — the
    // final figure is derived below instead, so no state is set from here.
    if (!inView || !animate) return
    let frame
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      // ease-out-expo, so it decelerates into the final value
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setShown(target * eased)
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, target, duration, animate])

  if (!numeric) return <span className={className}>{value}</span>

  const decimals = String(value).includes('.') ? 1 : 0
  const display = animate ? shown : target
  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}

/* ------------------------------------------------------------------ *
 * Breathe — a slow, almost-invisible scale loop. Only on the primary
 * call to action, so it reads as "alive", never as a distraction.
 * ------------------------------------------------------------------ */
export function Breathe({ children, className = '' }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      animate={{ scale: [1, 1.035, 1] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

