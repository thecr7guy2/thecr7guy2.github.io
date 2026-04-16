import Image from "next/image"
import { MainMonitor, NeuralMonitor, TerminalMonitor } from "@/components/workstation"
import { GlitchText } from "@/components/crt/GlitchText"
import { getResumeData } from "@/lib/resume"

const NAV = [
  { label: "projects", href: "#projects" },
  { label: "hobbies",  href: "#hobbies"  },
  { label: "signal",   href: "#signal"   },
]

const WRITEUPS: Record<string, string> = {
  "Autonomous AI Trading Bot": "https://bramble-hickory-105.notion.site/I-Built-a-Bot-That-Reads-SEC-Filings-and-Lets-Claude-Opus-Manage-My-Portfolio-323a490c257c81739909cb792452185a",
  "GPT-2 Small (124M): Pretraining & Instruction Tuning": "https://bramble-hickory-105.notion.site/How-I-trained-an-LLM-from-scratch-and-finetuned-it-271a490c257c80718ffcf42b6d90e962",
  "AX-Office.ai": "https://bramble-hickory-105.notion.site/AX-Office-ai-How-We-Built-Local-AI-Into-the-Heart-of-Our-Office-323a490c257c81beb4e4e022ded8bfcc",
  "Ajax Shot Technique Analyzer": "https://bramble-hickory-105.notion.site/Building-a-Shot-Technique-Analyzer-for-Ajax-2f4a490c257c80b490e7d88e3a1facb9",
}

