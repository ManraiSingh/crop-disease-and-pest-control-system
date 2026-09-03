/**
 * The onboarding flow, in order. Everything about progress — the segment count, the "STEP n OF
 * N" line, which segments are filled — is derived from this array, so adding or reordering a
 * step is a change here and nowhere else.
 *
 * PLACEHOLDER photos: each step is meant to have its own farm scene. Until those land, the
 * flow reuses what's already in public/. Swapping one in is a single line below.
 */
export const STEPS = [
  { key: 'about-you', path: '/onboarding/about-you', photo: '/farm-background.jpg' },
  { key: 'add-field', path: '/onboarding/add-field', photo: '/farm-landscape.png' },
  { key: 'crop', path: '/onboarding/crop', photo: '/scan-crop-bg.jpg' },
  { key: 'all-set', path: '/onboarding/all-set', photo: '/farm-background.jpg' },
]

export const TOTAL_STEPS = STEPS.length

/** 1-based position of a step, for the progress bar and the step caption. */
export function stepNumber(key) {
  return STEPS.findIndex((step) => step.key === key) + 1
}

export function stepPhoto(key) {
  return STEPS.find((step) => step.key === key)?.photo
}

/** Route of the step before this one, or null on the first. */
export function previousPath(key) {
  const index = STEPS.findIndex((step) => step.key === key)
  return index > 0 ? STEPS[index - 1].path : null
}
