import { ExternalLink } from 'lucide-react'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { InstagramEmbed } from '../components/InstagramEmbed'
import { Reveal } from '../components/Reveal'
import { Seo } from '../components/Seo'
import { instagramPortfolioPosts, instagramProfileUrl } from '../data/instagramPortfolio'
import { useI18n } from '../i18n/I18nProvider'
import { getRouteSeo } from '../seo/routeSeo'

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
        <Container size="wide" className="realisations-hero__inner">
          <Reveal className="realisations-hero__copy">
            <p className="eyebrow">{t.realisations.eyebrow}</p>
            <h1>{t.realisations.title}</h1>
            <p>{t.realisations.intro}</p>
          </Reveal>
          <Reveal className="realisations-hero__aside" delay={0.12}>
            <span>{String(instagramPortfolioPosts.length).padStart(2, '0')}</span>
            <p>{t.realisations.curated}</p>
            <Button href={instagramProfileUrl} variant="secondary" target="_blank" rel="noreferrer">
              <ExternalLink size={17} aria-hidden="true" />
              {t.realisations.profileCta}
            </Button>
          </Reveal>
        </Container>
      </header>

      <Container size="wide" className="realisations-gallery-wrap">
        <div className="realisations-gallery" aria-label={t.realisations.galleryAria}>
          {instagramPortfolioPosts.map((post, index) => (
            <Reveal
              as="article"
              className="realisations-card"
              delay={Math.min(index * 0.045, 0.32)}
              key={post.id}
            >
              <InstagramEmbed
                url={post.url}
                fallbackLabel={t.realisations.openPost}
                loadingLabel={t.realisations.loading}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
