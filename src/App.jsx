import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import cfg from './data/portfolio'
import registry from './sections'
import Navbar from './components/Navbar'
import ErrorBoundary from './components/ErrorBoundary'
import DebugPanel from './components/DebugPanel'
import AnimeAtmosphere from './components/AnimeAtmosphere'
import { BackToTop, Marquee, MusicPlayer, Preloader, ScrollLine } from './components/Extras'
import { applyThemeColors, initialMode } from './utils/theme'
import { applySeo } from './utils/seo'
import { enabledSections } from './utils/helpers'

export default function App() {
  const [mode, setMode] = useState(() => initialMode(cfg.theme))
  const [ready, setReady] = useState(!cfg.effects.preloader)
  const sections = useMemo(() => enabledSections(cfg), [])

  // colors + SEO from portfolio.js
  useEffect(() => { applyThemeColors(cfg.theme); applySeo(cfg) }, [])

  // dark / light
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode)
    try { localStorage.setItem('theme', mode) } catch (e) { /* storage blocked */ }
  }, [mode])

  // Section numbers skip "home", so About = 01, Skills = 02 ...
  let n = 0
  return (
    <>
      <AnimeAtmosphere />
      {cfg.effects.preloader && <Preloader name={cfg.profile.displayName} onDone={() => setReady(true)} />}
      {cfg.effects.scrollLine && <ScrollLine />}
      <Navbar cfg={cfg} sections={sections} mode={mode} onToggleMode={() => setMode((m) => (m === 'dark' ? 'light' : 'dark'))} />

      <motion.main className="relative z-10" initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 1.2 }}>
        {sections.map((s) => {
          const Section = registry[s.id]
          if (!Section) {
            console.error(`[portfolio] sections[] has id "${s.id}" but src/sections/index.js has no component for it.`)
            return null
          }
          if (s.id !== 'home') n += 1
          return (
            <ErrorBoundary key={s.id} name={s.id}>
              <Section cfg={cfg} number={n} />
              {s.id === 'home' && <Marquee words={cfg.marquee} />}
            </ErrorBoundary>
          )
        })}
      </motion.main>

      <footer className="relative z-10 border-t border-line bg-bg/70 px-5 py-8 text-center text-sm text-muted backdrop-blur-sm">
        <p className="font-display text-4xl uppercase text-ink sm:text-6xl">{cfg.contact.heading}</p>
        <p className="mt-4">
          © {new Date().getFullYear()} {cfg.profile.fullName}. {cfg.site.footerNote}
        </p>
      </footer>

      <BackToTop />
      <MusicPlayer src={cfg.musicFile} />
      <DebugPanel cfg={cfg} mode={mode} />
    </>
  )
}
