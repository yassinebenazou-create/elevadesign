import { useEffect, useRef } from 'react'

const SIMPLEEMBED_SCRIPT_SRC = 'https://simpleembed.com/embed.js'

type SimpleembedFeedProps = {
  feedId: string
  title: string
}

export function SimpleembedFeed({ feedId, title }: SimpleembedFeedProps) {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current

    if (!mount) return undefined

    mount.innerHTML = ''

    const script = document.createElement('script')
    script.src = SIMPLEEMBED_SCRIPT_SRC
    script.async = true
    script.dataset.feedId = feedId

    mount.appendChild(script)

    return () => {
      mount.innerHTML = ''
    }
  }, [feedId])

  return <div className="simpleembed-feed" ref={mountRef} aria-label={title} />
}
