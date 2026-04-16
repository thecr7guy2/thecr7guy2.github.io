"use client"

import { CRTScreen } from "@/components/crt"
import { NeuralNet } from "@/components/visualizations"

const STATS = [
  { label: "ARCH", value: "GPT-2 // 124M" },
  { label: "TOKENS", value: "18.0B" },
  { label: "GPUS", value: "8xA100" },
  { label: "STATUS", value: "CONVERGED" },
]

const METRICS = [
  { name: "train_loss", value: "0.412", color: "var(--green-neon)" },
  { name: "val_loss", value: "0.469", color: "var(--cyan-subtle)" },
  { name: "lr", value: "3.0e-4", color: "var(--amber-warm)" },
]

const PIPELINE = [
  "dataset streaming -> stable",
  "gradient clipping -> active",
  "checkpoint sync -> every 1k steps",
]

export function NeuralMonitor() {
  return (
    <CRTScreen variant="cyan" label="CRT-9X // MODEL CONSOLE" size="full" className="h-full">
      <div className="flex flex-col h-full p-3 sm:p-4 min-h-[280px] sm:min-h-[320px]">
        <div className="shrink-0 mb-2 flex items-center justify-between">
          <span className="text-cyan-subtle text-[9px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.17em] uppercase text-glow-cyan">
            FORWARD PASS // LIVE
          </span>
          <span className="text-[8px] sm:text-[9px] tracking-[0.12em] sm:tracking-widest uppercase text-cyan-dim">
            run_047
          </span>
        </div>

        <div
          className="hr-scan mb-3 shrink-0"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, var(--cyan-dim) 10%, var(--cyan-subtle) 50%, var(--cyan-dim) 90%, transparent 100%)",
          }}
        />

        <div className="flex-1 min-h-0 flex flex-col gap-3">
          <div
            className="relative rounded-sm border min-h-[130px] sm:min-h-[180px] overflow-hidden"
            style={{ borderColor: "rgba(0,212,255,0.3)", background: "rgba(0,13,16,0.55)" }}
          >
            <NeuralNet color="#00d4ff" className="absolute inset-0 w-full h-full" />
            <p className="absolute left-2 bottom-2 text-[8px] sm:text-[9px] tracking-[0.12em] sm:tracking-widest text-cyan-dim uppercase">
              topology // pulse propagation
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-sm border px-2 py-1"
                style={{ borderColor: "rgba(0,212,255,0.28)", background: "rgba(0,12,15,0.4)" }}
              >
                <p className="text-[7px] sm:text-[8px] text-cyan-dim tracking-[0.12em] sm:tracking-[0.18em] uppercase">{s.label}</p>
                <p className="text-[9px] sm:text-[10px] text-cyan-subtle font-semibold tracking-wide">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-sm border px-2 py-2" style={{ borderColor: "rgba(0,212,255,0.28)" }}>
            {METRICS.map((metric) => (
              <div key={metric.name} className="flex items-center justify-between py-[2px]">
                <span className="text-[8px] sm:text-[9px] text-cyan-dim tracking-wider">{metric.name}</span>
                <span className="text-[9px] sm:text-[10px] tracking-wide" style={{ color: metric.color }}>
                  {metric.value}
                </span>
              </div>
            ))}
            <div className="mt-1 pt-1 border-t space-y-1" style={{ borderColor: "rgba(0,212,255,0.18)" }}>
              {PIPELINE.map((line) => (
                <p key={line} className="text-[8px] sm:text-[9px] text-gray-text leading-relaxed">
                  &gt; {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CRTScreen>
  )
}
