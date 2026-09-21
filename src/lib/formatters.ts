export const fmtDuration = (sec: number): string => {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}m ${s}s`
}

export const fmtDate = (dStr?: string): string => {
  if (!dStr) return 'N/A'
  try {
    const d = new Date(dStr)
    if (isNaN(d.getTime())) return dStr
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch {
    return dStr
  }
}

export const fmtDateTime = (dStr?: string): string => {
  if (!dStr) return 'N/A'
  try {
    const d = new Date(dStr)
    if (isNaN(d.getTime())) return dStr
    return d.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return dStr
  }
}
