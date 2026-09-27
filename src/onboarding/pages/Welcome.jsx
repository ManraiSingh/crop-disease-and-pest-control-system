import { useNavigate } from 'react-router-dom'
import Icon from '../../app/lib/icons.jsx'
import LanguagePicker from '../../i18n/LanguagePicker.jsx'
import { useT } from '../../i18n/context.js'

/**
 * What the app actually covers. Real counts, not illustration: ten crops in
 * cropKnowledge.js, thirty diseases in diseaseText.js, three locale files.
 * The screen this replaced showed a farm's area and yield before the farmer had
 * entered a farm — numbers that could only ever be made up.
 */
const PROOF = [
  { value: '10', label: 'welcome.crops' },
  { value: '30', label: 'welcome.diseases' },
  { value: '3', label: 'welcome.languages' },
]

/**
 * The screen the flow opens on.
 *
 * The photograph gets the top half and the words get the bottom, on solid
 * ground — the version before this set lime type over a green field and asked
 * the farmer to read it. Nothing here overlaps the image except the brand.
 *
 * Language sits on this screen rather than three steps in: it is the first
 * choice a farmer needs to make, and every screen after it depends on it.
 */
export default function Welcome() {
  const navigate = useNavigate()
  const t = useT()

  // Sign-in first: the phone number entered there is the identity the rest of
  // onboarding (and the government portal) keys this farmer's record to.
  const start = () => navigate('/onboarding/phone')

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#0a0f08]">
      {/* PHOTOGRAPH */}
      <div aria-hidden="true" className="photo-in pointer-events-none absolute inset-x-0 top-0 h-[50%]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/onboarding/welcome.jpg')" }}
        />
        {/* Fades the photograph into the ground the type sits on. */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,15,8,0.5)_0%,rgba(10,15,8,0)_26%,rgba(10,15,8,0.7)_66%,#0a0f08_88%)]" />
      </div>

      {/* BRAND + LANGUAGE */}
      <header className="relative z-20 flex items-center justify-between px-5 pt-9">
        <span className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-400 shadow-[0_6px_18px_rgba(163,230,53,0.35)]">
            <Icon name="leaf" className="h-[18px] w-[18px] text-[#12200c]" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]">
            Crop Care
          </span>
        </span>

        <LanguagePicker triggerClassName="flex items-center gap-1 rounded-full border border-solid border-white/25 bg-white/12 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md" />
      </header>

      {/* THE PITCH */}
      <div className="relative z-10 mt-auto px-6 pb-9">
        <p className="rise flex w-fit items-center gap-1.5 rounded-full border border-solid border-lime-300/25 bg-lime-400/10 px-3 py-1.5 text-[11px] font-semibold tracking-[0.1em] text-lime-300 uppercase">
          <Icon name="sparkle" className="h-3 w-3" />
          {t('welcome.eyebrow')}
        </p>

        <h1
          className="rise mt-4 text-[38px] leading-[1.14] font-semibold tracking-[-0.03em] text-white"
          style={{ animationDelay: '80ms', textWrap: 'balance' }}
        >
          {t('welcome.headline')}
        </h1>

        <p
          className="rise mt-5 max-w-[19rem] text-[14px] leading-relaxed text-white/60"
          style={{ animationDelay: '160ms' }}
        >
          {t('welcome.blurb')}
        </p>

        {/* WHAT IT COVERS */}
        <div
          className="rise mt-7 flex items-stretch gap-5 border-t border-solid border-white/10 pt-5"
          style={{ animationDelay: '240ms' }}
        >
          {PROOF.map((item) => (
            <div key={item.label}>
              <p className="text-[22px] leading-none font-semibold text-white">{item.value}</p>
              <p className="mt-1.5 text-[11px] text-white/45">{t(item.label)}</p>
            </div>
          ))}
        </div>

        {/* GO */}
        <button
          type="button"
          onClick={start}
          className="rise mt-7 flex w-full items-center justify-center gap-2 rounded-2xl border-0 bg-lime-400 py-4 text-[15px] font-bold text-[#12200c] shadow-[0_10px_30px_rgba(163,230,53,0.22)]"
          style={{ animationDelay: '320ms' }}
        >
          {t('welcome.getStarted')}
          <Icon name="arrowRight" className="h-[18px] w-[18px]" />
        </button>

        <p
          className="rise mt-3.5 text-center text-[11.5px] text-white/40"
          style={{ animationDelay: '380ms' }}
        >
          {t('welcome.minute')}
        </p>
      </div>
    </div>
  )
}
