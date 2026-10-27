import { motion, useReducedMotion } from 'framer-motion'
import {
  BookOpen,
  Coffee,
  Download,
  Footprints,
  Github,
  Mail,
  MapPin,
  Music4,
  Sparkles,
} from 'lucide-react'

import Button from '@/components/ui/Button'
import useSpotlight from '@/hooks/useSpotlight'
import { EASE, fadeUp, stagger } from '@/lib/motion'
import {
  basics,
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

function Section({ index, title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[10px] tracking-[0.2em] text-bronze-300/60">
          {index}
        </span>
        <h2 className="font-display text-2xl text-ink">{title}</h2>
        <span className="hairline flex-1 self-center" />
      </div>
      <div className="mt-6">{children}</div>
    </motion.section>
  )
}

function Sidebar() {
  const { ref, onMouseMove } = useSpotlight()

  return (
    <aside className="lg:col-span-4 xl:col-span-3">
      <div className="lg:sticky lg:top-28">
        <div
          ref={ref}
          onMouseMove={onMouseMove}
          className="spotlight relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6 backdrop-blur-xl"
        >
          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-bronze-400/30 bg-bronze-400/[0.08] font-display text-2xl text-bronze-200">
                {profile.monogram}
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[9px] tracking-[0.28em] text-ink-faint">
                  {profile.nameEn.toUpperCase()}
                </p>
                <h2 className="mt-1 font-display text-2xl leading-none text-ink">
                  {profile.name}
                </h2>
              </div>
            </div>

            <p className="mt-5 text-sm text-ink-soft">{profile.headline}</p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-bronze-200/80">
              {profile.focus}
            </p>

            <div className="hairline mt-6" />

            <dl className="mt-5 space-y-2.5">
              {basics.map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between gap-4"
                >
                  <dt className="font-mono text-[10px] tracking-[0.18em] text-ink-faint">
                    {item.label}
                  </dt>
                  <dd className="text-right text-[13px] text-ink-soft">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="hairline mt-6" />

            <div className="mt-5 space-y-2.5">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2.5 text-[13px] text-ink-soft transition-colors duration-200 hover:text-bronze-200"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 text-bronze-300/70" />
                <span className="truncate font-mono text-[11px]">{profile.email}</span>
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2.5 text-[13px] text-ink-soft transition-colors duration-200 hover:text-bronze-200"
              >
                <Github className="h-3.5 w-3.5 shrink-0 text-bronze-300/70" />
                <span className="truncate font-mono text-[11px]">GitHub</span>
              </a>

              <p className="flex items-center gap-2.5 text-ink-soft">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-bronze-300/70" />
                <span className="font-mono text-[11px]">{profile.location}</span>
              </p>
            </div>

            <Button
              href="/resume.pdf"
              download
              size="md"
              icon={Download}
              iconPosition="left"
              className="mt-6 w-full"
            >
              下载简历 PDF
            </Button>
          </div>
        </div>

        <p className="mt-4 text-center font-mono text-[9px] tracking-[0.2em] text-ink-faint">
          最后更新 {lastUpdated}
        </p>
      </div>
    </aside>
  )
}

function ProjectItem({ project }) {
  const inner = (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-xl text-ink transition-colors duration-300 group-hover:text-bronze-100">
          {project.name}
        </h3>
        <span className="font-mono text-[10px] tracking-[0.12em] text-ink-faint">
          {project.role} · {project.period}
        </span>
      </div>

      <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
        {project.summary}
      </p>

      <ul className="mt-3 space-y-1">
        {project.highlights.map((item) => (
          <li key={item} className="flex gap-2.5 text-[12.5px] leading-relaxed text-ink-soft">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-bronze-400/70" />
            {item}
          </li>
        ))}
      </ul>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-ink-muted"
          >
            {tag}
          </li>
        ))}
      </ul>
    </>
  )

  const className =
    'group block rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-colors duration-300 hover:border-bronze-400/25 hover:bg-white/[0.04]'

  if (!project.href) {
    return <div className={className}>{inner}</div>
  }

  return (
    <a href={project.href} target="_blank" rel="noreferrer noopener" className={className}>
      {inner}
    </a>
  )
}

