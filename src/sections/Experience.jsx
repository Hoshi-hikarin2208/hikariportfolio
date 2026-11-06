import { Blocks, ServerCog, Sparkles } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import TiltCard from '../components/TiltCard'

export default function Experience({ number }) {
  return (
    <section id="experience" className="border-y border-line bg-surface/50">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <SectionHeading number={number} label="Experience" title="Building worlds beyond the screen." />

        <Reveal>
          <TiltCard
            className="mystic-card relative overflow-hidden rounded-2xl border border-line bg-bg p-7 md:p-10"
          >
            <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full border border-accent-soft/15" />
            <div className="pointer-events-none absolute -right-4 -top-14 h-52 w-52 rounded-full border border-accent/20" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent-soft">
                  <Sparkles size={14} /> Minecraft · Server Operations
                </p>
                <h3 className="mt-4 font-display text-3xl uppercase leading-tight text-ink sm:text-4xl">
                  Minecraft Servers & Custom Development
                </h3>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted">
                  I have handled Minecraft servers and created custom mods and plugins, bringing hands-on server experience and game development together.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['Server Management', 'Minecraft Mods', 'Plugin Development'].map((item) => (
                    <span key={item} className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 text-accent-soft">
                <span className="grid h-14 w-14 place-items-center rounded-xl border border-line bg-surface"><ServerCog size={25} /></span>
                <span className="grid h-14 w-14 place-items-center rounded-xl border border-line bg-surface"><Blocks size={25} /></span>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  )
}
