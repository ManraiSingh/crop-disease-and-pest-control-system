import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { getDb } from './firebase.js'

/**
 * Farmer records shared with the government portal.
 *
 * One document per farmer in `farmers/{phone}`, keyed by their phone number —
 * that number is the identity for this app, so re-entering it on another device
 * loads the same record. The portal reads this collection live and places each
 * farmer on the Maharashtra map using `district` + `taluka`.
 *
 * Document shape (the contract both apps rely on):
 *   phone      string   digits only, also the document id
 *   name       string
 *   language   string   i18n code, e.g. 'mr'
 *   fieldName  string
 *   district   string   must match a Maharashtra district on the portal map
 *   taluka     string   must match a taluka within that district
 *   land       number   field size in acres, 0 when not given
 *   crop       string   the main crop's key, e.g. 'wheat'
 *   crops      string[] every crop grown, main one first
 *   variety    string
 *   joinedAt   number   ms epoch, set once on first registration
 *   signedInAt number   ms epoch, bumped on every sign-in
 *   updatedAt  Timestamp
 */
const COLLECTION = 'farmers'

/** Digits only — keeps '+91 98765 43210' and '9876543210' on the same record. */
export function normalizePhone(phone) {
  return String(phone || '').replace(/\D/g, '')
}

export function isValidPhone(phone) {
  const digits = normalizePhone(phone)
  return digits.length >= 10 && digits.length <= 15
}

/**
 * Look up an existing farmer by phone number.
 * Returns null when unconfigured, unknown, or unreachable — callers treat all
 * three the same way: continue as a new registration.
 */
export async function fetchFarmer(phone) {
  const db = getDb()
  if (!db) return null

  const digits = normalizePhone(phone)
  if (!digits) return null

  try {
    const snapshot = await getDoc(doc(db, COLLECTION, digits))
    return snapshot.exists() ? snapshot.data() : null
  } catch (error) {
    console.warn('[farmers] lookup failed, continuing offline:', error)
    return null
  }
}

/**
 * Publish the farmer to Firestore so the portal can see them.
 * Resolves to false when there is nothing to write to, so onboarding can still
 * finish and save locally.
 */
export async function saveFarmer(profile) {
  const db = getDb()
  if (!db) return false

  const digits = normalizePhone(profile?.phone)
  if (!digits) return false

  const record = {
    phone: digits,
    name: profile.name ?? '',
    language: profile.language ?? '',
    fieldName: profile.fieldName ?? '',
    district: profile.district ?? '',
    taluka: profile.taluka ?? '',
    land: Number(profile.land) || 0,
    crop: profile.crop ?? '',
    crops: Array.isArray(profile.crops)
      ? profile.crops
      : profile.crop
        ? [profile.crop]
        : [],
    variety: profile.variety ?? '',
    joinedAt: profile.joinedAt ?? Date.now(),
    signedInAt: Date.now(),
    updatedAt: serverTimestamp(),
  }

  try {
    await setDoc(doc(db, COLLECTION, digits), record, { merge: true })
    return true
  } catch (error) {
    console.warn('[farmers] save failed, keeping local profile only:', error)
    return false
  }
}

/**
 * Mark that this farmer has just signed in.
 *
 * A client clock rather than serverTimestamp: the portal decides whether a record
 * changed by comparing this against the value it last saw, and a server timestamp
 * arrives null on the writer's own first snapshot, which would read as a change
 * that never happened. Registration writes the same field, so the portal can tell a
 * brand-new farmer from a returning one without a second collection.
 *
 * Fire-and-forget — a farmer signs in whether or not the portal hears about it.
 */
export async function recordSignIn(phone) {
  const db = getDb()
  if (!db) return false

  const digits = normalizePhone(phone)
  if (!digits) return false

  try {
    await updateDoc(doc(db, COLLECTION, digits), {
      signedInAt: Date.now(),
      updatedAt: serverTimestamp(),
    })
    return true
  } catch (error) {
    console.warn('[farmers] could not record sign-in:', error)
    return false
  }
}
