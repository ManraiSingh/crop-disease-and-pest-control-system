import { useLocation, useNavigate } from 'react-router-dom'
import { loadProfile, saveProfile } from '../../app/lib/profile.js'
import PrimaryButton from '../components/PrimaryButton.jsx'
import AllSetScene from '../components/scenes/AllSetScene.jsx'

function formatValue(value) {
  if (!value) return '—'
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-black/5 py-1.5 last:border-0">
      <span className="text-[10px] font-bold tracking-wide text-gray-500 uppercase">{label}</span>
      <span className="text-xs font-semibold text-black">{value}</span>
    </div>
  )
}

export default function AllSet() {
  const navigate = useNavigate()
  const { state } = useLocation()

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="bg-sky relative h-[65%] w-full shrink-0 overflow-hidden">
        <AllSetScene />
      </div>

      <div className="relative z-10 -mt-5 flex flex-1 flex-col items-center rounded-t-[28px] bg-white px-5 py-4 text-center">
        <h1 className="text-leaf-dark text-xl font-bold">You are all set!</h1>
        <p className="mt-1 text-xs text-gray-600">Here's a quick summary of what you told us.</p>

        <div className="mt-3 w-full rounded-2xl bg-[#f6f4ee] px-4 py-1">
          <SummaryRow label="Name" value={formatValue(state?.name)} />
          <SummaryRow label="Language" value={formatValue(state?.language)} />
          <SummaryRow label="Field" value={formatValue(state?.fieldName)} />
          <SummaryRow label="Crop" value={formatValue(state?.crop)} />
          {state?.variety && <SummaryRow label="Variety" value={formatValue(state.variety)} />}
        </div>

        <div className="mt-4 w-full">
          <PrimaryButton
            type="button"
            onClick={() => {
              const joinedAt = loadProfile()?.joinedAt ?? Date.now()
              saveProfile({ ...state, joinedAt })
              navigate('/home')
            }}
          >
            Go to Home
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}
