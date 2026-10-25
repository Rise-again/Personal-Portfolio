#!/usr/bin/env node
/**
 * 把 Notion 数据库里勾选了 Published 的页面同步成站内的 Markdown。
 *
 *   npm run sync:notion
 *
 * 生成的文件会写进 src/content/posts/，与手写的 .md 走同一条渲染管线
 * （标签、目录、阅读时长、代码高亮都照常工作）。同步记录存在 .notion-sync.json，
 * 只会删除自己上次生成的文件，不会碰你手写的文章。
 */
import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

import { buildContentIndex } from './build-content-index.mjs'
import config from '../notion.config.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const MANIFEST = path.join(ROOT, '.notion-sync.json')
const OUTPUT_DIR = path.join(ROOT, config.outputDir)
const IMAGE_DIR = path.join(ROOT, config.imageDir)

const EXT_BY_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
  'image/avif': 'avif',
}

const IMAGE_RE = /!\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function loadEnv() {
  const file = path.join(ROOT, '.env')
  if (!existsSync(file)) return

  const text = await fs.readFile(file, 'utf8')
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const eq = trimmed.indexOf('=')
    if (eq === -1) continue

    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (key && !(key in process.env)) process.env[key] = value
  }
}

const plainText = (richText) => (richText ?? []).map((item) => item.plain_text).join('')

function readText(page, name) {
  const prop = page.properties?.[name]
  if (!prop) return ''
  switch (prop.type) {
    case 'title':
      return plainText(prop.title)
    case 'rich_text':
      return plainText(prop.rich_text)
    case 'select':
      return prop.select?.name ?? ''
    case 'status':
      return prop.status?.name ?? ''
    default:
      return ''
  }
}

function readDate(page, name) {
  const prop = page.properties?.[name]
  if (prop?.type === 'date') return prop.date?.start?.slice(0, 10) ?? ''
  if (prop?.type === 'created_time') return prop.created_time?.slice(0, 10) ?? ''
  return page.last_edited_time?.slice(0, 10) ?? ''
}

