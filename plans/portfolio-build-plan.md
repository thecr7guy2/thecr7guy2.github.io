# SAI — Retro Cyberpunk Portfolio

## Vision

The site doesn't look like a portfolio. It looks like you've gained access to someone's retro cyberpunk workstation — CRT monitors glowing in a dark room, neural network training visualizations flickering on screen, analog hardware humming. Every section of the portfolio is a "screen" on this workstation. The visitor is the observer, peering into SAI's late-night deep work session.

**Core aesthetic pillars:**
- Ghost in the Shell / Akira / lofi hacker art
- CRT monitors with scanlines, phosphor glow, chromatic aberration
- Neural network training visuals as living decoration (loss curves, heatmaps, convergence animations)
- Dark environment: deep blacks, muted grays, neon red/green/cyan accents
- Film grain, worn textures, imperfections — nothing hyper-clean
- "SAI" appears as diegetic detail, not as a logo

**Core tech:** Next.js 15 (App Router), Tailwind CSS v4, Framer Motion, Canvas/WebGL for visualizations, Vercel deployment.

---

## Phase 0 — Scaffold & Deploy (Day 1)

**Goal:** Next.js project running on Vercel with the foundational structure.

- [ ] Initialize Next.js 15 with App Router, TypeScript, Tailwind v4
- [ ] Set up project structure:
  ```
  src/
    app/
      page.tsx            # Landing / workstation view
      blog/
        [slug]/page.tsx   # Individual blog post
      layout.tsx          # Global layout (dark base, fonts, grain overlay)
    components/
      crt/                # CRT effect components
      visualizations/     # Neural net / data viz components
      ui/                 # Shared UI primitives
    content/
      blogs/              # MDX blog files
    lib/
      utils.ts
    styles/
      globals.css         # Global styles, CRT shaders, scanline overlays
  ```
- [ ] Install core dependencies: `framer-motion`, `next-mdx-remote` (for blogs), a monospace/retro font (e.g., IBM Plex Mono, Space Mono, or JetBrains Mono)
- [ ] Configure Vercel deployment (connect repo, auto-deploy on push)
- [ ] Set up base `globals.css`: black background (`#0a0a0a`), base typography, CSS custom properties for the color palette
- [ ] Verify: site loads on Vercel with a placeholder page

---

## Phase 1 — The CRT Design System (Day 1–2)

**Goal:** Build the reusable visual language that makes everything feel retro-cyberpunk.

### 1.1 CRT Screen Component
A reusable `<CRTScreen>` wrapper that makes any content look like it's displayed on a cathode ray tube monitor:
- CSS scanline overlay (repeating horizontal lines, semi-transparent)
- Subtle screen curvature via `border-radius` + slight perspective transform
- Phosphor glow: `box-shadow` with colored spread (green/red/cyan variants)
- Screen flicker: subtle CSS animation that varies opacity by ~1-2%
- Chromatic aberration on text: tiny offset red/blue text-shadows
- Optional "monitor bezel" — a chunky retro frame around the content (think old Sony Trinitron)

### 1.2 Color System
```
--black-deep:    #0a0a0a
--black-surface: #111111
--gray-muted:    #2a2a2a
--gray-text:     #8a8a8a
--green-neon:    #00ff41    (primary CRT green)
--red-neon:      #ff2d2d    (accent, errors, highlights)
--cyan-subtle:   #00d4ff    (secondary accent)
--amber-warm:    #ffb347    (warm highlights, skin tones in illustrations)
```

### 1.3 Typography
- Headings: monospace, slightly glitched or with a subtle flicker
- Body: clean monospace (JetBrains Mono or IBM Plex Mono)
- Special: terminal-style text that "types out" on load (typewriter effect)

### 1.4 Film Grain Overlay
A full-page `<div>` with a CSS noise/grain animation layered over everything at very low opacity. Creates that cinematic analog feel without hurting readability.

### 1.5 Ambient Particles (optional, Phase 1 stretch)
Lightweight canvas-based particles that drift slowly — representing data flowing through the system. Very subtle, very sparse. Not a particle explosion. Think floating dust in a dark room lit by monitors.

---

## Phase 2 — The Landing Page: "The Workstation" (Day 2–4)

**Goal:** The hero section that makes people stop scrolling and say "what is this."

### 2.1 Concept
The landing page IS the workstation. The visitor sees a stylized top-down or slightly angled view of SAI's desk, realized through layered HTML/CSS/Canvas — not a static image.

