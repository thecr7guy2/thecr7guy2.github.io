import Link from "next/link"
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog"

type BlogPageParams = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function BlogPostPage({ params }: BlogPageParams) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  return (
    <main style={{ minHeight: "100dvh", background: "var(--black-deep)" }} className="px-4 sm:px-8 py-10 sm:py-14">
      <article className="mx-auto max-w-[900px] rounded-md border p-4 sm:p-6" style={{ borderColor: "rgba(0,212,255,0.25)", background: "rgba(4,9,13,0.72)" }}>
        <Link href="/blog" className="inline-block mb-4 text-cyan-dim text-[11px] tracking-[0.16em] uppercase hover:text-cyan-subtle transition-colors" style={{ textDecoration: "none" }}>
          [← transmissions]
        </Link>

        <h1 className="text-cyan-subtle text-2xl sm:text-3xl tracking-[0.08em] mb-2">{post.title}</h1>
        <p className="text-gray-text text-[11px] tracking-[0.15em] uppercase mb-6">
          [{post.date}] {post.tags.length > 0 ? `// ${post.tags.join(" // ")}` : ""}
        </p>

        <div className="blog-mdx text-white-dim">
          {post.content}
        </div>
      </article>
    </main>
  )
}

