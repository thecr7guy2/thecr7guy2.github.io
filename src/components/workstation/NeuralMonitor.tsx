"use client"

import { useEffect, useRef, useState } from "react"
import { CRTScreen } from "@/components/crt"
import { TacticsBoard } from "@/components/visualizations"

const KONAMI = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
]

const TACTICS_STATS = [
  { label: "FORM", value: "4-3-3" },
  { label: "TEAM", value: "CR7 MODE" },
  { label: "PRESS", value: "HIGH" },
  { label: "STATUS", value: "MATCHDAY" },
]

const EASTER_STATS = [
  { label: "FORM", value: "SIUU-7" },
  { label: "TEAM", value: "UNLOCKED" },
  { label: "PRESS", value: "MAX" },
  { label: "STATUS", value: "ACTIVE" },
]

export function NeuralMonitor() {
  const [easterOn, setEasterOn] = useState(false)
  const keyProgressRef = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
      const expected = KONAMI[keyProgressRef.current]

      if (key === expected) {
        keyProgressRef.current += 1
        if (keyProgressRef.current === KONAMI.length) {
          keyProgressRef.current = 0
          setEasterOn(true)
          if (timeoutRef.current) clearTimeout(timeoutRef.current)
          timeoutRef.current = setTimeout(() => setEasterOn(false), 4200)
        }
        return
      }

      keyProgressRef.current = key === KONAMI[0] ? 1 : 0
    }

    window.addEventListener("keydown", handleKeydown)
    return () => {
      window.removeEventListener("keydown", handleKeydown)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const statRows = easterOn ? EASTER_STATS : TACTICS_STATS

  return (
    <CRTScreen variant="cyan" label="CRT-9X // TACTICAL CONSOLE" size="full" className="h-full">
      <div className="flex flex-col h-full p-3 sm:p-4 min-h-[280px] sm:min-h-[320px]">
        <div className="shrink-0 mb-2 flex items-center justify-between">
          <span className="text-cyan-subtle text-[9px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.17em] uppercase text-glow-cyan">
            TACTICAL BOARD // LIVE
          </span>
          <span className="text-[8px] sm:text-[9px] tracking-[0.12em] sm:tracking-widest uppercase text-cyan-dim">
            run_007
          </span>
        </div>

        <div
          className="hr-scan mb-3 shrink-0"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, var(--cyan-dim) 10%, var(--cyan-subtle) 50%, var(--cyan-dim) 90%, transparent 100%)",
          }}
        />

        <div className="flex-1 min-h-0 flex flex-col justify-center gap-3">
          <div
            className="relative rounded-sm border min-h-[130px] sm:min-h-[180px] overflow-hidden"
            style={{ borderColor: "rgba(0,212,255,0.3)", background: "rgba(0,13,16,0.55)" }}
          >
            <TacticsBoard
              color={easterOn ? "#ff2d2d" : "#00d4ff"}
              ballColor={easterOn ? "#ffb347" : "#00ff41"}
              className="absolute inset-0 w-full h-full"
            />
            <p className="absolute left-2 bottom-2 text-[8px] sm:text-[9px] tracking-[0.12em] sm:tracking-widest text-cyan-dim uppercase">
              formation // passing lanes
            </p>
            {easterOn && (
              <p className="absolute right-2 top-2 text-[8px] tracking-[0.14em] uppercase text-amber-warm text-glow-amber">
                siuu mode
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {statRows.map((s) => (
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
        </div>
      </div>
    </CRTScreen>
  )
}
