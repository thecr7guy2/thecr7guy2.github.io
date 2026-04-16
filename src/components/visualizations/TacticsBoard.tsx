interface TacticsBoardProps {
  className?: string
  color?: string
  ballColor?: string
}

const PLAYERS = [
  { x: 10, y: 30 }, // GK
  { x: 24, y: 12 }, { x: 24, y: 24 }, { x: 24, y: 36 }, { x: 24, y: 48 }, // Back 4
  { x: 42, y: 18 }, { x: 42, y: 30 }, { x: 42, y: 42 }, // Mid 3
  { x: 62, y: 14 }, { x: 68, y: 30 }, { x: 62, y: 46 }, // Front 3
]

const PASS_LINES = [
  "M24 12 L42 18 L62 14",
  "M24 24 L42 18 L68 30",
  "M24 36 L42 30 L68 30",
  "M24 48 L42 42 L62 46",
  "M42 18 L42 30 L42 42",
  "M24 24 L24 36",
]

export function TacticsBoard({
  className = "",
  color = "#00d4ff",
  ballColor = "#00ff41",
}: TacticsBoardProps) {
  return (
    <svg
      viewBox="0 0 80 60"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="78" height="58" rx="2" fill="rgba(0,11,14,0.6)" stroke={`${color}66`} strokeWidth="0.5" />
      <line x1="40" y1="1" x2="40" y2="59" stroke={`${color}42`} strokeWidth="0.4" />
      <circle cx="40" cy="30" r="7" fill="none" stroke={`${color}36`} strokeWidth="0.4" />
      <circle cx="40" cy="30" r="0.9" fill={`${color}80`} />

      <rect x="1" y="21" width="9" height="18" fill="none" stroke={`${color}36`} strokeWidth="0.4" />
      <rect x="70" y="21" width="9" height="18" fill="none" stroke={`${color}36`} strokeWidth="0.4" />

      {PASS_LINES.map((d, idx) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke={`${color}55`}
          strokeWidth="0.36"
          strokeDasharray="1.6 1.6"
          opacity="0.72"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-6"
            dur={`${2.5 + idx * 0.22}s`}
            repeatCount="indefinite"
          />
        </path>
      ))}

      {PLAYERS.map((p, idx) => (
        <g key={`${p.x}-${p.y}`}>
          <circle cx={p.x} cy={p.y} r="1.32" fill={color} opacity="0.86">
            <animate attributeName="r" values="1.2;1.9;1.2" dur={`${2 + (idx % 4) * 0.35}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.58;1;0.58" dur={`${2 + (idx % 4) * 0.35}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      <circle r="1.05" fill={ballColor}>
        <animate
          attributeName="cx"
          values="12;24;41;58;69;55;39;26;14;12"
          dur="8.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          values="30;36;30;23;30;40;43;29;22;30"
          dur="8.6s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  )
}

