import { ExternalLink, Images, Play, X } from 'lucide-react'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { SimpleembedFeed } from './SimpleembedFeed'

const SIMPLEEMBED_API_BASE = 'https://simpleembed.com/api/feeds'
const INSTAGRAM_EMBED_SCRIPT_SRC = 'https://www.instagram.com/embed.js'
const FEED_REFRESH_INTERVAL_MS = 5 * 60 * 1000

type InstagramMediaType = 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'

type InstagramPost = {
  id: string
  mediaType: InstagramMediaType
  caption: string | null
  permalink: string
  imageUrl: string
  timestamp: string
  childCount: number
}

type SimpleembedResponse = {
  feed: {
    id: string
    name: string
    source: string
  }
  posts: InstagramPost[]
}

type CustomInstagramGalleryProps = {
  feedId: string
  title: string
}

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void
      }
    }
  }
}

let instagramScriptPromise: Promise<void> | null = null

function loadInstagramEmbedScript() {
  if (window.instgrm?.Embeds) {
    return Promise.resolve()
  }

  if (instagramScriptPromise) {
    return instagramScriptPromise
  }

  instagramScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${INSTAGRAM_EMBED_SCRIPT_SRC}"]`,
    )

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(new Error('Instagram embed script failed')), {
        once: true,
      })
      return
    }

    const script = document.createElement('script')
    script.src = INSTAGRAM_EMBED_SCRIPT_SRC
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Instagram embed script failed'))
    document.body.appendChild(script)
  })

  return instagramScriptPromise
}

function getPostLabel(post: InstagramPost) {
  if (post.mediaType === 'VIDEO') return 'Reel Instagram'
  if (post.mediaType === 'CAROUSEL_ALBUM') return 'Publication Instagram'
  return 'Photo Instagram'
}

function useSimpleembedFeed(feedId: string) {
  const [data, setData] = useState<SimpleembedResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    let controller: AbortController | null = null

    const fetchFeed = async (isRefresh = false) => {
      controller?.abort()
      const nextController = new AbortController()
      controller = nextController

      if (!isRefresh) {
        setLoading(true)
      }

      try {
        const response = await fetch(`${SIMPLEEMBED_API_BASE}/${encodeURIComponent(feedId)}`, {
          signal: nextController.signal,
        })

        if (!response.ok) {
          throw new Error(`Simpleembed API returned ${response.status}`)
        }

        const nextData = (await response.json()) as SimpleembedResponse

        if (!mounted) return

        setData(nextData)
        setError(null)
      } catch (cause) {
        if (!mounted || nextController.signal.aborted) return

        setError(cause instanceof Error ? cause.message : 'Impossible de charger le flux Instagram.')
      } finally {
        if (mounted && controller === nextController) {
          setLoading(false)
        }
      }
    }

    void fetchFeed()
    const refreshId = window.setInterval(() => {
      void fetchFeed(true)
    }, FEED_REFRESH_INTERVAL_MS)

    return () => {
      mounted = false
      window.clearInterval(refreshId)
      controller?.abort()
    }
  }, [feedId])

  return { data, error, loading }
}

function subscribeToLocationChange(callback: () => void) {
  window.addEventListener('popstate', callback)
  window.addEventListener('hashchange', callback)

  return () => {
    window.removeEventListener('popstate', callback)
    window.removeEventListener('hashchange', callback)
  }
}

function isSimpleembedRollbackRequested() {
  if (typeof window === 'undefined') {
    return false
  }

  return new URLSearchParams(window.location.search).get('instagramGallery') === 'simpleembed'
}

export function InstagramGalleryExperiment(props: CustomInstagramGalleryProps) {
  const useSimpleembedRollback = useSyncExternalStore(
    subscribeToLocationChange,
    isSimpleembedRollbackRequested,
    () => false,
  )

  if (useSimpleembedRollback) {
    return <SimpleembedFeed {...props} />
  }

  return <CustomInstagramGallery {...props} />
}

