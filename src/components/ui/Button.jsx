import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import { cn } from '@/lib/cn'

const MotionLink = motion.create(Link)

const BASE =
  'group relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-medium transition-colors duration-300 ease-silk focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'

const VARIANTS = {
  primary:
    'bg-gradient-to-b from-bronze-300 to-bronze-500 text-obsidian-950 shadow-[0_10px_34px_-12px_rgba(212,175,55,0.75)] hover:shadow-[0_18px_46px_-12px_rgba(212,175,55,0.9)] hover:brightness-[1.06]',
  outline:
    'border border-bronze-400/35 text-bronze-200 hover:border-bronze-400/70 hover:bg-bronze-400/[0.08] hover:text-bronze-100 hover:shadow-[0_14px_40px_-18px_rgba(212,175,55,0.5)]',
  ghost:
    'border border-white/10 bg-white/[0.03] text-ink-soft hover:border-white/25 hover:bg-white/[0.06] hover:text-ink hover:shadow-[0_14px_40px_-20px_rgba(0,0,0,0.9)]',
}

const SIZES = {
  sm: 'px-4 py-2 text-[13px]',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-[15px]',
}

// 弹簧式的按压与上浮：物理阻尼，不生硬
const HOVER = { y: -2, transition: { type: 'spring', stiffness: 420, damping: 26 } }
const PRESS = { scale: 0.96, transition: { type: 'spring', stiffness: 520, damping: 24 } }

export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  className,
  children,
  ...props
}) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className)

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="h-4 w-4 shrink-0" />}
      <span className="relative z-10">{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className="h-4 w-4 shrink-0 transition-transform duration-300 ease-silk group-hover:translate-x-0.5" />
      )}
    </>
  )

  const motionProps = {
    whileHover: HOVER,
    whileTap: PRESS,
  }

  if (to) {
    return (
      <MotionLink to={to} className={classes} {...motionProps} {...props}>
        {content}
      </MotionLink>
    )
  }

  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps} {...props}>
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      className={classes}
      {...motionProps}
      {...props}
    >
      {content}
    </motion.button>
  )
}
