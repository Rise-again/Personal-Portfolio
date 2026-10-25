import GithubSlugger from 'github-slugger'

import index from '@/content/index.json'
import { parseFrontmatter } from '@/lib/frontmatter'

// 正文按需加载：每篇 .md 会被切成独立 chunk，列表页只读 index.json 里的元数据。
const bodies = import.meta.glob(['../content/posts/*.md', '../content/notion/*.md'], {
  query: '?raw',
  import: 'default',
})

export function getAllPosts() {
  return index
}

export function getPostBySlug(slug) {
  return index.find((post) => post.slug === slug)
}

export function getAllTags() {
  const counts = new Map()
  for (const post of index) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1])
}

export function getAdjacentPosts(slug) {
  const position = index.findIndex((post) => post.slug === slug)
  return {
    newer: position > 0 ? index[position - 1] : null,
    older: position >= 0 && position < index.length - 1 ? index[position + 1] : null,
  }
}

export async function loadPostBody(slug) {
  const post = getPostBySlug(slug)
  if (!post) return null

  const loader = bodies[post.path]
  if (!loader) return null

  const raw = await loader()
  return parseFrontmatter(raw).body
}

// 抽取 h2 / h3 生成目录；slug 与 rehype-slug 保持一致。
export function extractHeadings(markdown) {
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '')
  const slugger = new GithubSlugger()
  const headings = []

  for (const line of withoutCode.split(/\r?\n/)) {
    const match = /^(#{2,4})\s+(.+?)\s*#*\s*$/.exec(line)
    if (!match) continue
    const text = match[2].replace(/[*_~`]/g, '').trim()
    headings.push({
      id: slugger.slug(text),
      text,
      depth: match[1].length,
    })
  }

  return headings
}
