import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GLASS_SHEEN, GLASS_SURFACE_SOFT } from '../../app/lib/glass.js'
import Icon from '../../app/lib/icons.jsx'
import { saveProfile } from '../../app/lib/profile.js'
import { useT } from '../../i18n/context.js'
import { fetchFarmer, isValidPhone, normalizePhone, recordSignIn } from '../../shared/services/farmers.js'
import { STEPS } from '../steps.js'

const CARD = `${GLASS_SURFACE_SOFT} rounded-2xl`

/**
 * Sign-in, and the app's only notion of identity: the farmer's phone number is the
 * key their record is stored under, both locally and in the `farmers` collection the
 * government portal reads.
 *
 * A number that is already registered loads that farmer straight to Home. A new one
 * carries into onboarding, where it is saved alongside the rest of their details.
 *
 * Sits before step 1, so it stays out of the numbered onboarding progress.
 */
export default function PhoneLogin() {
  const navigate = useNavigate()
  const t = useT()
  const [phone, setPhone] = useState('')
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState('')

  const ready = isValidPhone(phone)

  async function handleContinue(event) {
    event?.preventDefault()
    if (!ready || checking) return

    setChecking(true)
    setError('')

    const digits = normalizePhone(phone)

    // Returns null when Firebase is unconfigured or unreachable, so a failed
    // lookup simply falls through to onboarding rather than blocking sign-in.
    const existing = await fetchFarmer(digits)

    setChecking(false)

    if (existing) {
      saveProfile({ ...existing, phone: digits })
      // Not awaited: the officer's dashboard should hear about this, but the farmer
      // should not wait on the network to reach their own home screen.
      recordSignIn(digits)
      navigate('/home')
      return
    }

    navigate(STEPS[0].path, { state: { phone: digits } })
  }

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#16210e]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/onboarding/step-1.jpg')" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,5,0.86)_0%,rgba(8,18,7,0.55)_40%,rgba(6,14,5,0.9)_100%)]"
      />

      <div className="relative z-10 flex h-full flex-col px-4 pt-9 pb-5">
        <button
          type="button"
          onClick={() => navigate('/onboarding/welcome')}
          aria-label={t('onboarding.back')}
          className="rise flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-solid border-white/25 bg-white/9 text-white backdrop-blur-md"
        >
          <Icon name="chevronLeft" className="h-5 w-5" />
        </button>

        <div className="mt-auto mb-auto text-center">
          <span
            className="launch-mark mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-solid border-white/25 bg-[#5b8c2a] shadow-[0_8px_20px_rgba(6,20,12,0.45)]"
            style={{ animationDelay: '60ms' }}
          >
            <Icon name="profile" className="h-8 w-8 text-white" />
          </span>

          <h1 className="rise mt-5 text-2xl leading-snug font-bold text-white" style={{ '--d': '180ms' }}>
            {t('onboarding.phoneTitle')}
          </h1>
          <p className="rise mt-2 text-sm text-white/70" style={{ '--d': '250ms' }}>
            {t('onboarding.phoneSub')}
          </p>
        </div>

        <form
          onSubmit={handleContinue}
          className={`${CARD} rise mb-4 flex flex-col gap-4 p-4`}
          style={{ '--d': '330ms' }}
        >
          <span aria-hidden="true" className={GLASS_SHEEN} />

          <label className="relative block">
            <span className="mb-2 block text-[11px] font-semibold tracking-[0.1em] text-white/60 uppercase">
              {t('onboarding.phone')}
            </span>
            <span className="relative block">
              <Icon
                name="pulse"
                className="pointer-events-none absolute top-1/2 left-4 h-[18px] w-[18px] -translate-y-1/2 text-lime-300"
              />
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value)
                  setError('')
                }}
                placeholder={t('onboarding.phonePlaceholder')}
                className="w-full rounded-full border border-solid border-white/20 bg-white/8 py-3 pr-4 pl-11 text-sm text-white backdrop-blur-md placeholder:text-white/40 focus:border-lime-300/60 focus:bg-white/11 focus:outline-none"
              />
            </span>
          </label>

          {error && <p className="relative text-xs text-red-300">{error}</p>}

          <button
            type="submit"
            disabled={!ready || checking}
            className="relative w-full rounded-full border-0 bg-[#5b8c2a] py-3.5 text-base font-semibold text-white transition disabled:opacity-40"
          >
            {checking ? t('onboarding.phoneChecking') : t('onboarding.continue')}
          </button>
        </form>
      </div>
    </div>
  )
}
