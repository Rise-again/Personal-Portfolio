import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'

import Button from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { navLinks, site } from '@/data/site'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const solid = scrolled || pathname !== '/' || open

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:pt-4">
      <nav
        aria-label="主导航"
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 transition-all duration-500 ease-silk sm:px-4',
          solid
            ? 'border-white/[0.07] bg-obsidian-900/80 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.95)] backdrop-blur-2xl'
            : 'border-transparent bg-transparent'
        )}
      >
        {/* 品牌 */}
        <Link
          to="/"
          aria-label={`${site.name} · 返回首页`}
          className="group flex shrink-0 items-center gap-2.5 rounded-xl pl-1 pr-2"
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-full border border-bronze-400/30 bg-bronze-400/[0.06] transition-colors duration-300 group-hover:border-bronze-400/60">
            <span className="font-display text-[15px] leading-none text-bronze-200">
              {site.monogram}
            </span>
          </span>
          <span className="leading-none">
            <span className="block font-display text-[15px] tracking-wide text-ink">
              {site.name}
            </span>
            <span className="mt-1 block font-mono text-[9px] tracking-[0.28em] text-ink-faint">
              PORTFOLIO
            </span>
          </span>
        </Link>

        {/* 桌面导航 */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink
                to={link.href}
                end={link.href === '/'}
                className="relative flex rounded-full px-3.5 py-2 text-sm"
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full border border-bronze-400/25 bg-bronze-400/[0.08]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span
                      className={cn(
                        'relative z-10 transition-colors duration-200',
                        isActive
                          ? 'text-bronze-200'
                          : 'text-ink-muted hover:text-ink'
                      )}
                    >
                      {link.label}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* 右侧操作 */}
        <div className="flex items-center gap-2">
          <Button
            to="/connect"
            size="sm"
            icon={ArrowUpRight}
            className="hidden md:inline-flex"
          >
            与我交友
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? '关闭菜单' : '打开菜单'}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-ink-soft transition-colors duration-200 hover:border-white/25 hover:text-ink md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* 移动端菜单 */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-white/[0.08] bg-obsidian-900/95 p-3 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.95)] backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavLink
                    to={link.href}
                    end={link.href === '/'}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between rounded-xl px-3 py-3 text-sm transition-colors duration-200',
                        isActive
                          ? 'bg-bronze-400/[0.08] text-bronze-200'
                          : 'text-ink-soft hover:bg-white/[0.04] hover:text-ink'
                      )
                    }
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-[10px] tracking-[0.3em] text-ink-faint">
                      {link.en}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mt-2 border-t border-white/[0.06] pt-3">
              <Button to="/connect" size="md" icon={ArrowUpRight} className="w-full">
                与我交友
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
