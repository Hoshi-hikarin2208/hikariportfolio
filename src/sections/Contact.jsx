import { useState } from 'react'
import { CheckCircle2, Mail, Phone, Send, TriangleAlert } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { getIcon } from '../utils/icons'

const empty = { name: '', email: '', subject: '', message: '' }

export default function Contact({ cfg, number }) {
  const { contact } = cfg
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState({ type: 'idle', msg: '' }) // idle | sending | ok | error
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    // 1) With a Formspree (or similar) endpoint: send for real.
    if (contact.formEndpoint) {
      setStatus({ type: 'sending', msg: '' })
      try {
        const res = await fetch(contact.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error(`Server answered ${res.status}`)
        setForm(empty)
        setStatus({ type: 'ok', msg: 'Message sent. Thank you, I will reply soon.' })
      } catch (err) {
        console.error('[portfolio] Contact form failed:', err)
        setStatus({ type: 'error', msg: 'Could not send. Please email me directly.' })
      }
      return
    }
    // 2) No endpoint: open the visitor's email app with everything filled in.
    const body = `${form.message}\n\n— ${form.name} (${form.email})`
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`
    setStatus({ type: 'ok', msg: 'Opening your email app…' })
  }

  const input =
    'w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm outline-none transition placeholder:text-muted/60 focus:border-accent'

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeading number={number} label="Contact" title={contact.heading} />

      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <p className="text-lg text-muted">{contact.blurb}</p>
          <ul className="mt-8 space-y-4">
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 transition hover:text-accent">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-accent/15 text-accent"><Mail size={18} /></span>
                  {contact.email}
                </a>
              </li>
            )}
            {contact.phone && (
              <li>
                <a href={`tel:${contact.phone}`} className="flex items-center gap-3 transition hover:text-accent">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-accent/15 text-accent"><Phone size={18} /></span>
                  {contact.phone}
                </a>
              </li>
            )}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            {contact.socials.filter((s) => s.url).map((s) => {
              const Icon = getIcon(s.icon)
              return (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} title={s.name}
                  className="grid h-12 w-12 place-items-center rounded-full border border-line transition hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-white">
                  <Icon size={20} />
                </a>
              )
            })}
          </div>
        </Reveal>

        <Reveal className="md:col-span-7" delay={0.1}>
          <form onSubmit={submit} className="space-y-4 rounded-2xl border border-line bg-surface p-6 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted">Name</span>
                <input required value={form.name} onChange={set('name')} className={input} placeholder="Your name" autoComplete="name" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted">Email</span>
                <input required type="email" value={form.email} onChange={set('email')} className={input} placeholder="you@email.com" autoComplete="email" />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted">Subject</span>
              <input required value={form.subject} onChange={set('subject')} className={input} placeholder="What is this about?" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted">Message</span>
              <textarea required rows={5} value={form.message} onChange={set('message')} className={`${input} resize-y`} placeholder="Tell me about your idea…" />
            </label>

            <button
              type="submit"
              disabled={status.type === 'sending'}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
            >
              {status.type === 'sending' ? 'Sending…' : 'Send message'} <Send size={16} />
            </button>

            {status.type === 'ok' && (
              <p role="status" className="flex items-center gap-2 text-sm text-green-500"><CheckCircle2 size={16} /> {status.msg}</p>
            )}
            {status.type === 'error' && (
              <p role="alert" className="flex items-center gap-2 text-sm text-red-500"><TriangleAlert size={16} /> {status.msg}</p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
