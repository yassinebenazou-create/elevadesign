import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from './Container'
import { Reveal } from './Reveal'

type RelatedService = {
  path: string
  title: string
  metaDescription?: string
  description?: string
}

type RelatedServicesProps = {
  services: RelatedService[]
  fallback?: RelatedService
}

export function RelatedServices({ services, fallback }: RelatedServicesProps) {
  const visibleServices = services.slice(0, 4)
  const shouldShowFallback = visibleServices.length === 0 && fallback
  const items = shouldShowFallback ? [fallback] : visibleServices

  if (items.length === 0) return null

  return (
    <section className="related-services" aria-labelledby="related-services-title">
      <Container size="wide">
        <Reveal className="related-services__heading">
          <p className="eyebrow">Services associés</p>
          <h2 id="related-services-title">Explorer les expertises liées</h2>
        </Reveal>
        <div className="related-services__grid">
          {items.map((service) => (
            <Reveal as="article" className="related-services__item" key={service.path}>
              <Link to={service.path}>
                <span>{service.title}</span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
              <p>{service.description ?? service.metaDescription}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
