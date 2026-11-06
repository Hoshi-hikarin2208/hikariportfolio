import { useEffect, useState } from 'react'
import { Bug, X } from 'lucide-react'
import { checkAssets, validateConfig } from '../utils/validate'

/**
 * Developer helper. Open with  Ctrl + Shift + D  or add  ?debug=1  to the URL.
 * Lists mistakes found in src/data/portfolio.js and files that failed to load.
 * Normal visitors never see it. Remove <DebugPanel /> from App.jsx to delete it completely.
 */
export default function DebugPanel({ cfg, mode }) {
  const [open, setOpen] = useState(() => new URLSearchParams(window.location.search).has('debug'))
  const [issues, setIssues] = useState([])
  const [assetIssues, setAssetIssues] = useState(null)

  useEffect(() => {
    const found = validateConfig(cfg)
    setIssues(found)
    // Always print to the console so you see problems during development
    if (found.length) {
      console.groupCollapsed(`[portfolio] ${found.length} config notice(s) — open DevTools to read, or press Ctrl+Shift+D`)
      found.forEach((i) => (i.level === 'error' ? console.error : console.warn)(`${i.where}: ${i.msg}`))
      console.groupEnd()
    }
  }, [cfg])

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open && assetIssues === null) checkAssets(cfg).then(setAssetIssues)
  }, [open, assetIssues, cfg])

  if (!open) return null
  const all = [...issues, ...(assetIssues || [])]
  const errors = all.filter((i) => i.level === 'error').length

  return (
    <aside className="fixed bottom-4 left-4 z-[90] max-h-[70vh] w-[min(92vw,26rem)] overflow-auto rounded-xl border border-line bg-surface p-4 text-sm shadow-2xl">
      <div className="mb-3 flex items-center justify-between">
        <p className="flex items-center gap-2 font-semibold"><Bug size={16} className="text-accent" /> Debug panel</p>
        <button onClick={() => setOpen(false)} aria-label="Close debug panel"><X size={16} /></button>
      </div>
      <p className="mb-3 text-xs text-muted">
        {window.innerWidth}×{window.innerHeight}px · theme: {mode} · {errors} error(s), {all.length - errors} warning(s)
        {assetIssues === null && ' · checking files…'}
      </p>
      {all.length === 0 && assetIssues !== null && <p className="text-green-500">All good: no problems found.</p>}
      <ul className="space-y-2">
        {all.map((i, k) => (
          <li key={k} className="rounded border border-line p-2">
            <span className={`mr-2 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${i.level === 'error' ? 'bg-red-600 text-white' : 'bg-yellow-500 text-black'}`}>
              {i.level}
            </span>
            <code className="text-xs">{i.where}</code>
            <p className="mt-1 text-xs text-muted">{i.msg}</p>
          </li>
        ))}
      </ul>
    </aside>
  )
}
