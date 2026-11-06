import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUp, Music2, Pause, Play } from 'lucide-react'
import { asset } from '../utils/helpers'

/** Thin red line on the left edge that fills as you scroll (from the reference video). */
export function ScrollLine() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 65, damping: 32 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleY, transformOrigin: 'top' }}
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-screen w-[3px] bg-accent md:block"
    />
  )
}

/** Round button that appears after scrolling down. */
export function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 transition hover:scale-110"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

/** User-controlled looping background music; no audio starts until Play is pressed. */
export function MusicPlayer({ src }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState('')

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }

    setError('')
    try {
      await audio.play()
      setPlaying(true)
    } catch (err) {
      console.error('[portfolio] Could not play background music:', err)
      setError('Add your MP3 at public/audio/portfolio.mp3')
      setPlaying(false)
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 flex max-w-[calc(100vw-6rem)] items-center gap-2">
      <audio
        ref={audioRef}
        src={asset(src)}
        loop
        preload="none"
        onError={() => {
          setPlaying(false)
          setError('Add your MP3 at public/audio/portfolio.mp3')
        }}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        aria-pressed={playing}
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-accent-soft/40 bg-surface/95 text-accent-soft shadow-lg backdrop-blur transition-colors hover:border-accent hover:text-accent"
      >
        {playing ? <Pause size={18} /> : <Play size={18} />}
      </button>
      <span className="flex items-center gap-1.5 rounded-full border border-line bg-surface/95 px-3 py-2 text-xs text-muted shadow-lg backdrop-blur" aria-live="polite">
        <Music2 size={14} className={playing ? 'text-accent-soft' : ''} />
        {error || (playing ? 'Now playing' : 'Music off')}
      </span>
    </div>
  )
}

/** Red curtain intro that wipes away. Turn off with effects.preloader = false. */
export function Preloader({ name, onDone }) {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2000)
    return () => clearTimeout(t)
  }, [])
  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="pre"
          className="fixed inset-0 z-[100] grid place-items-center bg-accent"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            className="font-display text-6xl uppercase text-white sm:text-8xl"
          >
            {name}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const CURSORS = [
  { top: '22%', left: '8%', color: '#d3b16b', dx: 40, dy: 24, d: 9 },
  { top: '60%', left: '72%', color: '#b85a70', dx: -50, dy: 30, d: 11 },
  { top: '38%', left: '48%', color: '#aaa4c5', dx: 30, dy: -36, d: 13 },
]

/** Decorative drifting cursor arrows with name tags (like the multiplayer cursors in the video). */
export function FloatingCursors({ labels = [] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
      {CURSORS.map((c, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: c.top, left: c.left }}
          animate={{ x: [0, c.dx, 0, -c.dx / 2, 0], y: [0, c.dy, -c.dy / 2, c.dy / 3, 0] }}
          transition={{ duration: c.d * 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={c.color} stroke="#000" strokeWidth="1">
            <path d="M3 2l7 19 3-8 8-3z" />
          </svg>
          {labels[i] && (
            <span
              className="ml-4 -mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold text-black"
              style={{ background: c.color }}
            >
              {labels[i]}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export function Marquee({ words }) {
  if (!words?.length) return null
  const row = [...words, ...words]
  return (
    <div className="overflow-hidden border-y border-line bg-surface py-4" aria-hidden>
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <span key={i} className="flex items-center font-display text-3xl uppercase text-ink/80 sm:text-4xl">
                <span className="px-6">{w}</span>
                <span className="text-accent">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
