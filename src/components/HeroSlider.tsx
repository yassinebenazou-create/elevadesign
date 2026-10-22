import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useMemo, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { heroSlides } from '../data/heroSlides'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useI18n } from '../i18n/I18nProvider'
import { preferredPagePath } from '../utils/urls'

const AUTOPLAY_DELAY = 5000

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasLoadedFirstImage, setHasLoadedFirstImage] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { t } = useI18n()
  const slideCount = heroSlides.length

  const activeSlide = heroSlides[activeIndex]

  const goToSlide = (index: number) => {
    setActiveIndex((index + slideCount) % slideCount)
  }

  const previousSlide = () => {
    goToSlide(activeIndex - 1)
  }

  const nextSlide = () => {
    goToSlide(activeIndex + 1)
  }

  const slideLabel = useMemo(
    () => t.hero.slideLabel(activeIndex + 1, slideCount),
    [activeIndex, slideCount, t],
  )

  useEffect(() => {
    if (isPaused || prefersReducedMotion) {
      return
    }

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slideCount)
    }, AUTOPLAY_DELAY)

    return () => {
      window.clearInterval(timer)
    }
  }, [isPaused, prefersReducedMotion, slideCount])

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      previousSlide()
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      nextSlide()
    }
  }

  return (
    <section
      className="hero hero-slider loaded"
      id="hero"
      aria-label={t.hero.aria}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
    >
      <div className="hero-slider__media" aria-live="off">
        {heroSlides.map((slide, index) => (
          <picture key={slide.id}>
            {index === 0 ? (
              <source
                media="(max-width: 767px)"
                type="image/avif"
                srcSet="/images/hero/hero-01-mobile-720.avif 720w, /images/hero/hero-01-mobile-1080.avif 1080w, /images/hero/hero-01-mobile-1440.avif 1440w"
                sizes="100vw"
              />
            ) : null}
            {index === 0 ? (
              <source
                type="image/avif"
                srcSet="/images/hero/hero-01-960.avif 960w, /images/hero/hero-01-1600.avif 1600w, /images/hero/hero-01-2400.avif 2400w"
                sizes="max(100vw, 150vh)"
              />
            ) : null}
            <img
              alt={slide.alt}
              aria-hidden={index !== activeIndex}
              className={`hero-slider__image ${index === activeIndex ? 'is-active' : ''}`}
              decoding="async"
              fetchPriority={index === 0 ? 'high' : 'auto'}
              loading={index === 0 ? 'eager' : 'lazy'}
              width={index === 0 ? 5749 : 1920}
              height={index === 0 ? 3833 : 1281}
              src={index === 0 || hasLoadedFirstImage || index === activeIndex ? slide.src : undefined}
              srcSet={index === 0 ? '/images/hero/hero-01-960.webp 960w, /images/hero/hero-01-1600.webp 1600w, /images/hero/hero-01-2400.webp 2400w' : undefined}
              sizes={index === 0 ? 'max(100vw, 150vh)' : undefined}
              onLoad={index === 0 ? () => setHasLoadedFirstImage(true) : undefined}
              style={{ objectPosition: slide.position }}
            />
          </picture>
        ))}
      </div>
      <div className="hero-slider__overlay" />

      <div className="hero-slider__content">
        <p className="hero-slider__eyebrow">{t.hero.eyebrow}</p>
        <h1 className="hero-slider__title">{t.hero.title}</h1>
        <Link className="hero-slider__cta" to={preferredPagePath('/projets')}>
          {t.hero.cta}
        </Link>
      </div>

      <div className="hero-slider__controls" aria-label="Navigation du diaporama">
        <button type="button" onClick={previousSlide} aria-label={t.hero.previous}>
          <ArrowLeft size={20} />
        </button>
        <button type="button" onClick={nextSlide} aria-label={t.hero.next}>
          <ArrowRight size={20} />
        </button>
      </div>

      <div className="hero-slider__indicators" aria-label={slideLabel}>
        {heroSlides.map((slide, index) => (
          <button
            type="button"
            aria-label={t.hero.showSlide(index + 1)}
            aria-current={index === activeIndex}
            key={slide.id}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      <div className="hero-slider__scroll" aria-hidden="true">
        <span>{t.hero.scroll}</span>
        <i />
      </div>

      <span className="sr-only">{activeSlide.alt}</span>
    </section>
  )
}
