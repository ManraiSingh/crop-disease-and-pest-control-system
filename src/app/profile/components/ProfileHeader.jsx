import { useT } from '../../../i18n/context.js'
import Icon from '../../lib/icons.jsx'
import avatar from '../assets/avatar.png'
import { formatLocation, formatName } from '../format.js'

/**
 * Avatar uses the farmer illustration from our own asset library (not a stock photo of a real
 * person) — same character as the onboarding "About yourself" step, for continuity.
 */
export default function ProfileHeader({ profile }) {
  const t = useT()
  return (
    <button type="button" className="flex w-full items-center gap-4 border-0 bg-transparent px-4 pt-4 pb-3 text-left">
      <div className="bg-sky relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
        <img src={avatar} alt="" className="h-full w-full scale-150 object-cover object-top" />
        <span className="bg-leaf absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full text-white ring-2 ring-white">
          <Icon name="camera" className="h-3 w-3" />
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-lg font-bold text-black">{formatName(profile?.name) ?? 'Farmer'}</p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
          <Icon name="pin" className="text-leaf-dark h-3.5 w-3.5" />
          {formatLocation(profile?.location, t(profile.noLocation))}
        </p>
        <span className="bg-sky text-leaf-dark mt-1.5 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold">
          <Icon name="checkCircle" className="h-3 w-3" />
          {t('profile.verified')}
        </span>
      </div>

      <Icon name="chevronRight" className="h-4 w-4 shrink-0 text-gray-300" />
    </button>
  )
}
