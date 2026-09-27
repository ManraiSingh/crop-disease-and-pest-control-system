/** Compact "3h" / "2d" stamp, the way a feed shows post age. */
export function timeAgo(millis, t) {
  const seconds = Math.max(0, Math.floor((Date.now() - millis) / 1000))

  if (seconds < 60) return t('community.justNow')

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return t('community.minutesAgo', { n: String(minutes) })

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return t('community.hoursAgo', { n: String(hours) })

  const days = Math.floor(hours / 24)
  return t('community.daysAgo', { n: String(days) })
}