function readTags(page, name) {
  const prop = page.properties?.[name]
  if (!prop) return []
  if (prop.type === 'multi_select') return prop.multi_select.map((item) => item.name)
  if (prop.type === 'select') return prop.select ? [prop.select.name] : []
  if (prop.type === 'rich_text') {
    return plainText(prop.rich_text)
      .split(/[,，]/)
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return []
}

function isPublished(page) {
  const prop = page.properties?.[config.properties.published]
  if (!prop) return false
  if (prop.type === 'checkbox') return prop.checkbox === true
  if (prop.type === 'select') return Boolean(prop.select)
  if (prop.type === 'status') return Boolean(prop.status)
  return false
}

function slugify(value) {
  return String(value ?? '')
    .normalize('NFKC')
    .trim()
    .toLowerCase()
    .replace(/['"’]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

function escapeValue(value) {
  return String(value ?? '')
    .replace(/\r?\n/g, ' ')
    .replace(/"/g, "'")
    .trim()
}

function toFrontmatter({ title, date, tags, summary, featured }) {
  const lines = ['---', `title: "${escapeValue(title)}"`]
  if (date) lines.push(`date: ${date}`)
  lines.push(`tags: [${tags.map((tag) => `"${escapeValue(tag)}"`).join(', ')}]`)
  if (summary) lines.push(`summary: "${escapeValue(summary)}"`)
  if (featured) lines.push('featured: true')
  lines.push('---', '')
  return `${lines.join('\n')}\n`
}

async function readManifest() {
  try {
    const raw = await fs.readFile(MANIFEST, 'utf8')
    const data = JSON.parse(raw)
    return Array.isArray(data.generated) ? data.generated : []
  } catch {
    return []
  }
}

async function downloadImage(url, baseName) {
  try {
    const response = await fetch(url)
    if (!response.ok) return null
    const type = (response.headers.get('content-type') ?? '').split(';')[0]
    const ext = EXT_BY_TYPE[type] ?? 'png'
    const fileName = `${baseName}.${ext}`
    await fs.writeFile(path.join(IMAGE_DIR, fileName), Buffer.from(await response.arrayBuffer()))
    return fileName
  } catch (error) {
    console.warn(`  ! 图片下载失败：${error.message}`)
    return null
  }
}

async function clearImages(slug) {
  if (!existsSync(IMAGE_DIR)) return 0
  const files = await fs.readdir(IMAGE_DIR)
  const matched = files.filter((file) => file.startsWith(`${slug}-`))
  await Promise.all(matched.map((file) => fs.rm(path.join(IMAGE_DIR, file), { force: true })))
  return matched.length
}

// 兜底：public/notion 完全由同步脚本管理，不属于任何现存文章的文件一律清掉。
async function pruneImages(keepSlugs) {
  if (!existsSync(IMAGE_DIR)) return 0

  const files = await fs.readdir(IMAGE_DIR)
  let removed = 0

  for (const file of files) {
    const match = /^(.*)-\d+\.[A-Za-z0-9]+$/.exec(file)
    if (match && keepSlugs.has(match[1])) continue
    await fs.rm(path.join(IMAGE_DIR, file), { force: true })
    removed += 1
  }

  return removed
}

async function localizeImages(markdown, slug) {
  await clearImages(slug)

  const matches = [...markdown.matchAll(IMAGE_RE)]
  let output = markdown

  for (const [index, match] of matches.entries()) {
    const [full, alt, url] = match
    const file = await downloadImage(url, `${slug}-${index + 1}`)
    if (file) {
      output = output.replace(full, `![${alt}](${config.imagePathPrefix}/${file})`)
    }
  }

  return output
}

async function fetchAllPages(notion) {
  const pages = []
  let cursor

  do {
    const response = await withRetry(() =>
      notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID || config.databaseId,
        start_cursor: cursor,
        page_size: 100,
      })
    )
    pages.push(...response.results)
    cursor = response.has_more ? response.next_cursor : undefined
  } while (cursor)

  return pages
}

// 文章页的 <h1> 已经留给标题，所以 Notion 的 h1/h2/h3 统一降一级变成 h2/h3/h4，
// 三个层级在站内保持区分，也都能进目录；空标题丢掉。
// 引用块（Notion callout）里的标题降为加粗，避免引文里出现大标题。
function demoteHeadings(markdown) {
  let inCode = false
  const lines = []

  for (const line of markdown.split('\n')) {
    if (line.trimStart().startsWith('```')) inCode = !inCode

    if (!inCode) {
      const quoted = /^((?:>\s*)+)(#{1,6})\s+(.*)$/.exec(line)
      if (quoted) {
        lines.push(`${quoted[1]}**${quoted[3].trim()}**`)
        continue
      }

      const match = /^(#{1,6})(?:\s+(.*))?$/.exec(line)
      if (match) {
        const text = (match[2] ?? '').trim()
        if (!text) continue
        const level = Math.min(match[1].length + 1, 6)
        lines.push(`${'#'.repeat(level)} ${text}`)
        continue
      }
    }

    lines.push(line)
  }

  return lines.join('\n')
}

const RETRYABLE = new Set(['ECONNRESET', 'ETIMEDOUT', 'ENOTFOUND', 'EAI_AGAIN', 'rate_limited'])

async function withRetry(task, attempts = 3) {
  for (let attempt = 1; ; attempt += 1) {
    try {
      return await task()
    } catch (error) {
      const retryable = RETRYABLE.has(error.code) || error.status === 429
      if (!retryable || attempt >= attempts) throw error
      const wait = 700 * attempt
      console.warn(`  … ${error.code ?? error.status}，${wait}ms 后重试`)
      await sleep(wait)
    }
  }
}

// Notion 的 toggle 块会输出 <details><summary>，而正文渲染器默认不解析裸 HTML，
// 会原样显示标签。这里转成「加粗标题 + 内容」。
function unwrapToggles(markdown) {
  return markdown
    .replace(/<summary>([\s\S]*?)<\/summary>/g, (_, title) => `**${title.trim()}**`)
    .replace(/<\/?details>/g, '')
}

async function main() {
  await loadEnv()

  const token = process.env.NOTION_TOKEN
  const databaseId = process.env.NOTION_DATABASE_ID || config.databaseId

  if (!token || !databaseId) {
    console.warn('\n[notion] 未检测到 NOTION_TOKEN / NOTION_DATABASE_ID，已跳过同步。')
    console.warn('[notion] 复制 .env.example 为 .env 填入后，再运行 npm run sync:notion\n')
    return
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true })
  await fs.mkdir(IMAGE_DIR, { recursive: true })

  const notion = new Client({ auth: token })
  const n2m = new NotionToMarkdown({ notionClient: notion })

  const pages = await fetchAllPages(notion)
  if (pages.length === 0) {
    console.warn('[notion] 数据库里没有任何页面。')
    return
  }

  const sample = pages[0].properties ?? {}
  if (!(config.properties.published in sample)) {
    console.error(`\n[notion] 找不到属性「${config.properties.published}」。`)
    console.error(`[notion] 当前数据库属性：${Object.keys(sample).join('、')}`)
    console.error('[notion] 请修改 notion.config.mjs 里的 properties.published。\n')
    process.exitCode = 1
    return
  }

  const published = pages.filter(isPublished)
  console.log(`[notion] 共 ${pages.length} 篇，勾选发布 ${published.length} 篇`)

  const previous = await readManifest()
  const generated = []
  const usedSlugs = new Set()

  for (const page of published) {
    const title = readText(page, config.properties.title) || '未命名笔记'
    const customSlug = readText(page, config.properties.slug)
    let slug = slugify(customSlug) || slugify(title) || `note-${page.id.replace(/-/g, '').slice(0, 8)}`

    let suffix = 2
    while (usedSlugs.has(slug)) {
      slug = `${slug.replace(/-\d+$/, '')}-${suffix}`
      suffix += 1
    }
    usedSlugs.add(slug)

    const file = `${slug}.md`
    const target = path.join(OUTPUT_DIR, file)

    if (existsSync(target) && !previous.includes(file)) {
      console.warn(`  ! 跳过 ${file}：已存在同名手写文章`)
      continue
    }

    const blocks = await withRetry(() => n2m.pageToMarkdown(page.id))
    const converted = n2m.toMarkdownString(blocks)
    const rawBody = typeof converted === 'string' ? converted : (converted.parent ?? '')
    const body = await localizeImages(unwrapToggles(demoteHeadings(rawBody)), slug)

    const tags = readTags(page, config.properties.tags).map((tag) => config.tagMap[tag] ?? tag)

    const markdown = `${toFrontmatter({
      title,
      date: readDate(page, config.properties.date),
      tags,
      summary: readText(page, config.properties.summary),
      featured: page.properties?.[config.properties.featured]?.checkbox === true,
    })}${body.trim()}\n`

    await fs.writeFile(target, markdown, 'utf8')
    generated.push(file)
    console.log(`  ✓ ${file}`)

    await sleep(150)
  }

  const stale = previous.filter((file) => !generated.includes(file))
  for (const file of stale) {
    await fs.rm(path.join(OUTPUT_DIR, file), { force: true })
    const removedImages = await clearImages(file.replace(/\.md$/, ''))
    console.log(`  − 移除 ${file}（含 ${removedImages} 张配图）`)
  }

  // 兜底清理：处理早期版本只删 .md 留下的孤儿图片
  const orphans = await pruneImages(
    new Set(generated.map((file) => file.replace(/\.md$/, '')))
  )
  if (orphans) {
    console.log(`  − 清理 ${orphans} 张无主配图`)
  }

  await fs.writeFile(
    MANIFEST,
    `${JSON.stringify({ generated, syncedAt: new Date().toISOString() }, null, 2)}\n`,
    'utf8'
  )

  await buildContentIndex()

  console.log(`[notion] 完成，共 ${generated.length} 篇。\n`)
}

main().catch((error) => {
  if (error.code === 'unauthorized') {
    console.error('[notion] 401：NOTION_TOKEN 无效。')
  } else if (error.code === 'object_not_found') {
    console.error('[notion] 404：找不到数据库。请确认已在 Notion 里把这个数据库「连接」给该 Integration。')
  } else if (error.code === 'validation_error') {
    console.error(`[notion] 参数错误：${error.message}`)
  } else {
    console.error(error)
  }
  process.exit(1)
})
