# 陆知遥 · Personal Portfolio

一个「古典音乐 × AI 科技」双重气质的个人网站：深曜石底色、古铜金渐变、五线谱网格、黑胶唱片视觉与 Bento 内容结构。

技术栈：React 18 · Vite 5 · React Router 6 · Tailwind CSS 3 · Framer Motion · Lucide React · react-markdown

---

## 快速开始

```bash
npm install
npm run dev
```

访问 http://localhost:5173。

```bash
npm run build     # 产物输出到 dist/
npm run preview   # 本地预览生产构建
```

字体通过 `@fontsource` 本地打包（Cormorant Garamond / Inter / JetBrains Mono），**不依赖 Google Fonts CDN**。中文标题回退到系统衬线体（Windows: SimSun / macOS: Songti SC）。

---

## 目录结构

```
.
├─ index.html
├─ vite.config.js
├─ tailwind.config.js          # 设计令牌：色板、字号、动效、阴影
├─ postcss.config.js
├─ notion.config.mjs           # Notion 数据库属性名映射
├─ scripts/
│  └─ sync-notion.mjs          # Notion → Markdown 同步脚本
├─ .env.example                # Notion 凭据模板（.env 不进仓库）
├─ public/
│  ├─ favicon.svg
│  ├─ resume.pdf               # 需自行放入（「下载简历」按钮指向它）
│  ├─ wechat-qr.png            # 微信二维码（缺省显示占位图）
│  ├─ notion/                  # Notion 同步下来的图片
│  └─ audio/waltz-no-2.mp3     # 首页黑胶播放的音频（当前为示例曲目，可替换）
└─ src/
   ├─ main.jsx
   ├─ App.jsx                  # 路由表（文章详情页按需加载）
   ├─ index.css                # Tailwind 层 + 玻璃/五线谱/黑胶/Markdown 排版/代码高亮主题
   ├─ lib/
   │  ├─ cn.js
   │  ├─ clipboard.js          # 复制邮箱：Clipboard API + execCommand 降级
   │  ├─ frontmatter.js        # 极简 frontmatter 解析（支持 [a, b] 列表）
   │  └─ posts.js              # Markdown 聚合、排序、标签统计、阅读时长、目录抽取
   ├─ data/
   │  ├─ site.js               # ★ 全站文案/导航/社交/统计
   │  ├─ about.js              # 关于页：能力矩阵、履历、此刻、方法论、工具
   │  └─ projects.js           # ★ 作品集条目
   ├─ content/posts/*.md       # ★ 文章正文（frontmatter + Markdown）
   ├─ components/
   │  ├─ layout/               # RootLayout · Navbar · Footer · ScrollProgress · ScrollToTop
   │  ├─ hero/                 # Hero · VinylDisc · Waveform · Ticker
   │  ├─ notes/                # NoteCard · Markdown · TableOfContents
   │  ├─ portfolio/            # ProjectGlyph（作品卡片上的抽象图形）
   │  ├─ connect/              # BusinessCard（互动名片）· WeChatModal（二维码弹窗）
   │  └─ ui/                   # Button · BentoCard
   └─ pages/                   # Home · About · Notes · NoteDetail · Portfolio · Connect · NotFound
```

---

## 写一篇新文章

在 `src/content/posts/` 新建 `.md` 文件，**文件名即 URL slug**（如 `my-post.md` → `/notes/my-post`）：

```markdown
---
title: 文章标题
date: 2026-10-01
tags: [产品, AI]
summary: 一句话摘要，会出现在列表卡片和详情页顶部。
featured: true
---

正文从这里开始，支持 GFM：表格、任务列表、删除线、自动链接。
```

规则：

- `date` 用 `YYYY-MM-DD`，列表按日期倒序排列。
- `tags` 写 `[A, B]` 或 `A, B` 均可，标签筛选条自动生成。
- `summary` 建议控制在 60 字内。
- `featured` 目前不影响排序，保留给后续首页精选使用。
- 标题会自动生成锚点（`rehype-slug`），目录（h2 / h3）在 `xl` 以上屏幕右侧吸顶显示。
- 阅读时长按「中文 400 字/分钟 + 英文 220 词/分钟」估算。

