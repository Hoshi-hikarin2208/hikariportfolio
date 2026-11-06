import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Cake, GraduationCap, MapPin, UserRound, Target, Heart } from 'lucide-react'
import Reveal from '../components/Reveal'
import SafeImage from '../components/SafeImage'
import SectionHeading from '../components/SectionHeading'
import { formatBirthday, getAge } from '../utils/helpers'

function CountUp({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    let raf
    const step = (t) => {
      const p = Math.min((t - start) / 2200, 1)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])
  return <span ref={ref}>{n}{suffix}</span>
}

export default function About({ cfg, number }) {
  const { about, profile } = cfg
  const facts = [
    { icon: UserRound, label: 'Name', value: profile.fullName },
    { icon: Cake, label: 'Birthday', value: `${formatBirthday(profile.birthday)} (${getAge(profile)} yrs)` },
    { icon: GraduationCap, label: 'Course', value: profile.course },
    profile.location && { icon: MapPin, label: 'Location', value: profile.location },
  ].filter(Boolean)

  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeading number={number} label="About me" title={about.heading} />

      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <div className="relative">
            <div className="anime-about-frame">
              <SafeImage
                src={about.picture}
                fallback={profile.picture}
                alt={`${profile.fullName}`}
                className="aspect-[4/5] w-full rounded-[1.4rem] border border-line"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-[1.5rem] border border-accent-soft/50" />
          </div>
        </Reveal>

        <div className="md:col-span-7">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="mb-5 text-lg leading-relaxed text-muted">{p}</p>
            </Reveal>
          ))}

          <Reveal className="mt-8 grid gap-3 sm:grid-cols-2">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4">
                <Icon size={18} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">{label}</p>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              </div>
            ))}
          </Reveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <Reveal>
              <h3 className="mb-3 flex items-center gap-2 font-display text-2xl uppercase"><Heart size={18} className="text-accent" /> Interests</h3>
              <div className="flex flex-wrap gap-2">
                {about.interests.map((x) => (
                  <span key={x} className="rounded-full border border-line px-3 py-1 text-sm text-muted">{x}</span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="mb-3 flex items-center gap-2 font-display text-2xl uppercase"><Target size={18} className="text-accent" /> Goals</h3>
              <ul className="space-y-2 text-sm text-muted">
                {about.goals.map((g) => (
                  <li key={g} className="flex gap-2"><span className="text-accent">▸</span>{g}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>

      <Reveal className="mt-20 grid grid-cols-3 gap-4 border-y border-line py-10 text-center">
        {about.stats.map((s) => (
          <div key={s.label}>
            <p className="font-display text-5xl text-accent sm:text-7xl md:text-8xl">
              <CountUp to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted sm:text-sm">{s.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
