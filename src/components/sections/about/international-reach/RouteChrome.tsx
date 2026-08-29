const RouteChrome = () => (
  <svg
    className="absolute inset-0 pointer-events-none"
    viewBox="0 0 620 620"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
  >
    {/* Corner brackets */}
    <path d="M 40 80 V 40 H 80" fill="none" stroke="#475569" strokeWidth="1.5" />
    <path d="M 540 80 V 40 H 500" fill="none" stroke="#475569" strokeWidth="1.5" />
    <path d="M 40 540 V 580 H 80" fill="none" stroke="#475569" strokeWidth="1.5" />
    <path d="M 540 540 V 580 H 500" fill="none" stroke="#475569" strokeWidth="1.5" />
    {/* Concentric rings */}
    <circle cx="310" cy="310" r="250" fill="none" stroke="#2563eb" strokeWidth="0.5" opacity="0.1" />
    <circle cx="310" cy="310" r="290" fill="none" stroke="#2563eb" strokeWidth="0.3" opacity="0.06" />
  </svg>
);

export default RouteChrome;