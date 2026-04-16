"use client"

import { useEffect, useRef } from "react"

interface LossCurveProps {
  className?: string
  opacity?: number
  color?: string
}

// Seeded pseudo-random for consistent noise shape
function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

function generateLossCurve(points: number): number[] {
  const rng = seededRandom(42)
  const curve: number[] = []
  for (let i = 0; i < points; i++) {
    const t = i / points
    // Exponential decay from ~2.8 → ~0.28
    const base = 2.8 * Math.exp(-4.5 * t) + 0.28
    // Add realistic optimizer noise — bigger early, tiny late
    const noiseScale = 0.22 * Math.exp(-2 * t) + 0.03
    const noise = (rng() - 0.5) * 2 * noiseScale
    // Occasional loss spikes (LR warmup / batch variance)
    const spike = rng() < 0.04 ? (rng() * 0.18 * (1 - t)) : 0
    curve.push(Math.max(0.1, base + noise + spike))
  }
  return curve
}

const CURVE = generateLossCurve(300)

export function LossCurve({ className = "", opacity = 0.55, color = "#00ff41" }: LossCurveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef  = useRef<number>(0)
  const offsetRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const POINTS = CURVE.length
    const SPEED  = 0.18   // data points scrolled per frame
    const WINDOW = 120    // how many points visible at once

    function draw() {
      if (!canvas || !ctx) return
      const W = canvas.width
      const H = canvas.height

      ctx.clearRect(0, 0, W, H)

      // Y-axis grid lines — subtle
      ctx.strokeStyle = `${color}18`
      ctx.lineWidth   = 1
      const gridRows = 4
      for (let g = 0; g <= gridRows; g++) {
        const y = (g / gridRows) * H
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(W, y)
        ctx.stroke()
      }

      // Visible slice of the curve
      const start  = offsetRef.current % POINTS
      const slice: number[] = []
      for (let i = 0; i < WINDOW; i++) {
        slice.push(CURVE[Math.floor((start + i) % POINTS)])
      }

      const minLoss = 0.1
      const maxLoss = 3.0
      const pad     = { top: H * 0.12, bottom: H * 0.12 }
      const usable  = H - pad.top - pad.bottom

      function lossToY(loss: number) {
        const norm = (loss - minLoss) / (maxLoss - minLoss)
        return pad.top + (1 - norm) * usable
      }

      // Gradient fill under curve
      const grad = ctx.createLinearGradient(0, 0, 0, H)
      grad.addColorStop(0,   `${color}22`)
      grad.addColorStop(0.7, `${color}06`)
      grad.addColorStop(1,   `${color}00`)

      ctx.beginPath()
      ctx.moveTo(0, H)
      slice.forEach((v, i) => {
        const x = (i / (WINDOW - 1)) * W
        const y = lossToY(v)
        i === 0 ? ctx.lineTo(x, y) : ctx.lineTo(x, y)
      })
      ctx.lineTo(W, H)
      ctx.closePath()
      ctx.fillStyle = grad
      ctx.fill()

      // Glow pass (wider, transparent)
      ctx.beginPath()
      slice.forEach((v, i) => {
        const x = (i / (WINDOW - 1)) * W
        const y = lossToY(v)
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      })
      ctx.strokeStyle = `${color}40`
      ctx.lineWidth   = 4
      ctx.shadowColor = color
      ctx.shadowBlur  = 14
      ctx.stroke()

      // Sharp neon line
      ctx.beginPath()
      slice.forEach((v, i) => {
        const x = (i / (WINDOW - 1)) * W
        const y = lossToY(v)
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      })
      ctx.strokeStyle = color
      ctx.lineWidth   = 1.5
      ctx.shadowColor = color
      ctx.shadowBlur  = 8
      ctx.stroke()

      ctx.shadowBlur = 0

      // Axis labels
      ctx.fillStyle  = `${color}55`
      ctx.font       = `9px "JetBrains Mono", monospace`
      ctx.fillText("LOSS", 6, 14)
      ctx.fillText("STEP", W - 32, H - 4)

      offsetRef.current += SPEED
      frameRef.current = requestAnimationFrame(draw)
    }

    // Resize observer
    const ro = new ResizeObserver(() => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    })
    ro.observe(canvas)
    canvas.width  = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    frameRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frameRef.current)
      ro.disconnect()
    }
  }, [color])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%", opacity }}
    />
  )
}
