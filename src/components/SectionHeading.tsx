import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  id?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  id,
}: SectionHeadingProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <motion.div
      className={`section-heading ${align === 'center' ? 'mx-auto text-center' : ''}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.72, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, amount: 0.22 }}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className="heading-xl" id={id}>{title}</h1>
      {description ? <p className="lede">{description}</p> : null}
    </motion.div>
  )
}
