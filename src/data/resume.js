// 关于页（简历）的全部内容都在这里，改这一个文件就能更新整页。
// 带「示例」字样的都是占位文案，换成你自己的即可。

export const profile = {
  name: '陆知遥',
  nameEn: 'Lu Zhiyao',
  monogram: '陆',
  headline: '计算机科学与技术 · 大三',
  focus: 'AI 产品 / 前端开发',
  location: '杭州 · 中国',
  email: 'hello@example.com',
  github: 'https://github.com/',
  signature: '把复杂留给自己，把简单交给用户。',
  pitch:
    '计算机专业大三学生，做 AI 产品也写前端。比起把功能做出来，我更在意它为什么值得存在。',
  focusAreas: ['AI 产品设计', '前端工程', '数据驱动'],
  intro: [
    '我是陆知遥，浙江大学计算机科学与技术专业大三学生。比起把功能做出来，我更在意它为什么值得存在——所以我既写代码，也做产品。',
    '过去两年我在两个 AI 项目里负责从需求到上线的全过程：写需求、画原型、搭前端、看数据。做过最小的 MVP 是三个人两周上线，也踩过「功能都做完了但没人用」的坑。',
    '如果你也在意产品的结构感，或者想聊聊 AI 的边界，欢迎找我。',
  ],
}

export const jobTarget = {
  role: 'AI 产品经理 实习生',
  type: '日常实习',
  available: '2027 年 3 月起',
  cities: ['杭州', '上海', '北京'],
}

// 左侧档案栏的字段，顺序即显示顺序
export const basics = [
  { label: '学校', value: '浙江大学' },
  { label: '专业', value: '计算机科学与技术' },
  { label: '年级', value: '大三' },
  { label: '家乡', value: '浙江 · 宁波' },
  { label: '年龄', value: '21' },
  { label: 'GPA', value: '3.8 / 4.0' },
]

export const education = {
  school: '浙江大学',
  major: '计算机科学与技术',
  degree: '本科',
  period: '2024.09 — 2028.06',
  gpa: '3.8 / 4.0（专业前 10%）',
  courses: ['数据结构', '机器学习', '人机交互', '数据库系统', '产品设计基础'],
}

export const honors = [
  { year: '2026', title: '全国大学生计算机设计大赛', detail: '省一等奖' },
  { year: '2025', title: '校级优秀学生奖学金', detail: '二等' },
  { year: '2025', title: 'CET-6', detail: '612 分' },
]

export const projects = [
  {
    name: 'Atlas · AI 文档助手',
    role: '产品负责人 / 前端',
    period: '2026',
    summary:
      '把「从零写一份产品文档」压缩成三个问题，让独立开发者把模糊的想法变成可评审的文档。',
    highlights: ['上线三个月 2,300+ 名独立开发者使用', '首份文档完成率从 34% 提升到 61%'],
    tags: ['React', 'LLM', '流式输出'],
    href: 'https://example.com/atlas',
  },
  {
    name: 'Pulse · 会议纪要',
    role: '产品 / 工作流设计',
    period: '2025',
    summary: '不做全量转写，只保留「谁答应了什么、什么时候交付」。',
    highlights: ['每周处理 1,400 场会议', '把纪要整理时间从 20 分钟压到 3 分钟'],
    tags: ['Whisper', '工作流', '摘要'],
    href: 'https://example.com/pulse',
  },
  {
    name: '校园二手书小程序',
    role: '全栈开发',
    period: '2024',
    summary: '一个只服务本校的二手教材交易工具，解决开学季的买书难。',
    highlights: ['累计 1,800+ 注册用户', '开学季成交 600+ 单'],
    tags: ['小程序', 'Node.js', '微信支付'],
    href: '',
  },
]

export const experience = [
  {
    period: '2026.07 — 2026.09',
    role: '产品实习生',
    org: '某 AI 应用公司',
    desc: '参与 AI 工作流产品的需求分析与交互设计，独立负责「文档生成」模块从 0 到 1。',
  },
  {
    period: '2025.09 — 至今',
    role: '技术负责人',
    org: '学院创新实验室',
    desc: '带 4 人小组做校园工具类项目，负责技术选型与代码评审。',
  },
  {
    period: '2024.10 — 2025.06',
    role: '成员 → 核心成员',
    org: '校产品设计社团',
    desc: '组织过 6 场产品拆解活动，累计参与 300+ 人次。',
  },
]

export const nowDoing = [
  { label: '在读', value: '《The Art of Doing Science and Engineering》' },
  { label: '在做', value: '一个面向独立开发者的 AI 文档工具' },
  { label: '在学', value: 'Rust 与 WebGL，想把唱片可视化做得更真' },
]

export const skills = [
  { group: '语言', items: ['TypeScript', 'Python', 'SQL', 'Java'] },
  { group: '框架与库', items: ['React', 'Next.js', 'FastAPI', 'PyTorch'] },
  { group: '产品与设计', items: ['Figma', 'Notion', 'Amplitude', 'Dovetail'] },
  { group: '正在学', items: ['Rust', 'Three.js', 'Prompt Engineering'] },
]

export const interests = [
  {
    icon: 'Music4',
    title: '古典音乐',
    note: '从巴赫到肖斯塔科维奇，越听越觉得结构比旋律更动人。',
  },
  {
    icon: 'Coffee',
    title: '手冲咖啡',
    note: '周末在家练手冲，喜欢浅烘的柑橘调。',
  },
  {
    icon: 'Footprints',
    title: '长跑',
    note: '每周 20 公里，跑过半马，目标是明年全马。',
  },
  {
    icon: 'BookOpen',
    title: '读书',
    note: '偏爱工程史与设计类，最近在读《人月神话》。',
  },
]

export const lastUpdated = '2026.10'
