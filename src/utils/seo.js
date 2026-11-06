import { asset, getAge } from './helpers'

function setMeta(attr, key, value) {
  if (!value) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

/** Writes title, description, social tags, favicon and JSON-LD from portfolio.js. */
export function applySeo(cfg) {
  const { site, profile, contact } = cfg
  document.title = site.title
  setMeta('name', 'description', site.description)
  setMeta('property', 'og:title', site.title)
  setMeta('property', 'og:description', site.description)
  setMeta('property', 'og:image', asset(profile.picture))
  setMeta('name', 'theme-color', cfg.theme.dark.bg)

  const icon = document.head.querySelector('link[rel="icon"]')
  if (icon && site.favicon) icon.setAttribute('href', asset(site.favicon))

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.fullName,
    jobTitle: profile.role,
    description: site.description,
    url: site.url || undefined,
    email: contact.email ? `mailto:${contact.email}` : undefined,
    sameAs: contact.socials.filter((s) => s.url).map((s) => s.url),
    age: getAge(profile) || undefined,
  }
  let script = document.getElementById('ld-json')
  if (!script) {
    script = document.createElement('script')
    script.id = 'ld-json'
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(ld)
}
