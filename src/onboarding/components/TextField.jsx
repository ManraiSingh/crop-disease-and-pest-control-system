import Icon from '../../app/lib/icons.jsx'
import FieldLabel from './FieldLabel.jsx'

export default function TextField({ label, labelIcon, fieldIcon, ...inputProps }) {
  return (
    <label className="block">
      <FieldLabel icon={labelIcon}>{label}</FieldLabel>
      <span className="relative block">
        {fieldIcon && (
          <Icon
            name={fieldIcon}
            className="pointer-events-none absolute top-1/2 left-4 h-[18px] w-[18px] -translate-y-1/2 text-lime-300"
          />
        )}
        <input
          {...inputProps}
          className={`w-full rounded-full border border-solid border-white/20 bg-white/10 py-3 text-sm text-white backdrop-blur-md placeholder:text-white/40 focus:border-lime-300/60 focus:bg-white/15 focus:outline-none ${
            fieldIcon ? 'pr-4 pl-11' : 'px-4'
          }`}
        />
      </span>
    </label>
  )
}
