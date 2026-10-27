import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, BookOpen, Coffee, Footprints, Github, Mail, Music4, Sparkles } from 'lucide-react'

import Button from '@/components/ui/Button'
import { EASE, fadeUp, stagger } from '@/lib/motion'
import {
  education,
  experience,
  honors,
  interests,
  jobTarget,
  lastUpdated,
  nowDoing,
  profile,
  projects,
  skills,
} from '@/data/resume'

const INTEREST_ICONS = { Music4, Coffee, Footprints, BookOpen }

function Section({ label, en, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE }}
      className="grid gap-6 border-t border-white/[0.08] pt-10 md:grid-cols-[180px_1fr] md:gap-12"
    >
      <div>
        <h2 className="font-display text-[17px] leading-none text-ink">{label}</h2>
        <p className="mt-2 font-mono text-[9px] tracking-[0.24em] text-ink-faint">{en}</p>
      </div>
      <div>{children}</div>
    </motion.section>
  )
}

function Portrait() {
  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/[0.08] bg-[radial-gradient(circle_at_50%_28%,rgba(212,175,55,0.12),transparent_70%)] md:aspect-[4/5]">
        <div className="score-grid absolute inset-0 opacity-40" />

        <div className="absolute inset-0 grid place-items-center">
          <span className="font-display text-[96px] leading-none text-bronze-300/25">
            {profile.monogram}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-obsidian-900/90 to-transparent p-4">
          <span className="font-mono text-[9px] tracking-[0.22em] text-ink-faint">
            PORTRAIT
          </span>
          <span className="font-mono text-[9px] tracking-[0.22em] text-ink-faint">
            {profile.nameEn.toUpperCase()}
          </span>
        </div>
      </div>

      <p className="mt-4 flex items-center gap-2 text-[12.5px] text-ink-muted">
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bronze-300/60 motion-reduce:animate-none" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-bronze-300" />
        </span>
        可实习 · {jobTarget.available} · {jobTarget.cities.join(' / ')}
      </p>
    </div>
  )
}

