import { useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion'
import { ChevronDown, Pause, Play, SkipBack, SkipForward } from 'lucide-react'

import Waveform from '@/components/hero/Waveform'
import { usePlayer } from '@/components/player/PlayerProvider'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/motion'
import { site } from '@/data/site'

// 唱臂由两层 SVG 组成：不动的底座 + 绕底座旋转的臂体。
// 坐标基于 0–100 的 viewBox，随容器等比缩放。
function Tonearm({ playing }) {
  const reduce = useReducedMotion()

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <circle
          cx="86"
          cy="11"
          r="4.4"
          fill="#101016"
          stroke="rgba(212,175,55,0.28)"
          strokeWidth="0.45"
        />
        <circle
          cx="86"
          cy="11"
          r="2.6"
          fill="#1c1c24"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="0.28"
        />
        <circle cx="86" cy="11" r="0.9" fill="rgba(212,175,55,0.9)" />
      </svg>

      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]"
        style={{ transformOrigin: '86% 11%' }}
        animate={{ rotate: playing ? 0 : 64 }}
        transition={{ duration: reduce ? 0 : 0.9, ease: EASE }}
      >
        {/* 配重 */}
        <line
          x1="86"
          y1="11"
          x2="91.8"
          y2="5.2"
          stroke="#34343f"
          strokeWidth="4.8"
          strokeLinecap="round"
        />
        <line
          x1="86"
          y1="11"
          x2="91.8"
          y2="5.2"
          stroke="#4e4e5c"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* 臂杆 */}
        <line
          x1="86"
          y1="11"
          x2="72.8"
          y2="25.3"
          stroke="#2b2b34"
          strokeWidth="2.7"
          strokeLinecap="round"
        />
        <line
          x1="85.6"
          y1="10.6"
          x2="72.6"
          y2="24.7"
          stroke="#606070"
          strokeWidth="0.65"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* 唱头 */}
        <line
          x1="72.8"
          y1="25.3"
          x2="69.8"
          y2="28.5"
          stroke="#17171e"
          strokeWidth="4.6"
          strokeLinecap="round"
        />
        <line
          x1="72.8"
          y1="25.3"
          x2="69.8"
          y2="28.5"
          stroke="rgba(212,175,55,0.5)"
          strokeWidth="0.8"
          strokeLinecap="round"
          transform="translate(0,1.3)"
        />

        {/* 针尖：落在黑胶音轨正中（半径 28.8） */}
        <circle cx="69.5" cy="28.8" r="1" fill="#d4af37" />
      </motion.svg>
    </div>
  )
}

