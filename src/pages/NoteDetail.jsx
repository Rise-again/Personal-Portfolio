import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import Markdown from '@/components/notes/Markdown'
import TableOfContents from '@/components/notes/TableOfContents'
import {
  extractHeadings,
  getAdjacentPosts,
  getPostBySlug,
  loadPostBody,
} from '@/lib/posts'

export default function NoteDetail() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    setLoading(true)
    setBody('')

    if (!post) {
      setLoading(false)
      return undefined
    }

    loadPostBody(post.slug).then((text) => {
      if (!active) return
      setBody(text ?? '')
      setLoading(false)
    })

    return () => {
      active = false
    }
  }, [post?.slug])

  const headings = useMemo(() => (body ? extractHeadings(body) : []), [body])

  if (!post) {
    return (
      <section className="mx-auto flex min-h-[70svh] max-w-3xl flex-col justify-center px-6 py-32">
        <p className="font-mono text-[10px] tracking-[0.4em] text-bronze-300/70">
          NOTE NOT FOUND
        </p>
        <h1 className="mt-4 font-display text-display-sm text-ink">这篇笔记不存在</h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">
          它可能被重写过，或者从未被写下。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/notes"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-bronze-400/35 px-5 py-2.5 text-sm text-bronze-200 transition-colors duration-200 hover:border-bronze-400/70 hover:bg-bronze-400/[0.08]"
          >
            <ArrowLeft className="h-4 w-4" />
            返回笔记列表
          </Link>
        </div>
      </section>
    )
  }

  const { newer, older } = getAdjacentPosts(post.slug)

  return (
    <article className="relative isolate">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="score-grid score-mask absolute inset-0 opacity-25" />
        <div className="absolute -left-32 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.10),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl justify-center gap-12 px-6 pb-24 pt-32">
        <div className="w-full min-w-0 max-w-[42rem]">
          <Link
            to="/notes"
            className="group inline-flex cursor-pointer items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-ink-faint transition-colors duration-200 hover:text-bronze-200"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            BACK TO NOTES
          </Link>

          <ul className="mt-8 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] text-ink-muted"
              >
                {tag}
              </li>
            ))}
          </ul>

          <h1 className="mt-4 text-balance font-display text-[34px] leading-[1.15] text-ink sm:text-[44px]">
            {post.title}
          </h1>

          {post.summary && (
            <p className="mt-4 text-pretty text-[15px] leading-relaxed text-ink-muted">
              {post.summary}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10px] tracking-[0.16em] text-ink-faint">
            <span>{post.displayDate}</span>
            <span className="h-1 w-1 rounded-full bg-ink-faint/50" />
            <span>{post.readingMinutes} MIN READ</span>
            <span className="h-1 w-1 rounded-full bg-ink-faint/50" />
            <span>{post.wordCount} 字</span>
          </div>

          <div className="hairline mt-8" />

          <div className="mt-10">
            {loading ? (
              <div className="space-y-4" aria-hidden="true">
                <div className="h-3 w-2/3 animate-pulse rounded-full bg-white/[0.05]" />
                <div className="h-3 w-full animate-pulse rounded-full bg-white/[0.05]" />
                <div className="h-3 w-5/6 animate-pulse rounded-full bg-white/[0.05]" />
              </div>
            ) : (
              <Markdown>{body}</Markdown>
            )}
          </div>

          <nav
            aria-label="相邻文章"
            className="mt-20 grid gap-4 border-t border-white/[0.07] pt-8 sm:grid-cols-2"
          >
            {older ? (
              <Link
                to={`/notes/${older.slug}`}
                className="group rounded-2xl border border-white/[0.07] p-5 transition-all duration-300 hover:border-bronze-400/25 hover:bg-white/[0.03]"
              >
                <span className="flex items-center gap-2 font-mono text-[9px] tracking-[0.24em] text-ink-faint">
                  <ArrowLeft className="h-3 w-3" /> 上一篇
                </span>
                <p className="mt-2 font-display text-lg leading-snug text-ink transition-colors duration-300 group-hover:text-bronze-100">
                  {older.title}
                </p>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}

            {newer ? (
              <Link
                to={`/notes/${newer.slug}`}
                className="group rounded-2xl border border-white/[0.07] p-5 text-left transition-all duration-300 hover:border-bronze-400/25 hover:bg-white/[0.03] sm:text-right"
              >
                <span className="flex items-center gap-2 font-mono text-[9px] tracking-[0.24em] text-ink-faint sm:justify-end">
                  下一篇 <ArrowRight className="h-3 w-3" />
                </span>
                <p className="mt-2 font-display text-lg leading-snug text-ink transition-colors duration-300 group-hover:text-bronze-100">
                  {newer.title}
                </p>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
          </nav>
        </div>

        <aside className="hidden w-52 shrink-0 xl:block">
          <div className="sticky top-28">
            <TableOfContents headings={headings} />
          </div>
        </aside>
      </div>
    </article>
  )
}
