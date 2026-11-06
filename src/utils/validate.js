import { asset } from './helpers'

/**
 * Checks portfolio.js for common mistakes and returns a list of
 * { level: 'error' | 'warn', where: 'projects[1].image', msg: '...' }.
 * Shown in the Debug panel (Ctrl+Shift+D) and printed in the browser console.
 */
export function validateConfig(cfg) {
  const issues = []
  const add = (level, where, msg) => issues.push({ level, where, msg })
  const isUrl = (u) => /^https?:\/\/\S+\.\S+/.test(u)
  const need = (obj, key, where) => {
    if (!obj || obj[key] === undefined || obj[key] === '') add('warn', `${where}.${key}`, 'is empty')
  }
  const hex = (v) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v)

  if (!cfg.profile?.fullName) add('error', 'profile.fullName', 'missing')
  if (Number.isNaN(new Date(cfg.profile?.birthday).getTime()))
    add('error', 'profile.birthday', 'must look like 2005-01-08 (YYYY-MM-DD)')
  if (!hex(cfg.theme?.accent)) add('error', 'theme.accent', `"${cfg.theme?.accent}" is not a hex color like #e5322d`)

  const ids = new Set()
  ;(cfg.sections || []).forEach((s, i) => {
    if (ids.has(s.id)) add('error', `sections[${i}].id`, `duplicate id "${s.id}"`)
    ids.add(s.id)
  })

  ;(cfg.skills || []).forEach((s, i) => {
    const w = `skills[${i}]`
    need(s, 'title', w)
    if (typeof s.level !== 'number' || s.level < 0 || s.level > 100) add('error', `${w}.level`, 'must be a number 0-100')
    if (!Array.isArray(s.items)) add('error', `${w}.items`, 'must be a list like ["React", "Node"]')
  })

  ;(cfg.projects || []).forEach((p, i) => {
    const w = `projects[${i}]`
    need(p, 'title', w); need(p, 'description', w)
    if (!Array.isArray(p.tech)) add('error', `${w}.tech`, 'must be a list like ["React"]')
    ;['github', 'demo'].forEach((k) => {
      if (p[k] && !isUrl(p[k])) add('error', `${w}.${k}`, `"${p[k]}" is not a valid link (must start with https://)`)
      if (p[k] && /your-username|example\.com/.test(p[k])) add('warn', `${w}.${k}`, 'still a placeholder link')
    })
  })

  ;(cfg.education || []).forEach((e, i) => {
    need(e, 'school', `education[${i}]`); need(e, 'degree', `education[${i}]`)
    if (e.school && /Your /.test(e.school)) add('warn', `education[${i}].school`, 'still a placeholder name')
  })

  ;(cfg.contact?.socials || []).forEach((s, i) => {
    if (s.url && !isUrl(s.url)) add('error', `contact.socials[${i}].url`, `"${s.url}" is not a valid link`)
    if (s.url && /your-username/.test(s.url)) add('warn', `contact.socials[${i}].url`, 'still a placeholder link')
  })
  if (!cfg.contact?.email) add('warn', 'contact.email', 'is empty (contact form cannot send)')
  if (!cfg.contact?.formEndpoint) add('warn', 'contact.formEndpoint', 'empty: form falls back to opening your email app (see README)')
  return issues
}

/** Collects every image/file path in the config so we can test that each one loads. */
export function collectAssets(cfg) {
  const list = [
    ['profile.picture', cfg.profile.picture],
    ['about.picture', cfg.about.picture],
    ['site.favicon', cfg.site.favicon],
    ['profile.cvFile', cfg.profile.cvFile],
  ]
  cfg.projects.forEach((p, i) => list.push([`projects[${i}].image`, p.image]))
  cfg.education.forEach((e, i) =>
    (e.certificates || []).forEach((c, j) => c.image && list.push([`education[${i}].certificates[${j}].image`, c.image])),
  )
  return list.filter(([, p]) => p)
}

/** Requests each asset and reports the ones that 404. */
export async function checkAssets(cfg) {
  const results = await Promise.all(
    collectAssets(cfg).map(async ([where, path]) => {
      try {
        const res = await fetch(asset(path), { method: 'GET', cache: 'no-store' })
        const type = res.headers.get('content-type') || ''
        // Vite dev server answers unknown files with index.html (200) — treat that as missing.
        const missing = !res.ok || (type.includes('text/html') && !path.endsWith('.html'))
        return missing ? { level: 'warn', where, msg: `file not found: public/${path} (a fallback is shown)` } : null
      } catch {
        return { level: 'warn', where, msg: `could not load public/${path}` }
      }
    }),
  )
  return results.filter(Boolean)
}
