import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

import useSpotlight from '@/hooks/useSpotlight'
import { cn } from '@/lib/cn'

export default function NoteCard({ post, featured = false }) {
  const { ref, onMouseMove } = useSpotlight()

  return (
    <Link
      ref={ref}
      onMouseMove={onMouseMove}
      to={`/notes/${post.slug}`}
      className={cn(
        'spotlight group relative block overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025] transition-all duration-300 ease-silk hover:border-bronze-400/25 hover:bg-white/[0.045]',
        featured ? 'p-7 md:p-9' : 'p-6'
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.14),transparent_65%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative">
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em] text-ink-faint">
          <span>{post.displayDate}</span>
          <span>{post.readingMinutes} MIN READ</span>
        </div>

        <h3
          className={cn(
            'mt-4 font-display leading-tight text-ink transition-colors duration-300 group-hover:text-bronze-100',
            featured ? 'text-3xl md:text-[40px]' : 'text-2xl'
          )}
        >
          {post.title}
        </h3>

        <p
          className={cn(
            'mt-3 text-ink-muted',
            featured
              ? 'max-w-2xl text-[15px] leading-relaxed'
              : 'line-clamp-2 text-[13.5px] leading-relaxed'
          )}
        >
          {post.summary}
        </p>

        <div className="mt-6 flex items-end justify-between gap-4">
          <ul className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] text-ink-muted"
              >
                {tag}
              </li>
            ))}
          </ul>

          <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-faint transition-all duration-300 ease-silk group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bronze-300" />
        </div>
      </div>
    </Link>
  )
}
