import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { useEffect, useRef, type KeyboardEvent } from 'react'
import type { ProjectGalleryImage } from '../types/project'

type LightboxProps = {
  images: ProjectGalleryImage[]
  activeIndex: number
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

export function Lightbox({
  images,
  activeIndex,
  onClose,
  onNext,
  onPrevious,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const activeImage = images[activeIndex]

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      onPrevious()
      return
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      onNext()
      return
    }

    if (event.key !== 'Tab') {
      return
    }

    const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )

    if (!focusableElements?.length) {
      return
    }

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Galerie projet en plein écran"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
      onKeyDown={handleKeyDown}
      ref={dialogRef}
    >
      <button
        type="button"
        className="lightbox__close"
        onClick={onClose}
        aria-label="Fermer la galerie"
        ref={closeButtonRef}
      >
        <X size={24} />
      </button>

      <button
        type="button"
        className="lightbox__arrow lightbox__arrow--previous"
        onClick={onPrevious}
        aria-label="Image précédente"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="lightbox__stage" onMouseDown={(event) => event.stopPropagation()}>
        <img src={activeImage.src} alt={activeImage.alt} />
      </div>

      <button
        type="button"
        className="lightbox__arrow lightbox__arrow--next"
        onClick={onNext}
        aria-label="Image suivante"
      >
        <ArrowRight size={24} />
      </button>

      <p className="lightbox__counter">
        {activeIndex + 1} / {images.length}
      </p>
    </div>
  )
}
