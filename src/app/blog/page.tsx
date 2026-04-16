import Link from "next/link"
import { getAllPostsMeta } from "@/lib/blog"

export default async function BlogPage() {
  const posts = await getAllPostsMeta()

  return (
    <main style={{ minHeight: "100dvh", background: "var(--black-deep)" }} className="px-4 sm:px-8 py-10 sm:py-14">
      <div className="mx-auto max-w-[980px]">
        <p className="text-gray-text text-[10px] tracking-[0.3em] uppercase mb-2">
          TRANSMISSION INDEX
        </p>
        <h1 className="text-cyan-subtle text-2xl sm:text-3xl tracking-[0.12em] uppercase mb-8 text-glow-cyan">
          Writing
        </h1>

        <div className="space-y-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-sm border px-3 sm:px-4 py-3 hover:border-cyan-subtle transition-colors"
              style={{ borderColor: "rgba(0,212,255,0.25)", textDecoration: "none", background: "rgba(3,10,14,0.55)" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-cyan-dim text-[10px] tracking-[0.18em] uppercase">[{post.date}]</p>
                <p className="text-[10px] text-cyan-subtle tracking-widest uppercase">{post.tags.join(" // ")}</p>
              </div>
              <p className="text-white-dim text-[14px] sm:text-[15px] mt-1">{post.title}</p>
              <p className="text-gray-text text-[12px] mt-1">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

