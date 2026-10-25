import { motion } from 'framer-motion'

import useSpotlight from '@/hooks/useSpotlight'
import { cn } from '@/lib/cn'

export default function BentoCard({ className, children, delay = 0, href }) {
  const { ref, onMouseMove } = useSpotlight()

  const Tag = href ? motion.a : motion.div
  const linkProps = href
    ? { href, target: '_blank', rel: 'noreferrer noopener' }
    : null

  return (
    <Tag
      ref={ref}
      onMouseMove={onMouseMove}
      {...linkProps}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'spotlight group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-bronze-400/25 md:p-7',
        href && 'block cursor-pointer',
        className
      )}
    >
      {children}
    </Tag>
  )
}

export function BentoLabel({ index, children }) {
  return (
    <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.24em] text-ink-faint">
      <span className="text-bronze-300/70">{children}</span>
      <span>{index}</span>
    </div>
  )
}
