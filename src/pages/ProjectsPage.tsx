import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'

export function ProjectsPage() {
  return (
    <section className="portfolio-projects" aria-label="Tous les projets Eleva Design">
      <div className="portfolio-projects__grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
