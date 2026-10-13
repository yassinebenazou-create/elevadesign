import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { ImageReveal } from '../components/ImageReveal'
import { Reveal } from '../components/Reveal'
import { Seo } from '../components/Seo'
import { useI18n } from '../i18n/I18nProvider'
import { getRouteSeo } from '../seo/routeSeo'

const serviceAssets = [
  {
    image: '/images/services/decoration-styling.jfif',
    alt: 'Salon raffiné aux tons clairs avec mobilier contemporain, bois et lumière naturelle.',
    layout: 'image-left',
  },
  {
    image: '/images/services/amenagement-interieur.jfif',
    alt: 'Intérieur contemporain lumineux avec lignes sobres, bois, pierre et baies vitrées.',
    layout: 'text-left',
  },
  {
    image: '/images/services/amenagement-exterieur.jpg',
    alt: 'Villa contemporaine en pierre avec piscine, terrasse aménagée et lumière de fin de journée.',
    layout: 'image-left',
  },
  {
    image: '/images/services/mobilier-matieres.jfif',
    alt: 'Composition de matières avec textiles, bois, pierre et finitions dorées.',
    layout: 'text-left',
  },
]

export function ServicesPage() {
  const { t } = useI18n()
  const seo = getRouteSeo('/services')

  return (
    <section className="services-page">
      <Seo
        title={seo.title}
        description={seo.description}
        canonicalPath="/services"
        jsonLd={seo.jsonLd}
      />
      <section className="services-hero">
        <Container size="wide">
          <Reveal className="services-hero__content">
            <p className="eyebrow">{t.services.eyebrow}</p>
            <h1>{t.services.title}</h1>
            <p>{t.services.intro}</p>
          </Reveal>
        </Container>
      </section>

      <section className="services-list" aria-label={t.services.aria}>
        {t.services.items.map(([number, title, description], index) => {
          const asset = serviceAssets[index]

          return (
            <article
              className={`service-panel service-panel--${asset.layout}`}
              key={number}
            >
              <Container size="wide" className="service-panel__inner">
                <ImageReveal className="service-panel__media" delay={0.08}>
                  <img src={asset.image} alt={asset.alt} loading={index === 0 ? 'eager' : 'lazy'} />
                </ImageReveal>
                <Reveal className="service-panel__copy">
                  <span>{number}</span>
                  <h2>{title}</h2>
                  <p>{description}</p>
                </Reveal>
              </Container>
            </article>
          )
        })}
      </section>

      <section className="services-seo-hub">
        <Container size="wide">
          <Reveal className="services-seo-hub__heading">
            <p className="eyebrow">{t.services.hubEyebrow}</p>
            <h2>{t.services.hubTitle}</h2>
            <p>{t.services.hubText}</p>
          </Reveal>
          <div className="services-seo-hub__grid">
            {t.services.hubItems.map(([title, text], index) => (
              <Reveal as="article" className="services-seo-hub__item" delay={index * 0.06} key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="services-cta">
        <Container size="narrow">
          <Reveal className="services-cta__inner">
            <h2>{t.services.ctaTitle}</h2>
            <p>
              {t.services.ctaTextA}<br />
              {t.services.ctaTextB}
            </p>
            <Button to="/contact">{t.services.cta}</Button>
          </Reveal>
        </Container>
      </section>
    </section>
  )
}
