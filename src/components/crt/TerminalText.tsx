"use client"

import { useEffect, useRef, useState } from "react"

interface TerminalTextProps {
  text: string
  speed?: number
  delay?: number
  showCursor?: boolean
  onComplete?: () => void
  className?: string
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div"
}

export function TerminalText({
  text,
  speed       = 40,
  delay       = 0,
  showCursor  = true,
  onComplete,
  className   = "",
  as          = "span",
}: TerminalTextProps) {
  const [count, setCount]     = useState(0)
  const [started, setStarted] = useState(false)
  const [done, setDone]       = useState(false)
  const reduced               = useRef(false)
  const onCompleteRef         = useRef(onComplete)
  const Tag                   = as as React.ElementType

  // Keep onComplete ref fresh without triggering re-renders
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])

  // Handle prefers-reduced-motion + start delay
  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduced.current) {
      setCount(text.length)
      setStarted(true)
      setDone(true)
      onCompleteRef.current?.()
      return
    }

    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay, text])

  // Typewriter tick
  useEffect(() => {
    if (!started || reduced.current) return

    if (count >= text.length) {
      if (!done) {
        setDone(true)
        onCompleteRef.current?.()
      }
      return
    }

    const t = setTimeout(() => setCount(c => c + 1), speed)
    return () => clearTimeout(t)
  }, [started, count, text.length, speed, done])

  // Reset when text prop changes
  useEffect(() => {
    setCount(0)
    setStarted(false)
    setDone(false)
  }, [text])

  const displayed = text.slice(0, count)

  return (
    <Tag className={`inline ${className}`}>
      {displayed}
      {showCursor && (
        <span
          aria-hidden="true"
          style={{
            display:         "inline-block",
            width:           "0.55em",
            height:          "1.05em",
            background:      "var(--green-neon)",
            verticalAlign:   "text-bottom",
            marginLeft:      "2px",
            boxShadow:       "0 0 6px var(--green-neon)",
            // Solid while typing, blink when done
            animation:       done ? "blink 1s step-end infinite" : "none",
            opacity:         done ? undefined : 1,
          }}
        />
      )}
    </Tag>
  )
}
