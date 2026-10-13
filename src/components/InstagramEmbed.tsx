import { ExternalLink } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void
      }
    }
  }
}

type InstagramEmbedProps = {
  url: string
  fallbackLabel: string
  loadingLabel: string
}

let instagramScriptPromise: Promise<void> | null = null

function loadInstagramScript() {
  if (typeof window === 'undefined') return Promise.resolve()

  if (window.instgrm?.Embeds) {
    window.instgrm.Embeds.process()
    return Promise.resolve()
  }

  if (!instagramScriptPromise) {
    instagramScriptPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[src="https://www.instagram.com/embed.js"]',
      )

      if (existingScript) {
        existingScript.addEventListener('load', () => resolve(), { once: true })
        existingScript.addEventListener('error', () => reject(), { once: true })
        return
      }

      const script = document.createElement('script')
      script.async = true
      script.src = 'https://www.instagram.com/embed.js'
      script.onload = () => resolve()
      script.onerror = () => reject()
      document.body.appendChild(script)
    })
  }

  return instagramScriptPromise.then(() => {
    window.instgrm?.Embeds?.process()
  })
}

export function InstagramEmbed({ url, fallbackLabel, loadingLabel }: InstagramEmbedProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const element = rootRef.current

    if (!element || shouldLoad) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '560px 0px' },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [shouldLoad])

  useEffect(() => {
    if (!shouldLoad) return

    void loadInstagramScript().catch(() => undefined)
  }, [shouldLoad, url])

  return (
    <div className="instagram-embed" ref={rootRef}>
      {shouldLoad ? (
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
        >
          <a href={url} target="_blank" rel="noreferrer">
            {fallbackLabel}
          </a>
        </blockquote>
      ) : (
        <div className="instagram-embed__placeholder" aria-live="polite">
          <span>{loadingLabel}</span>
        </div>
      )}
      <a className="instagram-embed__fallback" href={url} target="_blank" rel="noreferrer">
        <span>{fallbackLabel}</span>
        <ExternalLink size={15} aria-hidden="true" />
      </a>
    </div>
  )
}
