import { Link } from 'react-router-dom'
import { HeroSlider } from '../components/HeroSlider'
import { ProjectCard } from '../components/ProjectCard'
import { featuredProjects } from '../data/projects'

export function HomePage() {
  return (
    <>
      <HeroSlider />
      <section className="home-projects" aria-label="Réalisations récentes">
        <div className="home-projects__bar">
          <span>Réalisations récentes</span>
          <Link to="/projets">Voir tous les projets</Link>
        </div>
        <div className="home-projects__grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  )
}