- **性能**：文章列表只读取 `src/content/index.json` 里的元数据，正文按篇打包成独立 chunk，点开哪篇才下载哪篇。索引会在 `dev` / `build` 前自动生成（`scripts/build-content-index.mjs`），开发时增删 `.md` 也会自动重建。

代码块高亮只注册了常用语言（js/ts/py/bash/json/css/html/md），需要更多语言时在 `src/components/notes/Markdown.jsx` 的 `LANGUAGES` 里补充即可。

---

## 首页黑胶播放器

点击唱片即可播放 / 暂停：唱臂落入唱片（播放）或摆回唱片上沿之外（暂停），唱片的转动随之启停，正在播放卡片同步显示 `TAP TO PLAY` / `NOW PLAYING` / `PAUSED`。音频地址来自 `site.js` 的 `nowPlaying.src`，默认指向 `public/audio/waltz-no-2.mp3`。

播放状态由 `components/player/PlayerProvider` 统一持有，`<audio>` 挂在全局布局里——**切换到笔记、作品等页面音乐不会中断**。离开首页后，右下角会出现一个毛玻璃悬浮条，可以继续播放 / 暂停；回到首页时黑胶与悬浮条的状态始终同步。

---

## 作品集与联络页

- **作品集** `src/data/projects.js`：每条含 `title / category / year / value / tags / metric / href / size / glyph`。
  `size` 决定 Bento 尺寸（`hero` 7×2 栏、`wide` 5 栏、`third` 4 栏），`glyph` 决定卡片的抽象图形（`rings / bars / grid / wave`）。新增作品只需往数组里加一条。
- **联络页**：顶部是一张横版互动名片（邮箱一键复制、微信二维码入口、合作状态）；下方社交矩阵为 GitHub / X / 微信 / 即刻 / 小红书 五张卡片，悬停上移并泛起古铜金微光。- **微信卡片**不跳转外链，而是打开古铜金描边的毛玻璃弹窗：展示二维码 + 一键复制微信号。把二维码图片放到 `public/wechat-qr.png`，弹窗会自动用它替换占位图。
- 社交入口读取 `site.js` 的 `socials`，`key` 决定图标（github / x / wechat / jike / redbook）；微信条目的 `handle` 即微信号。

---

## 接入 Notion（可选）

站内文章有两种来源，可以共存：

1. **手写 Markdown** —— 直接放进 `src/content/posts/`。
2. **Notion 数据库** —— 在 Notion 里勾选，运行 `npm run sync:notion` 同步成本地 Markdown。

同步发生在**构建之前**，浏览器不会直接调用 Notion（secret token 不能进前端）。产物就是普通 `.md`，标签、目录、阅读时长、代码高亮全部照旧。

### 一次性配置

1. 打开 <https://www.notion.so/my-integrations> → New integration → 复制 **Internal Integration Secret**。
2. 在 Notion 打开你的笔记数据库 → 右上 `⋯` → `Connections` → 勾选刚建的 Integration（少了这步会返回 404）。
3. 数据库需要以下属性（名字不同就去 `notion.config.mjs` 里改）：

   | 用途 | 默认属性名 | 类型 |
   | --- | --- | --- |
   | 标题 | `Name` | Title |
   | 是否发布 | `Published` | Checkbox |
   | 标签 | `Tags` | Multi-select |
   | 日期 | `Date` | Date |
   | 摘要 | `Summary` | Text |
   | 短链（可选） | `Slug` | Text |
   | 精选（可选） | `Featured` | Checkbox |

4. 复制 `.env.example` 为 `.env`，填入 `NOTION_TOKEN` 和 `NOTION_DATABASE_ID`（数据库链接里那串 32 位字符）。

### 日常使用

```bash
npm run sync:notion
```