export default async function Home() {
  const resume = await getResumeData()

  const projects = resume.projects.map((project) => ({
    name: project.name,
    deps: project.year ? `${project.tech} // ${project.year}` : project.tech,
    bullets: project.bullets,
    writeupUrl: WRITEUPS[project.name] ?? null,
  }))

  const signals = [
    resume.contact.email ? {
      cmd: "mail --open",
      label: resume.contact.email,
      href: `mailto:${resume.contact.email}`,
    } : null,
    resume.contact.github ? {
      cmd: "gh profile",
      label: resume.contact.github.replace(/^https?:\/\//, ""),
      href: resume.contact.github,
    } : null,
    resume.contact.linkedin ? {
      cmd: "ln profile",
      label: resume.contact.linkedin.replace(/^https?:\/\//, ""),
      href: resume.contact.linkedin,
    } : null,
    {
      cmd: "download resume",
      label: "Resume.pdf",
      href: "/assets/Resume.pdf",
    },
  ].filter((signal): signal is { cmd: string; label: string; href: string } => Boolean(signal))

  return (
    <>
      {/* ─── HERO: THE WORKSTATION ─────────────────────────────── */}
      <section
        className="relative flex flex-col"
        style={{ minHeight: "100dvh", background: "var(--black-deep)" }}
        aria-label="Workstation"
      >
        {/* Full-section background image */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <Image
            src="/assets/cool-image.jpeg"
            alt=""
            fill
            className="object-cover object-center saturate-115 contrast-115 brightness-72"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: [
                "linear-gradient(to bottom, rgba(4,4,4,0.88) 0%, rgba(4,4,4,0.45) 35%, rgba(4,4,4,0.45) 65%, rgba(4,4,4,0.92) 100%)",
                "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,255,0.10) 0%, transparent 70%)",
              ].join(", "),
            }}
          />
        </div>

        {/* Ambient desk glow — radial light source behind monitors */}
        <div
          aria-hidden="true"
          style={{
            position:      "absolute",
            inset:         0,
            pointerEvents: "none",
            background: [
              "radial-gradient(ellipse 70% 45% at 50% 52%, rgba(0,255,65,0.045) 0%, transparent 70%)",
              "radial-gradient(ellipse 30% 30% at 22% 52%, rgba(255,179,71,0.03) 0%, transparent 60%)",
              "radial-gradient(ellipse 30% 30% at 78% 52%, rgba(0,212,255,0.03) 0%, transparent 60%)",
            ].join(", "),
          }}
        />

        {/* ── Top nav bar ── */}
        <nav
          className="relative z-10 shrink-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 px-3 sm:px-6 pt-3 sm:pt-4 pb-2"
          style={{ borderBottom: "1px solid var(--gray-muted)" }}
        >
          <span className="text-gray-text text-[9px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.22em] uppercase select-none">
            SAI — WORKSTATION
          </span>
          <ul className="w-full sm:w-auto flex flex-wrap sm:flex-nowrap gap-x-3 gap-y-1 sm:gap-5 list-none m-0 p-0">
            {NAV.map(n => (
              <li key={n.label}>
                <a
                  href={n.href}
                  className="text-gray-text text-[9px] sm:text-[11px] tracking-[0.12em] sm:tracking-widest uppercase hover:text-green-neon transition-colors duration-150"
                  style={{ textDecoration: "none" }}
                >
                  [{n.label}]
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Spacer — pushes monitors to vertical center */}
        <div className="flex-1" />

        {/* ── Three-monitor desk ── */}
        <div
          className="monitor-stage relative z-10 shrink-0 flex flex-col sm:flex-row items-stretch px-2.5 sm:px-4 pb-3 pt-2.5 sm:pt-3 gap-4 sm:gap-3 min-h-0 max-w-[1880px] w-full mx-auto"
        >

          {/* Left — terminal activity log (hidden on small mobile) */}
          <div
            className="hidden md:flex flex-col w-full min-w-0 order-2 sm:order-1 sm:basis-[clamp(240px,22vw,380px)] sm:shrink-0 sm:grow-0"
          >
            <TerminalMonitor />
          </div>

          {/* Center — main hero monitor */}
          <div className="flex flex-col w-full min-w-0 order-1 sm:order-2 sm:flex-1">
            <MainMonitor />
          </div>

          {/* Right — neural net (hidden on small screens) */}
          <div
            className="hidden md:flex flex-col w-full min-w-0 order-3 sm:basis-[clamp(240px,22vw,380px)] sm:shrink-0 sm:grow-0"
          >
            <NeuralMonitor />
          </div>
        </div>

        {/* Spacer — equal weight below monitors */}
        <div className="flex-1" />

        {/* ── Desk surface strip ── */}
        <div
          className="relative z-10 shrink-0 flex items-center justify-center gap-6 px-4 sm:px-6 py-2.5 sm:py-3"
          style={{
            background:   "linear-gradient(to top, rgba(4,4,4,0.9), transparent)",
            paddingBottom: "calc(0.7rem + env(safe-area-inset-bottom))",
          }}
        >
          {/* Scroll cue */}

          {/* OPTION 1: terminal command + blinking cursor */}
          <div className="flex flex-col items-center gap-2 select-none">
            <div className="flex items-center gap-1">
              <span className="text-green-dim text-[10px] tracking-[0.18em]">$</span>
              <span className="text-gray-text text-[10px] tracking-[0.18em]">scroll --explore</span>
              <span
                className="inline-block w-[6px] h-[11px] bg-green-neon"
                style={{ animation: "led-pulse 1s step-end infinite", opacity: 0.85 }}
              />
            </div>
            <div
              className="text-green-dim text-[10px]"
              style={{ animation: "led-pulse 2s ease-in-out infinite" }}
            >
              ↓
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTENT SECTIONS (Phase 3) ──────────── */}
      <section
        id="projects"
        style={{ background: "var(--black-surface)" }}
        className="relative px-4 sm:px-8 py-14 sm:py-18"
      >
        <div className="mx-auto max-w-[1200px]">
          <p className="text-gray-text text-[10px] tracking-[0.3em] uppercase mb-2">
            ACTIVE PROCESSES
          </p>
          <h2 className="text-pink-neon text-xl sm:text-2xl tracking-[0.12em] uppercase mb-7 text-glow-pink">
            Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {projects.map((project) => (
              <article
                key={project.name}
                className="relative rounded-md border p-4 sm:p-5 overflow-hidden flex flex-col"
                style={{
                  borderColor: "rgba(255,45,120,0.22)",
                  background: "linear-gradient(165deg, rgba(16,7,10,0.78), rgba(7,7,7,0.92))",
                }}
              >
                {/* Title bar */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-[12px] sm:text-[13px] text-white-dim tracking-wide uppercase leading-snug">
                    {project.name}
                  </h3>
                  <span className="shrink-0 flex items-center gap-1 text-[8px] tracking-[0.18em] uppercase text-pink-dim mt-0.5">
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--pink-neon)" }}
                    />
                    live
                  </span>
                </div>

                <p className="text-pink-dim text-[10px] tracking-wider mb-3">{project.deps}</p>

                {/* Bullets */}
                <ul className="flex flex-col gap-2">
                  {project.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-[11px] text-gray-text leading-relaxed">
                      <span className="text-pink-dim shrink-0 mt-0.5">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Writeup link */}
                {project.writeupUrl && (
                  <div className="mt-4 pt-3" style={{ borderTop: "1px solid rgba(255,45,120,0.12)" }}>
                    <a
                      href={project.writeupUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-dim text-[10px] tracking-[0.18em] uppercase hover:text-pink-neon transition-colors"
                      style={{ textDecoration: "none" }}
                    >
                      › [writeup ↗]
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOBBIES ──────────────────────────────────────────── */}
      <section id="hobbies" style={{ background: "var(--black-deep)" }}>

        {/* Label */}
        <div className="px-4 sm:px-8 pt-14 sm:pt-18 pb-8">
          <p className="text-gray-text text-[10px] tracking-[0.3em] uppercase">
            OFF_DUTY // ACTIVE
          </p>
        </div>

        {/* ── Band 1: Football ── */}
        <div
          className="relative overflow-hidden px-4 sm:px-16 py-12 sm:py-16"
          style={{ borderTop: "1px solid var(--gray-muted)" }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: "clamp(400px, 55vw, 800px)",
              height: "clamp(400px, 55vw, 800px)",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,255,65,0.13) 0%, transparent 68%)",
              filter: "blur(48px)",
              left: "-15%",
              top: "-60%",
              animation: "blob-drift-1 18s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <GlitchText
              as="h3"
              intensity="medium"
              className="text-green-neon uppercase leading-none mb-4"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", letterSpacing: "-0.01em" }}
            >
              Football
            </GlitchText>
            <p className="text-gray-text leading-relaxed max-w-[460px]" style={{ fontSize: "clamp(13px, 1.4vw, 15px)" }}>
              Tactical obsessive. Real Madrid fan. Built a whole biomechanics pipeline just to understand
              why some shots are inevitable. CR7 &gt; everyone else, always.
            </p>
          </div>
        </div>

        {/* ── Band 2: ML Tinkering ── */}
        <div
          className="relative overflow-hidden px-4 sm:px-16 py-12 sm:py-16 flex flex-col items-center text-center"
          style={{ borderTop: "1px solid var(--gray-muted)" }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: "clamp(400px, 60vw, 900px)",
              height: "clamp(400px, 60vw, 900px)",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,212,255,0.11) 0%, transparent 68%)",
              filter: "blur(56px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              animation: "blob-drift-2 22s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <GlitchText
              as="h3"
              intensity="low"
              className="text-cyan-subtle uppercase leading-none mb-4"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", letterSpacing: "-0.01em" }}
            >
              Tinkering
            </GlitchText>
            <p className="text-gray-text leading-relaxed max-w-[460px] mx-auto" style={{ fontSize: "clamp(13px, 1.4vw, 15px)" }}>
              If it&apos;s not in production, it&apos;s in a notebook.
              Training small models, breaking things on purpose, reading papers at 2am.
            </p>
          </div>
        </div>

        {/* ── Band 3: Lofi + Anime ── */}
        <div
          className="relative overflow-hidden px-4 sm:px-16 py-12 sm:py-16 flex flex-col items-end text-right"
          style={{ borderTop: "1px solid var(--gray-muted)", borderBottom: "1px solid var(--gray-muted)" }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: "clamp(400px, 55vw, 800px)",
              height: "clamp(400px, 55vw, 800px)",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,179,71,0.10) 0%, transparent 68%)",
              filter: "blur(48px)",
              right: "-15%",
              bottom: "-60%",
              animation: "blob-drift-3 20s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h3
              className="text-amber-warm uppercase leading-none mb-4"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", letterSpacing: "-0.01em" }}
            >
              Lofi + Anime
            </h3>
            <p className="text-gray-text leading-relaxed max-w-[460px]" style={{ fontSize: "clamp(13px, 1.4vw, 15px)" }}>
              Ghost in the Shell. Akira. Cowboy Bebop.
              The aesthetic isn&apos;t a theme — it&apos;s a worldview.
              Dark rooms, monitors glowing, beats in the background.
            </p>
          </div>
        </div>

        <div className="pb-14 sm:pb-18" />
      </section>

      {/* ─── SIGNAL ───────────────────────────────────────────── */}
      <section
        id="signal"
        className="flex flex-col items-center justify-center px-4 py-12 sm:py-16"
        style={{ background: "var(--black-deep)", borderTop: "1px solid var(--gray-muted)" }}
      >
        <p className="text-gray-text text-[10px] tracking-[0.35em] uppercase mb-10 select-none">
          SYSTEM IDENTIFICATION
        </p>

        {/* ── Floppy Disk ── */}
        <div
          className="w-full relative"
          style={{
            maxWidth: "460px",
            background: "linear-gradient(160deg, #131313 0%, #0a0a0a 100%)",
            border: "1px solid rgba(0,212,255,0.55)",
            /* top-right corner clipped — classic floppy notch */
            clipPath: "polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 0 100%)",
            boxShadow: [
              "0 0 0 1px rgba(0,0,0,0.9)",
              "0 24px 70px rgba(0,0,0,0.85)",
              "0 0 35px rgba(0,212,255,0.22)",
              "0 0 70px rgba(0,212,255,0.10)",
              "0 0 120px rgba(0,212,255,0.05)",
            ].join(", "),
            animation: "card-float 7s ease-in-out infinite",
          }}
        >
          {/* Holographic shimmer */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "linear-gradient(110deg, transparent 30%, rgba(0,212,255,0.08) 46%, rgba(255,45,120,0.05) 54%, transparent 70%)",
              backgroundSize: "300% 100%",
              animation: "card-shimmer 4s ease-in-out infinite",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Top row — write-protect notch + hub window */}
          <div
            className="flex items-start justify-between"
            style={{ padding: "18px 22px 12px", position: "relative", zIndex: 2 }}
          >
            {/* Write-protect tab */}
            <div style={{
              width: "18px", height: "18px",
              border: "1px solid rgba(0,212,255,0.55)",
              borderRadius: "3px",
              background: "rgba(0,212,255,0.08)",
              boxShadow: "0 0 6px rgba(0,212,255,0.3)",
            }} />

            {/* Hub window — spinning disc */}
            <div style={{
              width: "72px", height: "72px",
              borderRadius: "50%",
              border: "2px solid rgba(0,212,255,0.55)",
              background: "radial-gradient(circle, #161616 0%, #080808 100%)",
              boxShadow: "0 0 12px rgba(0,212,255,0.35), inset 0 0 20px rgba(0,0,0,0.9)",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Outer ring — spins */}
              <div style={{
                position: "absolute", inset: "8px",
                borderRadius: "50%",
                border: "1px solid rgba(0,212,255,0.3)",
                borderTopColor: "rgba(0,212,255,0.7)",
                animation: "spin-slow 6s linear infinite",
              }} />
              {/* Inner ring */}
              <div style={{
                position: "absolute", inset: "18px",
                borderRadius: "50%",
                border: "1px solid rgba(0,212,255,0.15)",
              }} />
              {/* Center hub dot */}
              <div style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "10px", height: "10px",
                borderRadius: "50%",
                background: "var(--cyan-subtle)",
                boxShadow: "0 0 8px rgba(0,212,255,1), 0 0 16px rgba(0,212,255,0.6)",
              }} />
            </div>
          </div>

          {/* Label area */}
          <div style={{ padding: "0 22px 16px", position: "relative", zIndex: 2 }}>
            <div style={{
              background: "rgba(0,212,255,0.04)",
              border: "1px solid rgba(0,212,255,0.2)",
              borderRadius: "6px",
              padding: "14px 16px",
            }}>
              {/* Name + title */}
              <p style={{ color: "#e8e8e8", fontSize: "16px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "4px" }}>
                Maniraj Sai
              </p>
              <p style={{ color: "var(--cyan-subtle)", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "14px", opacity: 0.85 }}>
                AI Engineer // Schiphol, NL
              </p>

              <div style={{ height: "1px", background: "rgba(0,212,255,0.2)", marginBottom: "12px" }} />

              {/* Contact links */}
              {signals.map((signal) => (
                <a
                  key={signal.cmd}
                  href={signal.href}
                  target={signal.href.startsWith("http") ? "_blank" : undefined}
                  rel={signal.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between py-2 transition-colors"
                  style={{ borderBottom: "1px solid rgba(0,212,255,0.09)", textDecoration: "none" }}
                >
                  <span className="text-gray-text group-hover:text-cyan-subtle transition-colors tracking-[0.2em] uppercase" style={{ fontSize: "9px" }}>
                    {signal.cmd}
                  </span>
                  <span className="text-white-dim group-hover:text-cyan-subtle transition-colors" style={{ fontSize: "12px", letterSpacing: "0.03em" }}>
                    {signal.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Metal shutter */}
          <div style={{
            margin: "0 22px 20px",
            position: "relative", zIndex: 2,
            background: "linear-gradient(180deg, #222 0%, #2a2a2a 40%, #1e1e1e 100%)",
            borderRadius: "4px",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "8px 12px",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -2px 4px rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            {/* Read/write opening slot */}
            <div style={{
              flex: 1,
              height: "10px",
              background: "#060606",
              borderRadius: "2px",
              border: "1px solid rgba(0,0,0,0.9)",
              boxShadow: "inset 0 2px 6px rgba(0,0,0,1)",
              marginRight: "10px",
            }} />
            <p style={{ color: "rgba(0,212,255,0.7)", fontSize: "8px", letterSpacing: "0.2em", whiteSpace: "nowrap" }}>
              V3.0 // RW
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
