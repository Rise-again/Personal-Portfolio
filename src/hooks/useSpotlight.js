import { useRef } from 'react'

// 让元素跟随鼠标产生聚光：效果样式在 index.css 的 .spotlight::before 里。
export default function useSpotlight() {
  const ref = useRef(null)

  function onMouseMove(event) {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    node.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    node.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return { ref, onMouseMove }
}
