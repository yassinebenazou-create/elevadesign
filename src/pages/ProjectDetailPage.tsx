import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Container } from '../components/Container'
import { ProjectGallery } from '../components/ProjectGallery'
import { getAdjacentProjects, getProjectBySlug } from '../data/projects'
import { NotFoundPage } from './NotFoundPage'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return <NotFoundPage />
  }

  const { previousProject, nextProject } = getAdjacentProjects(project.slug)

  return (
    <article className="project-detail">
      <section className="project-detail__hero" aria-label={project.title}>
        <img src={project.coverImage} alt={project.coverAlt} fetchPriority="high" />
        <div className="project-detail__hero-overlay" aria-hidden="true" />
        <Container size="wide" className="project-detail__hero-inner">
          <Link className="project-detail__back project-detail__back--hero" to="/projets">
            <ArrowLeft size={16} />
            Retour aux projets
          </Link>
          <p className="project-detail__kicker">
            {project.category} / {project.location} / {project.year}
          </p>
          <h1>{project.title}</h1>
        </Container>
      </section>

      <section className="project-detail__meta-band" aria-label={`Informations du projet ${project.title}`}>
        <Container size="wide">
          <dl className="project-detail__info">
            <div>
              <dt>Catégorie</dt>
              <dd>{project.category}</dd>
            </div>
            <div>
              <dt>Ville</dt>
              <dd>{project.location}</dd>
            </div>
            <div>
              <dt>Année</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Studio</dt>
              <dd>{project.studio}</dd>
            </div>
          </dl>
        </Container>
      </section>

      <section className="project-detail__story">
        <Container size="wide" className="project-detail__story-inner">
          <p className="project-detail__section-title">Le projet</p>
          <p className="project-detail__description">{project.description}</p>
        </Container>
      </section>

      <section className="project-detail__gallery-section">
        <ProjectGallery images={project.gallery} />
      </section>

      <section className="project-detail__nav">
        <Container>
          <div className="project-detail__nav-grid">
            {previousProject ? (
              <Link to={`/projets/${previousProject.slug}`} className="project-detail__nav-link">
                <ArrowLeft size={18} />
                <span>
                  <small>Projet précédent</small>
                  {previousProject.title}
                </span>
              </Link>
            ) : null}

            {nextProject ? (
              <Link
                to={`/projets/${nextProject.slug}`}
                className="project-detail__nav-link project-detail__nav-link--next"
              >
                <span>
                  <small>Projet suivant</small>
                  {nextProject.title}
                </span>
                <ArrowRight size={18} />
              </Link>
            ) : null}
          </div>
          <Link className="project-detail__all" to="/projets">
            Voir tous les projets
            <ArrowRight size={16} />
          </Link>
        </Container>
      </section>
    </article>
  )
}
