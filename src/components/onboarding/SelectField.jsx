export default function SelectField({ label, options, ...selectProps }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-bold tracking-wide text-black uppercase sm:mb-2 sm:text-xs">
        {label}
      </span>
      <div className="relative">
        <select
          {...selectProps}
          className="border-field-border focus:border-leaf-dark w-full appearance-none rounded-full border-2 border-solid bg-white px-4 py-2 pr-10 text-sm text-black focus:outline-none sm:px-5 sm:py-3 sm:text-base"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-black"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </label>
  )
}
