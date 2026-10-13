import { ExternalLink } from 'lucide-react'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { InstagramGalleryExperiment } from '../components/CustomInstagramGallery'
import { Reveal } from '../components/Reveal'
import { Seo } from '../components/Seo'
import { instagramFeedId, instagramProfileUrl, instagramReelsUrl } from '../data/instagramPortfolio'
import { useI18n } from '../i18n/I18nProvider'
import { getRouteSeo } from '../seo/routeSeo'

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="5.1" />
      <circle cx="12" cy="12" r="3.7" />
      <circle cx="17.1" cy="6.9" r="0.85" />
    </svg>
  )
}

export function RealisationsPage() {
  const { t } = useI18n()
  const seo = getRouteSeo('/realisations')

  return (
    <section className="realisations-page" aria-label={t.realisations.aria}>
      <Seo
        title={seo.title}
        description={seo.description}
        canonicalPath="/realisations"
        jsonLd={seo.jsonLd}
      />

      <header className="realisations-hero">
        <img
          className="realisations-hero__image"
          src="/images/realisations/realisations-hero.webp"
          alt=""
          aria-hidden="true"
          width={1000}
          height={571}
          decoding="async"
          fetchPriority="high"
        />
        <Container size="wide" className="realisations-hero__inner">
          <Reveal className="realisations-hero__copy">
            <p className="eyebrow">{t.realisations.eyebrow}</p>
            <h1>{t.realisations.title}</h1>
            <p>{t.realisations.intro}</p>
          </Reveal>
          <Reveal className="realisations-hero__aside" delay={0.12}>
            <span aria-label="Instagram">IG</span>
            <p>{t.realisations.curated}</p>
            <Button href={instagramProfileUrl} variant="secondary" target="_blank" rel="noreferrer">
              <ExternalLink size={17} aria-hidden="true" />
              {t.realisations.profileCta}
            </Button>
          </Reveal>
        </Container>
      </header>

      <Container size="wide" className="realisations-gallery-wrap">
        <Reveal className="realisations-gallery">
          <InstagramGalleryExperiment feedId={instagramFeedId} title={t.realisations.galleryAria} />
        </Reveal>
        <Reveal className="realisations-instagram-cta" delay={0.12}>
          <h2>Découvrez encore plus de nos réalisations sur Instagram</h2>
          <a
            className="realisations-instagram-cta__button"
            href={instagramReelsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramGlyph />
            <span>Voir tous nos Reels sur Instagram</span>
          </a>
        </Reveal>
      </Container>
    </section>
  )
}
