"use client"

import { CRTScreen, GlitchText, TerminalText } from "@/components/crt"
import { LossCurve } from "@/components/visualizations"

const LINKS = [
  { label: "github", href: "https://github.com/thecr7guy2" },
  { label: "linkedin", href: "https://www.linkedin.com/in/manirajsai/" },
  { label: "resume", href: "/assets/Resume.pdf" },
]

const METRICS = [
  { label: "exp", value: "3+ years" },
  { label: "apps", value: "5 prod AI apps" },
  { label: "training", value: "18B tokens" },
]

const FOCUS = [
  "agentic systems + evaluation frameworks",
  "on-prem LLM deployments for sensitive data",
  "football + ML experiments",
]

export function MainMonitor() {
  return (
    <CRTScreen variant="green" label="TRINITRON-X4 // PRIMARY" size="full" className="h-full">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LossCurve opacity={0.18} color="#00ff41" className="w-full h-full" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full p-3 sm:p-5 min-h-[230px] sm:min-h-[320px]">
        <div className="flex items-center justify-between gap-2">
          <span className="text-gray-text text-[9px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.16em] uppercase">
            SYSTEM // MANIRAJ-SAI-v3.0
          </span>
          <span className="text-green-dim text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-widest">
            ● ONLINE
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 py-3 sm:py-4">
          <div className="hidden sm:block text-gray-text text-[11px] sm:text-[12px] tracking-wide">
            <TerminalText text="> INIT PROFILE // LOADING..." speed={24} delay={420} showCursor={false} />
          </div>

          <GlitchText
            as="h1"
            intensity="low"
            className="text-green-neon chromatic-heavy text-glow-green font-bold leading-none"
            style={{ fontSize: "clamp(2.4rem, 5vw, 3.9rem)" } as React.CSSProperties}
          >
            SAI
          </GlitchText>

          <p className="hidden sm:block text-white-dim text-[14px] sm:text-[15px] tracking-wide leading-relaxed max-w-[44ch]">
            AI Engineer building production LLM systems, training workflows, and data products
            with a football-heavy creative edge.
          </p>
          <p className="sm:hidden text-white-dim text-[13px] tracking-wide leading-relaxed max-w-[30ch]">
            AI Engineer building production LLM systems.
          </p>

          <p className="text-green-dim text-[10px] sm:text-[11px] tracking-wider">
            @ Schiphol, NL // currently shipping on-prem AI
          </p>

          <div className="hidden sm:grid grid-cols-3 gap-2">
            {METRICS.map((metric) => (
              <div
                key={metric.label}
                className="border rounded-sm px-2 py-1"
                style={{ borderColor: "rgba(0,170,42,0.46)", background: "rgba(0,20,6,0.4)" }}
              >
                <p className="text-[7px] sm:text-[8px] tracking-[0.14em] sm:tracking-[0.18em] uppercase text-green-dim">{metric.label}</p>
                <p className="text-[10px] sm:text-[11px] tracking-wide text-green-neon">{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="hidden sm:block space-y-1">
            {FOCUS.map((line) => (
              <p key={line} className="text-[10px] sm:text-[11px] text-gray-text leading-relaxed">
                &gt; {line}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-2">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-neon text-[10px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.15em] uppercase hover:text-white-dim transition-colors duration-150"
              style={{ textShadow: "0 0 6px var(--green-neon)" }}
            >
              [{l.label}]
            </a>
          ))}
        </div>
      </div>
    </CRTScreen>
  )
}
