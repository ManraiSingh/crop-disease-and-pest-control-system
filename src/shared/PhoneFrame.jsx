/**
 * CSS-only phone mockup, 390x844 screen (iPhone-ish). Everything inside renders at that fixed
 * size — intentionally NOT responsive, since the point is to demo a fixed mobile app screen
 * regardless of the browser window it's viewed in.
 *
 * Three layered "shells" for a more realistic device look:
 * 1. Outer metal frame (gradient, rounded, drop shadow) — the titanium/aluminum edge.
 * 2. Inner black bezel — the thin plastic/glass border around the actual display.
 * 3. Screen — the actual app content, clipped to rounded corners.
 */
export default function PhoneFrame({ children }) {
  return (
    <div className="relative h-[872px] w-[418px] shrink-0 rounded-[58px] bg-gradient-to-br from-neutral-500 via-neutral-800 to-neutral-950 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
      {/* inner black bezel */}
      <div className="absolute top-[6px] left-[6px] h-[860px] w-[406px] rounded-[50px] bg-black" />

      {/* screen */}
      <div className="bg-sky absolute top-[14px] left-[14px] h-[844px] w-[390px] overflow-hidden rounded-[42px]">
        {children}
      </div>

      {/* dynamic island, with a camera dot */}
      <div className="absolute top-[20px] left-1/2 z-30 flex h-[26px] w-[112px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-[15px] ring-1 ring-white/10">
        <span className="h-[8px] w-[8px] rounded-full bg-gradient-to-br from-neutral-600 to-black ring-1 ring-blue-900/40" />
      </div>

      {/* home indicator */}
      <div className="absolute bottom-[10px] left-1/2 z-30 h-[5px] w-[120px] -translate-x-1/2 rounded-full bg-white/60" />

      {/* side buttons */}
      <div className="absolute top-[130px] -left-[2px] h-[28px] w-[3px] rounded-l-sm bg-gradient-to-b from-neutral-400 via-neutral-700 to-neutral-900 shadow-sm" />
      <div className="absolute top-[180px] -left-[2px] h-[55px] w-[3px] rounded-l-sm bg-gradient-to-b from-neutral-400 via-neutral-700 to-neutral-900 shadow-sm" />
      <div className="absolute top-[245px] -left-[2px] h-[55px] w-[3px] rounded-l-sm bg-gradient-to-b from-neutral-400 via-neutral-700 to-neutral-900 shadow-sm" />
      <div className="absolute top-[200px] -right-[2px] h-[75px] w-[3px] rounded-r-sm bg-gradient-to-b from-neutral-400 via-neutral-700 to-neutral-900 shadow-sm" />
    </div>
  )
}
