import { Award, ExternalLink, Trophy } from 'lucide-react'
import Reveal from '../components/Reveal'
import SafeImage from '../components/SafeImage'
import SectionHeading from '../components/SectionHeading'

export default function Education({ cfg, number }) {
  return (
    <section id="education" className="border-y border-line bg-surface/50">
      <div className="mx-auto max-w-5xl px-5 py-24 md:px-8 md:py-32">
        <SectionHeading number={number} label="Education" title="Always learning. Always building." />

        <div className="relative border-l-2 border-accent/60 pl-8 md:pl-12">
          {cfg.education.map((e, i) => (
            <Reveal key={e.school + i} delay={i * 0.08} className="relative pb-14 last:pb-0">
              <span className="absolute -left-[2.6rem] top-1.5 h-4 w-4 rounded-full border-4 border-bg bg-accent md:-left-[3.6rem]" />
              <p className="font-display text-xl text-accent">{e.years}</p>
              <h3 className="mt-1 font-display text-3xl uppercase sm:text-4xl">{e.school}</h3>
              <p className="mt-1 font-medium">{e.degree}</p>
              {e.description && <p className="mt-3 max-w-2xl text-muted">{e.description}</p>}

              {e.achievements?.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {e.achievements.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-muted">
                      <Trophy size={16} className="mt-0.5 shrink-0 text-accent" /> {a}
                    </li>
                  ))}
                </ul>
              )}

              {e.certificates?.length > 0 && (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {e.certificates.map((c) => {
                    const Wrap = c.link ? 'a' : 'div'
                    return (
                      <Wrap
                        key={c.title}
                        {...(c.link ? { href: c.link, target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="group flex items-center gap-3 rounded-xl border border-line bg-bg p-3 transition hover:border-accent"
                      >
                        {c.image ? (
                          <SafeImage src={c.image} alt={`${c.title} certificate`} className="h-14 w-20 rounded-md" />
                        ) : (
                          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-md bg-accent/15 text-accent"><Award /></span>
                        )}
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold">{c.title}</span>
                          <span className="block text-xs text-muted">{[c.issuer, c.year].filter(Boolean).join(' · ')}</span>
                        </span>
                        {c.link && <ExternalLink size={14} className="text-muted group-hover:text-accent" />}
                      </Wrap>
                    )
                  })}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
