import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight,
  BookHeart,
  Github,
  Mail,
  MessageCircle,
  QrCode,
  Radio,
  X as XIcon,
} from 'lucide-react'

import BusinessCard from '@/components/connect/BusinessCard'
import WeChatModal from '@/components/connect/WeChatModal'
import useSpotlight from '@/hooks/useSpotlight'
import { site, socials } from '@/data/site'

const EASE = [0.22, 1, 0.36, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: EASE },
  },
}

const ICONS = {
  github: Github,
  x: XIcon,
  wechat: MessageCircle,
  jike: Radio,
  redbook: BookHeart,
}

const CARD_CLASS =
  'spotlight group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-[border-color,background-color,box-shadow] duration-300 ease-silk hover:border-bronze-400/45 hover:bg-white/[0.05] hover:shadow-[0_0_40px_-12px_rgba(212,175,55,0.5)] last:col-span-2 lg:last:col-span-1'

const CARD_HOVER = {
  y: -4,
  transition: { type: 'spring', stiffness: 380, damping: 26 },
}

function SocialCard({ channel, Icon, ActionIcon, onOpen }) {
  const { ref, onMouseMove } = useSpotlight()

  const body = (
    <>
      <div className="flex items-start justify-between">
        <span className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.08] bg-white/[0.03] text-ink-soft transition-colors duration-300 group-hover:border-bronze-400/30 group-hover:text-bronze-200">
          <Icon className="h-4 w-4" />
        </span>

        <ActionIcon className="h-4 w-4 text-ink-faint transition-all duration-300 ease-silk group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bronze-300" />
      </div>

      <div className="mt-8">
        <p className="text-sm text-ink">{channel.label}</p>
        <p className="mt-1 truncate font-mono text-[11px] text-ink-faint">
          {channel.handle}
        </p>
      </div>
    </>
  )

  if (onOpen) {
    return (
      <motion.button
        ref={ref}
        onMouseMove={onMouseMove}
        variants={item}
        whileHover={CARD_HOVER}
        whileTap={{ scale: 0.995 }}
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-label="打开微信二维码"
        className={`${CARD_CLASS} text-left`}
      >
        {body}
      </motion.button>
    )
  }

  return (
    <motion.a
      ref={ref}
      onMouseMove={onMouseMove}
      variants={item}
      whileHover={CARD_HOVER}
      whileTap={{ scale: 0.995 }}
      href={channel.href}
      target="_blank"
      rel="noreferrer noopener"
      className={CARD_CLASS}
    >
      {body}
    </motion.a>
  )
}

function EmailBar() {
  const { ref, onMouseMove } = useSpotlight()

  return (
    <motion.a
      ref={ref}
      onMouseMove={onMouseMove}
      variants={item}
      whileHover={CARD_HOVER}
      whileTap={{ scale: 0.995 }}
      href={`mailto:${site.email}`}
      className="spotlight group relative mt-4 flex flex-col items-start justify-between gap-4 overflow-hidden rounded-2xl border border-bronze-400/20 bg-bronze-400/[0.04] px-6 py-5 transition-colors duration-300 hover:border-bronze-400/45 hover:bg-bronze-400/[0.07] sm:flex-row sm:items-center"
    >
      <div>
        <p className="font-mono text-[9px] tracking-[0.26em] text-bronze-300/70">
          SAY HELLO
        </p>
        <p className="mt-1.5 font-display text-2xl text-ink">写信给我</p>
      </div>

      <span className="flex items-center gap-2 font-mono text-[12px] text-ink-soft transition-colors duration-300 group-hover:text-bronze-100">
        {site.email}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-silk group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </motion.a>
  )
}

export default function Connect() {
  const [wechatOpen, setWechatOpen] = useState(false)
  const reduce = useReducedMotion()
  const wechat = socials.find((channel) => channel.key === 'wechat')
  const initial = reduce ? false : 'hidden'

  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="score-grid score-mask absolute inset-0 opacity-30" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-36">
        <motion.div variants={container} initial={initial} animate="show">
          <motion.p
            variants={item}
            className="font-mono text-[10px] tracking-[0.4em] text-bronze-300/70"
          >
            CONNECT / 联络
          </motion.p>

          <motion.div
            variants={item}
            className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <h1 className="text-balance font-display text-[32px] leading-tight text-ink sm:text-display-sm">
              加个好友，喝杯咖啡
            </h1>
            <p className="max-w-md text-pretty text-[14px] leading-relaxed text-ink-muted md:text-right">
              如果你也在意产品的结构感、AI 的边界，或者只是想聊聊勃拉姆斯，欢迎随时找我。
            </p>
          </motion.div>

          <motion.div variants={cardVariant} className="mt-12">
            <BusinessCard onOpenWechat={() => setWechatOpen(true)} />
          </motion.div>

          <motion.div variants={container} className="mt-14">
            <motion.div variants={item} className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.26em] text-ink-faint">
                ELSEWHERE / 社交矩阵
              </span>
              <span className="hairline flex-1" />
            </motion.div>

            <motion.div
              variants={container}
              className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-5"
            >
              {socials.map((channel) => {
                const Icon = ICONS[channel.key] ?? ArrowUpRight
                const isWeChat = channel.key === 'wechat'

                return (
                  <SocialCard
                    key={channel.key}
                    channel={channel}
                    Icon={Icon}
                    ActionIcon={isWeChat ? QrCode : ArrowUpRight}
                    onOpen={isWeChat ? () => setWechatOpen(true) : undefined}
                  />
                )
              })}
            </motion.div>

            <EmailBar />
          </motion.div>
        </motion.div>
      </div>

      <WeChatModal
        open={wechatOpen}
        onClose={() => setWechatOpen(false)}
        channel={wechat}
      />
    </section>
  )
}
