import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { useT } from '../../i18n/context.js'
import { loadProfile } from '../lib/profile.js'
import Icon from '../lib/icons.jsx'
import { Group, GroupLabel, Row, Rows } from '../../design/List.jsx'
import { SPRING } from '../../design/springs.js'
import { formatDaysWithUs, formatLabel, formatName, formatPlace } from './format.js'
import avatar from './assets/avatar.jpg'

/**
 * Profile, as grouped inset lists.
 *
 * The identity block sits on the plain ground rather than in a card — it is the subject of the
 * screen, not an item on it. Everything below is grouped the way a settings screen is: related
 * rows together, a quiet caption over each group, hairlines that start under the text.
 *
 * Rows that lead somewhere get a chevron; rows that only report a value do not. That
 * distinction is the whole navigational grammar of the screen.
 */

const MENU = [
  { key: 'personal', icon: 'profile', title: 'profile.personalInfo' },
  { key: 'fields', icon: 'field', title: 'profile.myFields' },
  { key: 'crops', icon: 'leaf', title: 'profile.myCrops' },
]

const PREFS = [
  { key: 'notifs', icon: 'bell', title: 'profile.notifications' },
  { key: 'privacy', icon: 'shield', title: 'profile.privacy' },
  { key: 'settings', icon: 'settings', title: 'profile.settings' },
]

export default function ProfilePage() {
  const profile = loadProfile()
  const navigate = useNavigate()
  const t = useT()

  const name = formatName(profile?.name) ?? t('app.farmer')
  const place = formatPlace(profile, t('profile.noLocation'))
  const cropName = profile?.crop ? t(`crops.${profile.crop}`) : null

  return (
    <div className="h-full overflow-y-auto pt-2 pb-8">
      {/* IDENTITY — on the ground, not in a card */}
      <motion.div
        className="flex flex-col items-center px-5 pb-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span
          className="h-20 w-20 overflow-hidden rounded-full"
          style={{ background: 'var(--paper-dim)', boxShadow: 'var(--lift-sm)' }}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ ...SPRING.settle, delay: 0.05 }}
        >
          <img src={avatar} alt="" className="h-full w-full scale-[1.45] object-cover object-center" />
        </motion.span>

        <h1 className="t-display mt-3 text-[26px]" style={{ color: 'var(--ink)' }}>
          {name}
        </h1>
        <p className="mt-0.5 text-[13px]" style={{ color: 'var(--ink-mid)' }}>
          {place}
        </p>

        <span
          className="t-label mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px]"
          style={{ background: 'color-mix(in srgb, var(--green) 12%, transparent)', color: 'var(--green)' }}
        >
          <Icon name="shield" className="h-3.5 w-3.5" />
          {t('profile.verified')}
        </span>
      </motion.div>

      {/* AT A GLANCE — real figures from onboarding, not decoration */}
      <GroupLabel>{t('home.farmOverview')}</GroupLabel>
      <Group delay={0.04}>
        <Rows>
          <Row
            leading={<Icon name="field" className="h-4 w-4" />}
            title={t('profile.fields')}
            value={profile?.fieldName ? formatLabel(profile.fieldName) : '0'}
          />
          <Row
            leading={<Icon name="leaf" className="h-4 w-4" />}
            title={t('profile.crops')}
            value={cropName ?? '0'}
          />
          <Row
            leading={<Icon name="calendar" className="h-4 w-4" />}
            title={t('profile.daysWithUs')}
            value={formatDaysWithUs(profile?.joinedAt)}
            last
          />
        </Rows>
      </Group>

      {/* FARM */}
      <div className="mt-6">
        <GroupLabel>{t('drawer.myFarms')}</GroupLabel>
        <Group delay={0.08}>
          <Rows>
            {MENU.map((item, i) => (
              <Row
                key={item.key}
                leading={<Icon name={item.icon} className="h-4 w-4" />}
                title={t(item.title)}
                chevron
                onClick={() => navigate('/home')}
                last={i === MENU.length - 1}
              />
            ))}
          </Rows>
        </Group>
      </div>

      {/* PREFERENCES */}
      <div className="mt-6">
        <GroupLabel>{t('profile.settings')}</GroupLabel>
        <Group delay={0.12}>
          <Rows>
            {PREFS.map((item, i) => (
              <Row
                key={item.key}
                leading={<Icon name={item.icon} className="h-4 w-4" />}
                title={t(item.title)}
                chevron
                onClick={() => navigate('/home')}
                last={i === PREFS.length - 1}
              />
            ))}
          </Rows>
        </Group>
      </div>

      {/* SUPPORT + EXIT */}
      <div className="mt-6">
        <Group delay={0.16}>
          <Rows>
            <Row
              leading={<Icon name="help" className="h-4 w-4" />}
              title={t('profile.help')}
              chevron
              onClick={() => navigate('/community')}
            />
            <Row
              leading={<Icon name="logout" className="h-4 w-4" />}
              title={t('profile.logOut')}
              danger
              onClick={() => navigate('/')}
              last
            />
          </Rows>
        </Group>
      </div>

      <p className="mt-6 text-center text-[11px]" style={{ color: 'var(--ink-soft)' }}>
        {t('profile.version')} 1.0.0
      </p>
    </div>
  )
}
