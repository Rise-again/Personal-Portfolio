import { motion } from 'framer-motion'
import { Brain, Compass, LineChart, Layers, Music4, Waves } from 'lucide-react'

import BentoCard, { BentoLabel } from '@/components/ui/BentoCard'
import {
  competencies,
  humanistPoints,
  nowItems,
  philosophy,
  timeline,
  toolStack,
} from '@/data/about'
import { site } from '@/data/site'

const COMPETENCE_ICONS = [Brain, Compass, LineChart]
const HUMANIST_ICONS = { Music4, Waves, Layers }

export default function About() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="score-grid score-mask absolute inset-0 opacity-40" />
        <div className="absolute -left-40 -top-32 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.13),transparent_65%)] blur-3xl" />
        <div className="absolute -right-32 top-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(76,141,255,0.10),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-36">
        <p className="font-mono text-[10px] tracking-[0.4em] text-bronze-300/70">
          ABOUT / 关于
        </p>

        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h1 className="font-display text-display-sm text-ink">简历与思考方式</h1>
          <p className="max-w-md text-pretty text-[14px] leading-relaxed text-ink-muted md:text-right">
            六年的产品实践、一套方法论，以及一个关于音乐的人文角落。
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
          {/* 01 个人档案 */}
          <BentoCard className="flex flex-col lg:col-span-5 lg:row-span-2">
            <BentoLabel index="01">PROFILE</BentoLabel>

            <div className="mt-8 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.4em] text-ink-faint">
                  {site.nameEn.toUpperCase()}
                </p>
                <h2 className="mt-2 font-display text-5xl leading-none text-ink">
                  {site.name}
                </h2>
                <p className="mt-3 text-sm text-ink-muted">{site.role}</p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.18em] text-ink-faint">
                  {site.location}
                </p>
              </div>

              <div aria-hidden="true" className="relative h-14 w-14 shrink-0">
                <div className="absolute inset-0 rounded-full border border-bronze-400/25" />
                <div className="absolute inset-2 rounded-full border border-bronze-400/15" />
                <div className="absolute inset-[38%] rounded-full bg-bronze-400/80 shadow-glow-sm" />
              </div>
            </div>

            <p className="mt-6 text-pretty text-[15px] leading-relaxed text-ink-soft">
              {site.intro}
            </p>

            <div className="mt-auto pt-8">
              <div className="hairline" />
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-bronze-400/25 bg-bronze-400/[0.06] px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-bronze-300" />
                  <span className="font-mono text-[10px] tracking-[0.2em] text-bronze-200/90">
                    OPEN TO COLLABORATION
                  </span>
                </span>
                <a
                  href={`mailto:${site.email}`}
                  className="cursor-pointer rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-ink-muted transition-colors duration-200 hover:border-white/25 hover:text-ink"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </BentoCard>

          {/* 02 核心竞争力 */}
          <BentoCard className="lg:col-span-4" delay={0.05}>
            <BentoLabel index="02">COMPETENCE</BentoLabel>
            <h3 className="mt-5 font-display text-2xl text-ink">核心竞争力矩阵</h3>

            <ul className="mt-6 space-y-5">
              {competencies.map((item, index) => {
                const Icon = COMPETENCE_ICONS[index] ?? Brain
                return (
                  <li key={item.title}>
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 shrink-0 text-bronze-300/80" />
                      <span className="text-sm text-ink">{item.title}</span>
                      <span className="ml-auto font-mono text-[10px] text-ink-faint">
                        {item.score}
                      </span>
                    </div>

                    <div className="mt-2 h-[2px] w-full overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.score}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: 0.2 + index * 0.12,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-bronze-600 to-bronze-300"
                      />
                    </div>

                    <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted">
                      {item.desc}
                    </p>
                  </li>
                )
              })}
            </ul>
          </BentoCard>

          {/* 03 此刻 */}
          <BentoCard className="lg:col-span-3" delay={0.1}>
            <BentoLabel index="03">NOW</BentoLabel>
            <h3 className="mt-5 font-display text-2xl text-ink">此刻</h3>

            <ul className="mt-5 space-y-4">
              {nowItems.map((item) => (
                <li key={item.label}>
                  <p className="font-mono text-[9px] tracking-[0.26em] text-ink-faint">
                    {item.label}
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-ink-soft">
                    {item.value}
                  </p>
                </li>
              ))}
            </ul>
          </BentoCard>

          {/* 04 方法论 */}
          <BentoCard className="lg:col-span-3" delay={0.15}>
            <BentoLabel index="04">PHILOSOPHY</BentoLabel>

            <blockquote className="mt-6 border-l-2 border-bronze-400/40 pl-4">
              <p className="font-display text-[19px] leading-snug text-ink">
                {philosophy.quote}
              </p>
            </blockquote>

            <p className="mt-5 text-[12.5px] leading-relaxed text-ink-muted">
              {philosophy.note}
            </p>
          </BentoCard>

          {/* 05 履历 */}
          <BentoCard className="lg:col-span-4" delay={0.2}>
            <BentoLabel index="05">EXPERIENCE</BentoLabel>

            <ol className="mt-6 space-y-5">
              {timeline.map((item, index) => (
                <li key={item.period} className="relative pl-5">
                  <span className="absolute left-0 top-[7px] h-1.5 w-1.5 rounded-full bg-bronze-400/70" />
                  {index < timeline.length - 1 && (
                    <span className="absolute left-[2.5px] top-4 h-full w-px bg-white/[0.08]" />
                  )}

                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-sm text-ink">{item.role}</p>
                    <span className="whitespace-nowrap font-mono text-[9px] tracking-[0.1em] text-ink-faint">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[12px] text-ink-muted">{item.org}</p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-muted">
                    {item.desc}
                  </p>
                </li>
              ))}
            </ol>
          </BentoCard>

          {/* 06 人文角落 */}
          <BentoCard className="lg:col-span-7" delay={0.05}>
            <BentoLabel index="06">HUMANIST</BentoLabel>
            <h3 className="mt-5 font-display text-2xl text-ink">古典音乐教我的产品课</h3>

            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {humanistPoints.map((point) => {
                const Icon = HUMANIST_ICONS[point.icon] ?? Music4
                return (
                  <div key={point.title}>
                    <Icon className="h-4 w-4 text-bronze-300/80" />
                    <p className="mt-2.5 text-sm text-ink">{point.title}</p>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-muted">
                      {point.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </BentoCard>

          {/* 07 工具箱 */}
          <BentoCard className="lg:col-span-5" delay={0.1}>
            <BentoLabel index="07">TOOLKIT</BentoLabel>
            <h3 className="mt-5 font-display text-2xl text-ink">日常工具箱</h3>

            <ul className="mt-6 flex flex-wrap gap-2">
              {toolStack.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] text-ink-soft transition-colors duration-200 hover:border-bronze-400/30 hover:text-bronze-200"
                >
                  {tool}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[12.5px] leading-relaxed text-ink-muted">
              工具会换，判断力不会。选工具的标准只有一个：它是否让我更快地接触到真实反馈。
            </p>
          </BentoCard>
        </div>
      </div>
    </section>
  )
}
