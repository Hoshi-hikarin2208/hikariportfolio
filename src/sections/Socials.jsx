import { ArrowUpRight, Mail, Radio } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import TiltCard from '../components/TiltCard'
import { getIcon } from '../utils/icons'

function isRealProfileUrl(url) {
  return Boolean(url && !/your-username|example\.com/i.test(url))
}

export default function Socials({ cfg, number }) {
  const socials = cfg.contact.socials.filter((social) => isRealProfileUrl(social.url))

  return (
    <section id="socials" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeading number={number} label="Socials" title="Find me around the web." />

      <Reveal>
        <TiltCard className="mystic-card overflow-hidden rounded-2xl border border-line bg-surface p-7 md:p-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent-soft">
                <Radio size={14} /> Open channels
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Follow my work, projects, and experiments. I’m always happy to connect with fellow builders and gamers.
              </p>
            </div>
            {cfg.contact.email && (
              <a
                href={`mailto:${cfg.contact.email}`}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-soft"
              >
                <Mail size={17} /> Say hello
              </a>
            )}
          </div>

          {socials.length > 0 ? (
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {socials.map((social) => {
                const Icon = getIcon(social.icon)
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-line bg-bg p-4 transition-colors hover:border-accent"
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={20} className="text-accent-soft" />
                      <span className="font-medium">{social.name}</span>
                    </span>
                    <ArrowUpRight size={17} className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </a>
                )
              })}
            </div>
          ) : (
            <p className="mt-7 border-t border-line pt-5 text-sm text-muted">
              Social profiles will show here once their links are added in the portfolio settings.
            </p>
          )}
        </TiltCard>
      </Reveal>
    </section>
  )
}
