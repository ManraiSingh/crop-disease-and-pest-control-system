import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import OnboardingShell from '../components/OnboardingShell.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import SelectField from '../components/SelectField.jsx'
import TextField from '../components/TextField.jsx'

const LANGUAGES = [
  { value: 'hindi', label: 'Hindi' },
  { value: 'marathi', label: 'Marathi' },
  { value: 'english', label: 'English' },
  { value: 'punjabi', label: 'Punjabi' },
  { value: 'gujarati', label: 'Gujarati' },
  { value: 'telugu', label: 'Telugu' },
  { value: 'tamil', label: 'Tamil' },
  { value: 'bengali', label: 'Bengali' },
]

export default function AboutYourself() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [name, setName] = useState(state?.name ?? '')
  const [language, setLanguage] = useState(state?.language ?? 'hindi')

  function handleContinue(event) {
    event?.preventDefault()
    if (!name.trim()) return
    navigate('/onboarding/add-field', { state: { ...state, name, language } })
  }

  return (
    <OnboardingShell
      step="about-you"
      title="Tell us about yourself"
      subtitle="This helps us personalize your experience."
      onBack={() => navigate('/onboarding/welcome')}
    >
      <form onSubmit={handleContinue} className="flex flex-col gap-4">
        <TextField
          label="Name"
          labelIcon="profile"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
        />
        <SelectField
          label="Preferred language"
          labelIcon="globe"
          options={LANGUAGES}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />

        <PrimaryButton disabled={!name.trim()}>Continue</PrimaryButton>
      </form>
    </OnboardingShell>
  )
}
