import { useEffect, useState } from 'react'

/** Turn "images/profile.jpg" into a URL that works in dev, build and sub-folder hosting. */
export function asset(path) {
  if (!path) return ''
  if (/^(https?:|data:|blob:)/.test(path)) return path
  return import.meta.env.BASE_URL + path.replace(/^\/+/, '')
}

export function calcAge(birthday) {
  const b = new Date(birthday)
  if (Number.isNaN(b.getTime())) return ''
  const now = new Date()
  let age = now.getFullYear() - b.getFullYear()
  const m = now.getMonth() - b.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age--
  return age
}

export function formatBirthday(birthday) {
  const d = new Date(birthday + 'T00:00:00')
  if (Number.isNaN(d.getTime())) return birthday
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })
}

export function getAge(profile) {
  return profile.age === 'auto' ? calcAge(profile.birthday) : profile.age
}

/** Typewriter that cycles through a list of words. */
export function useTypewriter(words, { type = 115, erase = 65, hold = 2200 } = {}) {
  const [text, setText] = useState('')
  useEffect(() => {
    if (!words?.length) return
    let wi = 0, ci = 0, deleting = false, timer
    const tick = () => {
      const word = words[wi]
      ci += deleting ? -1 : 1
      setText(word.slice(0, ci))
      let delay = deleting ? erase : type
      if (!deleting && ci === word.length) { deleting = true; delay = hold }
      else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 650 }
      timer = setTimeout(tick, delay)
    }
    timer = setTimeout(tick, 700)
    return () => clearTimeout(timer)
  }, [words, type, erase, hold])
  return text
}

/** Count of how many sections are enabled, in order. */
export const enabledSections = (cfg) => cfg.sections.filter((s) => s.enabled !== false)
