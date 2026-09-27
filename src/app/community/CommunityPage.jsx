import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useT } from '../../i18n/context.js'
import { createPost, hasVoted, subscribePosts, toggleVote } from '../../shared/services/community.js'
import { motion } from 'motion/react'
import { GLASS_SURFACE_STRONG } from '../lib/glass.js'
import { Blob, TalkingFarmers } from '../../design/Illustrations.jsx'
import { SPRING } from '../../design/springs.js'
import Icon from '../lib/icons.jsx'
import { loadProfile } from '../lib/profile.js'
import { compressImage } from './compressImage.js'
import PostCard from './components/PostCard.jsx'

const SORTS = [
  { key: 'new', tKey: 'community.sortNew' },
  { key: 'top', tKey: 'community.sortTop' },
]

/**
 * The Community tab: a discussion board where a farmer posts a problem from their field
 * and other farmers answer. Posts stream from Firestore, so a reply written on another
 * phone appears here without a refresh.
 */
export default function CommunityPage() {
  const navigate = useNavigate()
  const t = useT()

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('new')
  const [composing, setComposing] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [posting, setPosting] = useState(false)

  /* A photo of the problem says more than the description usually can. */
  const [image, setImage] = useState(null)
  const [imageError, setImageError] = useState('')
  const [readingImage, setReadingImage] = useState(false)
  const fileInput = useRef(null)

  async function handlePickImage(event) {
    const file = event.target.files?.[0]
    // Let the same file be chosen again after removing it.
    event.target.value = ''
    if (!file) return

    setImageError('')
    setReadingImage(true)

    try {
      const compressed = await compressImage(file)
      if (compressed) setImage(compressed)
      else setImageError(t('community.imageTooBig'))
    } catch {
      setImageError(t('community.imageFailed'))
    } finally {
      setReadingImage(false)
    }
  }

  /*
    Votes live in localStorage, which React cannot see, so bumping this is what
    re-reads them. The value itself is never used — only the render it forces.
  */
  const [, setVotedTick] = useState(0)

  useEffect(() => {
    const unsubscribe = subscribePosts((next) => {
      setPosts(next)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const ordered =
    sort === 'top'
      ? [...posts].sort((a, b) => b.votes - a.votes || b.createdAt - a.createdAt)
      : posts

  async function handleVote(postId) {
    await toggleVote(postId)
    setVotedTick((n) => n + 1)
  }

  async function handlePost(event) {
    event?.preventDefault()
    if (!title.trim() || posting) return

    setPosting(true)
    const created = await createPost({ title, body, image, profile: loadProfile() })
    setPosting(false)

    if (created) {
      setTitle('')
      setBody('')
      setImage(null)
      setImageError('')
      setComposing(false)
    }
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/*
        HERO.

        The board opens on two farmers mid-conversation rather than straight into a list —
        it says what this tab is for before any post loads, and gives the empty state
        something to be. The blob behind drifts slowly so the panel is never quite static.
      */}
      <div className="relative px-4 pb-1">
        <Blob
          className="pointer-events-none absolute -top-10 -right-8 h-44 w-44 opacity-[0.16]"
          from="#b6f24a"
          to="#2f8b3f"
        />

        <div className="relative flex items-center gap-1">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...SPRING.settle, delay: 0.05 }}
            className="min-w-0 flex-1"
          >
            <h2 className="t-display text-[25px]" style={{ color: 'var(--ink)' }}>
              {t('community.title')}
            </h2>
            <p className="mt-1 text-[13px]" style={{ color: 'var(--ink-mid)' }}>
              {t('community.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ...SPRING.settle, delay: 0.12 }}
            className="shrink-0"
          >
            <TalkingFarmers className="h-24 w-24" />
          </motion.div>
        </div>

        <div className="relative mt-3 flex items-center gap-2">
          {SORTS.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setSort(option.key)}
              className="t-label rounded-full px-3 py-1.5 text-[12px] transition"
              style={{
                background: sort === option.key ? 'var(--pitch)' : 'var(--paper-dim)',
                border: `1px solid ${sort === option.key ? 'var(--pitch)' : 'var(--paper-edge)'}`,
                color: sort === option.key ? 'var(--paper)' : 'var(--ink-mid)',
              }}
            >
              {t(option.tKey)}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setComposing((open) => !open)}
            className="t-label ml-auto flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px]"
            style={{ background: 'var(--lime)', color: 'var(--pitch)' }}
          >
            <Icon name={composing ? 'x' : 'sprout'} className="h-3.5 w-3.5" />
            {composing ? t('community.cancel') : t('community.ask')}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-4">
        {/* COMPOSER */}
        {composing && (
          <form onSubmit={handlePost} className={`${GLASS_SURFACE_STRONG} mb-3 rounded-2xl p-3`}>
            <div className="relative">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('community.titlePlaceholder')}
                maxLength={120}
                className="w-full rounded-xl border border-solid border-white/15 bg-white/8 px-3 py-2.5 text-sm font-semibold text-white placeholder:text-white/40 focus:border-lime-300/60 focus:outline-none"
              />

              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={t('community.bodyPlaceholder')}
                rows={4}
                maxLength={1000}
                className="mt-2 w-full resize-none rounded-xl border border-solid border-white/15 bg-white/8 px-3 py-2.5 text-xs leading-relaxed text-white placeholder:text-white/40 focus:border-lime-300/60 focus:outline-none"
              />

              {image && (
                <span className="relative mt-2 block overflow-hidden rounded-xl border border-solid border-white/12">
                  <img src={image} alt="" className="max-h-52 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    aria-label={t('community.removePhoto')}
                    className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full border-0 bg-black/60 text-white"
                  >
                    <Icon name="x" className="h-3.5 w-3.5" />
                  </button>
                </span>
              )}

              {imageError && <p className="mt-2 text-[11px] text-red-300">{imageError}</p>}

              <input
                ref={fileInput}
                type="file"
                accept="image/*"
                onChange={handlePickImage}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInput.current?.click()}
                disabled={readingImage}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-solid border-white/15 bg-white/8 py-2.5 text-xs font-semibold text-white/75 disabled:opacity-50"
              >
                <Icon name="camera" className="h-4 w-4" />
                {readingImage
                  ? t('community.imageReading')
                  : image
                    ? t('community.changePhoto')
                    : t('community.addPhoto')}
              </button>

              <button
                type="submit"
                disabled={!title.trim() || posting}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border-0 bg-lime-400 py-2.5 text-sm font-bold text-[#12200c] disabled:opacity-40"
              >
                <Icon name="send" className="h-4 w-4" />
                {posting ? t('community.posting') : t('community.post')}
              </button>
            </div>
          </form>
        )}

        {loading && <p className="mt-8 text-center text-xs text-white/50">{t('community.loading')}</p>}

        {!loading && ordered.length === 0 && (
          <div className="mt-10 flex flex-col items-center gap-2 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-solid border-white/15 bg-white/10">
              <Icon name="community" className="h-7 w-7 text-lime-300" />
            </span>
            <p className="text-sm font-bold text-white">{t('community.emptyTitle')}</p>
            <p className="max-w-[240px] text-xs text-white/60">{t('community.emptyBody')}</p>
          </div>
        )}

        <div className="stagger">
          {ordered.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              voted={hasVoted(post.id)}
              onVote={handleVote}
              onOpen={(id) => navigate(`/community/${id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
