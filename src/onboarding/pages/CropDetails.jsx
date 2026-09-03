import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import OnboardingShell from '../components/OnboardingShell.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import SelectField from '../components/SelectField.jsx'

const CROPS = [
  { value: 'tomato', label: 'Tomato' },
  { value: 'rice', label: 'Rice' },
  { value: 'wheat', label: 'Wheat' },
  { value: 'cotton', label: 'Cotton' },
  { value: 'sugarcane', label: 'Sugarcane' },
  { value: 'onion', label: 'Onion' },
  { value: 'soybean', label: 'Soybean' },
  { value: 'maize', label: 'Maize' },
  { value: 'chilli', label: 'Chilli' },
  { value: 'potato', label: 'Potato' },
]

const VARIETIES = [
  { value: '', label: 'Select variety (optional)' },
  { value: 'local', label: 'Local' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'high-yield', label: 'High-yield' },
  { value: 'traditional', label: 'Traditional' },
]

export default function CropDetails() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [crop, setCrop] = useState(state?.crop ?? '')
  const [variety, setVariety] = useState(state?.variety ?? '')

  function handleContinue(event) {
    event?.preventDefault()
    if (!crop) return
    navigate('/onboarding/all-set', { state: { ...state, crop, variety } })
  }

  return (
    <OnboardingShell
      step="crop"
      title="Tell us about your crop"
      subtitle="This helps us give more accurate disease and pest insights."
      onBack={() => navigate('/onboarding/add-field', { state })}
    >
      <form onSubmit={handleContinue} className="flex flex-col gap-4">
        <SelectField
          label="Crop"
          fieldIcon="leaf"
          options={[{ value: '', label: 'Select your crop' }, ...CROPS]}
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          required
        />
        <SelectField
          label="Variety (optional)"
          fieldIcon="leaf"
          options={VARIETIES}
          value={variety}
          onChange={(e) => setVariety(e.target.value)}
        />

        <PrimaryButton disabled={!crop}>Continue</PrimaryButton>
      </form>
    </OnboardingShell>
  )
}
