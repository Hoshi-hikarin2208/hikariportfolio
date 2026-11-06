import { ArrowUpRight, Github, ExternalLink } from 'lucide-react'
import Reveal from '../components/Reveal'
import SafeImage from '../components/SafeImage'
import SectionHeading from '../components/SectionHeading'
import TiltCard from '../components/TiltCard'

function ProjectCard({ p, index }) {
  return (
    <Reveal delay={(index % 3) * 0.1}>
      <TiltCard
        className="mystic-card group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-accent"
      >
        <div className="relative aspect-video overflow-hidden">
          <SafeImage
            src={p.image}
            alt={`${p.title} preview`}
            className="h-full w-full transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <span className="absolute left-4 top-3 font-display text-3xl text-white">
            {String(index + 1).padStart(2, '0')}
          </span>
          {p.year && <span className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur">{p.year}</span>}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="flex items-start justify-between gap-3 font-display text-3xl uppercase leading-none">
            {p.title}
            <ArrowUpRight className="shrink-0 text-accent transition group-hover:-translate-y-1 group-hover:translate-x-1" />
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <span key={t} className="rounded-md bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">{t}</span>
            ))}
          </div>

          {(p.github || p.demo) && (
            <div className="mt-6 flex gap-3">
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold transition hover:border-accent hover:text-accent">
                  <Github size={16} /> GitHub
                </a>
              )}
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110">
                  <ExternalLink size={16} /> Live demo
                </a>
              )}
            </div>
          )}
        </div>
      </TiltCard>
    </Reveal>
  )
}

export default function Projects({ cfg, number }) {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeading number={number} label="Projects" title={`${cfg.projectsHeading} The proof.`} />
      {cfg.projects.length === 0 ? (
        <p className="text-muted">No projects yet. Add one in src/data/portfolio.js.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cfg.projects.map((p, i) => (
            <ProjectCard key={p.title + i} p={p} index={i} />
          ))}
        </div>
      )}
    </section>
  )
}
