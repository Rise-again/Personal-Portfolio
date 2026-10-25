import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import RootLayout from '@/components/layout/RootLayout'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Notes from '@/pages/Notes'
import Portfolio from '@/pages/Portfolio'
import Connect from '@/pages/Connect'
import NotFound from '@/pages/NotFound'

// 文章详情页单独成块：Markdown 渲染管线只在真正打开文章时加载。
const NoteDetail = lazy(() => import('@/pages/NoteDetail'))

function RouteFallback() {
  return (
    <div className="flex min-h-[60svh] items-center justify-center">
      <span className="font-mono text-[10px] tracking-[0.3em] text-ink-faint">
        LOADING
      </span>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="notes" element={<Notes />} />
        <Route
          path="notes/:slug"
          element={
            <Suspense fallback={<RouteFallback />}>
              <NoteDetail />
            </Suspense>
          }
        />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="connect" element={<Connect />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
