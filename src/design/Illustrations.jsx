import { motion } from 'motion/react'

/**
 * Illustration set.
 *
 * These are SVG, not rendered 3D — but they are built the way a clay render is lit: a base
 * form, a warm highlight from upper-left, a cool occlusion where forms meet, and a contact
 * shadow on the ground. That gives volume without shipping a single bitmap, so they stay
 * crisp on any screen, recolour with the theme, and cost nothing to load.
 *
 * Every one is decorative and marked aria-hidden; nothing here carries meaning a farmer needs.
 */

/** Shared gradient + shadow definitions, mounted once per illustration. */
function Defs({ id, from, to, light = '#ffffff' }) {
  return (
    <defs>
      <linearGradient id={`${id}-body`} x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor={from} />
        <stop offset="100%" stopColor={to} />
      </linearGradient>
      <radialGradient id={`${id}-spec`} cx="0.3" cy="0.22" r="0.5">
        <stop offset="0%" stopColor={light} stopOpacity="0.85" />
        <stop offset="100%" stopColor={light} stopOpacity="0" />
      </radialGradient>
      <filter id={`${id}-soft`} x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
    </defs>
  )
}

/** Contact shadow that anchors a form to the ground. */
function Ground({ id, cx = 100, cy = 176, rx = 56, ry = 10, opacity = 0.18 }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#0d2a14" opacity={opacity} filter={`url(#${id}-soft)`} />
}

/* ------------------------------------------------------------------ *
 * A potted seedling. The mascot of the whole app.
 * ------------------------------------------------------------------ */
