import { motion } from 'motion/react'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { ImageReveal } from '../components/ImageReveal'
import { Reveal } from '../components/Reveal'
import { Seo } from '../components/Seo'
import { pageSeo } from '../config/seo'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useI18n } from '../i18n/I18nProvider'

const universeImages = [
  {
    src: '/images/about/about-01.jfif',
    alt: 'Intérieur élégant aux tons pierre et bois avec lumière naturelle douce.',
  },
  {
    src: '/images/about/about-02.jfif',
    alt: 'Détail décoratif intérieur avec matières naturelles et palette beige.',
  },
  {
    src: '/images/about/about-03.jfif',
    alt: 'Espace intérieur contemporain avec lignes sobres et finitions chaleureuses.',
  },
  {
    src: '/images/about/about-04.jfif',
    alt: 'Salon raffiné aux tons neutres avec mobilier contemporain.',
  },
]

export function AboutPage() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const { t } = useI18n()

  return (
    <main className="about-page">
      <Seo
        title={pageSeo.about.title}
        description={pageSeo.about.description}
        canonicalPath="/a-propos"
      />
      <section className="about-hero">
        <Container size="wide" className="about-hero__inner">
          <Reveal className="about-hero__copy">
            <p className="eyebrow">{t.about.heroEyebrow}</p>
            <h1>{t.about.title}</h1>
            <p>{t.about.heroText}</p>
          </Reveal>
          <ImageReveal className="about-hero__media" delay={0.12}>
            <img
              src="/images/about/about-04.jfif"
              alt="Salon contemporain chaleureux avec mobilier clair et matières naturelles."
              loading="eager"
              fetchPriority="high"
            />
          </ImageReveal>
        </Container>
      </section>

      <section className="about-approach">
        <Container size="wide" className="about-approach__inner">
          <Reveal className="about-approach__text">
            <p className="eyebrow">{t.about.approachEyebrow}</p>
            <h2>{t.about.approachTitle}</h2>
            <p>{t.about.approachText}</p>
          </Reveal>
          <div className="about-approach__words" aria-label="Piliers de l'approche Eleva Design">
            {t.about.approachWords.map((word, index) => (
              <Reveal as="article" className="about-approach__word" delay={0.12 + index * 0.12} key={word}>
                <span>{word}</span>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="about-philosophy">
        <Container size="wide" className="about-philosophy__inner">
          <ImageReveal className="about-philosophy__media">
            <img
              src="/images/about/about-03.jfif"
              alt="Intérieur architectural avec textures naturelles, bois et lumière douce."
              loading="lazy"
            />
          </ImageReveal>
          <Reveal className="about-philosophy__copy" delay={0.16}>
            <h2>{t.about.philosophyTitle}</h2>
            <p>{t.about.philosophyText}</p>
          </Reveal>
        </Container>
      </section>

      <section className="about-process">
        <Container size="wide">
          <Reveal className="about-process__heading">
            <p className="eyebrow">{t.about.processEyebrow}</p>
            <h2>{t.about.processTitle}</h2>
          </Reveal>
          <div className="about-process__grid">
            {t.about.process.map(([number, title, text], index) => (
              <Reveal as="article" className="about-process__step" delay={index * 0.1} key={number}>
                <motion.i
                  aria-hidden="true"
                  className="about-process__line"
                  initial={prefersReducedMotion ? false : { scaleX: 0 }}
                  whileInView={prefersReducedMotion ? undefined : { scaleX: 1 }}
                  transition={{ duration: 1.1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, amount: 0.45 }}
                />
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="about-universe">
        <Container size="wide" className="about-universe__intro">
          <Reveal>
            <h2>{t.about.universeTitle}</h2>
            <p>{t.about.universeText}</p>
          </Reveal>
        </Container>
        <Container size="wide" className="about-universe__gallery">
          {universeImages.map((image, index) => (
            <ImageReveal className={`about-universe__image about-universe__image--${index + 1}`} delay={index * 0.1} key={image.src}>
              <img src={image.src} alt={image.alt} loading={index === 0 ? 'eager' : 'lazy'} />
            </ImageReveal>
          ))}
        </Container>
      </section>

      <section className="about-cta">
        <Container size="narrow">
          <Reveal className="about-cta__inner">
            <h2>{t.about.ctaTitle}</h2>
            <p>
              {t.about.ctaTextA}<br />
              {t.about.ctaTextB}
            </p>
            <Button to="/contact">{t.about.cta}</Button>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}
