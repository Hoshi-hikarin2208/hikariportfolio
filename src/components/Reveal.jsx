import { motion } from 'framer-motion'

/** Fade/slide-in when scrolled into view. Wrap anything: <Reveal delay={0.1}>...</Reveal> */
export default function Reveal({ children, delay = 0, y = 32, x = 0, className = '', as = 'div' }) {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.15, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Tag>
  )
}
