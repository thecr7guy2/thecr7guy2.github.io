"use client"

import { useEffect, useRef } from "react"

interface NeuralNetProps {
  className?: string
  color?: string
}

// Architecture: input → hidden → hidden → output
const LAYERS = [3, 5, 5, 3]

interface Node { x: number; y: number; layer: number; index: number }
interface Edge { from: Node; to: Node }

function buildGraph(W: number, H: number) {
  const nodes: Node[] = []
  const edges: Edge[] = []
  const padX = W * 0.14
  const padY = H * 0.12
  const usableW = W - padX * 2
  const usableH = H - padY * 2
  const layerX = LAYERS.map((_, li) =>
    LAYERS.length === 1 ? W / 2 : padX + (li / (LAYERS.length - 1)) * usableW
  )

  LAYERS.forEach((count, li) => {
    for (let ni = 0; ni < count; ni++) {
      const y = count === 1
        ? H / 2
        : padY + (ni / (count - 1)) * usableH
      nodes.push({ x: layerX[li], y, layer: li, index: ni })
    }
  })

  for (let li = 0; li < LAYERS.length - 1; li++) {
    const fromLayer = nodes.filter(n => n.layer === li)
    const toLayer   = nodes.filter(n => n.layer === li + 1)
    fromLayer.forEach(f => toLayer.forEach(t => edges.push({ from: f, to: t })))
  }

  return { nodes, edges }
}

// Pulse: a wave of activation traveling layer-by-layer
type Pulse = { layer: number; progress: number }  // progress 0→1 within that layer-gap

export function NeuralNet({ className = "", color = "#00d4ff" }: NeuralNetProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef  = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let graph = buildGraph(canvas.offsetWidth, canvas.offsetHeight)

    // Pulse state: which inter-layer gap is lit and how far along
    let pulseLayer    = 0      // current gap index (0 = between layer 0 and 1)
    let pulseProgress = 0      // 0 → 1
    const PULSE_SPEED = 0.016  // per frame
    const PAUSE_FRAMES = 28    // wait between cycles
    let pauseTimer = 0

    // Active node glow values per layer (0–1)
    const nodeGlow: number[][] = LAYERS.map(c => new Array(c).fill(0))

    function resize() {
      if (!canvas) return
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      graph = buildGraph(canvas.width, canvas.height)
    }

    function draw() {
      if (!canvas || !ctx) return
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      const { nodes, edges } = graph

      // Draw edges
      edges.forEach(e => {
        // Lit if pulse is crossing this edge
        const crossing = e.from.layer === pulseLayer
        const lit = crossing ? pulseProgress : 0
        const base = 0.06

        ctx.beginPath()
        ctx.moveTo(e.from.x, e.from.y)
        ctx.lineTo(e.to.x,   e.to.y)
        ctx.strokeStyle = `${color}${Math.round((base + lit * 0.5) * 255).toString(16).padStart(2,"0")}`
        ctx.lineWidth   = 0.7 + lit * 1.2
        if (lit > 0.1) {
          ctx.shadowColor = color
          ctx.shadowBlur  = 6 * lit
        }
        ctx.stroke()
        ctx.shadowBlur = 0
      })

      // Decay node glow
      nodeGlow.forEach(layer => {
        for (let i = 0; i < layer.length; i++) layer[i] = Math.max(0, layer[i] - 0.025)
      })

      // Light up destination layer when pulse arrives
      if (pulseProgress > 0.85 && pulseLayer < LAYERS.length - 1) {
        nodeGlow[pulseLayer + 1].fill(Math.min(1, pulseProgress))
      }
      // Always keep input lit at start
      if (pulseLayer === 0 && pulseProgress < 0.3) {
        nodeGlow[0].fill(0.7)
      }

      // Draw nodes
      nodes.forEach(n => {
        const glow = nodeGlow[n.layer][n.index] ?? 0
        const r = 3.5 + glow * 2

        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = glow > 0.1
          ? color
          : `${color}44`
        if (glow > 0.1) {
          ctx.shadowColor = color
          ctx.shadowBlur  = 10 * glow
        }
        ctx.fill()
        ctx.shadowBlur = 0

        // Ring
        ctx.beginPath()
        ctx.arc(n.x, n.y, r + 2, 0, Math.PI * 2)
        ctx.strokeStyle = `${color}${Math.round((0.1 + glow * 0.5) * 255).toString(16).padStart(2,"0")}`
        ctx.lineWidth = 0.6
        ctx.stroke()
      })

      // Layer labels
      ctx.font      = `8px "JetBrains Mono", monospace`
      ctx.fillStyle = `${color}44`
      const labels = ["IN", "H1", "H2", "OUT"]
      LAYERS.forEach((_, li) => {
        const x = graph.nodes.find(n => n.layer === li)?.x ?? 0
        ctx.fillText(labels[li] ?? "", x - 8, H - 6)
      })

      // Advance pulse
      if (pauseTimer > 0) {
        pauseTimer--
      } else {
        pulseProgress += PULSE_SPEED
        if (pulseProgress >= 1) {
          pulseProgress = 0
          pulseLayer++
          if (pulseLayer >= LAYERS.length - 1) {
            pulseLayer = 0
            pauseTimer = PAUSE_FRAMES
            nodeGlow.forEach(l => l.fill(0))
          }
        }
      }

      frameRef.current = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
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
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  )
}
