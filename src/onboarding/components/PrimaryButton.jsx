import Icon from '../../app/lib/icons.jsx'

export default function PrimaryButton({ children, ...buttonProps }) {
  return (
    <button
      type="submit"
      {...buttonProps}
      className="flex w-full items-center justify-center gap-3 rounded-full border border-solid border-lime-300/40 bg-[linear-gradient(180deg,#7cb342_0%,#5b8c2a_100%)] py-3.5 text-sm font-bold tracking-wide text-white uppercase shadow-[0_10px_24px_rgba(91,140,42,0.45)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
    >
      {children}
      <Icon name="arrowRight" className="h-[18px] w-[18px]" />
    </button>
  )
}
