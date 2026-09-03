import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '../types/project'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <Link to={`/projets/${project.slug}`} className="project-card__link">
        <div className="project-card__media">
          <img src={project.coverImage} alt={project.coverAlt} loading="lazy" />
          <div className="project-card__overlay" aria-hidden="true">
            <span>Voir le projet</span>
          </div>
        </div>
        <div className="project-card__content">
          <div>
            <p className="project-card__meta">
              {project.category} / {project.location} / {project.year}
            </p>
            <h2 className="project-card__title">{project.title}</h2>
          </div>
          <ArrowUpRight className="project-card__icon" aria-hidden="true" />
        </div>
        <p className="project-card__description">{project.shortDescription}</p>
      </Link>
    </article>
  )
}
