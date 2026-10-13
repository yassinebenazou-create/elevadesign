import { Container } from './Container'
import { ProjectCard } from './ProjectCard'
import { Reveal } from './Reveal'
import type { Project } from '../types/project'

type RelatedProjectsProps = {
  projects: Project[]
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (projects.length === 0) return null

  return (
    <section className="related-projects" aria-labelledby="related-projects-title">
      <Container size="wide">
        <Reveal className="related-projects__heading">
          <p className="eyebrow">Projets liés</p>
          <h2 id="related-projects-title">Continuer l’exploration</h2>
        </Reveal>
        <div className="related-projects__grid">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.slug} />
          ))}
        </div>
      </Container>
    </section>
  )
}
