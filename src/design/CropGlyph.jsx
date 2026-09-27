/**
 * Drawn crop marks, one per crop the app knows about.
 *
 * These replace the emoji the app used to show. Emoji were never really ours: they render as a
 * different picture on every phone, several of them are only loosely the crop (rice was a bowl
 * of cooked rice, cotton was a cloud), and they cannot take the app's own palette. These are
 * flat SVG, so a Tomato looks the same on every device and sits in the same colour world as
 * the rest of the screen.
 *
 * Sized in `em`, deliberately. Every call site renders the mark inside a span and lets the
 * surrounding font-size decide how big it is — exactly how the emoji behaved — so this is a
 * drop-in and no screen needed to change to adopt it.
 *
 * Each mark is built from a handful of flat shapes. That is a constraint, not a shortcut: the
 * same drawing has to stay legible in a 12px chip and at 64px in the advisory hero, and detail
 * that survives the large size turns to mud at the small one.
 */

/* The crop's own tint, used for card washes elsewhere in the app. Kept here beside the
   drawings so a crop's colour and its picture cannot drift apart. */
export const CROP_ACCENT = {
  tomato: '#e2564f',
  rice: '#8fbf6a',
  wheat: '#d9a441',
  cotton: '#9fb4c7',
  sugarcane: '#7fbf5a',
  onion: '#b877c4',
  soybean: '#c9a05f',
  maize: '#efc245',
  chilli: '#d9484c',
  potato: '#c08b5c',
  grapes: '#8e6bc4',
  carrot: '#e08a3c',
}

const LEAF = '#5f9e4a'
const LEAF_DARK = '#3d7a33'
const STEM = '#a8813f'

