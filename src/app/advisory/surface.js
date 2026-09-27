/**
 * Panel material for the advisory screens.
 *
 * These are inline styles, so a stylesheet can't retheme them — they read the CSS
 * variables in app/lib/theme.css instead, which is what lets one `data-theme`
 * attribute flip the whole surface from frosted dark glass to a white card.
 */

/** Frosted edge in dark; a soft lifted card in light. Both come from variables. */
export const PANEL_SHADOW =
  'backdrop-blur-2xl shadow-[var(--panel-rim),var(--panel-shadow)]'

export function panel() {
  return {
    background: 'var(--panel-sheen), var(--panel)',
    borderColor: 'var(--panel-line)',
  }
}

/** The same panel washed with a crop's (or a risk's) colour. */
export function tinted(accent, strong = false) {
  return {
    background: `var(--panel-sheen), linear-gradient(150deg, ${accent}${strong ? '4a' : '30'} 0%, ${accent}14 48%, transparent 100%), var(--panel)`,
    borderColor: `${accent}${strong ? '7a' : '55'}`,
  }
}
