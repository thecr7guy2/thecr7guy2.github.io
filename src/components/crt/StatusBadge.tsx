interface StatusBadgeProps {
  status: "live" | "archived" | "wip" | "classified"
  label?: string
}

const STATUS = {
  live: {
    color:  "#00ff41",
    bg:     "rgba(0,42,10,0.7)",
    border: "#00aa2a",
    glow:   "rgba(0,255,65,0.25)",
    text:   "LIVE",
    pulse:  true,
  },
  archived: {
    color:  "#ffb347",
    bg:     "rgba(26,15,0,0.7)",
    border: "#7a5000",
    glow:   "rgba(255,179,71,0.2)",
    text:   "ARCHIVED",
    pulse:  false,
  },
  wip: {
    color:  "#00d4ff",
    bg:     "rgba(0,26,32,0.7)",
    border: "#0088ab",
    glow:   "rgba(0,212,255,0.2)",
    text:   "IN PROGRESS",
    pulse:  false,
  },
  classified: {
    color:  "#ff2d2d",
    bg:     "rgba(26,0,0,0.7)",
    border: "#aa1a1a",
    glow:   "rgba(255,45,45,0.2)",
    text:   "CLASSIFIED",
    pulse:  false,
  },
} as const

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const cfg  = STATUS[status]
  const text = label ?? cfg.text

  return (
    <span
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        gap:            "6px",
        padding:        "2px 8px 2px 6px",
        borderRadius:   "2px",
        border:         `1px solid ${cfg.border}`,
        background:     cfg.bg,
        boxShadow:      `0 0 8px ${cfg.glow}, inset 0 0 8px ${cfg.glow}`,
        fontSize:       "10px",
        letterSpacing:  "0.18em",
        fontFamily:     "inherit",
        textTransform:  "uppercase" as const,
        color:          cfg.color,
        userSelect:     "none" as const,
        whiteSpace:     "nowrap" as const,
      }}
    >
      {/* Indicator dot */}
      <span style={{ position: "relative", display: "inline-flex", width: "7px", height: "7px" }}>
        {/* Ping ring for live */}
        {cfg.pulse && (
          <span
            className="dot-ping"
            style={{
              position:     "absolute",
              inset:        0,
              borderRadius: "50%",
              background:   cfg.color,
              opacity:      0.6,
            }}
          />
        )}
        <span
          style={{
            position:     "relative",
            display:      "inline-block",
            width:        "7px",
            height:       "7px",
            borderRadius: "50%",
            background:   cfg.color,
            boxShadow:    `0 0 6px ${cfg.color}`,
            flexShrink:   0,
          }}
        />
      </span>

      {text}
    </span>
  )
}
