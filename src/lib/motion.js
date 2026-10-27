// 全站共用的动效参数：统一缓动曲线，避免每个组件各写一套。
export const EASE = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
}

export const popIn = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: EASE },
  },
}

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}

// 按钮 / 卡片的弹簧手感
export const tap = { scale: 0.97 }
export const tapSoft = { scale: 0.995 }
export const springy = { type: 'spring', stiffness: 420, damping: 28 }
export const lift = { y: -4 }
