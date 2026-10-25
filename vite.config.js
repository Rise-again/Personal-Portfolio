import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

import { buildContentIndex } from './scripts/build-content-index.mjs'

// 开发时新增 / 删除 / 改名 src/content/posts 里的 .md，自动重建索引。
function contentIndex() {
  let timer

  return {
    name: 'content-index',
    apply: 'serve',
    configureServer(server) {
      server.watcher.on('all', (event, file) => {
        if (!/content[\\/]posts[\\/].+\.md$/.test(file)) return

        clearTimeout(timer)
        timer = setTimeout(() => {
          buildContentIndex()
            .then(() => server.ws.send({ type: 'full-reload' }))
            .catch((error) => {
              server.config.logger.error(`[content] 索引更新失败：${error.message}`)
            })
        }, 150)
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), contentIndex()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
  },
})
