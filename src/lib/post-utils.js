export function countReadingMinutes(text) {
  const cjk = (text.match(/[一-龥]/g) || []).length
  const latin = (text.replace(/[一-龥]/g, ' ').match(/[A-Za-z0-9]+/g) || []).length
  return Math.max(1, Math.ceil(cjk / 400 + latin / 220))
}

export function countWords(text) {
  return text.replace(/\s/g, '').length
}

export function formatDate(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value ?? '')
  const pad = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`
}
