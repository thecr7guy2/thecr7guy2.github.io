import Image from "next/image"
import { MainMonitor, NeuralMonitor, TerminalMonitor } from "@/components/workstation"
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
          className="relative z-10 shrink-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 px-3 sm:px-6 pb-2"
          style={{
            borderBottom: "1px solid var(--gray-muted)",
            paddingTop: "max(0.75rem, env(safe-area-inset-top))",
          }}
        >
          <span className="text-gray-text text-[9px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.22em] uppercase select-none">
            SAI — WORKSTATION
          </span>
          <ul className="w-full sm:w-auto flex flex-nowrap overflow-x-auto no-scrollbar gap-3 sm:gap-5 list-none m-0 p-0">
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

          {/* Left — portrait terminal monitor */}
          <div
            className="hidden md:flex flex-col w-full min-w-0 order-2 sm:order-1 sm:basis-[clamp(240px,22vw,380px)] sm:shrink-0 sm:grow-0"
          >
            <TerminalMonitor />
          </div>

          {/* Center — main hero monitor */}
          <div className="flex flex-col w-full min-w-0 order-1 sm:order-2 sm:flex-1">
            <MainMonitor />
          </div>

          {/* Right — portrait neural monitor */}
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
                  <span
                    className="shrink-0 flex items-center gap-1 text-[8px] tracking-[0.18em] uppercase text-pink-neon sm:text-pink-dim mt-0.5"
                    style={{ textShadow: "0 0 7px rgba(255,45,120,0.7)" }}
                  >
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--pink-neon)" }}
                    />
                    live
                  </span>
                </div>

                <p
                  className="text-pink-neon sm:text-pink-dim text-[10px] tracking-wider mb-3"
                  style={{ textShadow: "0 0 6px rgba(255,45,120,0.45)" }}
                >
                  {project.deps}
                </p>

                {/* Bullets */}
                <ul className="flex flex-col gap-2">
                  {project.bullets.map((b, i) => (
                    <li
                      key={i}
                      className={`gap-2 text-[11px] text-gray-text leading-relaxed ${i === 0 ? "flex" : "hidden sm:flex"}`}
                    >
                      <span
                        className="text-pink-neon sm:text-pink-dim shrink-0 mt-0.5"
                        style={{ textShadow: "0 0 5px rgba(255,45,120,0.55)" }}
                      >
                        ›
                      </span>
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
                      className="text-pink-neon sm:text-pink-dim text-[10px] tracking-[0.18em] uppercase hover:text-pink-neon transition-colors"
                      style={{ textDecoration: "none", textShadow: "0 0 6px rgba(255,45,120,0.45)" }}
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
      <section
        id="hobbies"
        style={{ background: "var(--black-deep)", borderTop: "1px solid var(--gray-muted)" }}
        className="px-4 sm:px-8 py-14 sm:py-18"
      >
        <div className="mx-auto max-w-[1320px]">
          <p className="text-gray-text text-[10px] tracking-[0.3em] uppercase mb-2">
            OFF_DUTY // ACTIVE
          </p>
          <h2 className="text-cyan-subtle text-xl sm:text-2xl tracking-[0.12em] uppercase mb-7 text-glow-cyan">
            Hobbies
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <article
              className="hidden lg:block lg:col-span-7 relative rounded-xl border p-5 sm:p-6 overflow-hidden"
              style={{
                borderColor: "rgba(0,212,255,0.28)",
                background: "linear-gradient(160deg, rgba(7,12,16,0.88) 0%, rgba(6,8,10,0.96) 100%)",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background: "radial-gradient(ellipse 60% 80% at 20% 35%, rgba(0,212,255,0.18), transparent 72%)",
                }}
              />

              <div className="relative z-10">
                <p className="text-cyan-dim text-[10px] tracking-[0.18em] uppercase mb-3">
                  RECOVERY CYCLE // BASE MODE
                </p>
                <h3 className="text-white-dim text-[22px] sm:text-[28px] tracking-[0.06em] uppercase leading-tight mb-4">
                  Focus Engine Outside Work
                </h3>
                <p className="text-gray-text text-[13px] sm:text-[14px] leading-relaxed max-w-[50ch]">
                  Football sharpens pattern reading, tinkering sharpens execution, and lofi/anime
                  resets the system so deep work stays consistent.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-5">
                  <div
                    className="rounded-md border px-3 py-2"
                    style={{ borderColor: "rgba(0,255,65,0.28)", background: "rgba(0,255,65,0.04)" }}
                  >
                    <p className="text-[9px] tracking-[0.18em] uppercase text-green-dim mb-1">PATTERN</p>
                    <p className="text-[14px] text-green-neon">Football</p>
                  </div>
                  <div
                    className="rounded-md border px-3 py-2"
                    style={{ borderColor: "rgba(0,212,255,0.28)", background: "rgba(0,212,255,0.04)" }}
                  >
                    <p className="text-[9px] tracking-[0.18em] uppercase text-cyan-dim mb-1">BUILD</p>
                    <p className="text-[14px] text-cyan-subtle">Tinkering</p>
                  </div>
                  <div
                    className="rounded-md border px-3 py-2"
                    style={{ borderColor: "rgba(255,179,71,0.28)", background: "rgba(255,179,71,0.04)" }}
                  >
                    <p className="text-[9px] tracking-[0.18em] uppercase text-amber-dim mb-1">RECOVER</p>
                    <p className="text-[14px] text-amber-warm">Lofi + Anime</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {["Match Vision", "Notebook Experiments", "Late-Night Focus", "Repeat Loop"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full border text-[10px] tracking-[0.14em] uppercase text-gray-text"
                      style={{ borderColor: "rgba(0,212,255,0.2)", background: "rgba(0,0,0,0.28)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            <div className="lg:col-span-5 grid grid-cols-1 gap-4">
              <article
                className="rounded-xl border p-5"
                style={{
                  borderColor: "rgba(0,255,65,0.28)",
                  background: "linear-gradient(155deg, rgba(8,14,9,0.85) 0%, rgba(7,10,7,0.95) 100%)",
                }}
              >
                <h4 className="text-green-neon text-[28px] sm:text-[34px] leading-none tracking-[0.06em] uppercase text-glow-green mb-2">
                  Football
                </h4>
                <p className="text-gray-text text-[13px] leading-relaxed">
                  Shot mechanics, space timing, and pattern intuition.
                </p>
              </article>

              <article
                className="rounded-xl border p-5"
                style={{
                  borderColor: "rgba(0,212,255,0.28)",
                  background: "linear-gradient(155deg, rgba(5,13,16,0.85) 0%, rgba(6,8,10,0.95) 100%)",
                }}
              >
                <h4 className="text-cyan-subtle text-[28px] sm:text-[34px] leading-none tracking-[0.06em] uppercase text-glow-cyan mb-2">
                  Tinkering
                </h4>
                <p className="text-gray-text text-[13px] leading-relaxed">
                  Small model runs, wild tests, and fast break-fix loops.
                </p>
              </article>

              <article
                className="rounded-xl border p-5"
                style={{
                  borderColor: "rgba(255,179,71,0.28)",
                  background: "linear-gradient(155deg, rgba(16,11,6,0.84) 0%, rgba(10,8,6,0.95) 100%)",
                }}
              >
                <h4 className="text-amber-warm text-[28px] sm:text-[34px] leading-none tracking-[0.06em] uppercase text-glow-amber mb-2">
                  Lofi + Anime
                </h4>
                <p className="text-gray-text text-[13px] leading-relaxed">
                  Quiet ambience, glowing rooms, stable attention.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SIGNAL ───────────────────────────────────────────── */}
      <section
        id="signal"
        className="flex flex-col items-center justify-center px-4 pt-12 sm:pt-16 pb-[calc(4.5rem+env(safe-area-inset-bottom))] sm:pb-16"
        style={{ background: "var(--black-deep)", borderTop: "1px solid var(--gray-muted)" }}
      >
        <p className="text-gray-text text-[10px] tracking-[0.35em] uppercase mb-4 sm:mb-10 select-none">
          SYSTEM IDENTIFICATION
        </p>

        {/* ── Mobile Signal Card (no floppy) ── */}
        <div
          className="sm:hidden w-full max-w-[460px] rounded-md border p-4 mt-2"
          style={{
            borderColor: "rgba(0,212,255,0.35)",
            background: "linear-gradient(165deg, rgba(6,11,15,0.85), rgba(6,8,10,0.96))",
            boxShadow: "0 0 24px rgba(0,212,255,0.12)",
          }}
        >
          <p className="text-cyan-dim text-[9px] tracking-[0.2em] uppercase mb-1">ID_CARD // MOBILE</p>
          <p className="text-white-dim text-[16px] tracking-[0.1em] uppercase mb-1">Maniraj Sai</p>
          <p className="text-cyan-subtle text-[9px] tracking-[0.16em] uppercase mb-3">
            AI Engineer // Schiphol, NL
          </p>

          <div style={{ height: "1px", background: "rgba(0,212,255,0.2)", marginBottom: "8px" }} />

          {signals.map((signal) => (
            <a
              key={signal.cmd}
              href={signal.href}
              target={signal.href.startsWith("http") ? "_blank" : undefined}
              rel={signal.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-start justify-between gap-3 py-2"
              style={{ borderBottom: "1px solid rgba(0,212,255,0.1)", textDecoration: "none" }}
            >
              <span className="text-gray-text group-hover:text-cyan-subtle transition-colors text-[8px] tracking-[0.14em] uppercase shrink-0">
                {signal.cmd}
              </span>
              <span
                className="text-white-dim group-hover:text-cyan-subtle transition-colors text-[11px] text-right min-w-0"
                style={{ overflowWrap: "anywhere" }}
              >
                {signal.label}
              </span>
            </a>
          ))}
        </div>

        {/* ── Floppy Disk ── */}
        <div
          className="hidden sm:block w-full relative"
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
            className="flex items-start justify-between px-4 sm:px-[22px] pt-4 sm:pt-[18px] pb-2.5 sm:pb-3"
            style={{ position: "relative", zIndex: 2 }}
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
          <div className="px-4 sm:px-[22px] pb-3.5 sm:pb-4" style={{ position: "relative", zIndex: 2 }}>
            <div
              className="p-3 sm:px-4 sm:py-[14px]"
              style={{
                background: "rgba(0,212,255,0.04)",
                border: "1px solid rgba(0,212,255,0.2)",
                borderRadius: "6px",
              }}
            >
              {/* Name + title */}
              <p
                className="text-[14px] sm:text-[16px] tracking-[0.10em] sm:tracking-[0.12em] uppercase mb-1"
                style={{ color: "#e8e8e8" }}
              >
                Maniraj Sai
              </p>
              <p
                className="text-[8px] sm:text-[9px] tracking-[0.18em] sm:tracking-[0.22em] uppercase mb-3 sm:mb-[14px]"
                style={{ color: "var(--cyan-subtle)", opacity: 0.85 }}
              >
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
                  className="group flex items-start sm:items-center justify-between gap-3 py-2 transition-colors"
                  style={{ borderBottom: "1px solid rgba(0,212,255,0.09)", textDecoration: "none" }}
                >
                  <span className="text-gray-text group-hover:text-cyan-subtle transition-colors tracking-[0.16em] uppercase shrink-0 text-[8px] sm:text-[9px]">
                    {signal.cmd}
                  </span>
                  <span
                    className="text-white-dim group-hover:text-cyan-subtle transition-colors min-w-0 text-right text-[11px] sm:text-[12px]"
                    style={{ letterSpacing: "0.02em", overflowWrap: "anywhere" }}
                  >
                    {signal.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Metal shutter */}
          <div
            className="mx-4 sm:mx-[22px] mb-[calc(16px+env(safe-area-inset-bottom))] sm:mb-5"
            style={{
            position: "relative", zIndex: 2,
            background: "linear-gradient(180deg, #222 0%, #2a2a2a 40%, #1e1e1e 100%)",
            borderRadius: "4px",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "8px 12px",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -2px 4px rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          >
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
