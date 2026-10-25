// 全站文案 / 导航 / 社交入口的唯一数据源。
// 换名字、换链接，只改这里。

export const site = {
  name: '陆知遥',
  nameEn: 'Lu Zhiyao',
  monogram: '陸',
  role: 'AI Product Manager',
  roles: ['AI 产品经理', '长期主义思考者', '古典音乐爱好者'],
  greeting: 'HELLO, I AM',
  tagline: '在算法与和声之间，寻找同一种结构之美。',
  intro:
    '我做 AI 产品，也听勃拉姆斯。相信优秀的产品与伟大的乐章共享同一套语法：结构、留白、以及克制的情绪。',
  email: 'hello@example.com',
  resumeUrl: '/resume.pdf',
  location: '杭州 · 中国',
  since: 2020,
}

export const navLinks = [
  { label: '首页', href: '/', en: 'HOME' },
  { label: '关于', href: '/about', en: 'ABOUT' },
  { label: '笔记', href: '/notes', en: 'NOTES' },
  { label: '作品', href: '/portfolio', en: 'WORK' },
  { label: '联络', href: '/connect', en: 'CONNECT' },
]

export const heroStats = [
  { value: '6+', label: '年产品实践' },
  { value: '32', label: '篇思考笔记' },
  { value: '12', label: '个作品与实验' },
]

export const tickerItems = [
  'AI PRODUCT',
  'MVP PHILOSOPHY',
  'CLASSICAL MUSIC',
  'DATA-DRIVEN',
  '0 → 1',
  'LONG-TERMISM',
  'BENTO DESIGN',
  'WALTZ NO.2',
]

// 首页黑胶播放的曲目。把音频文件放到 public/audio/waltz-no-2.mp3，
// 或把 src 换成你自己的音频地址（需你拥有播放权）。
export const nowPlaying = {
  title: '第二圆舞曲',
  artist: 'Shostakovich · Waltz No. 2',
  src: '/audio/waltz-no-2.mp3',
}

// 微信没有外部链接：点击卡片会打开二维码弹窗，handle 即微信号。
// 把二维码图片放到 public/wechat-qr.png 后会自动替换占位图。
export const socials = [
  {
    key: 'github',
    label: 'GitHub',
    handle: '@yourhandle',
    href: 'https://github.com/',
  },
  {
    key: 'x',
    label: 'X (Twitter)',
    handle: '@yourhandle',
    href: 'https://x.com/',
  },
  {
    key: 'wechat',
    label: '微信',
    handle: 'zhiyao-lu',
    qr: '/wechat-qr.png',
  },
  {
    key: 'jike',
    label: '即刻',
    handle: '@yourhandle',
    href: 'https://web.okjike.com/',
  },
  {
    key: 'redbook',
    label: '小红书',
    handle: '@yourhandle',
    href: 'https://www.xiaohongshu.com/',
  },
]
