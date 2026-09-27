import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GLASS_SURFACE } from '../../lib/glass.js'
import { useLanguage, useT } from '../../../i18n/context.js'
import { cropArt } from '../../lib/cropArt.js'
import Icon from '../../lib/icons.jsx'
import { useTheme } from '../../lib/theme.js'

const ITEMS = [
  { key: 'personal', icon: 'profile', title: 'profile.personalInfo', subtitle: 'profile.personalInfoSub' },
  { key: 'fields', icon: 'field', title: 'profile.myFields', subtitle: 'profile.myFieldsSub' },
  { key: 'crops', icon: 'leaf', title: 'profile.myCrops', subtitle: 'profile.myCropsSub' },
  { key: 'notifs', icon: 'bell', title: 'profile.notifications', subtitle: 'profile.notificationsSub' },
  { key: 'privacy', icon: 'shield', title: 'profile.privacy', subtitle: 'profile.privacySub' },
  { key: 'help', icon: 'help', title: 'profile.help', subtitle: 'profile.helpSub' },
  { key: 'settings', icon: 'settings', title: 'profile.settings', subtitle: 'profile.settingsSub' },
]

/** Label above a value, the shape every row's contents are built from. */
function Row({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1.5">
      <span className="shrink-0 text-[11px] text-white/45">{label}</span>
      <span className="min-w-0 truncate text-right text-[12.5px] font-semibold text-white">
        {value || '—'}
      </span>
    </div>
  )
}

/** A setting the farmer can actually change, or one that is simply on. */
function Toggle({ label, on, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onChange}
      className="flex w-full items-center justify-between gap-3 border-0 bg-transparent py-1.5 text-left"
    >
      <span className="text-[12.5px] text-white/75">{label}</span>
      <span
        className={`flex h-[22px] w-[38px] shrink-0 items-center rounded-full px-[3px] transition ${
          on ? 'justify-end bg-lime-400' : 'justify-start bg-white/20'
        }`}
      >
        <span className="h-4 w-4 rounded-full bg-white" />
      </span>
    </button>
  )
}

/**
 * The account menu.
 *
 * Every row used to be a chevron that led nowhere. They open in place instead of
 * navigating: all of this is a handful of lines each, and a screen per row would
 * be six screens of one paragraph.
 */
