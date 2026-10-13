import { motion } from 'motion/react'
import { useRef, useState } from 'react'
import { useHasMounted } from '../hooks/useHasMounted'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import type { ProjectGalleryImage } from '../types/project'
import { Lightbox } from './Lightbox'

type ProjectGalleryProps = {
  images: ProjectGalleryImage[]
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])
  const hasMounted = useHasMounted()
  const prefersReducedMotion = usePrefersReducedMotion()
  const canAnimate = hasMounted && !prefersReducedMotion

  const openLightbox = (index: number) => {
    setActiveIndex(index)
  }

  const closeLightbox = () => {
    const returnIndex = activeIndex
    setActiveIndex(null)

    window.setTimeout(() => {
      if (returnIndex !== null) {
        triggerRefs.current[returnIndex]?.focus()
      }
    }, 0)
  }

  const showPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === null ? currentIndex : (currentIndex - 1 + images.length) % images.length,
    )
  }

  const showNext = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === null ? currentIndex : (currentIndex + 1) % images.length,
    )
  }

  return (
    <>
      <div className="project-gallery">
        {images.map((image, index) => (
          <motion.figure
            className={`project-gallery__item project-gallery__item--${index + 1}`}
            initial={canAnimate ? { opacity: 0, y: 28 } : false}
            whileInView={canAnimate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, amount: 0.18 }}
            key={image.src}
          >
            <button
              type="button"
              aria-label={`Agrandir l’image ${index + 1}`}
              onClick={() => openLightbox(index)}
              ref={(element) => {
                triggerRefs.current[index] = element
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                width={1920}
                height={1280}
              />
            </button>
          </motion.figure>
        ))}
      </div>

      {activeIndex !== null ? (
        <Lightbox
          images={images}
          activeIndex={activeIndex}
          onClose={closeLightbox}
          onNext={showNext}
          onPrevious={showPrevious}
        />
      ) : null}
    </>
  )
}
