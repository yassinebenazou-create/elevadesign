import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Container } from '../components/Container'
import { ProjectGallery } from '../components/ProjectGallery'
import { Reveal } from '../components/Reveal'
import { Seo } from '../components/Seo'
import { getAdjacentProjects, getProjectBySlug } from '../data/projects'
import { useI18n } from '../i18n/I18nProvider'
import { breadcrumbSchema, projectSchema } from '../utils/structuredData'
import { NotFoundPage } from './NotFoundPage'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  const { projectText, t } = useI18n()

  if (!project) {
    return <NotFoundPage />
  }

  const { previousProject, nextProject } = getAdjacentProjects(project.slug)
  const translatedProject = projectText(project)
  const seoTitle = `${project.title} | Projet ${translatedProject.category} au Maroc | Eleva Design`
  const seoDescription = translatedProject.shortDescription

  return (
    <article className="project-detail">
      <Seo
        title={seoTitle}
        description={seoDescription}
        canonicalPath={`/projets/${project.slug}`}
        image={project.coverImage}
        type="article"
        jsonLd={[
          breadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Projets', path: '/projets' },
            { name: project.title, path: `/projets/${project.slug}` },
          ]),
          projectSchema(project, seoDescription),
        ]}
      />
      <section className="project-detail__hero" aria-label={project.title}>
        <img src={project.coverImage} alt={project.coverAlt} fetchPriority="high" />
        <div className="project-detail__hero-overlay" aria-hidden="true" />
        <Container size="wide" className="project-detail__hero-inner">
          <Link className="project-detail__back project-detail__back--hero" to="/projets">
            <ArrowLeft size={16} />
            {t.projectDetail.back}
          </Link>
          <p className="project-detail__kicker">
            {translatedProject.category} / {translatedProject.location} / {translatedProject.year}
          </p>
          <h1>{project.title}</h1>
        </Container>
      </section>

      <section className="project-detail__meta-band" aria-label={t.projectDetail.infoAria(project.title)}>
        <Container size="wide">
          <dl className="project-detail__info">
            <div>
              <dt>{t.projectDetail.category}</dt>
              <dd>{translatedProject.category}</dd>
            </div>
            <div>
              <dt>{t.projectDetail.city}</dt>
              <dd>{translatedProject.location}</dd>
            </div>
            <div>
              <dt>{t.projectDetail.year}</dt>
              <dd>{translatedProject.year}</dd>
            </div>
            <div>
              <dt>{t.projectDetail.studio}</dt>
              <dd>{project.studio}</dd>
            </div>
          </dl>
        </Container>
      </section>

      <section className="project-detail__story">
        <Reveal>
          <Container size="wide" className="project-detail__story-inner">
            <p className="project-detail__section-title">{t.projectDetail.storyTitle}</p>
            <p className="project-detail__description">{translatedProject.description}</p>
          </Container>
        </Reveal>
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
                  <small>{t.projectDetail.previous}</small>
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
                  <small>{t.projectDetail.next}</small>
                  {nextProject.title}
                </span>
                <ArrowRight size={18} />
              </Link>
            ) : null}
          </div>
          <Link className="project-detail__all" to="/projets">
            {t.projectDetail.all}
            <ArrowRight size={16} />
          </Link>
        </Container>
      </section>
    </article>
  )
}
