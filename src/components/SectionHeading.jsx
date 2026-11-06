import Reveal from './Reveal'

/** Numbered section label + big condensed heading, like the reference ("01 / ABOUT"). */
export default function SectionHeading({ number, label, title }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted">
        <span className="font-display text-lg tracking-normal text-accent">{String(number).padStart(2, '0')}</span>
        <span className="h-px w-10 bg-accent" />
        {label}
      </p>
      <h2 className="mt-4 max-w-4xl font-display text-5xl uppercase leading-[0.95] sm:text-6xl md:text-7xl">{title}</h2>
    </Reveal>
  )
}
