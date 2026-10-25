import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'

import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import markdown from 'highlight.js/lib/languages/markdown'
import python from 'highlight.js/lib/languages/python'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'

// 只注册常用语言，避免把 highlight.js 的全量语言包打进产物。
const LANGUAGES = {
  bash,
  sh: bash,
  css,
  javascript,
  js: javascript,
  jsx: javascript,
  json,
  markdown,
  md: markdown,
  python,
  py: python,
  typescript,
  ts: typescript,
  tsx: typescript,
  html: xml,
  xml,
}

const components = {
  a({ href, children, ...props }) {
    const external = typeof href === 'string' && href.startsWith('http')
    return (
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : null)}
        {...props}
      >
        {children}
      </a>
    )
  },
  table({ children }) {
    return (
      <div className="md-table-wrap">
        <table>{children}</table>
      </div>
    )
  },
  img({ alt, ...props }) {
    return <img alt={alt ?? ''} loading="lazy" {...props} />
  },
}

export default function Markdown({ children }) {
  return (
    <div className="md-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [rehypeHighlight, { languages: LANGUAGES, ignoreMissing: true }],
        ]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
