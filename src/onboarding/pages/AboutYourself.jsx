import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import OnboardingShell from '../components/OnboardingShell.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import AboutYourselfScene from '../components/scenes/AboutYourselfScene.jsx'
import SelectField from '../components/SelectField.jsx'
import TextField from '../components/TextField.jsx'
import { useLanguage } from '../../i18n/context.js'

// The list comes from the localization endpoint, so adding a language server-side makes
// it appear here with no code change and no rebuild.

export default function AboutYourself() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [name, setName] = useState(state?.name ?? '')
  // Picking a language here switches the whole app immediately, so the rest of
  // onboarding is already in that language by the next step.
  const { language, setLanguage, t, languages } = useLanguage()
  const options = languages.map((lang) => ({ value: lang.code, label: lang.native }))

  function handleContinue(event) {
    event?.preventDefault()
    if (!name.trim()) return
    navigate('/onboarding/add-field', { state: { ...state, name, language } })
  }

  return (
    <OnboardingShell
      hero={<AboutYourselfScene />}
      activeCount={1}
      onForward={handleContinue}
    >
      <form onSubmit={handleContinue} className="flex flex-col gap-3">
        <div>
          <h1 className="text-lg font-bold text-black">{t('onboarding.aboutTitle')}</h1>
          <p className="mt-0.5 text-xs text-gray-600">
            {t('onboarding.aboutSub')}
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="min-w-0 flex-1">
            <TextField
              label={t('onboarding.name')}
              placeholder={t('onboarding.namePlaceholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>
          <div className="min-w-0 flex-1">
            <SelectField
              label={t('onboarding.prefLanguage')}
              options={options}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
        </div>

        <PrimaryButton disabled={!name.trim()}>{t('onboarding.continue')}</PrimaryButton>
      </form>
    </OnboardingShell>
  )
}
