function WarehouseIllustration() {
  return (
    <svg
      viewBox="0 0 500 280"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-w-md"
    >
      {/* City skyline */}
      <g opacity="0.25" fill="#93c5fd">
        <rect x="10" y="120" width="24" height="100" />
        <rect x="42" y="90" width="20" height="130" />
        <rect x="420" y="100" width="22" height="120" />
        <rect x="452" y="140" width="18" height="80" />
      </g>

      {/* Warehouse building */}
      <polygon points="150,90 260,90 300,140 110,140" fill="#3b82f6" />
      <rect x="120" y="140" width="170" height="90" fill="#2563eb" />
      <rect
        x="175"
        y="165"
        width="60"
        height="65"
        fill="#1e3a8a"
        opacity="0.6"
      />

      {/* Boxes */}
      <g>
        <rect x="255" y="195" width="35" height="35" fill="#f59e0b" rx="2" />
        <rect x="285" y="205" width="30" height="25" fill="#d97706" rx="2" />
        <rect x="235" y="205" width="28" height="25" fill="#fbbf24" rx="2" />
        <rect x="60" y="205" width="35" height="25" fill="#f59e0b" rx="2" />
        <rect x="90" y="195" width="30" height="35" fill="#d97706" rx="2" />
      </g>

      {/* Truck */}
      <g>
        <rect x="10" y="185" width="60" height="35" fill="#64748b" rx="3" />
        <rect x="70" y="200" width="30" height="20" fill="#3b82f6" rx="2" />
        <circle cx="30" cy="222" r="8" fill="#1e293b" />
        <circle cx="80" cy="222" r="8" fill="#1e293b" />
      </g>

      {/* Ground line */}
      <line
        x1="0"
        y1="230"
        x2="500"
        y2="230"
        stroke="#bfdbfe"
        strokeWidth="2"
      />
    </svg>
  );
}

export default WarehouseIllustration;