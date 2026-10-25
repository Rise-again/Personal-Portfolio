import { useState } from 'react'
import { Check, Copy, Mail, MessageCircle } from 'lucide-react'

import useSpotlight from '@/hooks/useSpotlight'
import { copyText } from '@/lib/clipboard'
import { site, socials } from '@/data/site'

export default function BusinessCard({ onOpenWechat }) {
  const [copied, setCopied] = useState(false)
  const { ref, onMouseMove } = useSpotlight()
  const wechat = socials.find((item) => item.key === 'wechat')

  async function copyEmail() {
    const ok = await copyText(site.email)
    if (!ok) return
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-bronze-400/35 via-white/[0.06] to-white/[0.02] p-px">
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        className="spotlight relative overflow-hidden rounded-[23px] bg-obsidian-850 p-7 md:p-10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18),transparent_65%)] blur-2xl"
        />
        <div
          aria-hidden="true"
          className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        />

        <div className="relative grid gap-9 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-14">
          {/* 身份 */}
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-bronze-400/30 bg-bronze-400/[0.08] font-display text-lg text-bronze-200">
                {site.monogram}
              </span>
              <div>
                <p className="font-mono text-[9px] tracking-[0.3em] text-ink-faint">
                  DIGITAL CARD
                </p>
                <p className="mt-1 text-[11px] text-ink-muted">{site.location}</p>
              </div>
            </div>

            <p className="mt-8 font-mono text-[10px] tracking-[0.36em] text-ink-faint">
              {site.nameEn.toUpperCase()}
            </p>
            <h2 className="mt-2 font-display text-5xl leading-none text-ink sm:text-6xl">
              {site.name}
            </h2>
            <p className="mt-3 text-sm text-ink-muted">{site.role}</p>
            <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-ink-muted">
              {site.tagline}
            </p>
          </div>

          {/* 联络方式 */}
          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={copyEmail}
              aria-label={`复制邮箱 ${site.email}`}
              className="group flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-left transition-colors duration-200 hover:border-bronze-400/30 hover:bg-white/[0.045]"
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-bronze-300/80" />
                <span className="truncate font-mono text-[12px] text-ink-soft">
                  {site.email}
                </span>
              </span>

              <span className="flex shrink-0 items-center gap-1.5 font-mono text-[9px] tracking-[0.16em] text-ink-faint transition-colors duration-200 group-hover:text-ink-soft">
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-bronze-300" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    复制
                  </>
                )}
              </span>
            </button>

            <button
              type="button"
              onClick={onOpenWechat}
              aria-haspopup="dialog"
              className="group flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-left transition-colors duration-200 hover:border-bronze-400/30 hover:bg-white/[0.045]"
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <MessageCircle className="h-4 w-4 shrink-0 text-bronze-300/80" />
                <span className="truncate font-mono text-[12px] text-ink-soft">
                  {wechat.handle}
                </span>
              </span>

              <span className="flex shrink-0 items-center font-mono text-[9px] tracking-[0.16em] text-ink-faint transition-colors duration-200 group-hover:text-ink-soft">
                查看二维码
              </span>
            </button>

            <div className="flex items-center gap-3 rounded-xl border border-bronze-400/20 bg-bronze-400/[0.05] px-4 py-3">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bronze-300/60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-bronze-300" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-bronze-200/90">
                OPEN TO COLLABORATION
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