/* Each entry draws inside a 32×32 box. */
const GLYPHS = {
  tomato: (
    <>
      <circle cx="16" cy="19.8" r="9.4" fill="#e2564f" />
      <path d="M16 29.2a9.4 9.4 0 0 0 9.4-9.4c0-1-.2-2-.5-2.9-1.4 5.5-5.9 9.6-11.6 10.2.9.1 1.8.1 2.7.1z" fill="#c4433d" />
      <ellipse cx="12.3" cy="16" rx="2.4" ry="1.7" fill="#fff" opacity="0.32" transform="rotate(-28 12.3 16)" />
      {/* Five sepals as a rosette rather than a few triangles — at hero size the triangles
          plus a straight stem read as an arrow rather than a calyx. */}
      {[-72, -36, 0, 36, 72].map((r) => (
        <ellipse key={r} cx="16" cy="9.6" rx="1.35" ry="3.2" fill={LEAF} transform={`rotate(${r} 16 12.6)`} />
      ))}
      <path d="M16 8.8c-.5-1.5-.5-2.9 0-4.3.5 1.4.5 2.8 0 4.3z" fill={LEAF_DARK} />
    </>
  ),

  wheat: (
    <>
      <path d="M16 29.8V15" stroke={STEM} strokeWidth="1.6" strokeLinecap="round" />
      {[21.4, 18, 14.6, 11.2].map((y) => (
        <g key={y}>
          <ellipse cx="13.2" cy={y} rx="1.7" ry="3" fill="#d9a441" transform={`rotate(-24 13.2 ${y})`} />
          <ellipse cx="18.8" cy={y} rx="1.7" ry="3" fill="#c68f31" transform={`rotate(24 18.8 ${y})`} />
        </g>
      ))}
      <ellipse cx="16" cy="8.6" rx="1.8" ry="3.4" fill="#e0b25a" />
      <path d="M16 5.4V2.2M13.4 6.2 11.6 3.4M18.6 6.2l1.8-2.8" stroke="#c68f31" strokeWidth="1" strokeLinecap="round" />
    </>
  ),

  rice: (
    <>
      <path d="M11 30c0-8 1.5-14 6-18.5" stroke={LEAF_DARK} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M11.4 23c-3.6-2-5.6-5.4-6-9.6 4 1.4 6.4 4.6 6.8 9.2z" fill={LEAF} />
      <path d="M17 11.5c3.6 1.4 6 4.6 7 9.4" stroke={LEAF_DARK} strokeWidth="1.3" strokeLinecap="round" fill="none" />
      {[
        [17.6, 10.2, 22],
        [19.8, 12.2, 34],
        [21.4, 14.8, 46],
        [22.6, 17.8, 58],
        [23.2, 21, 70],
        [15.2, 8.6, 8],
      ].map(([cx, cy, r]) => (
        <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx="1.35" ry="3.1" fill="#d8c477" transform={`rotate(${r} ${cx} ${cy})`} />
      ))}
    </>
  ),

  cotton: (
    <>
      <path d="M16 29V19" stroke={LEAF_DARK} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="11.2" cy="14.4" r="5" fill="#f4f1e6" stroke="#b9b2a2" strokeWidth="0.9" />
      <circle cx="20.8" cy="14.4" r="5" fill="#f4f1e6" stroke="#b9b2a2" strokeWidth="0.9" />
      <circle cx="16" cy="9.6" r="5.2" fill="#fbf9f2" stroke="#b9b2a2" strokeWidth="0.9" />
      <circle cx="16" cy="16.2" r="5" fill="#f4f1e6" stroke="#b9b2a2" strokeWidth="0.9" />
      <path d="M16 21.6 10.4 18.2l1.6 4.4zM16 21.6 21.6 18.2 20 22.6z" fill={LEAF_DARK} />
    </>
  ),

  sugarcane: (
    <>
      <g transform="rotate(-5 13 19)">
        <rect x="10.6" y="7.4" width="4.6" height="22.4" rx="1" fill="#7fbf5a" />
        {[11.6, 16.2, 20.8, 25.4].map((y) => (
          <path key={y} d={`M10.6 ${y}h4.6`} stroke="#4c8038" strokeWidth="1.1" />
        ))}
      </g>
      <g transform="rotate(6 20 20)">
        <rect x="17.8" y="10.2" width="4.2" height="19.6" rx="1" fill="#5f9e4a" />
        {[14.2, 18.6, 23, 27.4].map((y) => (
          <path key={y} d={`M17.8 ${y}h4.2`} stroke="#3d6b2c" strokeWidth="1.1" />
        ))}
      </g>
      <path d="M12.4 7.6C10 5 7.6 3.6 4.6 3c.8 3.2 3 5.4 6.6 6.6zM19.8 10.4c1.8-3 3.8-4.8 6.6-5.8-.2 3.2-2 5.6-5.2 7z" fill={LEAF} />
    </>
  ),

  onion: (
    <>
      <path d="M16 29c-5.4 0-8.8-3.7-8.8-8.4 0-4.8 3.9-8.4 8.8-8.4s8.8 3.6 8.8 8.4C24.8 25.3 21.4 29 16 29z" fill="#b877c4" />
      <path d="M16 12.2c-1.5 3-2.3 6-2.3 8.6s.8 5.3 2.3 8.2c1.5-2.9 2.3-5.6 2.3-8.2s-.8-5.6-2.3-8.6z" fill="#fff" opacity="0.22" />
      <path d="M16 12.4c-1.6-2.8-1.8-5.4-1.2-8 1.8 1.9 2.6 4.4 2.6 7.4zM16.6 12.6c2-2.2 4.2-3.3 6.6-3.6-1.1 2.6-3.1 4.2-6 4.9z" fill={LEAF_DARK} />
    </>
  ),

  soybean: (
    <>
      <path d="M6.4 16.8c2-4.6 6-7 9.6-7s7.6 2.4 9.6 7c-2 4.6-6 7-9.6 7s-7.6-2.4-9.6-7z" fill="#c9a05f" />
      <circle cx="11" cy="16.8" r="2.7" fill="#e3c48d" />
      <circle cx="16" cy="16.8" r="2.7" fill="#e3c48d" />
      <circle cx="21" cy="16.8" r="2.7" fill="#e3c48d" />
      <path d="M25.4 16.2c1.8-2.4 3.4-3.6 5.4-4.2-.8 2.4-2.4 4-4.8 4.8z" fill={LEAF} />
    </>
  ),

  maize: (
    <>
      <ellipse cx="17" cy="17.4" rx="6.1" ry="10.2" fill="#efc245" />
      <path d="M17 7.2c3.4 0 6.1 4.6 6.1 10.2S20.4 27.6 17 27.6z" fill="#dba92c" />
      {[10.4, 14, 17.6, 21.2, 24.8].map((y) => (
        <path key={y} d={`M11.4 ${y}h11.2`} stroke="#b98b1c" strokeWidth="0.85" strokeLinecap="round" opacity="0.55" />
      ))}
      <path d="M11.2 26.4C7 23.6 4.8 19 4.6 12.6c4 2.8 6.4 7 7.2 12.6z" fill={LEAF} />
      <path d="M17 7.2V3.4" stroke={LEAF_DARK} strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),

  chilli: (
    <>
      <path d="M19.6 8.6c4 3.6 4.6 10.4.6 15.2-3.2 3.8-8.4 4.2-10.2 1-1.4-2.6.4-5 3-6.4 3.2-1.8 5.4-5 6.6-9.8z" fill="#d9484c" />
      <path d="M19.6 8.6c2.8 2.5 4 6.5 3.4 10.4-1.6-3.4-3.6-6-6-7.8z" fill="#b5353a" />
      <path d="M19.6 8.6c-1.4-1.8-1.6-3.6-.8-5.4 1.8 1 2.8 2.6 3 4.8z" fill={LEAF_DARK} />
      <path d="M17.6 4.4c2.2-.8 4.2-.6 6 .6-1.6 1.6-3.6 2.2-6 1.8z" fill={LEAF} />
    </>
  ),

  potato: (
    <>
      <path d="M7.6 17.4c0-5 4-8.8 9.2-8.8 4.6 0 8 2.8 8 7 0 5.6-4.4 9.2-9.6 9.2-4.4 0-7.6-2.8-7.6-7.4z" fill="#c08b5c" />
      <ellipse cx="13.2" cy="14.4" rx="1.5" ry="1.1" fill="#9a6b40" transform="rotate(-20 13.2 14.4)" />
      <ellipse cx="18.6" cy="18.6" rx="1.5" ry="1.1" fill="#9a6b40" transform="rotate(16 18.6 18.6)" />
      <ellipse cx="13" cy="20.8" rx="1.3" ry="1" fill="#9a6b40" transform="rotate(8 13 20.8)" />
    </>
  ),

  grapes: (
    <>
      <path d="M16 10.6V6.4" stroke={STEM} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16.6 7.2c2-2.4 4.2-3.4 6.8-3.2-1 2.8-3.2 4.4-6.2 4.8z" fill={LEAF} />
      {[
        [12.2, 13.6],
        [19.8, 13.6],
        [16, 14.6],
        [13.6, 19],
        [18.4, 19],
        [16, 23.4],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" fill="#8e6bc4" />
      ))}
      <circle cx="12.2" cy="13.6" r="3.5" fill="#a184d3" />
      <circle cx="13.6" cy="19" r="3.5" fill="#a184d3" />
    </>
  ),

  carrot: (
    <>
      <path d="M16 29.4c-2.6-3.6-4.4-8.2-5.2-13.6h10.4c-.8 5.4-2.6 10-5.2 13.6z" fill="#e08a3c" />
      <path d="M16 29.4c2.6-3.6 4.4-8.2 5.2-13.6H16z" fill="#c4712a" />
      <path d="M13.2 18.8h5.6M13.8 22h4.4" stroke="#fff" strokeWidth="0.9" strokeLinecap="round" opacity="0.35" />
      <path d="M16 15.2c-2.2-2-3-4.4-2.6-7.2 2 1.4 3.2 3.6 3.4 6.6zM16.4 15c1.6-2.8 3.6-4.4 6.2-5-.6 3-2.4 5-5.4 6zM15.4 15c-2.6-1.4-4.4-2.4-6.6-2.6 1.2 2.2 3.4 3.4 6.4 3.8z" fill={LEAF} />
    </>
  ),
}

/* Shown for any crop the map does not cover, so a new crop key degrades to a plant rather
   than to nothing. */
const SPROUT = (
  <>
    <path d="M16 29.4V15" stroke={LEAF_DARK} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M16 17.6C12.4 17.6 9 15 7.4 10.6c4.4-.6 7.8 1.6 9.4 6zM16 15.6c1.2-4.4 4.2-7 8.6-7.6-.8 4.8-3.8 7.6-8.2 8z" fill={LEAF} />
  </>
)

export default function CropGlyph({ crop, className = '' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width="1em"
      height="1em"
      className={className}
      role="img"
      aria-hidden="true"
      focusable="false"
      style={{ display: 'inline-block', verticalAlign: '-0.14em', overflow: 'visible' }}
    >
      {/* The drawings sit inside the 32-box with a margin; emoji fill nearly their whole em.
          Scaling about the centre makes a mark read at the same weight as the emoji it
          replaced, so no screen's spacing had to be retuned. */}
      <g transform="translate(16 16) scale(1.2) translate(-16 -16)">{GLYPHS[crop] ?? SPROUT}</g>
    </svg>
  )
}
