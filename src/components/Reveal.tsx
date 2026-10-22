import { motion } from 'motion/react'
import type { PropsWithChildren } from 'react'
import { useHasMounted } from '../hooks/useHasMounted'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type RevealProps = PropsWithChildren<{
  as?: 'div' | 'section' | 'article'
  className?: string
  delay?: number
  eager?: boolean
}>

export function Reveal({ as = 'div', children, className = '', delay = 0, eager = false }: RevealProps) {
  const hasMounted = useHasMounted()
  const prefersReducedMotion = usePrefersReducedMotion()
  const Component = motion[as]
  const canAnimate = !eager && hasMounted && !prefersReducedMotion

  return (
    <Component
      className={className}
      initial={canAnimate ? { opacity: 0, y: 32 } : false}
      whileInView={canAnimate ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.18 }}
    >
      {children}
    </Component>
  )
}
