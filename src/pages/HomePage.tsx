import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { HeroSlider } from '../components/HeroSlider'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { Seo } from '../components/Seo'
import { featuredProjects } from '../data/projects'
import { useI18n } from '../i18n/I18nProvider'
import { preferredPagePath } from '../utils/urls'
import { getRouteSeo } from '../seo/routeSeo'

export function HomePage() {
  const { t } = useI18n()
  const seo = getRouteSeo('/')

  return (
    <>
      <Seo
        title={seo.title}
        description={seo.description}
        canonicalPath="/"
        image={seo.image}
        jsonLd={seo.jsonLd}
      />
      <HeroSlider />
      <section className="home-seo-intro">
        <Container size="wide" className="home-seo-intro__inner">
          <Reveal>
            <p className="eyebrow">{t.home.nationalEyebrow}</p>
            <h2>{t.home.nationalTitle}</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p>{t.home.nationalText}</p>
            <div className="home-seo-intro__links" aria-label={t.home.nationalLinksLabel}>
              <Link to={preferredPagePath('/services')}>{t.home.servicesLink}</Link>
              <Link to={preferredPagePath('/projets')}>{t.home.projectsLink}</Link>
            </div>
          </Reveal>
        </Container>
      </section>
      <section className="home-projects" aria-label={t.home.recent}>
        <div className="home-projects__bar">
          <span>{t.home.recent}</span>
          <Link to={preferredPagePath('/projets')}>{t.home.allProjects}</Link>
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
