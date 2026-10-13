import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { Seo } from '../components/Seo'
import { projects } from '../data/projects'
import { portfolioServiceLinks } from '../data/projectRelations'
import { serviceLandingPages } from '../data/serviceLandingPages'
import { useI18n } from '../i18n/I18nProvider'
import { getRouteSeo } from '../seo/routeSeo'
import type { Project } from '../types/project'

type FilterKey = 'all' | 'villas' | 'interior' | 'commercial' | 'residential' | 'offices' | 'wall'

type ProjectFilter = {
  key: FilterKey
  matches: (project: Project) => boolean
}

const projectFilters: ProjectFilter[] = [
  { key: 'all', matches: () => true },
  {
    key: 'villas',
    matches: (project) => project.title.toLowerCase().includes('villa'),
  },
  {
    key: 'interior',
    matches: (project) => project.category.toLowerCase().includes('int'),
  },
  {
    key: 'commercial',
    matches: (project) => project.category.toLowerCase().includes('commercial'),
  },
  {
    key: 'residential',
    matches: (project) =>
      project.category.toLowerCase().includes('résidentielle') ||
      project.category.toLowerCase().includes('residentielle') ||
      project.type.toLowerCase().includes('résidence') ||
      project.type.toLowerCase().includes('residence'),
  },
  {
    key: 'offices',
    matches: (project) => project.type.toLowerCase().includes('bureau'),
  },
  {
    key: 'wall',
    matches: (project) => project.category.toLowerCase().includes('habillage'),
  },
]

export function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const { t } = useI18n()
  const seo = getRouteSeo('/projets')
  const selectedFilter =
    projectFilters.find((filter) => filter.key === activeFilter) ?? projectFilters[0]
  const visibleProjects = useMemo(
    () => projects.filter((project) => selectedFilter.matches(project)),
    [selectedFilter],
  )
  const serviceLinks = portfolioServiceLinks
    .map((slug) => serviceLandingPages.find((service) => service.slug === slug))
    .filter((service): service is (typeof serviceLandingPages)[number] => Boolean(service))

  return (
    <section className="portfolio-projects" aria-label={t.projects.aria}>
      <Seo
        title={seo.title}
        description={seo.description}
        canonicalPath="/projets"
        jsonLd={seo.jsonLd}
      />
      <header className="portfolio-hero">
        <p>{t.projects.eyebrow}</p>
        <h1>{t.projects.title}</h1>
        <span>{t.projects.intro}</span>
      </header>

      <div className="portfolio-filters" aria-label={t.projects.filtersLabel}>
        {projectFilters.map((filter) => (
          <button
            type="button"
            className={filter.key === activeFilter ? 'is-active' : ''}
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
          >
            {t.projects.filters[filter.key]}
          </button>
        ))}
      </div>

      <section className="portfolio-needs" aria-labelledby="portfolio-needs-title">
        <Container size="wide">
          <Reveal className="portfolio-needs__heading">
            <p className="eyebrow">Explorer par besoin</p>
            <h2 id="portfolio-needs-title">Relier les projets aux expertises Eleva Design</h2>
          </Reveal>
          <div className="portfolio-needs__grid">
            {serviceLinks.map((service) => (
              <Link to={service.path} className="portfolio-needs__link" key={service.slug}>
                <span>{service.title}</span>
                <small>{service.primaryKeyword}</small>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <div className="portfolio-projects__grid">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
