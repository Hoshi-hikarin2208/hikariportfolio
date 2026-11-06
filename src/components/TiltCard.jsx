import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

export default function TiltCard({ children, className = '' }) {
  const reduceMotion = useReducedMotion()
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 24 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 24 })

  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    rotateX.set(y * -7)
    rotateY.set(x * 7)
  }

  const resetTilt = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.article
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      style={{ rotateX, rotateY, transformPerspective: 1100, transformStyle: 'preserve-3d' }}
      whileHover={reduceMotion ? undefined : { y: -5, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 220, damping: 24 }}
    >
      {children}
    </motion.article>
  )
}
