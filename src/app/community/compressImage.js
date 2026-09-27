/**
 * Shrink a photo from the farmer's camera into something a Firestore document can hold.
 *
 * Firebase Storage isn't set up on this project, so the picture rides along inside the
 * post itself as a data URL. Firestore caps a document at 1 MiB and base64 inflates by
 * about a third, so the budget here is deliberately conservative — a 4 MB phone photo
 * comes back around 150–250 KB.
 *
 * Quality steps down until the result fits rather than guessing one value: a photo of a
 * leaf against soil compresses very differently from a bright open field.
 */
const MAX_DIMENSION = 1280
const MAX_BYTES = 320_000
const QUALITY_STEPS = [0.82, 0.72, 0.62, 0.52, 0.42]

/** Rough decoded size of a data URL, ignoring the header. */
function byteLength(dataUrl) {
  const base64 = dataUrl.slice(dataUrl.indexOf(',') + 1)
  return Math.floor((base64.length * 3) / 4)
}

async function loadBitmap(file) {
  // createImageBitmap honours EXIF rotation; canvas drawing from an <img> does not,
  // so prefer it and keep the <img> path only as a fallback.
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(file, { imageOrientation: 'from-image' })
    } catch {
      // Older Safari rejects the options object — fall through.
    }
  }

  const url = URL.createObjectURL(file)
  try {
    return await new Promise((resolve, reject) => {
      const image = new Image()
      image.onload = () => resolve(image)
      image.onerror = () => reject(new Error('Could not read that image'))
      image.src = url
    })
  } finally {
    URL.revokeObjectURL(url)
  }
}

export async function compressImage(file) {
  const source = await loadBitmap(file)

  const width = source.width || source.naturalWidth
  const height = source.height || source.naturalHeight
  const scale = Math.min(1, MAX_DIMENSION / Math.max(width, height))

  const canvas = document.createElement('canvas')
  canvas.width = Math.round(width * scale)
  canvas.height = Math.round(height * scale)

  const context = canvas.getContext('2d')
  context.drawImage(source, 0, 0, canvas.width, canvas.height)

  if (typeof source.close === 'function') source.close()

  for (const quality of QUALITY_STEPS) {
    const dataUrl = canvas.toDataURL('image/jpeg', quality)
    if (byteLength(dataUrl) <= MAX_BYTES) return dataUrl
  }

  // Even at the lowest quality it is too big — almost always a very large panorama.
  return null
}