**Elements on the workstation:**
- **Main CRT monitor (center):** Displays the "about" — name, title, one-liner. Animated loss curve running in the background behind the text.
- **Secondary monitor (left):** Shows a miniature scrolling terminal with real output — snippets from blog posts or project descriptions, auto-scrolling like a live feed.
- **Third monitor (right):** A live-ish visualization — could be a small animated neural network graph (nodes + edges pulsing), or a heatmap that shifts.
- **Desk surface:** Subtle texture. A beverage can. Tangled cable illustrations (SVG). Keyboard glow.
- **"SAI" marking:** Appears subtly — maybe embossed on the desk surface, or flickering faintly on one of the screens.

**Alternative (simpler but still hard-hitting):**
If the full workstation illustration is too complex for Phase 2, start with a single large CRT screen as the hero:
- Full-bleed CRT effect
- Name types out: `> SAI_`
- Subtitle fades in: `AI Engineer. LLM builder. Football obsessive.`
- Background: animated loss curve or neural net convergence visualization (Canvas)
- Below the fold: content sections, each in their own CRT frame

### 2.2 Navigation
No traditional navbar. Instead:
- A minimal row of terminal-style commands at the top or bottom:
  `[projects]  [writing]  [skills]  [signal]`
- Or: clickable "monitor tabs" that switch the active screen content
- Mobile: hamburger that opens a full-screen terminal-style menu with typed-out options

### 2.3 Scroll Behavior
As you scroll down from the hero, you leave the workstation and enter the content sections. Each section is framed as a different "screen" or "terminal window." Smooth transitions between them. Maybe a subtle parallax on the CRT bezels.

---

## Phase 3 — Content Sections (Day 4–6)

**Goal:** Projects, blog index, experience, skills — all in the retro cyberpunk language.

### 3.1 Projects Section — "Active Processes"
Styled like a process manager or system monitor:
- Each project is a "running process" card with:
  - Project name as the process name
  - Tech stack as "dependencies"  
  - A one-liner description
  - Status indicator (green dot = live, amber = archived)
  - Links: `[source]` `[demo]` `[writeup]`
- Cards have the CRT glow treatment
- On hover: the card "activates" — slight brightness increase, scanlines intensify

**Projects to feature:**
1. AX-Office.ai — On-prem AI platform (5 production apps)
2. Autonomous AI Trading Bot — Insider signals + Claude Opus portfolio manager
3. GPT-2 from Scratch — 18B token pretraining + instruction tuning
4. Ajax Hackathon — Football kinematics engine + 3D shot viewer
5. ESRGAN with Uncertainty (thesis work)

### 3.2 Blog Index — "Transmission Log"
- Each blog entry styled as a log entry or intercepted transmission
- Date in terminal format: `[2025.11.15]`
- Title + one-line hook
- Tag pills styled as system labels
- Click through to full blog post

### 3.3 Experience — "System History" 
A vertical timeline, but styled as a system changelog or commit log:
```
[2024.07 — PRESENT] aXite Security Tools // AI Engineer
> Built AX-Office.ai...
> Established model evaluation framework...

[2024.04 — 2024.07] Labelfuse // LLM Engineer  
> Architected Text-to-SQL system...
```
Monospace. Minimal. Each entry expands on click/tap for details.

### 3.4 Skills — "Loaded Modules"
Not a grid of logos. Instead:
- A terminal-style display showing "loaded modules":
  ```
  $ sai --modules
  [CORE]     Python, PyTorch, HuggingFace, TensorFlow
  [INFRA]    Docker, Airflow, Terraform, AWS, GCP
  [OPS]      MLflow, W&B, Prometheus, Grafana
  [DATA]     PostgreSQL, DuckDB, MongoDB
  [ACCEL]    Multi-GPU (A100), RunPod, Mixed Precision
  ```
- Maybe a subtle animation where the modules "load in" sequentially

### 3.5 Contact / Signal — "Open Channel"
- Styled as opening a communication channel
- Email, LinkedIn, GitHub links
- Maybe: `> establishing connection...` animation before links appear
- Resume download as a `[download_resume.pdf]` terminal command

---

## Phase 4 — Blog Engine (Day 6–8)

**Goal:** Full MDX-powered blog with the retro aesthetic.

### 4.1 MDX Setup
- Store blogs as `.mdx` files in `src/content/blogs/`
- Use `next-mdx-remote` or `@next/mdx` for rendering
- Custom MDX components that match the CRT aesthetic:
  - Code blocks: styled as terminal windows with green-on-black
  - Tables: retro data-table styling with subtle scanlines
  - Images: wrapped in CRT-style frames
  - Blockquotes: styled as system messages or warnings
  - Callout/aside boxes: amber warning panels

### 4.2 Blog Post Layout
- CRT-framed reading area (max-width for readability)
- Title types out at the top
- Metadata bar: date, reading time, tags
- Table of contents sidebar (desktop) that highlights current section
- Back link: `[← transmissions]`