export default function VinylDisc() {
  const reduce = useReducedMotion()
  const { tracks, track, index, total, playing, started, audioError, toggle, next, prev, select } =
    usePlayer()

  const angle = useMotionValue(0)
  const speed = useRef(0)
  const [listOpen, setListOpen] = useState(false)

  // 唱片旋转不再是固定 CSS 动画：速度向目标值平滑逼近，
  // 暂停时自然滑停、播放时缓慢加速——像真唱片的惯性。
  useAnimationFrame((_, delta) => {
    if (reduce) return

    const target = playing ? 8 : 0
    const damping = 1 - Math.exp(-delta / 260)

    speed.current += (target - speed.current) * damping
    if (target === 0 && Math.abs(speed.current) < 0.02) speed.current = 0

    angle.set(angle.get() + (speed.current * delta) / 1000)
  })

  const stateLabel = audioError
    ? 'AUDIO NOT FOUND'
    : playing
      ? 'NOW PLAYING'
      : started
        ? 'PAUSED'
        : 'TAP TO PLAY'

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      {/* 金色光晕 */}
      <div
        aria-hidden="true"
        className="absolute inset-[2%] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.22),transparent_64%)] blur-2xl"
      />

      {/* 外层轨道 */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-[-9%] rounded-full border border-dashed border-white/[0.07]"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze-300 shadow-[0_0_18px_4px_rgba(212,175,55,0.55)]" />
      </motion.div>

      {/* 内层轨道 */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-[-3%] rounded-full border border-white/[0.04]"
        animate={reduce ? undefined : { rotate: -360 }}
        transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-tech-400 shadow-[0_0_14px_3px_rgba(76,141,255,0.5)]" />
      </motion.div>

      {/* 唱片（点击播放 / 暂停） */}
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? `暂停 ${track.title}` : `播放 ${track.title}`}
        className="group absolute inset-[7%] cursor-pointer rounded-full bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-400/70 focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian-900"
      >
        <motion.span
          style={{ rotate: angle }}
          className="absolute inset-0 block overflow-hidden rounded-full shadow-disc ring-1 ring-white/[0.11]"
        >
          <span aria-hidden="true" className="absolute inset-0 block vinyl-grooves" />
          <span aria-hidden="true" className="absolute inset-0 block vinyl-sheen" />
          <span
            aria-hidden="true"
            className="absolute inset-0 block bg-[radial-gradient(circle_at_32%_24%,rgba(255,255,255,0.12),transparent_42%)]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 block rounded-full shadow-[inset_0_0_0_1px_rgba(212,175,55,0.16),inset_0_-24px_60px_rgba(0,0,0,0.55)]"
          />

          {/* 中心标签 */}
          <span className="absolute left-1/2 top-1/2 grid h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_28%,#F7EFD2,#DFC672_38%,#B8932C_72%,#6F5518_100%)] shadow-[0_0_30px_rgba(212,175,55,0.25)]">
            <span className="text-center">
              <span className="block font-display text-2xl leading-none text-obsidian-950">
                {site.monogram}
              </span>
              <span className="mt-1 block font-mono text-[7px] tracking-[0.32em] text-obsidian-950/60">
                SIDE A
              </span>
            </span>
            <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-obsidian-950 ring-1 ring-black/40" />
          </span>
        </motion.span>

        {/* 悬停提示 */}
        <span className="pointer-events-none absolute left-1/2 top-1/2 grid h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-obsidian-950/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          {playing ? (
            <Pause className="h-6 w-6 text-bronze-200" />
          ) : (
            <Play className="ml-0.5 h-6 w-6 text-bronze-200" />
          )}
        </span>
      </button>

      <Tonearm playing={playing} />

      {/* 正在播放卡片 */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.9, ease: EASE }}
        className="absolute -bottom-7 left-0 w-[88%] max-w-[310px]"
      >
        <div className="glass rounded-2xl p-4 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.95)]">
          <AnimatePresence initial={false}>
            {listOpen && (
              <motion.div
                key="tracklist"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="overflow-hidden"
              >
                <ul className="mb-3 space-y-0.5 border-b border-white/[0.07] pb-3">
                  {tracks.map((item, trackIndex) => (
                    <li key={item.src}>
                      <button
                        type="button"
                        onClick={() => {
                          select(trackIndex)
                          setListOpen(false)
                        }}
                        aria-current={trackIndex === index}
                        className={cn(
                          'flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors duration-200 hover:bg-white/[0.06]',
                          trackIndex === index ? 'text-bronze-200' : 'text-ink-soft'
                        )}
                      >
                        <span className="font-mono text-[9px] tracking-[0.1em] text-ink-faint">
                          {String(trackIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-[12px]">
                          {item.title}
                        </span>
                        {trackIndex === index && (
                          <span className="h-1 w-1 shrink-0 rounded-full bg-bronze-300" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.26em] text-ink-faint">
              <span
                className={cn(
                  'h-1 w-1 rounded-full',
                  playing
                    ? 'animate-pulse bg-bronze-300 motion-reduce:animate-none'
                    : 'bg-ink-faint/70'
                )}
              />
              {stateLabel}
            </span>

            <span className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setListOpen((open) => !open)}
                aria-expanded={listOpen}
                aria-label={listOpen ? '收起曲目表' : '展开曲目表'}
                className="flex cursor-pointer items-center gap-1 rounded-full px-1.5 py-0.5 font-mono text-[9px] tracking-[0.12em] text-ink-faint transition-colors duration-200 hover:bg-white/[0.06] hover:text-bronze-200"
              >
                {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
                <ChevronDown
                  className={cn(
                    'h-3 w-3 transition-transform duration-300',
                    listOpen && 'rotate-180'
                  )}
                />
              </button>

              <button
                type="button"
                onClick={prev}
                aria-label="上一首"
                className="grid h-6 w-6 cursor-pointer place-items-center rounded-full text-ink-faint transition-colors duration-200 hover:bg-white/[0.06] hover:text-bronze-200"
              >
                <SkipBack className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="下一首"
                className="grid h-6 w-6 cursor-pointer place-items-center rounded-full text-ink-faint transition-colors duration-200 hover:bg-white/[0.06] hover:text-bronze-200"
              >
                <SkipForward className="h-3 w-3" />
              </button>
            </span>
          </div>

          <div className="mt-3 flex items-center gap-3.5">
            <Waveform className="w-[58px] shrink-0" active={playing} />
            <div className="min-w-0">
              <p className="truncate font-display text-lg leading-tight text-ink">
                {track.title}
              </p>
              <p className="mt-0.5 truncate font-mono text-[10px] tracking-[0.12em] text-ink-muted">
                {track.artist}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
