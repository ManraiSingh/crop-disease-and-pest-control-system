import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../../i18n/context.js'
import LOCATIONS from '../../shared/data/maharashtraLocations.json'
import OnboardingShell from '../components/OnboardingShell.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import SelectField from '../components/SelectField.jsx'
import TextField from '../components/TextField.jsx'

const DISTRICTS = Object.keys(LOCATIONS).sort()

export default function AddField() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [fieldName, setFieldName] = useState(state?.fieldName ?? '')
  const [district, setDistrict] = useState(state?.district ?? '')
  const [taluka, setTaluka] = useState(state?.taluka ?? '')
  const [land, setLand] = useState(state?.land ?? '')
  const { t } = useLanguage()

  // Talukas are meaningless without their district, so the second list is always
  // derived from the first — and picking a new district clears a stale taluka.
  const talukas = useMemo(() => LOCATIONS[district] ?? [], [district])

  function handleDistrictChange(event) {
    setDistrict(event.target.value)
    setTaluka('')
  }

  const ready = Boolean(fieldName.trim() && district && taluka)

  function handleContinue(event) {
    event?.preventDefault()
    if (!ready) return
    navigate('/onboarding/crop', {
      state: { ...state, fieldName, district, taluka, land },
    })
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

        <SelectField
          label={t('onboarding.district')}
          fieldIcon="pin"
          value={district}
          onChange={handleDistrictChange}
          options={[
            { value: '', label: t('onboarding.selectDistrict') },
            ...DISTRICTS.map((name) => ({ value: name, label: name })),
          ]}
          required
        />

        <SelectField
          label={t('onboarding.taluka')}
          fieldIcon="pin"
          value={taluka}
          onChange={(e) => setTaluka(e.target.value)}
          disabled={!district}
          options={[
            {
              value: '',
              label: district ? t('onboarding.selectTaluka') : t('onboarding.selectDistrictFirst'),
            },
            ...talukas.map((name) => ({ value: name, label: name })),
          ]}
          required
        />

        <TextField
          label={t('onboarding.landSize')}
          fieldIcon="field"
          type="number"
          min="0"
          step="0.1"
          placeholder={t('onboarding.landPlaceholder')}
          value={land}
          onChange={(e) => setLand(e.target.value)}
        />

        <PrimaryButton disabled={!ready}>{t('onboarding.continue')}</PrimaryButton>
      </form>
    </OnboardingShell>
  )
}
