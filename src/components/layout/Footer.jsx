import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail } from 'lucide-react'

import { navLinks, site } from '@/data/site'

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link to="/" className="font-display text-2xl text-ink">
              {site.name}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {site.tagline}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-ink-soft transition-colors duration-200 hover:text-bronze-200"
            >
              <Mail className="h-3.5 w-3.5" />
              {site.email}
            </a>
          </div>

          <nav aria-label="页脚导航" className="grid grid-cols-2 gap-x-12 gap-y-2.5 sm:grid-cols-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="group inline-flex items-center gap-1 text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
              >
                {link.label}
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.05] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] tracking-[0.18em] text-ink-faint">
            © {site.since}—2026 {site.nameEn.toUpperCase()} · {site.location}
          </p>
          <p className="font-mono text-[10px] tracking-[0.18em] text-ink-faint">
            BUILT WITH REACT · VITE · TAILWIND
          </p>
        </div>
      </div>
    </footer>
  )
}
