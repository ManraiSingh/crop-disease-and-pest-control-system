import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FieldLabel from '../components/FieldLabel.jsx'
import LocationButton from '../components/LocationButton.jsx'
import OnboardingShell from '../components/OnboardingShell.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import TextField from '../components/TextField.jsx'

export default function AddField() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [fieldName, setFieldName] = useState(state?.fieldName ?? '')
  const [location, setLocation] = useState(state?.location ?? null)
  const [locationStatus, setLocationStatus] = useState('')

  function handleUseCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationStatus('Location is not supported on this device.')
      return
    }
    setLocationStatus('Locating…')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ latitude, longitude })
        setLocationStatus(`Location captured: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
      },
      () => {
        setLocationStatus('Could not get your location — check permissions and try again.')
      },
    )
  }

  function handleContinue(event) {
    event?.preventDefault()
    if (!fieldName.trim()) return
    navigate('/onboarding/crop', { state: { ...state, fieldName, location } })
  }

  return (
    <OnboardingShell
      step="add-field"
      title="Add your field"
      subtitle="Start with the field you want to monitor."
      onBack={() => navigate('/onboarding/about-you', { state })}
    >
      <form onSubmit={handleContinue} className="flex flex-col gap-4">
        <TextField
          label="Field name"
          fieldIcon="leaf"
          placeholder="e.g. North Field"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          required
        />

        <div>
          <FieldLabel>Location</FieldLabel>
          <LocationButton onClick={handleUseCurrentLocation} status={locationStatus} />
        </div>

        <PrimaryButton disabled={!fieldName.trim()}>Continue</PrimaryButton>
      </form>
    </OnboardingShell>
  )
}
