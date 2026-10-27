import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'

import BentoCard from '@/components/ui/BentoCard'
import ProjectGlyph from '@/components/portfolio/ProjectGlyph'
import { fadeUp, stagger } from '@/lib/motion'
import { projects } from '@/data/projects'
import { cn } from '@/lib/cn'

const SIZES = {
  hero: 'flex flex-col lg:col-span-7 lg:row-span-2 min-h-[380px]',
  wide: 'flex flex-col lg:col-span-5 min-h-[220px]',
  third: 'flex flex-col lg:col-span-4 min-h-[260px]',
}

const GLYPH_POSITION = {
  hero: 'absolute -bottom-24 -right-20 h-[360px] w-[360px]',
  wide: 'absolute -right-10 -top-10 h-52 w-52',
  third: 'absolute -right-12 -top-12 h-44 w-44',
}

export default function Portfolio() {
  const reduce = useReducedMotion()
  const initial = reduce ? false : 'hidden'

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
            WORK / 作品
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <h1 className="font-display text-display-sm text-ink">产品与实验</h1>
            <p className="max-w-md text-pretty text-[14px] leading-relaxed text-ink-muted md:text-right">
              六个从 0 到 1 的项目：产品 MVP、开源工具、深度拆解，以及一些纯粹好玩的实验。
            </p>
          </motion.div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
          {projects.map((project, index) => (
            <BentoCard
              key={project.id}
              href={project.href}
              delay={Math.min(index * 0.05, 0.25)}
              className={SIZES[project.size]}
            >
              <ProjectGlyph
                variant={project.glyph}
                className={GLYPH_POSITION[project.size]}
              />

              <div className="relative flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-ink-faint">
                  <span className="text-bronze-300/70">{project.category}</span>
                  <span className="h-1 w-1 rounded-full bg-ink-faint/40" />
                  {project.year}
                </span>

                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/[0.08] text-ink-faint transition-all duration-300 ease-silk group-hover:border-bronze-400/40 group-hover:text-bronze-200">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <h2
                className={cn(
                  'relative mt-6 text-balance font-display leading-tight text-ink transition-colors duration-300 group-hover:text-bronze-100',
                  project.size === 'hero'
                    ? 'text-3xl sm:text-4xl lg:text-[44px]'
                    : 'text-2xl'
                )}
              >
                {project.title}
              </h2>

              <p
                className={cn(
                  'relative mt-3 text-ink-muted',
                  project.size === 'hero'
                    ? 'max-w-md text-[14.5px] leading-relaxed'
                    : 'text-[13px] leading-relaxed'
                )}
              >
                {project.value}
              </p>

              <div className="relative mt-auto pt-8">
                {project.metric && (
                  <p className="mb-3 font-mono text-[11px] tracking-[0.12em] text-bronze-200/80">
                    {project.metric}
                  </p>
                )}

                <ul className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-ink-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </BentoCard>
          ))}
        </div>

        <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-5 sm:flex-row sm:items-center">
          <p className="text-sm text-ink-muted">
            还有一些没整理成案例的实验，散落在 GitHub 上。
          </p>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex cursor-pointer items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-ink-soft transition-colors duration-200 hover:text-bronze-200"
          >
            <Github className="h-4 w-4" />
            查看全部开源项目
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
