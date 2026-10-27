import { motion, useReducedMotion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

import { EASE } from '@/lib/motion'

// 每个页面给两团光晕不同的落点：切换路由时它们会平滑滑过去，
// 时长与标题、卡片的入场节奏对齐（0.9s）。
const LAYOUTS = {
  '/': { a: { x: '0%', y: '0%' }, b: { x: '0%', y: '0%' }, c: { x: '0%', y: '0%' } },
  '/about': {
    a: { x: '-14%', y: '16%' },
    b: { x: '10%', y: '-12%' },
    c: { x: '12%', y: '-8%' },
  },
  '/notes': {
    a: { x: '8%', y: '6%' },
    b: { x: '-12%', y: '10%' },
    c: { x: '-8%', y: '8%' },
  },
  '/portfolio': {
    a: { x: '12%', y: '18%' },
    b: { x: '6%', y: '-8%' },
    c: { x: '-12%', y: '-6%' },
  },
  '/connect': {
    a: { x: '-8%', y: '10%' },
    b: { x: '14%', y: '12%' },
    c: { x: '10%', y: '-10%' },
  },
}

const FALLBACK = {
  a: { x: '0%', y: '0%' },
  b: { x: '0%', y: '0%' },
  c: { x: '0%', y: '0%' },
}

export default function GlobalBackdrop() {
  const { pathname } = useLocation()
  const reduce = useReducedMotion()

  const route = pathname.startsWith('/notes/') ? '/notes' : pathname
  const layout = LAYOUTS[route] ?? FALLBACK

  const move = { duration: reduce ? 0 : 0.9, ease: EASE }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      <motion.div
        className="absolute -left-[14%] -top-[16%]"
        animate={layout.a}
        transition={move}
      >
        <motion.div
          className="h-[680px] w-[680px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.17),transparent_65%)] blur-3xl"
          animate={
            reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }
          }
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div
        className="absolute left-[52%] top-[16%]"
        animate={layout.b}
        transition={move}
      >
        <motion.div
          className="h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(76,141,255,0.12),transparent_65%)] blur-3xl"
          animate={
            reduce ? undefined : { scale: [1.08, 1, 1.08], opacity: [0.75, 1, 0.75] }
          }
          transition={{ duration: 23, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </motion.div>

      <motion.div
        className="absolute left-[6%] top-[58%]"
        animate={layout.c}
        transition={move}
      >
        <motion.div
          className="h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(150,116,31,0.12),transparent_65%)] blur-3xl"
          animate={
            reduce ? undefined : { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }
          }
          transition={{ duration: 21, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        />
      </motion.div>
    </div>
  )
}
