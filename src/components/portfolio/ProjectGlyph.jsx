import { cn } from '@/lib/cn'

const BAR_HEIGHTS = [18, 40, 26, 56, 34, 70, 44, 62, 30, 52, 22, 46, 16, 38]
const DOTS = Array.from({ length: 36 }, (_, index) => index)

const BASE = 'pointer-events-none text-bronze-300 transition-all duration-700 ease-silk'

export default function ProjectGlyph({ variant = 'rings', className }) {
  if (variant === 'bars') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 200 120"
        className={cn(BASE, 'opacity-30 group-hover:opacity-55', className)}
        fill="currentColor"
      >
        {BAR_HEIGHTS.map((height, index) => (
          <rect
            key={index}
            x={6 + index * 14}
            y={60 - height / 2}
            width="3"
            height={height}
            rx="1.5"
            opacity={0.35 + (index % 4) * 0.16}
          />
        ))}
      </svg>
    )
  }

  if (variant === 'grid') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 200 140"
        className={cn(BASE, 'opacity-30 group-hover:opacity-55', className)}
        fill="currentColor"
      >
        {DOTS.map((index) => {
          const col = index % 6
          const row = Math.floor(index / 6)
          return (
            <circle
              key={index}
              cx={22 + col * 31}
              cy={20 + row * 20}
              r="1.8"
              opacity={0.25 + ((col + row) % 4) * 0.2}
            />
          )
        })}
      </svg>
    )
  }

  if (variant === 'wave') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 240 120"
        className={cn(BASE, 'opacity-35 group-hover:opacity-60', className)}
        fill="none"
        stroke="currentColor"
      >
        <path d="M0 60 Q 30 10 60 60 T 120 60 T 180 60 T 240 60" strokeWidth="1.2" opacity="0.7" />
        <path d="M0 60 Q 30 96 60 60 T 120 60 T 180 60 T 240 60" strokeWidth="1" opacity="0.35" />
        <path d="M0 60 Q 30 34 60 60 T 120 60 T 180 60 T 240 60" strokeWidth="0.8" opacity="0.25" />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className={cn(BASE, 'opacity-30 group-hover:opacity-55', className)}
      fill="none"
      stroke="currentColor"
    >
      <circle cx="100" cy="100" r="88" strokeWidth="0.8" opacity="0.25" />
      <circle cx="100" cy="100" r="66" strokeWidth="0.8" opacity="0.35" />
      <circle cx="100" cy="100" r="44" strokeWidth="0.8" opacity="0.45" />
      <circle cx="100" cy="100" r="22" strokeWidth="0.8" opacity="0.55" />
      <circle cx="100" cy="100" r="3" fill="currentColor" stroke="none" opacity="0.9" />
    </svg>
  )
}
