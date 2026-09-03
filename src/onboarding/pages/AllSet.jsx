import { useLocation, useNavigate } from 'react-router-dom'
import Icon from '../../app/lib/icons.jsx'
import { loadProfile, saveProfile } from '../../app/lib/profile.js'
import OnboardingShell from '../components/OnboardingShell.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'

function formatValue(value) {
  if (!value) return '—'
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function SummaryRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-solid border-white/15 bg-white/8 px-4 py-2.5">
      <Icon name={icon} className="h-[18px] w-[18px] shrink-0 text-lime-300" />
      <span className="text-[11px] font-semibold tracking-[0.1em] text-white/60 uppercase">{label}</span>
      <span className="ml-auto min-w-0 truncate text-sm font-bold text-white">{value}</span>
    </div>
  )
}

export default function AllSet() {
  const navigate = useNavigate()
  const { state } = useLocation()

  function handleFinish() {
    // Preserve the original join date if onboarding is being run again.
    const joinedAt = loadProfile()?.joinedAt ?? Date.now()
    saveProfile({ ...state, joinedAt })
    navigate('/home')
  }

  return (
    <OnboardingShell
      step="all-set"
      title="You are all set! 🌿"
      subtitle="Here's a quick summary of what you told us."
      onBack={() => navigate('/onboarding/crop', { state })}
    >
      <div className="flex flex-col gap-2">
        <SummaryRow icon="profile" label="Name" value={formatValue(state?.name)} />
        <SummaryRow icon="globe" label="Language" value={formatValue(state?.language)} />
        <SummaryRow icon="pin" label="Field" value={formatValue(state?.fieldName)} />
        <SummaryRow icon="leaf" label="Crop" value={formatValue(state?.crop)} />
        {state?.variety && <SummaryRow icon="wheat" label="Variety" value={formatValue(state.variety)} />}
      </div>

      <div className="mt-5">
        <PrimaryButton type="button" onClick={handleFinish}>
          Go to Home
        </PrimaryButton>
      </div>
    </OnboardingShell>
  )
}
