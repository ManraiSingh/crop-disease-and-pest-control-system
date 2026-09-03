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

/** Standard translucent pane. Pair with GLASS_SHEEN for the lit-edge effect. */
export const GLASS_SURFACE =
  'relative overflow-hidden rounded-3xl border border-solid border-white/12 bg-[#2c3a1c]/55 shadow-[0_18px_40px_rgba(6,20,12,0.4)] backdrop-blur-xl'

/** Darker pane, for cards that need more contrast (dense text, long lists). */
export const GLASS_SURFACE_STRONG =
  'relative overflow-hidden rounded-3xl border border-solid border-white/12 bg-[#1d2814]/72 shadow-[0_18px_40px_rgba(6,20,12,0.45)] backdrop-blur-xl'

/** Small inset pill/tile inside a glass card (stat tiles, chips, icon buttons). */
export const GLASS_INSET = 'rounded-2xl border border-solid border-white/12 bg-white/8 backdrop-blur-md'

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
export const GLASS_SHEEN =
  'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(255,255,255,0.16),transparent_46%),radial-gradient(circle_at_88%_88%,rgba(0,0,0,0.32),transparent_55%)]'
