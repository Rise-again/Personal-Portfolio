// 优先用 Clipboard API；被权限拦下时退回 execCommand，保证「复制」在受限环境下仍有反馈。
export async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // 继续走降级路径
  }

  try {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.top = '-9999px'
    area.style.opacity = '0'

    document.body.appendChild(area)
    area.select()
    area.setSelectionRange(0, text.length)
    const copied = document.execCommand('copy')
    document.body.removeChild(area)

    return copied
  } catch {
    return false
  }
}