- 只同步勾选了 `Published` 的页面；标题、标签、日期、摘要从数据库属性读取。
- 图片自动下载到 `public/notion/` 并改写为本地路径——Notion 的图片链接有时效，不落地会裂图。
- 取消勾选后，下次同步会删除对应的 `.md` **和它下载的图片**，并重建索引；`public/notion/` 由脚本独占管理，不属于任何现存文章的图片会被一并清理。
- 同步记录在 `.notion-sync.json`，脚本只删自己生成的，不会碰手写文章。
- 生成的文件不要手改，每次同步都会覆盖。
- 同步完把 `src/content/posts/*.md` 和 `public/notion/` 一起提交，构建仍然是纯静态。

### 部署时自动同步

在 Vercel 项目里添加 `NOTION_TOKEN`、`NOTION_DATABASE_ID` 两个环境变量，并把 Build Command 改成：

```bash
npm run sync:notion && npm run build
```

缺少凭据的环境（例如别人 clone 下来第一次运行）脚本会打印提示并跳过，不会让构建失败。

---

## 设计令牌（`tailwind.config.js`）

| 用途 | Token | 色值 |
| --- | --- | --- |
| 深曜石基底 | `obsidian-900` | `#0a0a0c` |
| 抬升面板 | `obsidian-800` | `#121218` |
| 古铜金主色 | `bronze-400` | `#d4af37` |
| 浅金高光 | `bronze-300` | `#dfc672` |
| 深铜压暗 | `bronze-600` | `#96741f` |
| 科技蓝点缀 | `tech-400` | `#6ea8ff` |
| 主文字（暖白） | `ink` | `#f4f1ea` |
| 次要文字 | `ink-muted` | `#8c8880` |

字体：`font-display` = Cormorant Garamond、`font-sans` = Inter、`font-mono` = JetBrains Mono。

复用类（`src/index.css`）：`.glass`、`.text-gradient-gold`、`.score-grid`、`.score-mask`、`.noise-overlay`、`.vinyl-grooves`、`.vinyl-sheen`、`.hairline`、`.spotlight`（鼠标跟随聚光，配合 `useSpotlight`）、`.md-content`（文章排版）。

---

## 定制清单

1. **改名字 / 身份 / 邮箱 / 社交链接**：`src/data/site.js`（微信号也在 `socials` 的 wechat 条目里）。
2. **改关于页内容**：`src/data/about.js`。
3. **改作品集**：`src/data/projects.js`。
4. **换简历**：把 PDF 放到 `public/resume.pdf`（缺失会 404）。
5. **换微信二维码**：把图片放到 `public/wechat-qr.png`；没有该文件时弹窗显示占位图。
6. **换首页音乐**：把音频放到 `public/audio/waltz-no-2.mp3`（需你自行提供并确认拥有播放权），或在 `src/data/site.js` 的 `nowPlaying` 里改 `src` / `title` / `artist`。音频缺失时点击唱片，卡片会显示 `AUDIO NOT FOUND` 而不是静默失败。
7. **改主色**：`tailwind.config.js` 的 `colors.bronze` 与 `colors.tech`。
8. **换首页主标题**：`Hero.jsx` 中 h1 的两个 `<span>`（当前英文大、中文小）。
9. **动效**：全局尊重 `prefers-reduced-motion`。

## 性能

- 文章详情页通过 `React.lazy` 单独分包，首屏不加载 Markdown 渲染管线（主包约 118 KB gzip，详情页按需 116 KB gzip）。
- 文章正文按篇拆成独立 chunk：列表页只加载约 60 行的元数据索引，几十万字的長文只在点开时才下载。
- 高亮库仅注册常用语言，避免全量语法包。
- 作品卡片图形为内联 SVG，无图片请求。

## 部署

- **Vercel**：导入仓库，Framework 选 Vite，无需额外配置。
- **GitHub Pages**：`vite build` 后发布 `dist/`；因使用 BrowserRouter，子路由刷新会 404，建议改用 `HashRouter` 或配置 404 回退页。
