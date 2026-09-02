import { GLASS_SHEEN, GLASS_SURFACE } from '../../lib/glass.jsx'
import Icon from '../../lib/icons.jsx'
import avatar from '../assets/avatar.jpg'
import { useT } from '../../../i18n/context.js'
import { formatLocation, formatName } from '../format.js'

/**
 * Centred profile card — avatar, name, location and status stack down the middle, which is what
 * gives the card its height. The avatar is a mark on a white ground, so the circle stays white
 * rather than translucent; anything glassy behind it would show through the artwork.
 */
export default function ProfileHeader({ profile }) {
  const t = useT()
  return (
    <button type="button" className={`${GLASS_SURFACE} mx-4 flex w-[calc(100%-2rem)] flex-col items-center gap-3 px-5 py-7`}>
      <span aria-hidden="true" className={GLASS_SHEEN} />

      <span className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border border-solid border-white/25 bg-white shadow-[0_10px_28px_rgba(6,20,12,0.4)]">
        <img src={avatar} alt="" className="h-full w-full scale-[1.45] object-cover object-center" />
        <span className="absolute right-1 bottom-1 flex h-8 w-8 items-center justify-center rounded-full bg-lime-400 text-[#12200c] ring-2 ring-white/50">
          <Icon name="camera" className="h-4 w-4" />
        </span>
      </span>

      <span className="relative flex flex-col items-center gap-1.5 text-center">
        <span className="max-w-full truncate text-xl font-bold text-white">
          {formatName(profile?.name) ?? 'Farmer'}
        </span>
        <span className="flex items-center gap-1 text-xs text-white/70">
          <Icon name="pin" className="h-3.5 w-3.5 text-lime-300" />
          {formatLocation(profile?.location, t('profile.noLocation'))}
        </span>
        <span className="mt-0.5 inline-flex items-center gap-1 rounded-full border border-solid border-lime-200/30 bg-lime-300/20 px-3 py-1.5 text-[11px] font-bold text-lime-100">
          <Icon name="checkCircle" className="h-3.5 w-3.5" />
          {t('profile.verified')}
        </span>
      </span>
    </button>
  )
}
