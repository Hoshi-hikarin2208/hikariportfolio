import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowDown, ArrowDownToLine, ArrowRight, MapPin } from 'lucide-react'
import SafeImage from '../components/SafeImage'
import { FloatingCursors } from '../components/Extras'
import { asset, useTypewriter } from '../utils/helpers'

export default function Hero({ cfg }) {
  const { profile, effects } = cfg
  const typed = useTypewriter(profile.typedSkills)
  const tiltX = useSpring(useMotionValue(0), { stiffness: 70, damping: 22 })
  const tiltY = useSpring(useMotionValue(0), { stiffness: 70, damping: 22 })
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const tiltPortrait = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    tiltX.set(((event.clientY - bounds.top) / bounds.height - 0.5) * -9)
    tiltY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 9)
  }
  const resetPortrait = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <section id="home" className="noise mystic-hero relative flex min-h-screen items-center overflow-hidden pt-20">
      {effects.floatingCursors && <FloatingCursors labels={effects.cursorLabels} />}
      <div className="anime-sparkle anime-sparkle-one" aria-hidden="true">✦</div>
      <div className="anime-sparkle anime-sparkle-two" aria-hidden="true">✧</div>
      <div className="anime-petal anime-petal-one" aria-hidden="true" />
      <div className="anime-petal anime-petal-two" aria-hidden="true" />

      {/* giant backdrop word */}
      <motion.p
        aria-hidden
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.8, delay: 0.35 }}
        className="pointer-events-none absolute left-1/2 top-[30%] -translate-x-1/2 select-none whitespace-nowrap font-display text-[26vw] leading-none text-fill-accent opacity-90 md:top-[24%] md:text-[20vw]"
      >
        {profile.heroBackdropWord}
      </motion.p>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-6 px-5 pb-16 md:grid-cols-12 md:px-8">
        <div className="relative z-10 md:col-span-7">
          <div className="anime-hero-kicker mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-2">
              <span className="anime-status-dot" /> STARTING MY NEXT ARC
            </span>
            {profile.location && (
              <span className="inline-flex items-center gap-1.5 text-white/65">
                <MapPin size={13} /> {profile.location}
              </span>
            )}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.8 }}
            className="font-script text-4xl text-white md:text-5xl"
          >
            {profile.greeting}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.7, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 font-display text-[22vw] uppercase leading-[0.85] tracking-tight text-white sm:text-[16vw] md:text-[10rem] lg:text-[11rem]"
            style={{ textShadow: '0 6px 40px rgba(0,0,0,.35)' }}
          >
            {profile.displayName}
            {profile.displaySurname && (
              <>
                <br />
                <span className="text-white">{profile.displaySurname}</span>
              </>
            )}
            <span className="text-accent">.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1.2 }}
            className="anime-profile-panel mt-6 max-w-xl bg-bg/65 py-4 pl-5 pr-4 backdrop-blur-sm"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{profile.role}</p>
            <p className="mt-2 min-h-8 font-display text-xl uppercase text-ink sm:text-3xl" aria-live="polite">
              {typed}
              <span className="ml-0.5 inline-block w-[3px] animate-pulse bg-accent align-middle">&nbsp;</span>
            </p>
            <p className="mt-2 text-muted">{profile.tagline}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1.2 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <button
              onClick={() => go('projects')}
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-white transition hover:scale-[1.03] hover:shadow-lg hover:shadow-accent/30"
            >
              {profile.heroButtons.primary}
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => go('contact')}
              className="rounded-full border border-line bg-bg/60 px-7 py-3.5 font-semibold backdrop-blur transition hover:border-accent hover:text-accent"
            >
              {profile.heroButtons.secondary}
            </button>
            {profile.cvFile && (
              <a
                href={asset(profile.cvFile)}
                download
                className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 font-semibold text-muted transition hover:text-accent"
              >
                <ArrowDownToLine size={18} /> {profile.heroButtons.cv}
              </a>
            )}
          </motion.div>

          <button
            onClick={() => go('about')}
            className="anime-scroll-cue group mt-7 inline-flex items-center gap-3 text-xs font-semibold uppercase text-muted transition hover:text-accent"
          >
            <span className="grid h-9 w-9 place-items-center border border-line text-accent transition group-hover:border-accent">
              <ArrowDown size={16} />
            </span>
            Explore the story
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, delay: 0.8 }}
          className="relative z-0 mx-auto w-full max-w-sm md:col-span-5 md:max-w-none"
          onPointerMove={tiltPortrait}
          onPointerLeave={resetPortrait}
        >
          <div className="anime-aura" aria-hidden="true" />
          <div className="arcane-moon" aria-hidden="true" />
          <span className="arcane-seal arcane-seal-one" aria-hidden="true">IX</span>
          <span className="arcane-seal arcane-seal-two" aria-hidden="true">✦</span>
          <motion.div
            className="portrait-3d relative"
            style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
          >
            <div
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[45%_45%_1.5rem_1.5rem] border border-line md:rounded-[45%_45%_2rem_2rem]"
              style={{ maskImage: 'linear-gradient(to bottom, #000 78%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, #000 78%, transparent)' }}
            >
              <SafeImage src={profile.picture} alt={`Portrait of ${profile.fullName}`} className="h-full w-full" loading="eager" />
              <div className="anime-portrait-glow absolute inset-0" />
              <div className="portrait-frame" aria-hidden="true" />
              <span className="anime-portrait-caption" aria-hidden="true">異世界 · DREAMER</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18, rotate: 4 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 1.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="anime-character-card absolute -bottom-1 right-0 z-10 max-w-[15rem] sm:-right-4"
          >
            <span className="anime-character-label">CURRENT ARC</span>
            <span className="font-display text-lg uppercase leading-tight text-ink">Building new worlds</span>
            <span className="text-xs leading-relaxed text-muted">{profile.role}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
