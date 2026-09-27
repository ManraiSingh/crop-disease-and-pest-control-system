/**
 * Spring constants, kept out of motion.jsx so that file only exports components —
 * mixing components and plain values in one module breaks Vite's fast refresh.
 *
 * `settle` is the house default: things rise and come to rest. `snap` is touch
 * feedback. `float` is for the slow ambient marks. `tilt` glides a little looser
 * so a card follows the pointer like it has mass.
 */
export const SPRING = {
  settle: { type: 'spring', stiffness: 240, damping: 28, mass: 0.9 },
  snap: { type: 'spring', stiffness: 560, damping: 36, mass: 0.6 },
  float: { type: 'spring', stiffness: 120, damping: 20, mass: 1.1 },
  tilt: { type: 'spring', stiffness: 200, damping: 22, mass: 0.7 },
}
