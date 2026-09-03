const PATHS = {
  home: <path d="M3 10.8 12 3l9 7.8v8.7a1.5 1.5 0 0 1-1.5 1.5H15v-6H9v6H4.5A1.5 1.5 0 0 1 3 19.5v-8.7Z" />,
  leaf: (
    <>
      <path d="M19.7 4.4C11 4.7 5.6 9.2 5.6 16.5c0 1.2.2 2.2.7 3.1 7.3-.8 12.6-5.8 13.4-13.3l.4-1.9Z" />
      <path d="M4.5 20.5c3.7-5.6 7.7-9.2 13.8-12.7" />
    </>
  ),
  scan: (
    <>
      <path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3" />
      <path d="M8.2 12h7.6M12 8.2v7.6" />
    </>
  ),
  history: (
    <>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.1-5.6" />
      <path d="M3.5 5v4.3h4.3M12 7v5l3.2 2" />
    </>
  ),
  profile: (
    <>
      <circle cx="12" cy="8" r="3.3" />
      <path d="M5.5 21c.5-3.5 2.7-5.3 6.5-5.3s6 1.8 6.5 5.3" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  bell: (
    <>
      <path d="M18 8.5a6 6 0 0 0-12 0c0 5.5-2 7-2 7h16s-2-1.5-2-7" />
      <path d="M10.5 20.5a1.7 1.7 0 0 0 3 0" />
    </>
  ),
  x: <path d="M6 6l12 12M18 6 6 18" />,
  chevronLeft: <path d="M15 5l-7 7 7 7" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevronRight: <path d="M9 5l7 7-7 7" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.4 3.8 5.3 3.8 8.5s-1.3 6.1-3.8 8.5c-2.5-2.4-3.8-5.3-3.8-8.5S9.5 5.9 12 3.5Z" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3H10a1.7 1.7 0 0 0 1-1.6V4a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9V10c.4.5.9.8 1.6 1H20a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.3a2.5 2.5 0 1 1 3.9 2.1c-.9.6-1.4 1-1.4 2.1" />
      <path d="M12 17.2h.01" />
    </>
  ),
  logout: (
    <>
      <path d="M9 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3" />
      <path d="M16 17l5-5-5-5M21 12H9" />
    </>
  ),
  field: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V9l7-5 7 5v12" />
      <path d="M9 21v-6h6v6" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1-2h7l1 2h2A1.5 1.5 0 0 1 20 8.5v9A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5Z" />
      <circle cx="12" cy="13" r="3.2" />
    </>
  ),
  droplet: (
    <path d="M12 3.5c3.2 4 5.5 7.2 5.5 10.2a5.5 5.5 0 1 1-11 0c0-3 2.3-6.2 5.5-10.2Z" />
  ),
  shield: (
    <>
      <path d="M12 3.5 5 6v6c0 4.5 3 7.5 7 8.5 4-1 7-4 7-8.5V6Z" />
      <path d="M12 8.5v4M12 15.2h.01" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 21v-8" />
      <path d="M12 13c0-4-3-6-7-6 0 4 3 6 7 6Z" />
      <path d="M12 11c0-3.5 2.5-5.5 6-5.5 0 3.5-2.5 5.5-6 5.5Z" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </>
  ),
  cloudSun: (
    <>
      <circle cx="8" cy="9" r="2.6" />
      <path d="M8 4.2v1.3M4.2 9H3M4.6 5.6l.9.9" />
      <path d="M9.5 17.5h6.8a3.2 3.2 0 0 0 .5-6.4 4.3 4.3 0 0 0-8.3-1 3.6 3.6 0 0 0-2 6.7" />
    </>
  ),
  cloud: <path d="M6.5 18.5h10.8a3.7 3.7 0 0 0 .5-7.4 5 5 0 0 0-9.5-1.8 4 4 0 0 0-1.8 9.2Z" />,
  bottle: (
    <>
      <path d="M10 3h4v3.2l2 2.3V19a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8.5l2-2.3Z" />
      <path d="M9 13h6M10 3h4" />
    </>
  ),
  filter: (
    <>
      <path d="M4 6h16M7 12h10M10 18h4" />
      <circle cx="9" cy="6" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="18" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  chevronDown: <path d="M6 9l6 6 6-6" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-7.1 7-12A7 7 0 0 0 5 9c0 4.9 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.4" />
    </>
  ),
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.3l2.5 2.5L16 9.3" />
    </>
  ),
  warning: (
    <>
      <path d="M12 3.5 21.5 20h-19Z" />
      <path d="M12 9.5v4.5M12 17.2h.01" />
    </>
  ),
  bug: (
    <>
      <path d="M9 8h6M4 11h3M17 11h3M4 16h3M17 16h3" />
      <path d="M8 8.5v-1a4 4 0 0 1 8 0v1" />
      <rect x="7.5" y="8.5" width="9" height="10.5" rx="4.5" />
    </>
  ),
  wind: (
    <path d="M3 8h11a2.5 2.5 0 1 0-2.2-3.7M3 12.5h14a2.5 2.5 0 1 1-2.2 3.7M3 17h9a2 2 0 1 1-1.7 3" />
  ),
  umbrella: (
    <>
      <path d="M12 3.5c4.7 0 8.5 3.5 8.5 7.5H3.5c0-4 3.8-7.5 8.5-7.5Z" />
      <path d="M12 11v7.5a2 2 0 0 1-3.5 1.3M12 3.5V2" />
    </>
  ),
  thermometer: (
    <>
      <path d="M12 14.5V5a2 2 0 1 0-4 0v9.5a4 4 0 1 0 4 0Z" />
      <path d="M10 8h1" />
    </>
  ),
  pulse: <path d="M3 12h3.5l1.8-5 3 10 2-9 1.7 4h5" />,
  flask: (
    <>
      <path d="M10 3h4M10 3v5.3L5.7 16a2 2 0 0 0 1.8 3h9a2 2 0 0 0 1.8-3L14 8.3V3" />
      <path d="M7.7 14h8.6" />
    </>
  ),
  wheat: (
    <>
      <path d="M12 21V9.5" />
      <path d="M12 9.5c0-2.3-1.6-3.7-4-3.7.3 2.3 1.7 3.7 4 3.7Z" />
      <path d="M12 9.5c0-2.3 1.6-3.7 4-3.7-.3 2.3-1.7 3.7-4 3.7Z" />
      <path d="M12 14c0-2.3-1.6-3.7-4-3.7.3 2.3 1.7 3.7 4 3.7Z" />
      <path d="M12 14c0-2.3 1.6-3.7 4-3.7-.3 2.3-1.7 3.7-4 3.7Z" />
    </>
  ),
  heart: <path d="M12 20s-7.4-4.4-9.3-9.2A5 5 0 0 1 12 6.3a5 5 0 0 1 9.3 4.5C19.4 15.6 12 20 12 20Z" />,
  /* Filled four-point star — overrides the shared stroke styling to render solid. */
  sparkle: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 2c.6 5.5 4.5 9.4 10 10-5.5.6-9.4 4.5-10 10-.6-5.5-4.5-9.4-10-10 5.5-.6 9.4-4.5 10-10Z"
    />
  ),
  trendingUp: (
    <>
      <path d="M3 16.5l6-6 4 4 7.5-8" />
      <path d="M15 6.5h5.5V12" />
    </>
  ),
}

export default function Icon({ name, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name]}
    </svg>
  )
}
