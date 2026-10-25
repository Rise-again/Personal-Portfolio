import { useEffect, useState } from 'react'

import { cn } from '@/lib/cn'

const INDENT = {
  2: 'pl-3 text-[13px]',
  3: 'pl-6 text-[12.5px]',
  4: 'pl-9 text-[12px]',
}

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? '')

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter(Boolean)

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-100px 0px -70% 0px', threshold: 0 }
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [headings])

  if (!headings.length) return null

  return (
    <nav aria-label="文章目录">
      <p className="font-mono text-[10px] tracking-[0.28em] text-ink-faint">CONTENTS</p>
      <ul className="mt-4 max-h-[calc(100vh-11rem)] overflow-y-auto border-l border-white/[0.08] pr-1">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                '-ml-px block border-l-2 py-1.5 transition-colors duration-200',
                INDENT[heading.depth] ?? INDENT[2],
                activeId === heading.id
                  ? 'border-bronze-400/70 text-bronze-200'
                  : 'border-transparent text-ink-muted hover:text-ink'
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
