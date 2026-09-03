import { GLASS_SHEEN, GLASS_SURFACE, GLASS_SURFACE_STRONG } from './glass.js'

/**
 * Translucent pane with the sheen already layered in. `as` lets it render as a link when the
 * whole card is tappable; content is wrapped in a positioned div so it stacks above the sheen.
 */
export function GlassCard({ as: Tag = 'section', strong = false, className = '', children, ...rest }) {
  return (
    <Tag className={`${strong ? GLASS_SURFACE_STRONG : GLASS_SURFACE} rounded-3xl ${className}`} {...rest}>
      <span aria-hidden="true" className={GLASS_SHEEN} />
      <div className="relative">{children}</div>
    </Tag>
  )
}

/**
 * "Crop Health ———— View All" row. Every section header lives *inside* its glass card, so the
 * default has no text shadow; pass `overPhoto` for the rare header that sits on the background.
 * Spacing is the caller's job — margins here would fight the card padding.
 */
export function SectionHeader({ title, action = null, right = null, overPhoto = false, className = '' }) {
  return (
    <div className={`flex items-center justify-between gap-2 ${className}`}>
      <h2 className={`text-sm font-bold text-white ${overPhoto ? 'drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]' : ''}`}>
        {title}
      </h2>
      {right ?? (action ? <span className="text-[11px] font-semibold text-lime-300">{action}</span> : null)}
    </div>
  )
}
