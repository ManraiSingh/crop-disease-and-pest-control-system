import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../../i18n/context.js'
import OnboardingShell from '../components/OnboardingShell.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import SelectField from '../components/SelectField.jsx'
import TextField from '../components/TextField.jsx'

export default function AboutYourself() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [name, setName] = useState(state?.name ?? '')
  // Picking a language here switches the whole app immediately, so the rest of onboarding is
  // already in that language by the next step. The list comes from the localization endpoint,
  // so adding a language server-side makes it appear here with no code change.
  const { language, setLanguage, t, languages } = useLanguage()
  const options = languages.map((lang) => ({ value: lang.code, label: lang.native }))

  function handleContinue(event) {
    event?.preventDefault()
    if (!name.trim()) return
    navigate('/onboarding/add-field', { state: { ...state, name, language } })
  }

  return (
    <OnboardingShell
      step="about-you"
      title={t('onboarding.aboutTitle')}
      subtitle={t('onboarding.aboutSub')}
      onBack={() => navigate('/onboarding/welcome')}
    >
      <form onSubmit={handleContinue} className="flex flex-col gap-4">
        <TextField
          label={t('onboarding.name')}
          labelIcon="profile"
          placeholder={t('onboarding.namePlaceholder')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
        />
        <SelectField
          label={t('onboarding.prefLanguage')}
          labelIcon="globe"
          options={options}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />

        <PrimaryButton disabled={!name.trim()}>{t('onboarding.continue')}</PrimaryButton>
      </form>
    </OnboardingShell>
  )
}
