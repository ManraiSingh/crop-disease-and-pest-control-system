import { collection, limit, onSnapshot, query, where } from 'firebase/firestore'
import { getDb } from './firebase.js'

/**
 * Field alerts raised by an agriculture officer on the government portal.
 *
 * The portal writes to `alerts` with the district and taluka it applies to; the app
 * streams back only the alerts for the farmer's own taluka, so a farmer is warned
 * about an outbreak near their field and not about one across the state.
 */
const COLLECTION = 'alerts'

/** Timestamp of the newest alert this farmer has already seen. */
const SEEN_KEY = 'cropcare.alertsSeenAt'

export function lastSeenAt() {
  try {
    return Number(localStorage.getItem(SEEN_KEY)) || 0
  } catch {
    return 0
  }
}

export function markAlertsSeen(millis) {
  try {
    localStorage.setItem(SEEN_KEY, String(millis || Date.now()))
  } catch {
    // Storage unavailable — the badge just won't stay cleared.
  }
}

function toMillis(value) {
  if (!value) return Date.now()
  if (typeof value.toMillis === 'function') return value.toMillis()
  return Number(value) || Date.now()
}

/**
 * Stream the alerts for one taluka, newest first.
 *
 * Yields an empty list once when Firebase is unconfigured or the farmer has not
 * told us where their field is, so callers need no special case.
 */
export function subscribeAlerts({ district, taluka }, onChange) {
  const db = getDb()

  if (!db || !district || !taluka) {
    onChange([])
    return () => {}
  }

  /*
    Equality on both fields plus an ordered field would need a composite index,
    which a fresh Firebase project will not have. Filtering on taluka alone keeps
    this on Firestore's automatic single-field indexes; the district is checked
    here instead, which matters only for two talukas sharing a name.
  */
  return onSnapshot(
    query(collection(db, COLLECTION), where('taluka', '==', taluka), limit(50)),
    (snapshot) => {
      const alerts = snapshot.docs
        .map((entry) => {
          const data = entry.data()
          return {
            id: entry.id,
            district: data.district ?? '',
            taluka: data.taluka ?? '',
            disease: data.disease ?? '',
            crop: data.crop ?? '',
            sourceFarm: data.sourceFarm ?? '',
            sourceFarmer: data.sourceFarmer ?? '',
            issuedBy: data.issuedBy ?? '',
            createdAt: toMillis(data.createdAt),
          }
        })
        .filter((alert) => alert.district === district)
        .sort((a, b) => b.createdAt - a.createdAt)

      onChange(alerts)
    },
    (error) => {
      console.warn('[alerts] subscription failed:', error)
      onChange([])
    },
  )
}
