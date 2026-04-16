import { promises as fs } from "fs"
import path from "path"
import { cache } from "react"
import { compileMDX } from "next-mdx-remote/rsc"
import { notFound } from "next/navigation"

const BLOG_DIR = path.join(process.cwd(), "src/content/blogs")

export interface BlogFrontmatter {
  title: string
  date: string
  excerpt: string
  tags?: string[] | string
}

export interface BlogMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
}

export interface BlogPost extends BlogMeta {
  content: React.ReactNode
}

function normalizeTags(input?: string[] | string): string[] {
  if (!input) return []
  if (Array.isArray(input)) return input.map((tag) => tag.trim()).filter(Boolean)
  return input
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
}

function parseFrontmatterBlock(source: string): Record<string, string> {
  const match = source.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}

  const out: Record<string, string> = {}
  for (const line of match[1].split("\n")) {
    if (!line.includes(":")) continue
    const [key, ...rest] = line.split(":")
    const value = rest.join(":").trim().replace(/^["']|["']$/g, "")
    out[key.trim()] = value
  }
  return out
}

function toMeta(slug: string, source: string): BlogMeta {
  const fm = parseFrontmatterBlock(source)
  return {
    slug,
    title: fm.title ?? slug,
    date: fm.date ?? "1970-01-01",
    excerpt: fm.excerpt ?? "",
    tags: normalizeTags(fm.tags),
  }
}

export const getAllPostsMeta = cache(async (): Promise<BlogMeta[]> => {
  let files: string[] = []
  try {
    files = await fs.readdir(BLOG_DIR)
  } catch {
    return []
  }

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "")
        const fullPath = path.join(BLOG_DIR, file)
        const source = await fs.readFile(fullPath, "utf8")
        return toMeta(slug, source)
      }),
  )

  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date))
})

export const getAllPostSlugs = cache(async (): Promise<string[]> => {
  const posts = await getAllPostsMeta()
  return posts.map((post) => post.slug)
})

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  let source: string

  try {
    source = await fs.readFile(filePath, "utf8")
  } catch {
    notFound()
  }

  const { content, frontmatter } = await compileMDX<BlogFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
    },
  })

  return {
    slug,
    title: frontmatter.title ?? slug,
    date: frontmatter.date ?? "1970-01-01",
    excerpt: frontmatter.excerpt ?? "",
    tags: normalizeTags(frontmatter.tags),
    content,
  }
}

