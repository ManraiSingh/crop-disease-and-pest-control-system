import {
  addDoc,
  collection,
  doc,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { getDb } from './firebase.js'

/**
 * The Community feed: farmers post a problem they are facing, other farmers reply.
 *
 *   posts/{postId}                 title, body, image, author, place, crop, votes, replyCount
 *   posts/{postId}/replies/{id}    body, author, createdAt
 *
 * Everything streams, so a reply posted on another phone shows up without a refresh.
 * With no Firebase project configured each subscribe yields an empty list once and the
 * writes resolve false, so the tab still renders instead of throwing.
 */
const POSTS = 'posts'
const REPLIES = 'replies'

/** Votes are per-device — there are no accounts to hang them off yet. */
const VOTED_KEY = 'cropcare.votedPosts'

function readVoted() {
  try {
    return new Set(JSON.parse(localStorage.getItem(VOTED_KEY) ?? '[]'))
  } catch {
    return new Set()
  }
}

export function hasVoted(postId) {
  return readVoted().has(postId)
}

function rememberVote(postId, voted) {
  const set = readVoted()
  if (voted) set.add(postId)
  else set.delete(postId)
  try {
    localStorage.setItem(VOTED_KEY, JSON.stringify([...set]))
  } catch {
    // Storage unavailable — the vote still counts, it just isn't remembered here.
  }
}

/** Firestore timestamps arrive null for a moment on the writer's own optimistic copy. */
function toMillis(value) {
  if (!value) return Date.now()
  if (typeof value.toMillis === 'function') return value.toMillis()
  return Number(value) || Date.now()
}

function toPost(snapshot) {
  const data = snapshot.data()
  return {
    id: snapshot.id,
    title: data.title ?? '',
    body: data.body ?? '',
    image: data.image ?? '',
    authorName: data.authorName || 'Farmer',
    authorPhone: data.authorPhone ?? '',
    place: data.place ?? '',
    crop: data.crop ?? '',
    votes: Number(data.votes) || 0,
    replyCount: Number(data.replyCount) || 0,
    createdAt: toMillis(data.createdAt),
  }
}

/** Stream every post, newest first. Returns an unsubscribe function. */
export function subscribePosts(onChange) {
  const db = getDb()
  if (!db) {
    onChange([])
    return () => {}
  }

  return onSnapshot(
    query(collection(db, POSTS), orderBy('createdAt', 'desc')),
    (snapshot) => onChange(snapshot.docs.map(toPost)),
    (error) => {
      console.warn('[community] posts subscription failed:', error)
      onChange([])
    },
  )
}

/** Stream one post's replies, oldest first — a conversation reads top to bottom. */
export function subscribeReplies(postId, onChange) {
  const db = getDb()
  if (!db || !postId) {
    onChange([])
    return () => {}
  }

  return onSnapshot(
    query(collection(db, POSTS, postId, REPLIES), orderBy('createdAt', 'asc')),
    (snapshot) =>
      onChange(
        snapshot.docs.map((entry) => {
          const data = entry.data()
          return {
            id: entry.id,
            body: data.body ?? '',
            authorName: data.authorName || 'Farmer',
            createdAt: toMillis(data.createdAt),
          }
        }),
      ),
    (error) => {
      console.warn('[community] replies subscription failed:', error)
      onChange([])
    },
  )
}

export async function createPost({ title, body, image, profile }) {
  const db = getDb()
  if (!db) return false

  try {
    const created = await addDoc(collection(db, POSTS), {
      title: title.trim(),
      body: body.trim(),
      // A compressed data URL rather than a Storage link — see compressImage.js.
      image: image ?? '',
      authorName: profile?.name || 'Farmer',
      authorPhone: profile?.phone ?? '',
      // Context other farmers need to judge whether the advice applies to them.
      place: [profile?.taluka, profile?.district].filter(Boolean).join(', '),
      crop: profile?.crop ?? '',
      votes: 0,
      replyCount: 0,
      createdAt: serverTimestamp(),
    })
    return created.id
  } catch (error) {
    console.warn('[community] could not create post:', error)
    return false
  }
}

export async function createReply({ postId, body, profile }) {
  const db = getDb()
  if (!db || !postId) return false

  try {
    await addDoc(collection(db, POSTS, postId, REPLIES), {
      body: body.trim(),
      authorName: profile?.name || 'Farmer',
      authorPhone: profile?.phone ?? '',
      createdAt: serverTimestamp(),
    })
    // Denormalised so the feed can show a reply count without reading every subcollection.
    await updateDoc(doc(db, POSTS, postId), { replyCount: increment(1) })
    return true
  } catch (error) {
    console.warn('[community] could not reply:', error)
    return false
  }
}

/** Toggle this device's upvote. Returns the direction applied, or null if it failed. */
export async function toggleVote(postId) {
  const db = getDb()
  if (!db || !postId) return null

  const voted = hasVoted(postId)
  const delta = voted ? -1 : 1

  try {
    await updateDoc(doc(db, POSTS, postId), { votes: increment(delta) })
    rememberVote(postId, !voted)
    return delta
  } catch (error) {
    console.warn('[community] could not vote:', error)
    return null
  }
}
