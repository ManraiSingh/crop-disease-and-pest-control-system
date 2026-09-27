/**
 * One picture and one colour per crop, shared by every screen that shows a crop so
 * it looks the same throughout the app. Always shown next to the crop's name —
 * several of these read as the crop only once the label is there.
 *
 * The accent is what makes a grid of crops scannable: each card carries its crop's
 * own tint, so a farmer picks theirs out by colour and shape before reading a word.
 *
 * The pictures used to be emoji. They are drawn marks now (see design/CropGlyph.jsx) —
 * `cropArt()` keeps returning something renderable, so no call site had to change.
 */
import { createElement } from 'react'
import { tinted } from '../advisory/surface.js'
import CropGlyph, { CROP_ACCENT } from '../../design/CropGlyph.jsx'

export function cropArt(key) {
  return createElement(CropGlyph, { crop: key })
}

export function cropAccent(key) {
  return CROP_ACCENT[key] ?? '#a3e635'
}

/** Tinted card surface for a crop — see advisory/surface.js for the material. */
export function cropSurface(key, strength = 1) {
  return tinted(cropAccent(key), strength > 1)
}
