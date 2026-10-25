/**
 * 扫描手写文章（src/content/posts）和 Notion 同步文章（src/content/notion），
 * 把元数据（标题、日期、标签、阅读时长…）写成 src/content/index.json。
 * 列表页只加载这份索引，正文再按需单独拉取，几十万字的长文也不会拖慢首屏。
 *
 * dev / build 之前会自动执行（见 package.json 的 predev / prebuild）。
 */
import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { parseFrontmatter } from '../src/lib/frontmatter.js'
import { countReadingMinutes, countWords, formatDate } from '../src/lib/post-utils.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_DIR = path.join(ROOT, 'src/content')
const INDEX_FILE = path.join(CONTENT_DIR, 'index.json')

const SOURCE_DIRS = ['posts', 'notion']

export async function buildContentIndex() {
  const posts = []

  for (const dir of SOURCE_DIRS) {
    const absolute = path.join(CONTENT_DIR, dir)
    if (!existsSync(absolute)) continue

    const files = (await fs.readdir(absolute)).filter((file) => file.endsWith('.md'))

    for (const file of files) {
      const raw = await fs.readFile(path.join(absolute, file), 'utf8')
      const { data, body } = parseFrontmatter(raw)
      const slug = file.replace(/\.md$/, '')

      posts.push({
        slug,
        file,
        // 供前端按需 import 的 glob key（相对 src/lib/posts.js）
        path: `../content/${dir}/${file}`,
        title: data.title ?? slug,
        date: data.date ?? '',
        displayDate: formatDate(data.date),
        tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
        summary: data.summary ?? '',
        featured: data.featured === 'true' || data.featured === true,
        readingMinutes: countReadingMinutes(body),
        wordCount: countWords(body),
      })
    }
  }

  posts.sort((a, b) => new Date(b.date) - new Date(a.date))
  await fs.writeFile(INDEX_FILE, `${JSON.stringify(posts, null, 2)}\n`, 'utf8')

  return posts
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const posts = await buildContentIndex()
  console.log(`[content] 索引已更新：${posts.length} 篇`)
}
