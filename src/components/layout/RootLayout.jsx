import { Outlet } from 'react-router-dom'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/layout/ScrollProgress'
import ScrollToTop from '@/components/layout/ScrollToTop'
import MiniPlayer from '@/components/player/MiniPlayer'
import PlayerProvider from '@/components/player/PlayerProvider'

export default function RootLayout() {
  return (
    <PlayerProvider>
      <div className="relative flex min-h-[100svh] flex-col bg-obsidian-900">
        <a href="#main" className="skip-link">
          跳到主要内容
        </a>

        <ScrollProgress />
        <ScrollToTop />
        <Navbar />

        <main id="main" className="flex-1">
          <Outlet />
        </main>

        <Footer />
        <MiniPlayer />
      </div>
    </PlayerProvider>
  )
}
