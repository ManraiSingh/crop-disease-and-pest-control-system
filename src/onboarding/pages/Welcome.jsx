import { useNavigate } from "react-router-dom";
import Icon from "../../app/lib/icons.jsx";
import { GLASS_SHEEN, GLASS_SURFACE_SOFT } from "../../app/lib/glass.js";
import { STEPS } from "../steps.js";

/** Illustrative figures for the welcome screen — replaced by the farmer's own once onboarded. */
const HIGHLIGHTS = [
  { icon: "field", label: "Area", value: "15", unit: "Acres" },
  { icon: "sprout", label: "Yield", value: "12", unit: "Tons" },
  { icon: "calendar", label: "Plant Age", value: "44", unit: "Days" },
];

const CARD = `${GLASS_SURFACE_SOFT} rounded-2xl`;

/** Inset tile, a quarter more transparent than the dashboard's, to match the sheet. */
const TILE =
  "rounded-2xl border border-solid border-white/12 bg-white/6 backdrop-blur-md";

/**
 * The screen the flow opens on, before step 1. Sets the product up and shows what the app
 * tracks, then hands off to onboarding — so the first thing a farmer sees isn't a form.
 */
export default function Welcome() {
  const navigate = useNavigate();
  const start = () => navigate(STEPS[0].path);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#16210e]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/onboarding/welcome.jpg')" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,5,0.82)_0%,rgba(8,18,7,0.45)_38%,rgba(6,14,5,0.86)_100%)]"
      />

      <div className="relative z-10 flex h-full flex-col px-4 pt-9 pb-5">
        <div className={`${CARD} flex items-center gap-3 px-4 py-3`}>
          <span aria-hidden="true" className={GLASS_SHEEN} />
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#5b8c2a]">
            <Icon name="wheat" className="h-5 w-5 text-white" />
          </span>
          <span className="h-8 w-px bg-white/15" />
          <span className="text-sm font-semibold text-white">Wheat Spike</span>
          <span className="ml-auto flex items-center gap-2">
            <span className="text-lg font-bold text-white">20°C</span>
            <Icon name="cloudSun" className="h-6 w-6 text-lime-200" />
          </span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {HIGHLIGHTS.map((item) => (
            <div key={item.label} className={`${TILE} px-3 py-3`}>
              <span className="flex items-center gap-1.5">
                <Icon
                  name={item.icon}
                  className="h-4 w-4 shrink-0 text-lime-300"
                />
                <span className="truncate text-[11px] text-white/70">
                  {item.label}
                </span>
              </span>
              <p className="mt-1.5 text-xl font-bold text-white">
                {item.value}
                <span className="ml-1 text-[11px] font-medium text-white/55">
                  {item.unit}
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* Tagline block. Kept separate from the wordmark below so each is positioned on its
            own margins — the two used to share one vertically-centred stack, which meant
            neither could move without shifting the other. */}
        <div className="mt-20 text-center">
          <p className="text-2xl leading-snug font-bold text-lime-400">
            Empowering Agriculture
          </p>
          <p className="text-xl leading-snug font-bold text-white">
            Connecting Markets
          </p>

          <div
            aria-hidden="true"
            className="mt-2.5 flex items-center justify-center gap-3"
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-lime-300/40" />
            <Icon name="sprout" className="h-4 w-4 text-lime-300/70" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-lime-300/40" />
          </div>
        </div>

        {/* Wordmark block, riding the bottom of the free space above the Get Started control. */}
        <div className="mt-auto text-center">
          <div className="mb-30">
            <p className="text-[18px] font-semibold tracking-[0.35em] text-white/85 uppercase">
              Welcome to
            </p>
            <h1 className="mt-1.5 text-[58px] leading-none font-extrabold tracking-tight text-white">
              KRISHI <span className="text-lime-400">AI</span>
            </h1>
          </div>
        </div>

        <div
          className={`${CARD} mt-8 flex items-center gap-3 rounded-full p-2.5`}
        >
          <span aria-hidden="true" className={GLASS_SHEEN} />
          <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#5b8c2a]">
            <Icon name="sprout" className="h-7 w-7 text-white" />
          </span>
          <button
            type="button"
            onClick={start}
            className="relative flex-1 border-0 bg-transparent py-2 text-center text-lg font-semibold text-white"
          >
            Get Started
          </button>
          <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-solid border-white/15 bg-white/8 text-lime-300">
            <Icon name="arrowRight" className="h-6 w-6" />
          </span>
        </div>
      </div>
    </div>
  );
}
