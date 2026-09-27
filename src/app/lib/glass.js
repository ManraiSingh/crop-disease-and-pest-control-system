/**
 * Glassmorphism design tokens for the in-app screens (everything inside AppShell).
 *
 * The whole app sits on one full-bleed farm photo; every panel is a translucent dark-olive
 * pane that lets the photo through. Keeping the surface classes here — rather than repeating
 * the same long class string in 20 components — is what keeps the tabs looking like one app.
 *
 * Both photos live in public/, so swapping either is a one-line change here.
 */
export const APP_BACKGROUND = '/farm-background.jpg'
export const SCAN_CARD_BACKGROUND = '/scan-crop-bg.jpg'

/**
 * Standard translucent pane. Pair with GLASS_SHEEN for the lit-edge effect.
 *
 * Deliberately carries no border-radius: Tailwind emits utilities in scale order, not in the
 * order they appear on the element, so a radius baked in here would beat anything a caller
 * passed. Each consumer sets its own `rounded-*`.
 */
export const GLASS_SURFACE =
  'relative overflow-hidden canopy-surface'

/** Darker pane, for cards that need more contrast (dense text, long lists). */
export const GLASS_SURFACE_STRONG =
  'relative overflow-hidden canopy-surface-strong'

/**
 * Onboarding's sheet: the same material a quarter more transparent, so the farm photo behind
 * each step still reads through the form. Kept as its own token rather than an override at the
 * call site — two competing `bg-*` utilities on one element resolve by stylesheet order, not
 * by the order they're written.
 */
export const GLASS_SURFACE_SOFT =
  'relative overflow-hidden canopy-surface-soft'

/** Small inset pill/tile inside a glass card (stat tiles, chips, icon buttons). */
export const GLASS_INSET = 'canopy-inset'

/**
 * Surface variants a card can render with. `none` strips the pane entirely, for a card being
 * composed inside a bigger glass panel — nesting frosted surfaces muddies both.
 */
export const GLASS_SURFACES = {
  default: GLASS_SURFACE,
  strong: GLASS_SURFACE_STRONG,
  none: 'relative',
}

/** Specular highlight + shadowed far corner. Render as an aria-hidden overlay. */
export const GLASS_SHEEN = 'canopy-sheen'
