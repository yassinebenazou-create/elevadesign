import { motion } from 'motion/react'
import type { PropsWithChildren } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type RevealProps = PropsWithChildren<{
  as?: 'div' | 'section' | 'article'
  className?: string
  delay?: number
}>

export function Reveal({ as = 'div', children, className = '', delay = 0 }: RevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const Component = motion[as]

  return (
    <Component
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.18 }}
    >
      {children}
    </Component>
  )
}
