import { promises as fs } from "fs"
import path from "path"
import { cache } from "react"

export interface ResumeProject {
  name: string
  tech: string
  year?: string
  bullets: string[]
}

export interface ResumeSkillGroup {
  group: string
  items: string[]
}

export interface ResumeContact {
  email?: string
  linkedin?: string
  github?: string
  phone?: string
}

export interface ResumeData {
  contact: ResumeContact
  summary: string
  projects: ResumeProject[]
  skills: ResumeSkillGroup[]
}

const RESUME_PATH = path.join(process.cwd(), "src/content/resume.md")

function section(markdown: string, title: string): string {
  const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const re = new RegExp(`##\\s+${escaped}\\s*\\n([\\s\\S]*?)(?=\\n##\\s+|$)`)
  const match = markdown.match(re)
  return match?.[1]?.trim() ?? ""
}

function parseContact(markdown: string): ResumeContact {
  const email = markdown.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0]
  const urls = Array.from(markdown.matchAll(/https?:\/\/[^\s)]+/g)).map((m) => m[0])
  const phone = markdown.match(/\+?[0-9][0-9\s-]{7,}/)?.[0]?.trim()

  const linkedin = urls.find((u) => u.includes("linkedin.com"))
  const github = urls.find((u) => u.includes("github.com"))

  return { email, linkedin, github, phone }
}

function parseSummary(markdown: string): string {
  const raw = section(markdown, "Professional Summary")
  return raw.split("\n").map((line) => line.trim()).filter(Boolean).join(" ")
}

function parseProjects(markdown: string): ResumeProject[] {
  const raw = section(markdown, "Projects")
  if (!raw) return []

  const chunks = raw.split(/^###\s+/m).map((c) => c.trim()).filter(Boolean)
  return chunks.map((chunk) => {
    const [nameLine, ...rest] = chunk.split("\n")
    const body = rest.join("\n")
    const tech = body.match(/\*\*Tech:\*\*\s*(.+)/)?.[1]?.trim() ?? "N/A"
    const year = body.match(/\*\*Year:\*\*\s*(.+)/)?.[1]?.trim()
    const bullets = Array.from(body.matchAll(/^- (.+)$/gm)).map((m) => m[1].trim())
    return {
      name: nameLine.trim(),
      tech,
      year,
      bullets,
    }
  })
}

function parseSkills(markdown: string): ResumeSkillGroup[] {
  const raw = section(markdown, "Technical Skills")
  if (!raw) return []

  const groups: ResumeSkillGroup[] = []
  for (const line of raw.split("\n")) {
    const match = line.match(/^\*\*(.+?):\*\*\s*(.+)$/)
    if (!match) continue
    groups.push({
      group: match[1].trim().toUpperCase(),
      items: match[2].split(",").map((item) => item.trim()).filter(Boolean),
    })
  }
  return groups
}

export const getResumeData = cache(async (): Promise<ResumeData> => {
  const markdown = await fs.readFile(RESUME_PATH, "utf8")
  return {
    contact: parseContact(markdown),
    summary: parseSummary(markdown),
    projects: parseProjects(markdown),
    skills: parseSkills(markdown),
  }
})

