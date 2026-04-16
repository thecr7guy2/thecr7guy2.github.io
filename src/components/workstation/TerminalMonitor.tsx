"use client"

import { CRTScreen } from "@/components/crt"

const EXPERIENCE = [
  {
    period: "2024.07 -> PRESENT",
    company: "aXite Security Tools",
    role: "AI Engineer",
    location: "Schiphol, NL",
    highlights: [
      "Built AX-Office.ai with 5 on-prem AI apps in production",
      "Benchmarked 10+ open models to drive stack upgrades",
      "Shipped Airflow ETL for live anomaly detection",
    ],
  },
  {
    period: "2024.04 -> 2024.07",
    company: "Labelfuse",
    role: "LLM Engineer",
    location: "Eindhoven, NL",
    highlights: [
      "Architected privacy-first Text-to-SQL with local LLMs",
      "Enabled natural-language analytics over sensitive data",
    ],
  },
]

const LIVE_FEED = [
  "[ok] RAG pipeline hardened for production",
  "[ok] GPT-2 small trained from scratch (18B tokens)",
  "[ok] Trading bot runs twice weekly autonomously",
]

export function TerminalMonitor() {
  return (
    <CRTScreen variant="amber" label="VT-220 // SYSTEM HISTORY" size="full" className="h-full">
      <div className="flex flex-col h-full min-h-[280px] sm:min-h-[320px] p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3 shrink-0">
          <span className="text-amber-warm text-[9px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.18em] uppercase text-glow-amber">
            $ cat system_history.log
          </span>
          <span className="text-[8px] sm:text-[9px] tracking-[0.12em] sm:tracking-widest text-amber-dim uppercase">
            2 roles
          </span>
        </div>

        <div
          className="hr-scan mb-3 shrink-0"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, var(--amber-dim) 12%, var(--amber-warm) 50%, var(--amber-dim) 88%, transparent 100%)",
          }}
        />

        <div className="no-scrollbar flex-1 min-h-0 overflow-auto pr-1 space-y-3">
          {EXPERIENCE.map((entry) => (
            <article
              key={`${entry.company}-${entry.period}`}
              className="rounded-sm border px-2 sm:px-3 py-2"
              style={{ borderColor: "rgba(255,179,71,0.28)", background: "rgba(18,11,3,0.45)" }}
            >
              <p className="text-[8px] sm:text-[9px] tracking-[0.14em] sm:tracking-[0.16em] text-amber-warm uppercase mb-1">
                [{entry.period}]
              </p>
              <p className="text-[11px] sm:text-[12px] leading-tight text-white-dim">
                {entry.company}
              </p>
              <p className="text-[9px] sm:text-[10px] tracking-wide text-amber-warm mb-1">
                {entry.role} // {entry.location}
              </p>
              {entry.highlights.map((line) => (
                <p key={line} className="text-[9px] sm:text-[10px] leading-relaxed text-gray-text">
                  &gt; {line}
                </p>
              ))}
            </article>
          ))}
        </div>

        <div className="mt-3 pt-2 border-t shrink-0" style={{ borderColor: "rgba(122,80,0,0.45)" }}>
          {LIVE_FEED.map((line) => (
            <p key={line} className="text-[8px] sm:text-[9px] tracking-wide text-amber-dim leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      </div>
    </CRTScreen>
  )
}
