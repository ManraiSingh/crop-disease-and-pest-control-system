import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OnboardingShell from '../../components/onboarding/OnboardingShell.jsx'
import PrimaryButton from '../../components/onboarding/PrimaryButton.jsx'
import AboutYourselfScene from '../../components/onboarding/scenes/AboutYourselfScene.jsx'
import SelectField from '../../components/onboarding/SelectField.jsx'
import TextField from '../../components/onboarding/TextField.jsx'

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
  const [name, setName] = useState('')
  const [language, setLanguage] = useState('hindi')

  function handleContinue(event) {
    event?.preventDefault()
    if (!name.trim()) return
    navigate('/onboarding/add-field', { state: { name, language } })
  }

  return (
    <OnboardingShell
      hero={<AboutYourselfScene />}
      activeCount={1}
      onForward={handleContinue}
    >
      <form onSubmit={handleContinue} className="flex flex-col gap-3 sm:gap-6">
        <div>
          <h1 className="text-lg font-bold text-black sm:text-2xl lg:text-3xl">
            Tell us about yourself
          </h1>
          <p className="mt-0.5 text-xs text-gray-600 sm:mt-2 sm:text-base">
            This helps us personalize your experience.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-4 lg:flex-col lg:gap-5">
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
