import { CRTScreen, GlitchText, TerminalText, StatusBadge } from "@/components/crt"

export default function Home() {
  return (
    <main className="min-h-screen bg-black-deep flex items-center justify-center p-8">
      <div className="w-full max-w-lg space-y-6">

        {/* Phase 1 smoke test — CRT component system */}
        <CRTScreen variant="green" label="TRINITRON-X // MDL-2091" size="full">
          <div className="p-8 space-y-5">

            <div className="text-gray-text text-xs tracking-widest uppercase">
              Phase 1 · CRT Design System
            </div>

            <hr className="hr-scan" />

            {/* GlitchText */}
            <GlitchText
              as="h1"
              intensity="low"
              className="text-green-neon text-glow-green text-5xl font-bold chromatic-heavy"
            >
              SAI
            </GlitchText>

            {/* TerminalText */}
            <TerminalText
              text="AI Engineer. LLM builder. Football obsessive."
              speed={35}
              delay={400}
              className="text-gray-text text-sm tracking-wide"
              as="p"
            />

            <hr className="hr-scan" />

            {/* StatusBadge row */}
            <div className="flex flex-wrap gap-3 pt-1">
              <StatusBadge status="live" />
              <StatusBadge status="wip" />
              <StatusBadge status="archived" />
              <StatusBadge status="classified" />
            </div>

          </div>
        </CRTScreen>

        <p className="text-gray-muted text-[10px] tracking-widest text-center uppercase">
          [ Component system ready — Phase 2 next ]
        </p>

      </div>
    </main>
  )
}
