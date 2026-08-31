import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import OnboardingShell from '../components/OnboardingShell.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import AboutYourselfScene from '../components/scenes/AboutYourselfScene.jsx'
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
      hero={<AboutYourselfScene />}
      activeCount={1}
      onForward={handleContinue}
    >
      <form onSubmit={handleContinue} className="flex flex-col gap-3">
        <div>
          <h1 className="text-lg font-bold text-black">Tell us about yourself</h1>
          <p className="mt-0.5 text-xs text-gray-600">
            This helps us personalize your experience.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="min-w-0 flex-1">
            <TextField
              label="Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>
          <div className="min-w-0 flex-1">
            <SelectField
              label="Preferred language"
              options={LANGUAGES}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
        </div>

        <PrimaryButton disabled={!name.trim()}>Continue</PrimaryButton>
      </form>
    </OnboardingShell>
  )
}