export function PottedSprout({ className = '', animate = true }) {
  const leaf = animate
    ? { animate: { rotate: [0, -3, 0, 3, 0] }, transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' } }
    : {}

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <Defs id="ps" from="#b6f24a" to="#3f9b45" />
      <defs>
        <linearGradient id="ps-pot" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f6b878" />
          <stop offset="100%" stopColor="#c9743c" />
        </linearGradient>
      </defs>
      <Ground id="ps" />

      {/* stem + leaves */}
      <motion.g style={{ originX: '100px', originY: '150px' }} {...leaf}>
        <path d="M100 148V88" stroke="#4aa653" strokeWidth="7" strokeLinecap="round" />
        <path d="M100 108C100 108 66 106 58 76C88 66 100 86 100 108Z" fill="url(#ps-body)" />
        <path d="M100 96C100 96 132 88 138 58C110 52 98 74 100 96Z" fill="url(#ps-body)" opacity="0.92" />
        <ellipse cx="78" cy="88" rx="12" ry="7" fill="url(#ps-spec)" />
      </motion.g>

      {/* pot */}
      <path d="M62 132H138L130 176C129 182 124 186 118 186H82C76 186 71 182 70 176L62 132Z" fill="url(#ps-pot)" />
      <path d="M58 122H142V136C142 140 139 143 135 143H65C61 143 58 140 58 136V122Z" fill="#e8a066" />
      <path d="M58 122H142V128H58V122Z" fill="#ffffff" opacity="0.28" />
      <ellipse cx="86" cy="152" rx="10" ry="16" fill="url(#ps-spec)" opacity="0.5" />
      {/* soil */}
      <ellipse cx="100" cy="136" rx="36" ry="6" fill="#6b4630" />
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * A magnifier over a leaf — the diagnosis mark.
 * ------------------------------------------------------------------ */
export function LeafLens({ className = '', animate = true }) {
  const sweep = animate
    ? { animate: { x: [0, 8, 0], y: [0, -6, 0] }, transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }
    : {}

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <Defs id="ll" from="#9fe84f" to="#2f8b3f" />
      <defs>
        <linearGradient id="ll-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#bfe0ff" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <Ground id="ll" cy="172" rx="50" />

      {/* leaf */}
      <path
        d="M142 46C88 50 52 78 52 122C52 136 57 148 64 156C118 150 148 114 150 62L142 46Z"
        fill="url(#ll-body)"
      />
      <path d="M62 158C78 128 100 106 136 82" stroke="#1f6b31" strokeWidth="6" strokeLinecap="round" opacity="0.55" />
      <ellipse cx="96" cy="86" rx="26" ry="14" fill="url(#ll-spec)" transform="rotate(-38 96 86)" />

      {/* lens */}
      <motion.g {...sweep}>
        <circle cx="118" cy="112" r="34" fill="url(#ll-glass)" />
        <circle cx="118" cy="112" r="34" stroke="#12351c" strokeWidth="8" fill="none" />
        <circle cx="118" cy="112" r="34" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M143 137L163 157" stroke="#12351c" strokeWidth="11" strokeLinecap="round" />
        <path d="M104 98C110 92 118 90 126 92" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
      </motion.g>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Two farmers talking — the community mark.
 * ------------------------------------------------------------------ */
export function TalkingFarmers({ className = '', animate = true }) {
  const bob = (delay) =>
    animate
      ? { animate: { y: [0, -3, 0] }, transition: { duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay } }
      : {}

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <Defs id="tf" from="#8fe04a" to="#2f8b3f" />
      <defs>
        <linearGradient id="tf-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7fc6ff" />
          <stop offset="100%" stopColor="#3b7fc4" />
        </linearGradient>
        <linearGradient id="tf-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd06b" />
          <stop offset="100%" stopColor="#e09a2e" />
        </linearGradient>
      </defs>
      <Ground id="tf" cy="180" rx="62" opacity="0.14" />

      {/* left figure */}
      <motion.g {...bob(0)}>
        <path d="M44 178V142C44 126 54 116 68 116C82 116 92 126 92 142V178Z" fill="url(#tf-a)" />
        <circle cx="68" cy="98" r="19" fill="#f3c9a0" />
        <path d="M49 96C49 82 57 74 68 74C79 74 87 82 87 96Z" fill="#3a2a20" />
        <ellipse cx="60" cy="130" rx="8" ry="13" fill="#ffffff" opacity="0.22" />
      </motion.g>

      {/* right figure */}
      <motion.g {...bob(0.6)}>
        <path d="M108 178V146C108 130 118 120 132 120C146 120 156 130 156 146V178Z" fill="url(#tf-b)" />
        <circle cx="132" cy="102" r="18" fill="#e8b489" />
        <path d="M114 100C114 86 122 79 132 79C142 79 150 86 150 100Z" fill="#2f2119" />
        <ellipse cx="124" cy="134" rx="7" ry="12" fill="#ffffff" opacity="0.22" />
      </motion.g>

      {/* speech bubble between them */}
      <motion.g
        animate={animate ? { scale: [1, 1.06, 1], y: [0, -2, 0] } : undefined}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originX: '100px', originY: '58px' }}
      >
        <rect x="70" y="34" width="62" height="40" rx="14" fill="url(#tf-body)" />
        <path d="M94 74L100 88L108 74Z" fill="#2f8b3f" />
        <circle cx="86" cy="54" r="4" fill="#ffffff" opacity="0.9" />
        <circle cx="101" cy="54" r="4" fill="#ffffff" opacity="0.9" />
        <circle cx="116" cy="54" r="4" fill="#ffffff" opacity="0.9" />
      </motion.g>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * A stack of seed packets — the market mark.
 * ------------------------------------------------------------------ */
export function SeedPackets({ className = '' }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <Defs id="sp" from="#b6f24a" to="#3f9b45" />
      <Ground id="sp" cy="174" rx="58" />
      <g transform="rotate(-8 100 120)">
        <rect x="52" y="76" width="70" height="92" rx="10" fill="#e9d9b6" />
        <rect x="52" y="76" width="70" height="26" rx="10" fill="url(#sp-body)" />
        <circle cx="87" cy="128" r="18" fill="#c9b98f" />
        <ellipse cx="72" cy="96" rx="14" ry="7" fill="url(#sp-spec)" />
      </g>
      <g transform="rotate(7 118 124)">
        <rect x="88" y="84" width="66" height="88" rx="10" fill="#f3ead2" />
        <rect x="88" y="84" width="66" height="24" rx="10" fill="#f0a93c" />
        <circle cx="121" cy="134" r="16" fill="#d9cba6" />
        <ellipse cx="106" cy="102" rx="13" ry="6" fill="url(#sp-spec)" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Ambient blob — a soft colour field to sit behind a hero.
 * ------------------------------------------------------------------ */
export function Blob({ className = '', from = '#b6f24a', to = '#2f8b3f', animate = true }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      animate={animate ? { rotate: [0, 12, 0], scale: [1, 1.06, 1] } : undefined}
      transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
    >
      <defs>
        <linearGradient id={`blob-${from.slice(1)}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <path
        d="M158 62C176 88 168 128 142 150C116 172 74 176 50 156C26 136 20 92 40 64C60 36 104 24 128 32C144 38 150 48 158 62Z"
        fill={`url(#blob-${from.slice(1)})`}
      />
    </motion.svg>
  )
}
