import Icon from '../../lib/icons.jsx'

export default function KeepGrowingCard() {
  return (
    <div className="mx-4 flex items-center gap-3 rounded-2xl border border-solid border-gray-100 bg-white px-4 py-3 shadow-sm">
      <span className="bg-sky flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
        <Icon name="sprout" className="text-leaf-dark h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-black">Keep Growing!</p>
        <p className="text-[11px] text-gray-500">
          You're doing great. Keep monitoring your fields and improving your farm health.
        </p>
      </div>
      <Icon name="chevronRight" className="h-4 w-4 shrink-0 text-gray-300" />
    </div>
  )
}