export function CustomInstagramGallery({ feedId, title }: CustomInstagramGalleryProps) {
  const { data, error, loading } = useSimpleembedFeed(feedId)
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null)
  const [embedError, setEmbedError] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  const openPost = (post: InstagramPost) => {
    setEmbedError(false)
    setSelectedPost(post)
  }

  useEffect(() => {
    if (!selectedPost) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedPost(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.setTimeout(() => closeButtonRef.current?.focus(), 0)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedPost])

  useEffect(() => {
    if (!selectedPost) return undefined

    const processId = window.setTimeout(() => {
      loadInstagramEmbedScript()
        .then(() => window.instgrm?.Embeds?.process())
        .catch(() => setEmbedError(true))
    }, 80)

    return () => window.clearTimeout(processId)
  }, [selectedPost])

  if (loading) {
    return (
      <div className="custom-instagram custom-instagram--state" aria-live="polite">
        <span className="custom-instagram__kicker">Instagram</span>
        <p>Chargement des réalisations...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="custom-instagram custom-instagram--state" aria-live="polite">
        <span className="custom-instagram__kicker">Instagram</span>
        <p>Le flux personnalisé n'est pas disponible pour le moment.</p>
        <SimpleembedFeed feedId={feedId} title={title} />
      </div>
    )
  }

  if (!data?.posts.length) {
    return (
      <div className="custom-instagram custom-instagram--state" aria-live="polite">
        <span className="custom-instagram__kicker">Instagram</span>
        <p>Aucune réalisation Instagram n'est disponible pour le moment.</p>
      </div>
    )
  }

  return (
    <>
      <div className="custom-instagram" aria-label={title}>
        <div className="custom-instagram__grid">
          {data.posts.map((post) => {
            const isVideo = post.mediaType === 'VIDEO'
            const label = `${getPostLabel(post)} - ouvrir ${isVideo ? 'dans la fenêtre de lecture' : 'sur Instagram'}`

            if (isVideo) {
              return (
                <button
                  className="custom-instagram__tile"
                  key={post.id}
                  type="button"
                  aria-label={label}
                  onClick={() => openPost(post)}
                >
                  <img src={post.imageUrl} alt={post.caption ?? getPostLabel(post)} loading="lazy" />
                  <span className="custom-instagram__shade" aria-hidden="true" />
                  <span className="custom-instagram__badge">
                    <Play size={18} aria-hidden="true" />
                    Reel
                  </span>
                </button>
              )
            }

            return (
              <a
                className="custom-instagram__tile"
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <img src={post.imageUrl} alt={post.caption ?? getPostLabel(post)} loading="lazy" />
                <span className="custom-instagram__shade" aria-hidden="true" />
                <span className="custom-instagram__badge">
                  {post.mediaType === 'CAROUSEL_ALBUM' ? (
                    <Images size={18} aria-hidden="true" />
                  ) : (
                    <ExternalLink size={18} aria-hidden="true" />
                  )}
                  {post.mediaType === 'CAROUSEL_ALBUM' ? 'Album' : 'Post'}
                </span>
              </a>
            )
          })}
        </div>
        <a
          className="custom-instagram__attribution"
          href="https://simpleembed.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Flux Instagram synchronisé via Simpleembed
        </a>
      </div>

      {selectedPost ? (
        <div
          className="instagram-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="instagram-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedPost(null)
            }
          }}
        >
          <div className="instagram-modal__panel">
            <div className="instagram-modal__header">
              <div>
                <span className="custom-instagram__kicker">Instagram Reel</span>
                <h2 id="instagram-modal-title">Lecture sur le site</h2>
              </div>
              <button
                className="instagram-modal__close"
                type="button"
                aria-label="Fermer la vidéo"
                ref={closeButtonRef}
                onClick={() => setSelectedPost(null)}
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>
            <div className="instagram-modal__embed">
              {embedError ? (
                <p>Instagram ne permet pas la lecture intégrée de ce Reel pour le moment.</p>
              ) : null}
              <blockquote
                key={selectedPost.id}
                className="instagram-media"
                data-instgrm-captioned
                data-instgrm-permalink={selectedPost.permalink}
                data-instgrm-version="14"
              >
                <a href={selectedPost.permalink} target="_blank" rel="noopener noreferrer">
                  Voir ce Reel sur Instagram
                </a>
              </blockquote>
            </div>
            <a
              className="instagram-modal__fallback"
              href={selectedPost.permalink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir sur Instagram
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      ) : null}
    </>
  )
}
