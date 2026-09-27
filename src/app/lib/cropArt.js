/**
 * One picture and one colour per crop, shared by every screen that shows a crop so
 * it looks the same throughout the app. Always shown next to the crop's name —
 * several of these read as the crop only once the label is there.
 *
 * The accent is what makes a grid of crops scannable: each card carries its crop's
 * own tint, so a farmer picks theirs out by colour and shape before reading a word.
 */
import { tinted } from '../advisory/surface.js'

const CROPS = {
  tomato: { art: '🍅', accent: '#e2564f' },
  rice: { art: '🍚', accent: '#8fbf6a' },
  wheat: { art: '🌾', accent: '#d9a441' },
  cotton: { art: '☁️', accent: '#9fb4c7' },
  sugarcane: { art: '🎋', accent: '#7fbf5a' },
  onion: { art: '🧅', accent: '#b877c4' },
  soybean: { art: '🫘', accent: '#c9a05f' },
  maize: { art: '🌽', accent: '#efc245' },
  chilli: { art: '🌶️', accent: '#d9484c' },
  potato: { art: '🥔', accent: '#c08b5c' },
  grapes: { art: '🍇', accent: '#8e6bc4' },
  carrot: { art: '🥕', accent: '#e08a3c' },
}

export function cropArt(key) {
  return CROPS[key]?.art ?? '🌱'
}

export function cropAccent(key) {
  return CROPS[key]?.accent ?? '#a3e635'
}

/** Tinted card surface for a crop — see advisory/surface.js for the material. */
export function cropSurface(key, strength = 1) {
  return tinted(cropAccent(key), strength > 1)
}
