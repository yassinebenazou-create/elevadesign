import { motion } from 'motion/react'
import type { PropsWithChildren } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type ImageRevealProps = PropsWithChildren<{
  className?: string
  delay?: number
}>

export function ImageReveal({ children, className = '', delay = 0 }: ImageRevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <motion.figure
      className={className}
      initial={prefersReducedMotion ? false : { clipPath: 'inset(0 0 18% 0)', opacity: 0, y: 28 }}
      whileInView={prefersReducedMotion ? undefined : { clipPath: 'inset(0 0 0% 0)', opacity: 1, y: 0 }}
      transition={{ duration: 1.05, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="image-reveal__inner"
        initial={prefersReducedMotion ? false : { scale: 1.045, y: 18 }}
        whileInView={prefersReducedMotion ? undefined : { scale: 1, y: 0 }}
        transition={{ duration: 1.15, delay, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {children}
      </motion.div>
    </motion.figure>
  )
}
