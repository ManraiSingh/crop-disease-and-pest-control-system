import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useT } from '../../i18n/context.js'
import CropPicker from '../components/CropPicker.jsx'
import OnboardingShell from '../components/OnboardingShell.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import SelectField from '../components/SelectField.jsx'
/* One list of crops for the whole app — adding one here would only go stale. */
import { CROP_KEYS } from '../../app/advisory/cropKnowledge.js'

const VARIETY_KEYS = [
  { value: 'local', tKey: 'onboarding.vLocal' },
  { value: 'hybrid', tKey: 'onboarding.vHybrid' },
  { value: 'high-yield', tKey: 'onboarding.vHighYield' },
  { value: 'traditional', tKey: 'onboarding.vTraditional' },
]

export default function CropDetails() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const t = useT()

  /*
    Farmers grow more than one thing, so crops is a list. Selection order is
    meaningful: the first pick is the main crop, which is what Home and the
    government portal show as the primary. Older profiles only carry a single
    `crop`, so seed from that when there is no list yet.
  */
  const [crops, setCrops] = useState(
    state?.crops ?? (state?.crop ? [state.crop] : []),
  )
  const [variety, setVariety] = useState(state?.variety ?? '')

  const varieties = [
    { value: '', label: t('onboarding.selectVariety') },
    ...VARIETY_KEYS.map((v) => ({ value: v.value, label: t(v.tKey) })),
  ]

  function toggleCrop(key) {
    setCrops((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key],
    )
  }

  function handleContinue(event) {
    event?.preventDefault()
    if (!crops.length) return

    navigate('/onboarding/all-set', {
      // `crop` stays the main one so everything reading a single crop keeps working.
      state: { ...state, crops, crop: crops[0], variety },
    })
  }

  return (
    <OnboardingShell
      step="crop"
      title={t('onboarding.cropTitle')}
      subtitle={t('onboarding.cropSub')}
      onBack={() => navigate('/onboarding/add-field', { state })}
    >
      <form onSubmit={handleContinue} className="flex flex-col gap-4">
        <CropPicker cropKeys={CROP_KEYS} selected={crops} onToggle={toggleCrop} />

        <SelectField
          label={t('onboarding.variety')}
          fieldIcon="leaf"
          options={varieties}
          value={variety}
          onChange={(e) => setVariety(e.target.value)}
        />

        <PrimaryButton disabled={!crops.length}>{t('onboarding.continue')}</PrimaryButton>
      </form>
    </OnboardingShell>
  )
}
