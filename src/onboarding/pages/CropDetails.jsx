import { useState } from 'react'
import { useT } from '../../i18n/context.js'
import { useLocation, useNavigate } from 'react-router-dom'
import OnboardingShell from '../components/OnboardingShell.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import CropDetailsScene from '../components/scenes/CropDetailsScene.jsx'
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
      hero={<CropDetailsScene />}
      activeCount={3}
      onBack={() => navigate('/onboarding/add-field', { state })}
      onForward={handleContinue}
    >
      <form onSubmit={handleContinue} className="flex flex-col gap-3">
        <div>
          <h1 className="text-lg font-bold text-black">{t('onboarding.cropTitle')}</h1>
          <p className="mt-0.5 text-xs text-gray-600">
            {t('onboarding.cropSub')}
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="min-w-0 flex-1">
            <SelectField
              label={t('onboarding.crop')}
              options={[{ value: '', label: t('onboarding.selectCrop') }, ...crops]}
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              required
            />
          </div>
          <div className="min-w-0 flex-1">
            <SelectField
              label={t('onboarding.variety')}
              options={varieties}
              value={variety}
              onChange={(e) => setVariety(e.target.value)}
            />
          </div>
        </div>

        <PrimaryButton disabled={!crop}>{t('onboarding.continue')}</PrimaryButton>
      </form>
    </OnboardingShell>
  )
}
