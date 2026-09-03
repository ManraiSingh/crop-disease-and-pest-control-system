import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useT } from '../../i18n/context.js'
import OnboardingShell from '../components/OnboardingShell.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import SelectField from '../components/SelectField.jsx'

const CROP_KEYS = [
  'tomato', 'rice', 'wheat', 'cotton', 'sugarcane',
  'onion', 'soybean', 'maize', 'chilli', 'potato',
]

const VARIETY_KEYS = [
  { value: 'local', tKey: 'onboarding.vLocal' },
  { value: 'hybrid', tKey: 'onboarding.vHybrid' },
  { value: 'high-yield', tKey: 'onboarding.vHighYield' },
  { value: 'traditional', tKey: 'onboarding.vTraditional' },
]

export default function CropDetails() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [crop, setCrop] = useState(state?.crop ?? '')
  const [variety, setVariety] = useState(state?.variety ?? '')
  const t = useT()

  const crops = CROP_KEYS.map((key) => ({ value: key, label: t(`crops.${key}`) }))
  const varieties = [
    { value: '', label: t('onboarding.selectVariety') },
    ...VARIETY_KEYS.map((v) => ({ value: v.value, label: t(v.tKey) })),
  ]

  function handleContinue(event) {
    event?.preventDefault()
    if (!crop) return
    navigate('/onboarding/all-set', { state: { ...state, crop, variety } })
  }

  return (
    <OnboardingShell
      step="crop"
      title={t('onboarding.cropTitle')}
      subtitle={t('onboarding.cropSub')}
      onBack={() => navigate('/onboarding/add-field', { state })}
    >
      <form onSubmit={handleContinue} className="flex flex-col gap-4">
        <SelectField
          label={t('onboarding.crop')}
          fieldIcon="leaf"
          options={[{ value: '', label: t('onboarding.selectCrop') }, ...crops]}
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          required
        />
        <SelectField
          label={t('onboarding.variety')}
          fieldIcon="leaf"
          options={varieties}
          value={variety}
          onChange={(e) => setVariety(e.target.value)}
        />

        <PrimaryButton disabled={!crop}>{t('onboarding.continue')}</PrimaryButton>
      </form>
    </OnboardingShell>
  )
}
