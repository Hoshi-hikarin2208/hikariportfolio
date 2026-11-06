/** Pushes colors from portfolio.js into CSS variables (see src/index.css). */
export function applyThemeColors(theme) {
  const root = document.documentElement
  root.style.setProperty('--accent', theme.accent)
  root.style.setProperty('--accent-soft', theme.accentSoft)
  const toVars = (mode, c) => {
    // injected as a <style> so [data-theme] switching stays instant
    return `:root[data-theme="${mode}"]{--bg:${c.bg};--surface:${c.surface};--text:${c.text};--muted:${c.muted};--border:${c.border};}`
  }
  let style = document.getElementById('theme-vars')
  if (!style) {
    style = document.createElement('style')
    style.id = 'theme-vars'
    document.head.appendChild(style)
  }
  style.textContent = toVars('dark', theme.dark) + toVars('light', theme.light)
}

export function initialMode(theme) {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || saved === 'light') return saved
  } catch (e) { /* storage blocked */ }
  return theme.defaultMode || 'dark'
}
