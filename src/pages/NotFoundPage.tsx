import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Seo } from '../components/Seo'
import { pageSeo } from '../config/seo'
import { useI18n } from '../i18n/I18nProvider'

export function NotFoundPage() {
  const { t } = useI18n()

  return (
    <section className="section-space">
      <Seo
        title={pageSeo.notFound.title}
        description={pageSeo.notFound.description}
        canonicalPath="/404"
        robots="noindex, follow"
      />
      <Container size="narrow">
        <p className="eyebrow">404</p>
        <h1 className="heading-xl">{t.notFound.title}</h1>
        <p className="lede mt-5">{t.notFound.text}</p>
        <Button to="/" className="mt-8">
          {t.notFound.cta}
        </Button>
      </Container>
    </section>
  )
}
