"use client"

import { useEffect, useRef } from "react"
import { useAnimate } from "framer-motion"

interface CRTScreenProps {
  children: React.ReactNode
  variant?: "green" | "red" | "cyan" | "amber"
  size?: "sm" | "md" | "lg" | "full"
  label?: string
  className?: string
  noBezel?: boolean
  noCurvature?: boolean
}

const VARIANT = {
  green: {
    primary: "#00ff41",
    dim:     "#00aa2a",
    dark:    "#001a08",
    glow:    (a: number) => `rgba(0,255,65,${a})`,
  },
  red: {
    primary: "#ff2d2d",
    dim:     "#aa1a1a",
    dark:    "#1a0000",
    glow:    (a: number) => `rgba(255,45,45,${a})`,
  },
  cyan: {
    primary: "#00d4ff",
    dim:     "#0088ab",
    dark:    "#001a20",
    glow:    (a: number) => `rgba(0,212,255,${a})`,
  },
  amber: {
    primary: "#ffb347",
    dim:     "#7a5000",
    dark:    "#1a0f00",
    glow:    (a: number) => `rgba(255,179,71,${a})`,
  },
}

const SIZE: Record<string, React.CSSProperties> = {
  sm:   { maxWidth: "320px",  width: "100%" },
  md:   { maxWidth: "520px",  width: "100%" },
  lg:   { maxWidth: "800px",  width: "100%" },
  full: { width: "100%" },
}

export function CRTScreen({
  children,
  variant   = "green",
  size      = "md",
  label,
  className = "",
  noBezel   = false,
  noCurvature = false,
}: CRTScreenProps) {
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const colours = VARIANT[variant]
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true

    ;(async () => {
      // Start collapsed + dark
      animate(scope.current, {
        opacity: 0,
        scaleX: 0.08,
        scaleY: 0.008,
        filter: "brightness(0) blur(0px)",
      }, { duration: 0 })

      // Brief warm-up pause — monitor coming to life
      await new Promise<void>(res => setTimeout(res, 380))
      if (!mounted.current) return

      // Horizontal phosphor flash
      await animate(scope.current, {
        opacity: 1,
        scaleX: 1,
        scaleY: 0.008,
        filter: "brightness(6) blur(2px)",
      }, { duration: 0.055, ease: "easeOut" })
      if (!mounted.current) return

      // Vertical bloom — screen fills
      await animate(scope.current, {
        scaleY: 1.03,
        filter: "brightness(1.7) blur(0px)",
      }, { duration: 0.22, ease: [0.16, 1, 0.3, 1] })
      if (!mounted.current) return

      // Subtle overshoot settles
      await animate(scope.current, {
        scaleY: 1,
        filter: "brightness(1) blur(0px)",
      }, { duration: 0.45, ease: "easeOut" })
    })()

    return () => { mounted.current = false }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const bezelStyle: React.CSSProperties = noBezel ? {} : {
    position:     "relative",
    padding:      "22px 26px 32px",
    background:   "linear-gradient(150deg, #1c1c1c 0%, #141414 50%, #0f0f0f 100%)",
    borderRadius: "10px",
    boxShadow: [
      "0 0 0 1px #080808",
      "0 12px 48px rgba(0,0,0,0.9)",
      "0 4px 12px rgba(0,0,0,0.7)",
      "inset 0 1px 0 rgba(255,255,255,0.06)",
      "inset 1px 0 0 rgba(255,255,255,0.04)",
      "inset 0 -3px 10px rgba(0,0,0,0.5)",
      "inset -2px 0 10px rgba(0,0,0,0.4)",
    ].join(", "),
  }

  const screenContainerStyle: React.CSSProperties = {
    position:     "relative",
    background:   "#040404",
    borderRadius: noBezel ? "4px" : "3px",
    overflow:     "hidden",
    border:       `1px solid ${colours.dim}`,
    boxShadow: [
      `inset 0 0 40px ${colours.glow(0.07)}`,
      `inset 0 0 100px ${colours.glow(0.03)}`,
      `0 0 14px ${colours.glow(0.35)}`,
      `0 0 35px ${colours.glow(0.14)}`,
      `0 0 70px ${colours.glow(0.06)}`,
    ].join(", "),
    ...(noCurvature ? {} : {
      transform: "perspective(1400px) rotateX(0.35deg)",
    }),
  }

  return (
    <div
      className={className}
      style={{ ...SIZE[size], ...(noBezel ? {} : bezelStyle) }}
    >
      {/* Bezel label — top left, dim embossed */}
      {label && !noBezel && (
        <div style={{
          position:      "absolute",
          top:           "8px",
          left:          "14px",
          fontSize:      "8px",
          color:         "#2a2a2a",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          userSelect:    "none",
          fontFamily:    "inherit",
        }}>
          {label}
        </div>
      )}

      {/* Screen — animated target */}
      <div ref={scope} style={screenContainerStyle} className="scanlines flicker">

        {/* Corner vignette — CRT barrel edge darkening */}
        <div style={{
          position:      "absolute",
          inset:         0,
          background:    "radial-gradient(ellipse at 50% 50%, transparent 52%, rgba(0,0,0,0.6) 100%)",
          pointerEvents: "none",
          zIndex:        10,
        }} />

        {/* Glass reflection — diagonal highlight */}
        <div style={{
          position:      "absolute",
          inset:         0,
          background:    "linear-gradient(135deg, rgba(255,255,255,0.022) 0%, transparent 38%, transparent 65%, rgba(255,255,255,0.008) 100%)",
          pointerEvents: "none",
          zIndex:        11,
        }} />

        {/* Inner phosphor bloom at screen edges */}
        <div style={{
          position:      "absolute",
          inset:         0,
          boxShadow:     `inset 0 0 20px ${colours.glow(0.08)}`,
          pointerEvents: "none",
          zIndex:        12,
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 5 }}>
          {children}
        </div>
      </div>

      {/* LED power indicator — bottom right of bezel */}
      {!noBezel && (
        <div style={{
          position:     "absolute",
          bottom:       "11px",
          right:        "15px",
          width:        "6px",
          height:       "6px",
          borderRadius: "50%",
          background:   colours.primary,
          boxShadow:    `0 0 4px ${colours.primary}, 0 0 10px ${colours.glow(0.7)}`,
          animation:    "led-pulse 3.5s ease-in-out infinite",
        }} />
      )}
    </div>
  )
}