export default function About() {
  const reduce = useReducedMotion()
  const initial = reduce ? false : 'hidden'

  const facts = [
    { label: '现状', value: `${education.school} · ${education.major} · 大三` },
    { label: '求职意向', value: `${jobTarget.role} · ${jobTarget.type}` },
    { label: '关注方向', value: profile.focusAreas.join('、') },
  ]

  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="score-grid score-mask pointer-events-none absolute inset-0 opacity-25"
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-36">
        <motion.div variants={stagger} initial={initial} animate="show">
          <motion.p
            variants={fadeUp}
            className="font-mono text-[10px] tracking-[0.4em] text-bronze-300/70"
          >
            ABOUT / 关于
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-[clamp(2.8rem,6.5vw,4.6rem)] leading-[0.95] text-gradient-gold"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-pretty text-[17px] leading-[1.85] text-ink-soft"
          >
            {profile.pitch}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-12 grid gap-10 md:grid-cols-[220px_1fr] md:gap-16"
          >
            <Portrait />

            <div className="flex flex-col">
              <dl className="space-y-7">
                {facts.map((item) => (
                  <div key={item.label} className="grid gap-1 sm:grid-cols-[88px_1fr] sm:gap-5">
                    <dt className="font-mono text-[10px] tracking-[0.16em] text-ink-faint">
                      {item.label}
                    </dt>
                    <dd className="text-[14.5px] leading-relaxed text-ink">{item.value}</dd>
                  </div>
                ))}

                <div className="grid gap-1 sm:grid-cols-[88px_1fr] sm:gap-5">
                  <dt className="font-mono text-[10px] tracking-[0.16em] text-ink-faint">
                    联系方式
                  </dt>
                  <dd className="flex items-center gap-4">
                    <a
                      href={`mailto:${profile.email}`}
                      aria-label="发送邮件"
                      className="text-ink-muted transition-colors duration-200 hover:text-bronze-200"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="GitHub"
                      className="text-ink-muted transition-colors duration-200 hover:text-bronze-200"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="mt-auto pt-10">
                <Button to="/connect" size="lg" icon={ArrowUpRight}>
                  联系我
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-20 space-y-12">
          <Section label="经历" en="EXPERIENCE">
            <div className="divide-y divide-white/[0.07]">
              {experience.map((item) => (
                <div
                  key={item.period}
                  className="grid gap-1 py-5 first:pt-0 md:grid-cols-[130px_1fr] md:gap-8"
                >
                  <span className="font-mono text-[10.5px] tracking-[0.1em] text-ink-faint">
                    {item.period}
                  </span>
                  <div>
                    <p className="text-[15px] text-ink">
                      {item.role}
                      <span className="text-ink-muted"> · {item.org}</span>
                    </p>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-muted">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section label="项目" en="SELECTED WORK">
            <ul className="divide-y divide-white/[0.07]">
              {projects.map((project, index) => (
                <li key={project.name} className="py-5 first:pt-0">
                  <a
                    href={project.href || undefined}
                    target={project.href ? '_blank' : undefined}
                    rel={project.href ? 'noreferrer noopener' : undefined}
                    className="group grid gap-1 md:grid-cols-[130px_1fr] md:gap-8"
                  >
                    <span className="font-mono text-[10px] text-ink-faint">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <p className="text-[15px] text-ink transition-colors duration-300 group-hover:text-bronze-100">
                          {project.name}
                        </p>
                        <p className="mt-1 text-[13.5px] leading-relaxed text-ink-muted">
                          {project.summary}
                        </p>
                        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-ink-faint">
                          {project.highlights.map((item) => (
                            <span key={item}>{item}</span>
                          ))}
                        </p>
                      </div>

                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-ink-faint transition-all duration-300 ease-silk group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bronze-300" />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </Section>

          <Section label="教育" en="EDUCATION">
            <div className="grid gap-1 md:grid-cols-[130px_1fr] md:gap-8">
              <span className="font-mono text-[10.5px] tracking-[0.1em] text-ink-faint">
                {education.period}
              </span>
              <div>
                <p className="text-[15px] text-ink">
                  {education.school}
                  <span className="text-ink-muted">
                    {' '}
                    · {education.major} · {education.degree}
                  </span>
                </p>
                <p className="mt-1.5 font-mono text-[11px] tracking-[0.08em] text-bronze-200/80">
                  GPA {education.gpa}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {education.courses.map((course) => (
                    <li
                      key={course}
                      className="rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[10px] text-ink-muted"
                    >
                      {course}
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 space-y-2 border-t border-white/[0.06] pt-4">
                  {honors.map((item) => (
                    <li
                      key={item.title}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <span className="text-[13px] text-ink-soft">
                        {item.title}
                        {item.detail && (
                          <span className="text-ink-muted"> · {item.detail}</span>
                        )}
                      </span>
                      <span className="shrink-0 font-mono text-[10px] text-ink-faint">
                        {item.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          <Section label="技术栈" en="FOCUS">
            <div className="space-y-4">
              {skills.map((group) => (
                <div
                  key={group.group}
                  className="grid gap-1 md:grid-cols-[130px_1fr] md:gap-8"
                >
                  <span className="font-mono text-[10px] tracking-[0.14em] text-ink-faint">
                    {group.group}
                  </span>
                  <p className="text-[13.5px] leading-relaxed text-ink-soft">
                    {group.items.join('、')}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section label="此刻" en="NOW">
            <div className="space-y-8">
              <div className="space-y-3">
                {nowDoing.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-1 md:grid-cols-[130px_1fr] md:gap-8"
                  >
                    <span className="font-mono text-[10px] tracking-[0.14em] text-ink-faint">
                      {item.label}
                    </span>
                    <p className="text-[13.5px] leading-relaxed text-ink-soft">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <ul className="grid gap-x-8 gap-y-3 border-t border-white/[0.06] pt-6 sm:grid-cols-2">
                {interests.map((item) => {
                  const Icon = INTEREST_ICONS[item.icon] ?? Sparkles
                  return (
                    <li key={item.title} className="flex items-start gap-2.5">
                      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-bronze-300/70" />
                      <span className="text-[13px] text-ink-soft">
                        {item.title}
                        <span className="text-ink-faint"> — {item.note}</span>
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </Section>

          <Section label="签名" en="SIGNATURE">
            <div>
              <blockquote className="text-balance font-display text-2xl leading-snug text-ink sm:text-[30px]">
                「{profile.signature}」
              </blockquote>

              <svg viewBox="0 0 240 12" className="mt-3 h-3 w-48" fill="none" aria-hidden="true">
                <motion.path
                  d="M2 8 C 60 2, 120 12, 238 5"
                  stroke="rgba(212,175,55,0.65)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: EASE }}
                />
              </svg>

              <p className="mt-4 font-mono text-[9px] tracking-[0.24em] text-ink-faint">
                {profile.nameEn.toUpperCase()} · 最后更新 {lastUpdated}
              </p>
            </div>
          </Section>
        </div>
      </div>
    </section>
  )
}
