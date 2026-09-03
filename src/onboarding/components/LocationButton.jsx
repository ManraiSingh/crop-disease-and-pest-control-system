import Icon from '../../app/lib/icons.jsx'

export default function LocationButton({ label = 'Use current location', onClick, status }) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-solid border-lime-300/45 bg-lime-400/9 px-4 py-3 backdrop-blur-md text-xs font-bold tracking-[0.08em] text-lime-200 uppercase transition hover:bg-lime-400/15"
      >
        <Icon name="pin" className="h-[18px] w-[18px]" />
        {label}
      </button>
      {status && <p className="mt-2 text-center text-[11px] text-white/60">{status}</p>}
    </div>
  )
}
