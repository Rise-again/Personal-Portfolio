import { AnimatePresence, motion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { useLocation } from 'react-router-dom'

import { usePlayer } from '@/components/player/PlayerProvider'
import { EASE } from '@/lib/motion'

// 首页有黑胶实体控件，其它页面用这个悬浮条继续控制播放。
export default function MiniPlayer() {
  const { track, playing, started, toggle } = usePlayer()
  const { pathname } = useLocation()
  const visible = started && pathname !== '/'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="fixed bottom-5 right-5 z-40"
        >
          <div className="glass flex items-center gap-3 rounded-2xl p-2 pr-5 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.95)]">
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? '暂停音乐' : '播放音乐'}
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-bronze-400/30 bg-bronze-400/[0.08] text-bronze-200 transition-colors duration-200 hover:bg-bronze-400/[0.16]"
            >
              {playing ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="ml-0.5 h-4 w-4" />
              )}
            </button>

            <div className="min-w-0">
              <p className="truncate font-display text-sm leading-tight text-ink">
                {track.title}
              </p>
              <p className="mt-0.5 truncate font-mono text-[9px] tracking-[0.14em] text-ink-faint">
                {playing ? 'NOW PLAYING' : 'PAUSED'}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
