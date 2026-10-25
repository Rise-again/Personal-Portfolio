import { motion, useReducedMotion } from 'framer-motion'

import { cn } from '@/lib/cn'

const PATTERN = [0.35, 0.62, 0.45, 0.88, 0.55, 0.95, 0.7, 0.42, 0.8, 0.5, 0.68, 0.32]

export default function Waveform({ className, bars = 12, active = true }) {
  const reduce = useReducedMotion()

  return (
    <div
      className={cn(
        'flex h-9 items-center gap-[3px] transition-opacity duration-500',
        !active && 'opacity-40',
        className
      )}
      aria-hidden="true"
    >
      {PATTERN.slice(0, bars).map((height, index) => (
        <motion.span
          key={index}
          className="w-[2px] shrink-0 rounded-full bg-gradient-to-t from-bronze-600/70 to-bronze-300"
          style={{ height: `${Math.round(height * 100)}%` }}
          animate={reduce || !active ? undefined : { scaleY: [1, 0.45, 0.9, 0.6, 1] }}
          transition={{
            duration: 1.6 + index * 0.07,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.06,
          }}
        />
      ))}
    </div>
  )
}
