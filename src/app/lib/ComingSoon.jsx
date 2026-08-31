import Icon from './icons.jsx'

/** Shared empty-state for tabs that don't have a real design yet — Advisory, Scan, History. */
export default function ComingSoon({ icon, title, description }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 px-8 text-center">
      <span className="bg-sky flex h-16 w-16 items-center justify-center rounded-full">
        <Icon name={icon} className="text-leaf h-8 w-8" />
      </span>
      <h1 className="text-leaf-dark text-lg font-bold">{title}</h1>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  )
}
