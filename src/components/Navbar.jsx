import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'

export default function Navbar({ cfg, sections, mode, onToggleMode }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      // highlight the section currently in the middle of the viewport
      const mid = window.scrollY + window.innerHeight * 0.4
      let current = sections[0]?.id
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && el.offsetTop <= mid) current = s.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sections])

  const go = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? 'border-line bg-bg/85 backdrop-blur-md' : 'border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8" aria-label="Main">
        <button onClick={() => go('home')} className="font-display text-2xl tracking-wide" aria-label="Back to top">
          {cfg.site.logoText}
          <span className="text-accent">.</span>
        </button>

        <ul className="hidden items-center gap-4 md:flex xl:gap-8">
          {sections.filter((s) => s.id !== 'home').map((s) => (
            <li key={s.id}>
              <button
                onClick={() => go(s.id)}
                className={`relative text-sm font-medium transition-colors hover:text-accent ${
                  active === s.id ? 'text-accent' : 'text-muted'
                }`}
              >
                {s.label}
                {active === s.id && (
                  <motion.span layoutId="nav-underline" className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-accent" />
                )}
              </button>
            </li>
          ))}
          <li>
            <ThemeButton mode={mode} onToggle={onToggleMode} />
          </li>
        </ul>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeButton mode={mode} onToggle={onToggleMode} />
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden px-5 pb-4 md:hidden"
          >
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => go(s.id)}
                  className={`w-full border-b border-line py-4 text-left font-display text-3xl uppercase ${
                    active === s.id ? 'text-accent' : ''
                  }`}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}

function ThemeButton({ mode, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="grid h-10 w-10 place-items-center rounded-full border border-line transition hover:border-accent hover:text-accent"
      aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
    >
      {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
