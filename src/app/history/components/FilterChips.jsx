import Icon from '../../lib/icons.jsx'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'alert', label: 'Alerts', icon: 'shield' },
  { key: 'treatment', label: 'Treatments', icon: 'leaf' },
  { key: 'scan', label: 'Scans', icon: 'scan' },
  { key: 'weather', label: 'Weather', icon: 'cloudSun' },
]

export default function FilterChips({ active, onChange }) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
      {FILTERS.map((filter) => {
        const isActive = active === filter.key
        return (
          <button
            key={filter.key}
            type="button"
            onClick={() => onChange(filter.key)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border border-solid px-3 py-1.5 text-xs font-semibold whitespace-nowrap ${
              isActive
                ? 'border-leaf bg-white text-leaf-dark'
                : 'border-gray-200 bg-white text-gray-500'
            }`}
          >
            {filter.icon && <Icon name={filter.icon} className="h-3.5 w-3.5" />}
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}
