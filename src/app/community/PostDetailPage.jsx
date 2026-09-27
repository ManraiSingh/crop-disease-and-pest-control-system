import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useT } from '../../i18n/context.js'
import {
  createReply,
  hasVoted,
  subscribePosts,
  subscribeReplies,
  toggleVote,
} from '../../shared/services/community.js'
import { GLASS_SURFACE } from '../lib/glass.js'
import Icon from '../lib/icons.jsx'
import { loadProfile } from '../lib/profile.js'
import PostCard from './components/PostCard.jsx'
import { timeAgo } from './timeAgo.js'

function Reply({ reply }) {
  const t = useT()

  return (
    <div className="mb-2 flex gap-2.5">
      {/* The thread line, the way a comment tree reads. */}
      <div className="flex flex-col items-center">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime-400/25 text-[10px] font-bold text-lime-200">
          {(reply.authorName || '?').trim().charAt(0).toUpperCase()}
        </span>
        <span className="mt-1 w-px flex-1 bg-white/12" />
      </div>

      <div className={`${GLASS_SURFACE} mb-1 flex-1 rounded-2xl p-3`}>
        <div className="relative">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-[11px] font-semibold text-white/75">
              {reply.authorName}
            </span>
            <span className="text-[11px] text-white/35">·</span>
            <span className="shrink-0 text-[11px] text-white/45">
              {timeAgo(reply.createdAt, t)}
            </span>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed whitespace-pre-wrap text-white/80">
            {reply.body}
          </p>
        </div>
      </div>
    </div>
  )
}

/** A single problem and the answers to it, with the reply box pinned at the bottom. */
export default function PostDetailPage() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const t = useT()

  const [post, setPost] = useState(null)
  const [replies, setReplies] = useState([])
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const [votedTick, setVotedTick] = useState(0)

  // The feed stream is already the source of truth for a post, so reuse it rather
  // than opening a second document listener.
  useEffect(() => subscribePosts((posts) => {
    setPost(posts.find((entry) => entry.id === postId) ?? null)
  }), [postId])

  useEffect(() => subscribeReplies(postId, setReplies), [postId])

  async function handleReply(event) {
    event?.preventDefault()
    if (!draft.trim() || sending) return

    setSending(true)
    const ok = await createReply({ postId, body: draft, profile: loadProfile() })
    setSending(false)

    if (ok) setDraft('')
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-4">
        <button
          type="button"
          onClick={() => navigate('/community')}
          className="flex items-center gap-1.5 border-0 bg-transparent p-0 text-[11px] font-semibold text-white/70"
        >
          <Icon name="chevronLeft" className="h-3.5 w-3.5" />
          {t('community.backToFeed')}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-3">
        {!post && (
          <p className="mt-8 text-center text-xs text-white/50">{t('community.postGone')}</p>
        )}

        {post && (
          <>
            <PostCard
              key={`${post.id}-${votedTick}`}
              post={post}
              voted={hasVoted(post.id)}
              onVote={async (id) => {
                await toggleVote(id)
                setVotedTick((n) => n + 1)
              }}
              compact={false}
            />

            <p className="mt-3 mb-2 text-xs font-bold text-white/70">
              {replies.length === 1
                ? t('community.oneReply')
                : t('community.replyCount', { n: String(replies.length) })}
            </p>

            {replies.length === 0 && (
              <p className="mt-4 mb-2 text-center text-xs text-white/50">
                {t('community.noReplies')}
              </p>
            )}

            {replies.map((reply) => (
              <Reply key={reply.id} reply={reply} />
            ))}
          </>
        )}
      </div>

      {/* REPLY BOX */}
      {post && (
        <form onSubmit={handleReply} className="shrink-0 px-4 pt-1 pb-5">
          <div
            style={{ background: 'var(--panel-strong)', borderColor: 'var(--panel-line)' }}
            className="flex items-end gap-2 rounded-2xl border border-solid p-2 shadow-[0_10px_28px_rgba(3,10,4,0.45)] backdrop-blur-xl"
          >
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={t('community.replyPlaceholder')}
              rows={1}
              maxLength={800}
              className="max-h-24 min-h-[38px] flex-1 resize-none border-0 bg-transparent px-2 py-2 text-xs leading-relaxed text-white placeholder:text-white/60 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!draft.trim() || sending}
              aria-label={t('community.send')}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-0 bg-lime-400 text-[#12200c] disabled:opacity-40"
            >
              <Icon name="send" className="h-4 w-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
