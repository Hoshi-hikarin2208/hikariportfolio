import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import TiltCard from '../components/TiltCard'
import { getIcon } from '../utils/icons'

export default function Skills({ cfg, number }) {
  return (
    <section id="skills" className="border-y border-line bg-surface/50">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <SectionHeading number={number} label="Skills" title="Not just visuals. Built to work." />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cfg.skills.map((skill, i) => {
            const Icon = getIcon(skill.icon)
            return (
              <Reveal key={skill.title} delay={i * 0.1}>
                <TiltCard
                  className="mystic-card group h-full rounded-2xl border border-line bg-bg p-7 transition-colors hover:border-accent"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent transition group-hover:bg-accent group-hover:text-white">
                      <Icon size={24} />
                    </span>
                    <span className="font-display text-4xl text-accent">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-5 font-display text-3xl uppercase">{skill.title}</h3>
                  {skill.description && <p className="mt-2 text-sm text-muted">{skill.description}</p>}

                  <div className="mt-6">
                    <div className="mb-1.5 flex justify-between text-xs font-semibold uppercase tracking-widest text-muted">
                      <span>Proficiency</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.6, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {skill.items.map((t) => (
                      <span key={t} className="rounded-md border border-line px-2.5 py-1 text-xs font-medium text-muted">{t}</span>
                    ))}
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
