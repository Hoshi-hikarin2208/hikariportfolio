import { Component } from 'react'

/**
 * Wraps each section so one bad entry in portfolio.js can't blank the whole site.
 * It shows exactly which section failed and the error message.
 */
export default class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  componentDidCatch(error, info) {
    console.error(`[portfolio] Section "${this.props.name}" crashed:`, error, info?.componentStack)
  }
  render() {
    if (!this.state.error) return this.props.children
    return (
      <section id={this.props.name} className="mx-auto my-10 max-w-3xl rounded-xl border border-accent/60 bg-surface p-6">
        <p className="font-display text-2xl uppercase text-accent">Section "{this.props.name}" has an error</p>
        <p className="mt-2 text-sm text-muted">
          Most likely a typo in <code>src/data/portfolio.js</code> (missing comma, quote or bracket, or a list that should be text).
        </p>
        <pre className="mt-4 overflow-auto rounded bg-black/40 p-3 text-xs text-red-300">{String(this.state.error?.message || this.state.error)}</pre>
      </section>
    )
  }
}
