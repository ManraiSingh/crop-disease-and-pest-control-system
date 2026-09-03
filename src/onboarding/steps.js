/**
 * The onboarding flow, in order. Everything about progress — the segment count, the "STEP n OF
 * N" line, which segments are filled — is derived from this array, so adding or reordering a
 * step is a change here and nowhere else.
 *
 * Each step has its own farm scene, in public/onboarding/. Swapping one is a single line below.
 */
export const STEPS = [
  { key: 'about-you', path: '/onboarding/about-you', photo: '/onboarding/step-1.jpg' },
  { key: 'add-field', path: '/onboarding/add-field', photo: '/onboarding/step-2.jpg' },
  { key: 'crop', path: '/onboarding/crop', photo: '/onboarding/step-3.avif' },
  { key: 'all-set', path: '/onboarding/all-set', photo: '/onboarding/step-4.jpg' },
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
