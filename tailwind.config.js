/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // 深曜石 —— 基底
        obsidian: {
          950: '#06060a',
          900: '#0a0a0c',
          850: '#0d0d11',
          800: '#121218',
          700: '#1a1a22',
          600: '#26262f',
          500: '#35353f',
        },
        // 古铜金 —— 主强调色
        bronze: {
          100: '#F7EFD2',
          200: '#EADCA6',
          300: '#DFC672',
          400: '#D4AF37',
          500: '#B8932C',
          600: '#96741F',
          700: '#6F5518',
        },
        // 科技蓝 —— 冷调点缀，用于流光与链接态
        tech: {
          300: '#9CC0FF',
          400: '#6EA8FF',
          500: '#4C8DFF',
          600: '#2F6FE4',
        },
        // 暖白 —— 文字层级
        ink: {
          DEFAULT: '#F4F1EA',
          soft: '#C7C2B8',
          muted: '#8C8880',
          faint: '#5A5751',
        },
      },
      fontFamily: {
        display: [
          '"Cormorant Garamond"',
          '"Songti SC"',
          'STSong',
          'SimSun',
          'Georgia',
          'serif',
        ],
        sans: [
          'Inter',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          'system-ui',
          'sans-serif',
        ],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-lg': [
          'clamp(3.6rem, 9vw, 7rem)',
          { lineHeight: '0.92', letterSpacing: '-0.025em' },
        ],
        'display-sm': [
          'clamp(2.4rem, 5.5vw, 3.75rem)',
          { lineHeight: '1.05', letterSpacing: '-0.02em' },
        ],
      },
      boxShadow: {
        glow: '0 0 70px -12px rgba(212, 175, 55, 0.4)',
        'glow-sm': '0 0 26px -6px rgba(212, 175, 55, 0.45)',
        frame: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
        disc: 'inset 0 0 80px rgba(0, 0, 0, 0.9), 0 40px 90px -30px rgba(0, 0, 0, 0.95)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -16px, 0)' },
        },
        marquee: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        float: 'float 9s ease-in-out infinite',
        marquee: 'marquee 42s linear infinite',
        'spin-slow': 'spin-slow 44s linear infinite',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
