# Crop Disease and Pest Control System

React frontend built with Vite.

## Setup

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Lint with oxlint |

## Structure

```
public/            Static files served as-is
src/
  assets/          Images, fonts, icons imported by components
  components/      Reusable UI components
  pages/           Route-level screens
  hooks/           Custom React hooks
  services/        API clients and data fetching
  utils/           Helper functions
  App.jsx          Root component
  main.jsx         Entry point
  index.css        Global styles
index.html         HTML shell
vite.config.js     Vite config
```
