import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getDb } from './firebase.js'

/**
 * Seed orders placed from the Home store.
 *
 * The catalogue is fixed, but an order is not decoration — it is written to the
 * shared `orders` collection with the farmer and their delivery taluka, so it can be
 * read back and fulfilled. Resolves false when there is nothing to write to, and the
 * caller says so rather than showing a confirmation that means nothing.
 *
 * Pack size is deliberately not copied in: it is wording that now lives in the locale
 * files, so whichever language the farmer ordered in would end up in the record. `seedId`
 * identifies the pack unambiguously against the catalogue.
 *
 *   orders/{id}   seedId, variety, crop, unitPrice, quantity, total,
 *                 farmerName, phone, district, taluka, status, createdAt
 */
const COLLECTION = 'orders'

export async function placeOrder({ seed, quantity, profile }) {
  const db = getDb()
  if (!db) return false

  try {
    const created = await addDoc(collection(db, COLLECTION), {
      seedId: seed.id,
      variety: seed.variety,
      crop: seed.crop,
      unitPrice: seed.price,
      quantity,
      total: seed.price * quantity,
      farmerName: profile?.name ?? '',
      phone: profile?.phone ?? '',
      district: profile?.district ?? '',
      taluka: profile?.taluka ?? '',
      status: 'placed',
      createdAt: serverTimestamp(),
    })
    return created.id
  } catch (error) {
    console.warn('[orders] could not place order:', error)
    return false
  }
}