### 4.3 Convert All 5 Blogs to MDX
- Blog 1: GPT-2 from scratch
- Blog 2: Local LLMs / Shadow AI at aXite
- Blog 3: Ajax Hackathon — Football Kinematics
- Blog 4: AI Trading Bot
- Blog 5: AX-Office.ai deep dive

### 4.4 Blog-specific rich elements
- LaTeX rendering for the kinematics blog (WhipChain formula, angular velocity equation)
- Benchmark tables styled as data readouts
- Image support (we'll need the actual images — placeholder frames for now)

---

## Phase 5 — The Neural Net Visualizations (Day 8–10)

**Goal:** The thing that makes this portfolio a portfolio of an ML engineer, not just a developer.

### 5.1 Animated Loss Curve (Hero background)
- Canvas-based animated line chart
- Simulates a training loss curve descending over time with realistic noise
- Color: neon green line on dark background with subtle glow
- Loops seamlessly
- Very subtle — sits behind hero text at low opacity

### 5.2 Neural Network Graph (Project section background or secondary monitor)
- Small animated graph: nodes arranged in layers, edges pulsing with "data flow"
- Nodes light up in sequence (forward pass visualization)
- Minimal: 3-4 layers, ~20 nodes total
- Canvas or SVG + Framer Motion

### 5.3 Convergence Heatmap (optional)
- A small animated heatmap that shifts colors over time
- Represents attention weights or a confusion matrix converging
- Pure CSS or canvas

These visualizations serve dual purpose:
1. They look incredible as ambient background elements
2. They demonstrate that this person actually understands what these things represent

---

## Phase 6 — Football Easter Egg (Day 10–11)

**Goal:** The second love. Doesn't dominate the site but rewards the curious.

### Ideas (pick 1-2):
- **Formation nav:** On a hidden `/tactics` page or as an easter egg, the projects are arranged in a 4-3-3 or 3-5-2 formation on a pitch diagram. Each "player" is a project/skill.
- **Match-day header:** On days when there's a Champions League or Eredivisie match, a subtle "MATCHDAY" indicator appears somewhere on the site.
- **Konami code:** Entering ↑↑↓↓←→←→BA triggers a brief animation — maybe the entire site flashes in Ajax red/white for a second, or a tiny Ronaldo silhouette does the "SIUU" celebration.
- **Shot analytics teaser:** Since Blog 3 is about football kinematics, embed a small interactive WhipChain gauge or skeleton viewer directly in that blog post.

---

## Phase 7 — Polish & Performance (Day 11–13)

- [ ] Responsive design: CRT bezels adapt for mobile (thinner frames, stacked layout)
- [ ] Page transitions: smooth fade/glitch effect between routes (Framer Motion)
- [ ] SEO: meta tags, Open Graph images (generate a CRT-styled OG image), sitemap
- [ ] Performance: lazy-load visualizations, optimize canvas rendering, ensure <3s LCP
- [ ] Accessibility: ensure all content is keyboard-navigable and screen-reader friendly despite the visual effects (effects are decorative overlays, content underneath is semantic HTML)
- [ ] Dark/light: this site is dark-only. That IS the aesthetic. No toggle needed.
- [ ] 404 page: styled as a "SIGNAL LOST" or "PROCESS NOT FOUND" screen
- [ ] Favicon: tiny CRT monitor or terminal prompt icon

---

## Phase 8 — Go Live (Day 13–14)

- [ ] Final content review: all blogs, project descriptions, experience entries
- [ ] Custom domain setup (if desired) or keep GitHub Pages / Vercel URL
- [ ] Analytics: Vercel Analytics or a privacy-respecting alternative
- [ ] Share and collect feedback
- [ ] Write a "how I built this" blog post (meta, but good content)

---

## Design References & Mood

- Ghost in the Shell (1995) computer interfaces
- Akira (1988) — the lab/computer scenes
- Evangelion NERV terminal screens
- https://poolsuite.net — retro digital aesthetic (different vibe, but the commitment to a theme is the reference)
- Old NASA/JPL mission control rooms
- Lofi beats YouTube streams — the cozy hacker desk setup
- Cowboy Bebop computer interfaces

---

## Non-Negotiables

1. **No generic portfolio templates.** If it looks like it could be any developer's site, we failed.
2. **Content is king.** The aesthetic serves the content, not the other way around. Blogs must be readable. Projects must be clear. The CRT effects enhance, never obstruct.
3. **Performance matters.** Fancy visuals mean nothing if the site takes 5 seconds to load. Canvas animations must be lightweight. CSS effects preferred over JS where possible.
4. **It should feel alive.** Subtle animations everywhere — nothing static. The site should feel like a machine that's running, not a poster on a wall.
5. **Mobile can't be an afterthought.** The CRT frames scale down. The visualizations simplify or hide. The content remains perfect.
