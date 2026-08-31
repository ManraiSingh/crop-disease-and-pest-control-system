import { useState } from 'react'
import { useT } from '../../i18n/context.js'
import { useLocation, useNavigate } from 'react-router-dom'
import LocationButton from '../components/LocationButton.jsx'
import OnboardingShell from '../components/OnboardingShell.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import AddFieldScene from '../components/scenes/AddFieldScene.jsx'
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
      hero={<AddFieldScene />}
      activeCount={2}
      onBack={() => navigate('/onboarding/about-you', { state })}
      onForward={handleContinue}
    >
      <form onSubmit={handleContinue} className="flex flex-col gap-3">
        <div>
          <h1 className="text-lg font-bold text-black">{t('onboarding.fieldTitle')}</h1>
          <p className="mt-0.5 text-xs text-gray-600">{t('onboarding.fieldSub')}</p>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="min-w-0 flex-1">
            <TextField
              label={t('onboarding.fieldName')}
              placeholder={t('onboarding.fieldPlaceholder')}
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              required
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="mb-1 block text-[10px] font-bold tracking-wide text-black uppercase">
              {t('onboarding.location')}
            </span>
            <LocationButton
              label={t('onboarding.useLocation')}
              onClick={handleUseCurrentLocation}
              status={locationStatus}
            />
          </div>
        </div>

        <PrimaryButton disabled={!fieldName.trim()}>{t('onboarding.continue')}</PrimaryButton>
      </form>
    </OnboardingShell>
  )
}
