import Icon from '../../app/lib/icons.jsx'

/** The small uppercase caption above each input, with its icon. */
export default function FieldLabel({ icon, children }) {
  return (
    <span className="mb-2 flex items-center gap-1.5 text-[10px] font-bold tracking-[0.12em] text-white/60 uppercase">
      {icon && <Icon name={icon} className="h-3.5 w-3.5 text-lime-300" />}
      {children}
    </span>
  )
}
