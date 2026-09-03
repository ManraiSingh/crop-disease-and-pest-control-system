import { useState } from 'react'
import { useT } from '../../i18n/context.js'
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
  const t = useT()

  function handleUseCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationStatus(t('onboarding.locationUnsupported'))
      return
    }
    setLocationStatus(t('onboarding.locating'))
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ latitude, longitude })
        setLocationStatus(`${t('onboarding.locationCaptured')}: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
      },
      () => {
        setLocationStatus(t('onboarding.locationError'))
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
      title={t('onboarding.fieldTitle')}
      subtitle={t('onboarding.fieldSub')}
      onBack={() => navigate('/onboarding/about-you', { state })}
    >
      <form onSubmit={handleContinue} className="flex flex-col gap-4">
        <TextField
          label={t('onboarding.fieldName')}
          fieldIcon="leaf"
          placeholder={t('onboarding.fieldPlaceholder')}
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          required
        />

        <div>
          <FieldLabel>{t('onboarding.location')}</FieldLabel>
          <LocationButton
            label={t('onboarding.useLocation')}
            onClick={handleUseCurrentLocation}
            status={locationStatus}
          />
        </div>

        <PrimaryButton disabled={!fieldName.trim()}>{t('onboarding.continue')}</PrimaryButton>
      </form>
    </OnboardingShell>
  )
}
