export default function TextField({ label, ...inputProps }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-bold tracking-wide text-black uppercase sm:mb-2 sm:text-xs">
        {label}
      </span>
      <input
        {...inputProps}
        className="border-field-border focus:border-leaf-dark w-full rounded-full border-2 border-solid bg-white px-4 py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none sm:px-5 sm:py-3 sm:text-base"
      />
    </label>
  )
}
