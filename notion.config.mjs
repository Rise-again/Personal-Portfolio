// Notion 同步配置。属性名按你数据库里的实际名称修改即可（中英文都支持）。
export default {
  // 也可以只写在 .env 的 NOTION_DATABASE_ID 里
  databaseId: process.env.NOTION_DATABASE_ID ?? '',

  properties: {
    title: 'Name',
    published: 'Published',
    slug: 'Slug',
    date: 'Date',
    tags: 'Tags',
    summary: 'Summary',
    featured: 'Featured',
  },

  // 把 Notion 标签映射成站内标签，例如 { Product: '产品' }
  tagMap: {},

  outputDir: 'src/content/notion',
  imageDir: 'public/notion',
  imagePathPrefix: '/notion',
}
