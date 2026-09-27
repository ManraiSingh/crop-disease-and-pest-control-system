# Crop Disease & Pest Detection

A phone-first app that helps a farmer photograph a sick crop, find out what is wrong, and act
on it — in their own language.

**Smart India Hackathon 2026 · Problem Statement 26131 · Government of Maharashtra**

---

## Run it

You need **Node 20.19+ or 22.12+** (`node -v` to check).

```bash
git clone https://github.com/ManraiSingh/crop-disease-and-pest-control-system.git
cd crop-disease-and-pest-control-system
npm install
npm run dev
```

Open **http://localhost:5173**.

> **If it won't start**, delete `node_modules` and install again. This is a known npm bug with
> platform-specific binaries, not a mistake in the project:
>
> ```bash
> rm -rf node_modules && npm install
> ```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | Lint with oxlint |

---

## What a farmer sees

```
Landing  →  Onboarding (6 steps)  →  The app (5 tabs)
```

**Onboarding** asks four things: name and language, field name and GPS location, crop, then a
summary. What they enter is reused everywhere after — the dashboard greets them by name and the
weather is fetched for their actual coordinates.

**The five tabs:**

| Tab | What it does |
| --- | --- |
| **Home** | Today's state of the farm: soil, weather, farm figures, and any disease detected |
| **Community** | Farmers post a problem with a photo; others answer |
| **Scan** | Photograph a leaf → get a diagnosis |
| **History** | Everything that has happened, grouped by day |
| **Me** | Profile, fields, crops, settings |

Two more screens sit off the tab bar: **Advisory** (what a crop needs, what to plant beside it,
what is likely to go wrong now) and **Seed Market**.

---

## What is real and what is a stand-in

This matters — do not claim the stand-ins are finished.

| Feature | Status |
| --- | --- |
| **Weather** | **Real.** Live forecast from Open-Meteo for the farmer's GPS |
| **Location name** | **Real.** Coordinates → city via BigDataCloud, in the user's language |
| **Community posts** | **Real.** Firebase — a post from another phone appears without refresh |
| **Officer alerts** | **Real.** Stream in from Firebase |
| **Crop knowledge** | **Real.** Hand-written agronomy data in `src/app/advisory/cropKnowledge.js` |
| **Disease risk** | **Real logic.** Computed from the live forecast + crop season |
| **Disease detection** | **Stand-in.** Returns a fixed result after 2 seconds — waiting on the ML model |
| **Soil readings** | **Part real.** Moisture and temperature are estimated from live weather and labelled "Estimated"; pH and nitrogen say "Awaiting sensor" |

Neither Open-Meteo nor BigDataCloud needs an API key or an account.

---

## Plugging in the AI model

The whole model integration is **one function**. In `src/app/scan/ScanPage.jsx`:

```js
function analyse() {
  // TODO: POST the image to {VITE_API_BASE_URL}/api/scan
}
```

It must return this shape. Nothing else on the screen changes:

```json
{
  "disease": "Early blight",
  "confidence": 0.92,
  "severity": "Medium",
  "healthy": false
}
```

---

## Languages

The app runs in **English, Hindi and Marathi**, and switches instantly.

The words are **not** in the code. They live in `public/locales/` as JSON and are fetched at
runtime by [react-i18next](https://react.i18next.com/), then cached on the device so the app
still works with no signal.

**To change wording:** edit `public/locales/en.json` (or `hi` / `mr`). No rebuild needed.

**To add a language:** copy a file, translate it, add it to `public/locales/index.json`.

> After editing any locale file, bump `LOCALE_VERSION` in `src/i18n/config.js`. Devices cache
> translations, so without a bump users keep seeing the old wording for up to a day.

Fonts are **Anek Devanagari**, which covers Latin and Devanagari. A Latin-only font would break
the moment someone picks Marathi.

---

## Where things live

```
public/locales/        Translations (en, hi, mr) — fetched at runtime
src/
  design/              The design system: tokens, motion, lists, illustrations
  app/
    layout/            App frame: header, tab bar, weather + alerts panels
    home/              Dashboard
    advisory/          Crop knowledge + disease risk
    community/         Discussion board (Firebase)
    scan/              Camera → diagnosis
    history/  profile/  seeds/
    lib/               Icons, profile storage, theme, forecast hook
  onboarding/          The 6-step setup flow
  shared/services/     weather, geocode, community, alerts, firebase
  i18n/                Language loading and switching
```

### The design system

Everything visual comes from `src/design/`, so the app looks like one product:

- **`tokens.css`** — colours, type scale, surfaces, motion timing. Light and dark.
- **`motion.jsx`** + **`springs.js`** — the shared animation vocabulary
- **`List.jsx`** — grouped lists, section captions, segmented controls
- **`Illustrations.jsx`** — SVG illustrations (no image files)

Two rules worth knowing before you edit colours:

1. **`--pitch` is always the dark surface and `--on-pitch` is always what sits on it.** Never
   paint text on `--pitch` using a token that flips with the theme — you get white on white.
2. **Entrance animations are CSS, not JavaScript.** An element whose visibility depends on a
   JS frame loop disappears if that loop stalls.

---

## Configuration

Copy `.env.example` to `.env`. Everything is optional — the app runs without it.

| Variable | For |
| --- | --- |
| `VITE_FIREBASE_*` | Community posts and officer alerts |
| `VITE_API_BASE_URL` | The backend, once it exists |
| `VITE_LOCALE_API` | Serving translations from the backend instead of `/locales` |

---

## Built with

React 19 · Vite · Tailwind CSS v4 · React Router · Motion · react-i18next · Firebase

Planned backend: Flask/FastAPI serving the disease-detection model.
