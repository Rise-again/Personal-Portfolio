import { tickerItems } from '@/data/site'

export default function Ticker() {
  return (
    <div className="relative overflow-hidden border-y border-white/[0.05] bg-obsidian-950/50 py-3.5">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((group) => (
          <div
            key={group}
            className="flex shrink-0 items-center gap-10 pr-10"
            aria-hidden={group === 1}
          >
            {tickerItems.map((text) => (
              <span
                key={text}
                className="flex items-center gap-10 whitespace-nowrap font-mono text-[10px] tracking-[0.32em] text-ink-faint"
              >
                {text}
                <span className="h-1 w-1 rounded-full bg-bronze-400/50" />
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-obsidian-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-obsidian-900 to-transparent" />
    </div>
  )
}
