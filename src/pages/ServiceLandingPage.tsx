import { ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { ImageReveal } from '../components/ImageReveal'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { Seo } from '../components/Seo'
import { getProjectsForService } from '../data/projectRelations'
import {
  getRelatedServiceLandingPages,
  getServiceLandingPageBySlug,
} from '../data/serviceLandingPages'
import { getRouteSeo } from '../seo/routeSeo'
import { preferredPagePath } from '../utils/urls'
import { NotFoundPage } from './NotFoundPage'

export function ServiceLandingPage() {
  const { slug } = useParams()
  const page = getServiceLandingPageBySlug(slug)

  if (!page) {
    return <NotFoundPage />
  }

  const seo = getRouteSeo(page.path)
  const referencedProjects = getProjectsForService(page.slug, page.projectSlugs)
  const relatedServices = getRelatedServiceLandingPages(page.relatedServiceSlugs)

  return (
    <article className="service-detail-page">
      <Seo
        title={seo.title}
        description={seo.description}
        image={seo.image}
        canonicalPath={page.path}
        jsonLd={seo.jsonLd}
      />

      <section className="service-detail-hero">
        <Container size="wide" className="service-detail-hero__inner">
          <Reveal className="service-detail-hero__copy" eager>
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>{page.h1}</h1>
            <p>{page.intro}</p>
            <div className="service-detail-hero__actions">
              <Button to="/contact">Demander un devis</Button>
              <Button to="/projets" variant="ghost">Voir les projets</Button>
            </div>
          </Reveal>
          <ImageReveal className="service-detail-hero__media" delay={0.12}>
            <ResponsiveImage
              src={page.heroImage}
              alt={page.heroAlt}
              sizes="(max-width: 767px) 100vw, 50vw"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={1920}
              height={1280}
            />
          </ImageReveal>
        </Container>
      </section>

      <section className="service-detail-overview">
        <Container size="wide" className="service-detail-overview__inner">
          <Reveal className="service-detail-overview__copy">
            <p className="eyebrow">Approche</p>
            <h2>{page.overviewTitle}</h2>
            {page.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
          <Reveal className="service-detail-keywords" delay={0.12}>
            <h2>Intentions couvertes</h2>
            <p>{page.primaryKeyword}</p>
            <ul>
              {page.secondaryKeywords.map((keyword) => (
                <li key={keyword}>{keyword}</li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="service-detail-highlights">
        <Container size="wide">
          <div className="service-detail-highlights__grid">
            {page.highlights.map((highlight, index) => (
              <Reveal as="article" className="service-detail-highlight" delay={index * 0.06} key={highlight}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{highlight}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="service-detail-process">
        <Container size="wide">
          <Reveal className="service-detail-section-heading">
            <p className="eyebrow">Process</p>
            <h2>{page.processTitle}</h2>
          </Reveal>
          <div className="service-detail-process__grid">
            {page.process.map((step, index) => (
              <Reveal as="article" className="service-detail-step" delay={index * 0.08} key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {referencedProjects.length > 0 && (
        <section className="service-detail-projects">
          <Container size="wide">
            <Reveal className="service-detail-section-heading">
              <p className="eyebrow">Références</p>
              <h2>Projets liés à ce service</h2>
            </Reveal>
            <div className="service-detail-projects__grid">
              {referencedProjects.map((project) => (
                <ProjectCard project={project} key={project.slug} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="service-detail-related">
        <Container size="wide" className="service-detail-related__inner">
          <Reveal className="service-detail-section-heading">
            <p className="eyebrow">Liens utiles</p>
            <h2>Explorer les services proches</h2>
          </Reveal>
          <div className="service-detail-related__grid">
            {relatedServices.map((service) => (
              <Link to={preferredPagePath(service.path)} className="service-detail-related__link" key={service.slug}>
                <span>{service.title}</span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="service-detail-faq">
        <Container size="wide">
          <Reveal className="service-detail-section-heading">
            <p className="eyebrow">Questions fréquentes</p>
            <h2>Avant de demander un devis</h2>
          </Reveal>
          <div className="service-detail-faq__list">
            {page.faq.map((item) => (
              <Reveal as="article" className="service-detail-faq__item" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="service-detail-cta">
        <Container size="narrow">
          <Reveal className="service-detail-cta__inner">
            <p className="eyebrow">Devis</p>
            <h2>Parlons de votre projet.</h2>
            <p>
              Décrivez les espaces concernés, vos priorités et vos inspirations afin de préparer un échange utile.
            </p>
            <Button to="/contact">Demander un devis</Button>
          </Reveal>
        </Container>
      </section>
    </article>
  )
}
