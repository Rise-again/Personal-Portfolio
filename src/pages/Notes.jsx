import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import NoteCard from '@/components/notes/NoteCard'
import { fadeUp, stagger } from '@/lib/motion'
import { cn } from '@/lib/cn'
import { getAllPosts, getAllTags } from '@/lib/posts'

const ALL = '全部'

function FilterPill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'cursor-pointer rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-[0.04em] transition-all duration-200',
        active
          ? 'border-bronze-400/50 bg-bronze-400/[0.10] text-bronze-200'
          : 'border-white/[0.08] text-ink-muted hover:border-white/20 hover:text-ink'
      )}
    >
      {children}
    </button>
  )
}

export default function Notes() {
  const posts = getAllPosts()
  const tagCounts = getAllTags()
  const [active, setActive] = useState(ALL)
  const reduce = useReducedMotion()
  const initial = reduce ? false : 'hidden'

  const filtered = useMemo(
    () =>
      active === ALL ? posts : posts.filter((post) => post.tags.includes(active)),
    [active, posts]
  )

  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="score-grid score-mask absolute inset-0 opacity-30" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-36">
        <motion.div variants={stagger} initial={initial} animate="show">
          <motion.p
            variants={fadeUp}
            className="font-mono text-[10px] tracking-[0.4em] text-bronze-300/70"
          >
            NOTES / 笔记
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <h1 className="font-display text-display-sm text-ink">学习笔记与文章</h1>
            <p className="max-w-md text-pretty text-[14px] leading-relaxed text-ink-muted md:text-right">
              关于 AI、产品方法论与古典音乐。全部由 Markdown 驱动，没有后台。
            </p>
          </motion.div>
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center gap-2">
          <FilterPill active={active === ALL} onClick={() => setActive(ALL)}>
            全部 <span className="ml-1 text-ink-faint">{posts.length}</span>
          </FilterPill>

          {tagCounts.map(([tag, count]) => (
            <FilterPill
              key={tag}
              active={active === tag}
              onClick={() => setActive(tag)}
            >
              {tag} <span className="ml-1 text-ink-faint">{count}</span>
            </FilterPill>
          ))}
        </div>

        <div className="hairline mt-8" />

        {filtered.length === 0 ? (
          <p className="mt-16 text-sm text-ink-muted">这个标签下还没有文章。</p>
        ) : (
          <motion.div layout className="mt-10 space-y-6">
            <motion.div
              key={filtered[0].slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <NoteCard post={filtered[0]} featured />
            </motion.div>

            {filtered.length > 1 && (
              <div className="grid gap-6 sm:grid-cols-2">
                {filtered.slice(1).map((post) => (
                  <motion.div
                    key={post.slug}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NoteCard post={post} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
