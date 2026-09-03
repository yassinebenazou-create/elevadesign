import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useMemo, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { siteConfig } from '../config/site'
import { heroSlides } from '../data/heroSlides'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const AUTOPLAY_DELAY = 5000

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
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
    () => `Image ${activeIndex + 1} sur ${slideCount}`,
    [activeIndex, slideCount],
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
      aria-label="Accueil Eleva Design"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
    >
      <div className="hero-slider__media" aria-live="off">
        {heroSlides.map((slide, index) => (
          <img
            alt={slide.alt}
            aria-hidden={index !== activeIndex}
            className={`hero-slider__image ${index === activeIndex ? 'is-active' : ''}`}
            decoding={index === 0 ? 'sync' : 'async'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            key={slide.id}
            loading={index === 0 ? 'eager' : 'lazy'}
            src={slide.src}
            style={{ objectPosition: slide.position }}
          />
        ))}
      </div>
      <div className="hero-slider__overlay" />

      <div className="hero-slider__content">
        <p className="hero-slider__eyebrow">{siteConfig.activity}</p>
        <h1 className="hero-slider__title">Élever chaque espace avec mesure.</h1>
        <Link className="hero-slider__cta" to="/projets">
          Voir les projets
        </Link>
      </div>

      <div className="hero-slider__controls" aria-label="Navigation du diaporama">
        <button type="button" onClick={previousSlide} aria-label="Image précédente">
          <ArrowLeft size={20} />
        </button>
        <button type="button" onClick={nextSlide} aria-label="Image suivante">
          <ArrowRight size={20} />
        </button>
      </div>

      <div className="hero-slider__indicators" aria-label={slideLabel}>
        {heroSlides.map((slide, index) => (
          <button
            type="button"
            aria-label={`Afficher l’image ${index + 1}`}
            aria-current={index === activeIndex}
            key={slide.id}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      <div className="hero-slider__scroll" aria-hidden="true">
        <span>Défiler</span>
        <i />
      </div>

      <span className="sr-only">{activeSlide.alt}</span>
    </section>
  )
}
