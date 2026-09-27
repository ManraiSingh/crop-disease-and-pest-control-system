import Icon from '../../lib/icons.jsx'
import { useT } from '../../../i18n/context.js'
import { timeAgo } from '../timeAgo.js'

/** Initial-in-a-circle stands in for an avatar — farmers have no profile photos. */
function AuthorDot({ name }) {
  return (
    <span
      className="t-label flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px]"
      style={{ background: 'color-mix(in srgb, var(--green) 16%, transparent)', color: 'var(--green)' }}
    >
      {(name || '?').trim().charAt(0).toUpperCase()}
    </span>
  )
}

/**
 * One post in the feed: vote rail down the left, content on the right — the layout a
 * discussion board is read in, rendered in the app's glass material rather than Reddit's.
 *
 * `compact` trims the body to a preview for the feed; the detail view shows it in full.
 */
export default function PostCard({ post, voted, onVote, onOpen, compact = true }) {
  const t = useT()

  return (
    <article
      className="mx-3 mb-2.5 rounded-[18px]"
      style={{ background: 'var(--paper-dim)', border: '1px solid var(--paper-edge)' }}
    >
      <div className="relative flex gap-3 p-3">
        {/* VOTE RAIL */}
        <div className="flex w-9 shrink-0 flex-col items-center gap-0.5">
          <button
            type="button"
            aria-pressed={voted}
            aria-label={t('community.upvote')}
            onClick={() => onVote?.(post.id)}
            className="flex h-8 w-8 items-center justify-center rounded-[10px] transition"
            style={{
              background: voted ? 'var(--lime)' : 'var(--paper)',
              border: `1px solid ${voted ? 'var(--lime)' : 'var(--paper-edge)'}`,
              color: voted ? 'var(--pitch)' : 'var(--ink-soft)',
            }}
          >
            <Icon name="arrowUp" className="h-4 w-4" />
          </button>
          <span
            className="t-num text-[13px]"
            style={{ color: voted ? 'var(--green)' : 'var(--ink-mid)' }}
          >
            {post.votes}
          </span>
        </div>

        {/* CONTENT */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <AuthorDot name={post.authorName} />
            <span className="truncate text-[11px] font-semibold text-white/75">
              {post.authorName}
            </span>
            <span className="text-[11px] text-white/35">·</span>
            <span className="shrink-0 text-[11px] text-white/45">
              {timeAgo(post.createdAt, t)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onOpen?.(post.id)}
            className="mt-1.5 block w-full border-0 bg-transparent p-0 text-left"
          >
            <h3 className="text-sm leading-snug font-bold text-white">{post.title}</h3>

            {post.body && (
              <p
                className={`mt-1 text-xs leading-relaxed text-white/65 ${
                  compact ? 'line-clamp-3' : ''
                }`}
              >
                {post.body}
              </p>
            )}

            {post.image && (
              <span
                className={`mt-2.5 block overflow-hidden rounded-xl border border-solid border-white/10 ${
                  compact ? 'max-h-44' : ''
                }`}
              >
                <img
                  src={post.image}
                  alt=""
                  loading="lazy"
                  className={`w-full object-cover ${compact ? 'max-h-44' : ''}`}
                />
              </span>
            )}
          </button>

          {/* TAGS + REPLY COUNT */}
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            {post.crop && (
              <span className="rounded-full border border-solid border-lime-200/25 bg-lime-300/15 px-2 py-0.5 text-[10px] font-semibold text-lime-100">
                {t(`crops.${post.crop}`)}
              </span>
            )}
            {post.place && (
              <span className="flex items-center gap-1 rounded-full border border-solid border-white/12 bg-white/8 px-2 py-0.5 text-[10px] font-semibold text-white/60">
                <Icon name="pin" className="h-2.5 w-2.5" />
                {post.place}
              </span>
            )}

            <button
              type="button"
              onClick={() => onOpen?.(post.id)}
              className="ml-auto flex items-center gap-1.5 rounded-full border border-solid border-white/12 bg-white/8 px-2.5 py-1 text-[10px] font-semibold text-white/70"
            >
              <Icon name="comment" className="h-3 w-3" />
              {post.replyCount === 1
                ? t('community.oneReply')
                : t('community.replyCount', { n: String(post.replyCount) })}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
