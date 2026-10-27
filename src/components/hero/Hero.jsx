import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { BookOpen, Coffee, Download } from 'lucide-react'

import Button from '@/components/ui/Button'
import VinylDisc from '@/components/hero/VinylDisc'
import Ticker from '@/components/hero/Ticker'
import { fadeUp, popIn, stagger } from '@/lib/motion'
import { heroStats, site } from '@/data/site'

export default function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()

  // 背景比内容慢半拍，滚动时形成轻微的纵深错位
  const backdropY = useTransform(scrollY, [0, 700], [0, 90])
  const vinylY = useTransform(scrollY, [0, 700], [0, 38])

  const initial = reduce ? false : 'hidden'

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* 背景层 */}
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y: backdropY }}
        className="pointer-events-none absolute -inset-y-[12%] inset-x-0"
      >
        <div className="score-grid score-mask absolute inset-0 opacity-70" />
        <div className="noise-overlay absolute inset-0 opacity-[0.04] mix-blend-overlay" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-obsidian-900 via-obsidian-900/60 to-transparent" />
      </motion.div>

      {/* 主内容 */}
      <div className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-16 px-6 pb-24 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-20 lg:pt-28">
        <motion.div variants={stagger} initial={initial} animate="show">
          {/* 状态徽标 */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-bronze-400/25 bg-bronze-400/[0.06] px-3 py-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bronze-300/70 motion-reduce:animate-none" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-bronze-300" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.24em] text-bronze-200/90">
                OPEN TO COLLABORATION
              </span>
            </span>
          </motion.div>

          {/* 姓名 */}
          <motion.div variants={fadeUp} className="mt-8">
            <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.42em] text-ink-muted">
              <span className="h-px w-8 bg-gradient-to-r from-bronze-400/70 to-transparent" />
              {site.greeting}
            </p>

            <h1 className="mt-3 text-balance">
              <span className="block font-display text-display-lg text-gradient-gold drop-shadow-[0_0_60px_rgba(212,175,55,0.12)]">
                {site.nameEn}
              </span>
              <span className="mt-3 block font-display text-2xl tracking-[0.18em] text-ink-soft sm:text-[26px]">
                {site.name}
              </span>
            </h1>
          </motion.div>

          {/* 身份 */}
          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-soft"
          >
            {site.roles.map((role, index) => (
              <span key={role} className="flex items-center gap-3">
                {index > 0 && (
                  <span className="h-1 w-1 rounded-full bg-bronze-400/60" />
                )}
                <span>{role}</span>
              </span>
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-lg text-pretty text-[15px] leading-relaxed text-ink-muted"
          >
            {site.intro}
          </motion.p>

          {/* 行动按钮 */}
          <motion.div
            variants={fadeUp}
            className="mt-9 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center"
          >
            <Button to="/notes" size="lg" icon={BookOpen} iconPosition="left">
              浏览文章
            </Button>
            <Button
              href={site.resumeUrl}
              download
              size="lg"
              variant="outline"
              icon={Download}
              iconPosition="left"
            >
              下载简历
            </Button>
            <Button
              to="/connect"
              size="lg"
              variant="ghost"
              icon={Coffee}
              iconPosition="left"
              className="col-span-2 sm:col-span-1"
            >
              与我交友
            </Button>
          </motion.div>

          {/* 数据条 */}
          <motion.div variants={fadeUp} className="mt-12 max-w-md">
            <div className="hairline" />
            <ul className="mt-6 flex items-center gap-8 sm:gap-12">
              {heroStats.map((stat) => (
                <li key={stat.label} className="flex flex-col">
                  <span className="font-display text-3xl leading-none text-ink">
                    {stat.value}
                  </span>
                  <span className="mt-2 font-mono text-[10px] tracking-[0.2em] text-ink-muted">
                    {stat.label}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* 黑胶视觉 */}
        <motion.div
          style={reduce ? undefined : { y: vinylY }}
          className="relative mx-auto w-full max-w-[380px] lg:mx-0 lg:ml-auto lg:mr-4 lg:max-w-[420px]"
        >
          <motion.div variants={popIn} initial={initial} animate="show">
            <VinylDisc />
          </motion.div>
        </motion.div>
      </div>

      <Ticker />
    </section>
  )
}
