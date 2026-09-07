import { useMemo, useState } from 'react'
import { ProjectCard } from '../components/ProjectCard'
import { Seo } from '../components/Seo'
import { pageSeo } from '../config/seo'
import { projects } from '../data/projects'
import { useI18n } from '../i18n/I18nProvider'
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
  const selectedFilter =
    projectFilters.find((filter) => filter.key === activeFilter) ?? projectFilters[0]
  const visibleProjects = useMemo(
    () => projects.filter((project) => selectedFilter.matches(project)),
    [selectedFilter],
  )

  return (
    <section className="portfolio-projects" aria-label={t.projects.aria}>
      <Seo
        title={pageSeo.projects.title}
        description={pageSeo.projects.description}
        canonicalPath="/projets"
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

      <div className="portfolio-projects__grid">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
