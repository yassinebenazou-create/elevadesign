import { Link } from 'react-router-dom'
import { HeroSlider } from '../components/HeroSlider'
import { ProjectCard } from '../components/ProjectCard'
import { Seo } from '../components/Seo'
import { pageSeo, seoConfig } from '../config/seo'
import { featuredProjects } from '../data/projects'
import { useI18n } from '../i18n/I18nProvider'
import { organizationSchema, professionalServiceSchema, websiteSchema } from '../utils/structuredData'

export function HomePage() {
  const { t } = useI18n()

  return (
    <>
      <Seo
        title={pageSeo.home.title}
        description={pageSeo.home.description}
        canonicalPath="/"
        image={seoConfig.defaultImage}
        jsonLd={[organizationSchema(), websiteSchema(), professionalServiceSchema()]}
      />
      <HeroSlider />
      <section className="home-projects" aria-label={t.home.recent}>
        <div className="home-projects__bar">
          <span>{t.home.recent}</span>
          <Link to="/projets">{t.home.allProjects}</Link>
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
