"use client"

import { useEffect, useState } from "react"

interface GlitchTextProps {
  children: React.ReactNode
  intensity?: "low" | "medium" | "high"
  className?: string
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div"
}

const INTENSITY = {
  low:    { interval: 7500, duration: 110 },
  medium: { interval: 3500, duration: 170 },
  high:   { interval: 1600, duration: 260 },
}

export function GlitchText({
  children,
  intensity = "low",
  className = "",
  as = "span",
}: GlitchTextProps) {
  const [glitching, setGlitching] = useState(false)
  const cfg = INTENSITY[intensity]
  const Tag = as as React.ElementType

  // text content — only works when children is a string
  const textContent = typeof children === "string" ? children : undefined

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>
    let timeoutId:  ReturnType<typeof setTimeout>

    const trigger = () => {
      setGlitching(true)
      setTimeout(() => setGlitching(false), cfg.duration)
    }

    // Stagger initial fire so multiple instances don't sync up
    const jitter = Math.random() * cfg.interval * 0.6
    timeoutId = setTimeout(() => {
      trigger()
      intervalId = setInterval(() => {
        // Small additional random variance each cycle
        trigger()
      }, cfg.interval + (Math.random() * 600 - 300))
    }, jitter)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [intensity, cfg.duration, cfg.interval])

  return (
    <Tag
      className={`${glitching ? "glitching" : ""} ${className}`}
      data-text={textContent}
      style={
        glitching
          ? ({ "--glitch-dur": `${cfg.duration}ms` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </Tag>
  )
}
