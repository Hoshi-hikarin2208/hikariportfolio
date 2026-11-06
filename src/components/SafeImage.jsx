import { useState } from 'react'
import { asset } from '../utils/helpers'

export const FALLBACK = 'images/placeholder.svg'

/**
 * <img> that never shows a broken icon: if the file is missing it swaps to
 * a fallback (and logs which path failed, so you can fix it quickly).
 * Always cropped with object-cover; give it a size via className.
 */
export default function SafeImage({ src, alt = '', fallback = FALLBACK, className = '', ...rest }) {
  const [failed, setFailed] = useState(0)
  const chain = [src, fallback, FALLBACK].filter(Boolean)
  const current = chain[Math.min(failed, chain.length - 1)]
  return (
    <img
      src={asset(current)}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`object-cover ${className}`}
      onError={() => {
        if (failed < chain.length - 1) {
          console.warn(`[portfolio] Image not found: public/${current}  -> using fallback`)
          setFailed((n) => n + 1)
        }
      }}
      {...rest}
    />
  )
}
