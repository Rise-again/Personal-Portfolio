import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Copy, X } from 'lucide-react'

import { copyText } from '@/lib/clipboard'
import { cn } from '@/lib/cn'

const EASE = [0.22, 1, 0.36, 1]

function QrPlaceholder() {
  const size = 13
  const modules = []

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const inFinder =
        (x < 4 && y < 4) || (x > size - 5 && y < 4) || (x < 4 && y > size - 5)
      if (inFinder) continue
      if ((x * 7 + y * 11 + x * y) % 5 < 2) modules.push({ x, y })
    }
  }

  return (
    <svg
      viewBox="0 0 130 130"
      className="h-full w-full"
      role="img"
      aria-label="微信二维码占位图"
    >
      <rect width="130" height="130" fill="#ffffff" />
      {[
        [0, 0],
        [90, 0],
        [0, 90],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="40" height="40" fill="#0a0a0c" />
          <rect x={x + 8} y={y + 8} width="24" height="24" fill="#ffffff" />
          <rect x={x + 14} y={y + 14} width="12" height="12" fill="#0a0a0c" />
        </g>
      ))}
      {modules.map(({ x, y }) => (
        <rect
          key={`${x}-${y}`}
          x={x * 10}
          y={y * 10}
          width="10"
          height="10"
          fill="#0a0a0c"
        />
      ))}
    </svg>
  )
}

export default function WeChatModal({ open, onClose, channel }) {
  const closeRef = useRef(null)
  const reduce = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const [qrFailed, setQrFailed] = useState(false)

  useEffect(() => {
    if (!open) return

    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [open, onClose])

  async function copyId() {
    const ok = await copyText(channel.handle)
    if (!ok) return
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const showImage = Boolean(channel.qr) && !qrFailed

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <div
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 bg-obsidian-950/80 backdrop-blur-md"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="wechat-title"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="relative w-full max-w-[22rem] rounded-3xl bg-gradient-to-b from-bronze-400/45 via-white/[0.08] to-white/[0.02] p-px shadow-[0_40px_120px_-40px_rgba(0,0,0,1)]"
          >
            <div className="relative overflow-hidden rounded-[23px] bg-obsidian-850 p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18),transparent_65%)] blur-2xl"
              />

              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.3em] text-ink-faint">
                    WECHAT
                  </p>
                  <h2
                    id="wechat-title"
                    className="mt-2 font-display text-2xl text-ink"
                  >
                    扫码加个好友
                  </h2>
                </div>

                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="关闭"
                  className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border border-white/[0.08] text-ink-muted transition-colors duration-200 hover:border-bronze-400/35 hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative mt-6 rounded-2xl bg-[#f4f1ea] p-3">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white">
                  {showImage ? (
                    <img
                      src={channel.qr}
                      alt="微信二维码"
                      className="h-full w-full object-contain"
                      onError={() => setQrFailed(true)}
                    />
                  ) : (
                    <QrPlaceholder />
                  )}
                </div>

                {!showImage && (
                  <p className="mt-2 text-center font-mono text-[9px] tracking-[0.22em] text-obsidian-600">
                    二维码占位图
                  </p>
                )}
              </div>

              <div className="relative mt-5">
                <p className="font-mono text-[9px] tracking-[0.26em] text-ink-faint">
                  微信号
                </p>

                <div className="mt-2 flex items-stretch gap-2">
                  <p className="flex-1 truncate rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 font-mono text-[13px] text-ink">
                    {channel.handle}
                  </p>

                  <button
                    type="button"
                    onClick={copyId}
                    className={cn(
                      'flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border px-4 py-3 font-mono text-[10px] transition-colors duration-200',
                      copied
                        ? 'border-bronze-400/40 bg-bronze-400/[0.08] text-bronze-200'
                        : 'border-white/[0.08] text-ink-muted hover:border-bronze-400/30 hover:text-ink'
                    )}
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    {copied ? '已复制' : '复制'}
                  </button>
                </div>
              </div>

              <p className="relative mt-4 text-center font-mono text-[9px] tracking-[0.14em] text-ink-faint">
                打开微信 · 扫一扫 · 或复制微信号添加
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
