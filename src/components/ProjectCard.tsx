import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useI18n } from '../i18n/I18nProvider'
import type { Project } from '../types/project'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const { projectText, t } = useI18n()
  const translatedProject = projectText(project)

  return (
    <motion.article
      className="project-card"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.72, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, amount: 0.16 }}
    >
      <Link to={`/projets/${project.slug}`} className="project-card__link">
        <div className="project-card__media">
          <img src={project.coverImage} alt={project.coverAlt} loading="lazy" />
          <div className="project-card__overlay" aria-hidden="true">
            <span>{t.projectCard.view}</span>
          </div>
        </div>
        <div className="project-card__content">
          <div>
            <p className="project-card__meta">
              {translatedProject.category} / {translatedProject.location} / {translatedProject.year}
            </p>
            <h2 className="project-card__title">{project.title}</h2>
          </div>
          <ArrowUpRight className="project-card__icon" aria-hidden="true" />
        </div>
        <p className="project-card__description">{translatedProject.shortDescription}</p>
      </Link>
    </motion.article>
  )
}