export default function MenuList({ profile }) {
  const navigate = useNavigate()
  const t = useT()
  const { language, languages, setLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()

  const [open, setOpen] = useState(null)

  /* Preferences with nothing behind them yet are held here, not pretended about. */
  const [prefs, setPrefs] = useState({ outbreak: true, weather: true, community: false })

  const toggle = (key) => setPrefs((current) => ({ ...current, [key]: !current[key] }))

  const crops = profile?.crops?.length
    ? profile.crops
    : profile?.crop
      ? [profile.crop]
      : []

  const joined = profile?.joinedAt
    ? new Date(profile.joinedAt).toLocaleDateString([], {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null

  function body(key) {
    if (key === 'personal') {
      return (
        <>
          <Row label={t('profile.fName')} value={profile?.name} />
          <Row label={t('profile.fPhone')} value={profile?.phone} />
          <Row
            label={t('profile.fLanguage')}
            value={languages.find((l) => l.code === language)?.native}
          />
          <Row label={t('profile.fJoined')} value={joined} />
        </>
      )
    }

    if (key === 'fields') {
      return (
        <>
          <Row label={t('profile.fField')} value={profile?.fieldName} />
          <Row label={t('profile.fDistrict')} value={profile?.district} />
          <Row label={t('profile.fTaluka')} value={profile?.taluka} />
          <Row
            label={t('profile.fArea')}
            value={profile?.land ? t('profile.acres', { n: String(profile.land) }) : null}
          />
        </>
      )
    }

    if (key === 'crops') {
      return crops.length ? (
        <div className="flex flex-wrap gap-2 py-1">
          {crops.map((crop, index) => (
            <span
              key={crop}
              className="flex items-center gap-1.5 rounded-full border border-solid border-white/12 bg-white/8 px-2.5 py-1 text-[11.5px] font-semibold text-white"
            >
              <span aria-hidden="true">{cropArt(crop)}</span>
              {t(`crops.${crop}`)}
              {index === 0 && <em className="not-italic text-[9.5px] text-lime-300">{t('profile.main')}</em>}
            </span>
          ))}
        </div>
      ) : (
        <p className="py-1 text-[12px] text-white/55">{t('home.noCrop')}</p>
      )
    }

    if (key === 'notifs') {
      return (
        <>
          <Toggle label={t('profile.nOutbreak')} on={prefs.outbreak} onChange={() => toggle('outbreak')} />
          <Toggle label={t('profile.nWeather')} on={prefs.weather} onChange={() => toggle('weather')} />
          <Toggle label={t('profile.nCommunity')} on={prefs.community} onChange={() => toggle('community')} />
        </>
      )
    }

    if (key === 'privacy') {
      return (
        <>
          <p className="py-1 text-[12px] leading-relaxed text-white/65">{t('profile.privacyBody')}</p>
          <Row label={t('profile.fPhone')} value={profile?.phone} />
          <Row label={t('profile.pLocation')} value={t('profile.pTalukaOnly')} />
        </>
      )
    }

    if (key === 'help') {
      return (
        <>
          <p className="py-1 text-[12px] leading-relaxed text-white/65">{t('profile.helpBody')}</p>
          <Row label={t('profile.hKisan')} value="1800-180-1551" />
          <Row label={t('profile.hOffice')} value={profile?.taluka || '—'} />
        </>
      )
    }

    /* settings */
    return (
      <>
        <div className="flex items-center justify-between gap-3 py-1.5">
          <span className="text-[12.5px] text-white/75">{t('profile.sLanguage')}</span>
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="rounded-lg border border-solid border-white/15 bg-[#1d2814]/85 px-2 py-1 text-[12px] font-semibold text-white"
          >
            {languages.map((option) => (
              <option key={option.code} value={option.code}>
                {option.native}
              </option>
            ))}
          </select>
        </div>

        <Toggle
          label={t('profile.sDarkMode')}
          on={theme === 'dark'}
          onChange={toggleTheme}
        />

        <Row label={t('profile.version')} value="1.0.0" />
      </>
    )
  }

  return (
    <div className={`${GLASS_SURFACE} mx-4 rounded-2xl`}>
      {ITEMS.map((item, i) => {
        const expanded = open === item.key

        return (
          <div
            key={item.key}
            className={i !== ITEMS.length - 1 ? 'border-b border-solid border-white/10' : ''}
          >
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : item.key)}
              className="flex w-full items-center gap-3 border-0 bg-transparent px-4 py-3 text-left"
            >
              <Icon name={item.icon} className="h-5 w-5 shrink-0 text-lime-200" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">{t(item.title)}</p>
                <p className="text-[11px] text-white/55">{t(item.subtitle)}</p>
              </div>
              <Icon
                name="chevronDown"
                className={`h-4 w-4 shrink-0 text-white/35 transition-transform ${
                  expanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expanded && (
              <div className="rise border-t border-solid border-white/8 px-4 pt-2.5 pb-3.5">
                {body(item.key)}
              </div>
            )}
          </div>
        )
      })}

      <button
        type="button"
        onClick={() => navigate('/')}
        className="relative flex w-full items-center gap-3 border-0 border-t border-solid border-white/10 bg-transparent px-4 py-3 text-left"
      >
        <Icon name="logout" className="h-5 w-5 shrink-0 text-red-300" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-red-300">{t('profile.logOut')}</p>
          <p className="text-[11px] text-white/55">{t('profile.logOutSub')}</p>
        </div>
        <Icon name="chevronRight" className="h-4 w-4 shrink-0 text-white/35" />
      </button>
    </div>
  )
}