export default function About() {
  const reduce = useReducedMotion()
  const initial = reduce ? false : 'hidden'

  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="score-grid score-mask pointer-events-none absolute inset-0 opacity-30"
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-36">
        <motion.div variants={stagger} initial={initial} animate="show">
          <motion.p
            variants={fadeUp}
            className="font-mono text-[10px] tracking-[0.4em] text-bronze-300/70"
          >
            ABOUT / 关于
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <h1 className="font-display text-display-sm text-ink">简历与自我介绍</h1>
            <p className="max-w-md text-pretty text-[14px] leading-relaxed text-ink-muted md:text-right">
              {profile.signature}
            </p>
          </motion.div>

          {/* 求职意向 */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl border border-bronze-400/20 bg-bronze-400/[0.04] px-6 py-4"
          >
            <span className="font-mono text-[9px] tracking-[0.26em] text-bronze-300/80">
              求职意向
            </span>
            <span className="text-sm text-ink">{jobTarget.role}</span>
            <span className="font-mono text-[11px] text-ink-muted">
              {jobTarget.type} · {jobTarget.available}
            </span>
            <span className="font-mono text-[11px] text-ink-faint">
              {jobTarget.cities.join(' / ')}
            </span>
          </motion.div>
        </motion.div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Sidebar />

          <div className="space-y-14 lg:col-span-8 xl:col-span-9">
            <Section index="01" title="自我介绍">
              <div className="space-y-4 text-[15px] leading-[1.9] text-ink-soft">
                {profile.intro.map((paragraph) => (
                  <p key={paragraph} className="text-pretty">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Section>

            <Section index="02" title="教育背景">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="text-[16px] text-ink">{education.school}</p>
                    <p className="mt-1 text-[13px] text-ink-muted">
                      {education.major} · {education.degree}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.12em] text-ink-faint">
                    {education.period}
                  </span>
                </div>

                <p className="mt-3 font-mono text-[11px] tracking-[0.1em] text-bronze-200/80">
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

                <div className="mt-6 border-t border-white/[0.06] pt-5">
                  <p className="font-mono text-[9px] tracking-[0.26em] text-ink-faint">
                    荣誉与证书
                  </p>
                  <ul className="mt-3 space-y-2">
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

            <Section index="03" title="项目">
              <div className="space-y-4">
                {projects.map((project) => (
                  <ProjectItem key={project.name} project={project} />
                ))}
              </div>
            </Section>

            <Section index="04" title="经历">
              <ol className="space-y-6 border-l border-white/[0.08] pl-6">
                {experience.map((item) => (
                  <li key={item.period} className="relative">
                    <span className="absolute -left-[27px] top-1.5 h-2 w-2 rounded-full border border-bronze-400/60 bg-obsidian-900" />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <p className="text-[15px] text-ink">
                        {item.role}
                        <span className="text-ink-muted"> · {item.org}</span>
                      </p>
                      <span className="font-mono text-[10px] tracking-[0.12em] text-ink-faint">
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-muted">
                      {item.desc}
                    </p>
                  </li>
                ))}
              </ol>
            </Section>

            <Section index="05" title="正在做的事">
              <ul className="grid gap-3 sm:grid-cols-3">
                {nowDoing.map((item) => (
                  <li
                    key={item.label}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4"
                  >
                    <p className="font-mono text-[9px] tracking-[0.26em] text-bronze-300/70">
                      {item.label}
                    </p>
                    <p className="mt-2 text-[12.5px] leading-snug text-ink-soft">
                      {item.value}
                    </p>
                  </li>
                ))}
              </ul>
            </Section>

            <Section index="06" title="技术栈">
              <div className="grid gap-5 sm:grid-cols-2">
                {skills.map((group) => (
                  <div key={group.group}>
                    <p className="font-mono text-[9px] tracking-[0.26em] text-ink-faint">
                      {group.group}
                    </p>
                    <ul className="mt-2.5 flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-ink-soft transition-colors duration-200 hover:border-bronze-400/30 hover:text-bronze-200"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            <Section index="07" title="个人喜好">
              <ul className="grid gap-4 sm:grid-cols-2">
                {interests.map((item) => {
                  const Icon = INTEREST_ICONS[item.icon] ?? Sparkles
                  return (
                    <li
                      key={item.title}
                      className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5"
                    >
                      <Icon className="h-4 w-4 text-bronze-300/80" />
                      <p className="mt-2.5 text-sm text-ink">{item.title}</p>
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-muted">
                        {item.note}
                      </p>
                    </li>
                  )
                })}
              </ul>
            </Section>

            <Section index="08" title="个性签名">
              <figure className="relative overflow-hidden rounded-3xl border border-bronze-400/20 bg-bronze-400/[0.04] p-8">
                <blockquote className="text-balance font-display text-2xl leading-snug text-ink sm:text-[28px]">
                  「{profile.signature}」
                </blockquote>

                <svg
                  viewBox="0 0 240 12"
                  className="mt-3 h-3 w-48"
                  fill="none"
                  aria-hidden="true"
                >
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

                <figcaption className="mt-3 font-mono text-[9px] tracking-[0.26em] text-ink-faint">
                  SIGNATURE · {profile.nameEn.toUpperCase()}
                </figcaption>
              </figure>
            </Section>
          </div>
        </div>
      </div>
    </section>
  )
}
