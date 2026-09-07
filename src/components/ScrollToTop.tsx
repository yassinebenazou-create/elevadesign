import { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

const scrollToPageTop = () => {
  window.scrollTo(0, 0)
}

export function ScrollToTop() {
  const location = useLocation()

  useLayoutEffect(() => {
    scrollToPageTop()
  }, [location.pathname, location.search, location.key])

  useEffect(() => {
    const supportsScrollRestoration = 'scrollRestoration' in window.history
    const previousScrollRestoration = supportsScrollRestoration
      ? window.history.scrollRestoration
      : undefined

    if (supportsScrollRestoration) {
      window.history.scrollRestoration = 'manual'
    }

    const handleInternalNavigationClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) {
        return
      }

      if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
        return
      }

      const target = event.target instanceof Element ? event.target : null
      const link = target?.closest('a[href]')

      if (!(link instanceof HTMLAnchorElement)) {
        return
      }

      if (link.target && link.target !== '_self') {
        return
      }

      const nextUrl = new URL(link.href, window.location.href)

      if (nextUrl.origin !== window.location.origin) {
        return
      }

      const isHashOnlyNavigation =
        nextUrl.pathname === window.location.pathname &&
        nextUrl.search === window.location.search &&
        nextUrl.hash !== '' &&
        nextUrl.hash !== window.location.hash

      if (isHashOnlyNavigation) {
        return
      }

      window.setTimeout(scrollToPageTop, 0)
    }

    document.addEventListener('click', handleInternalNavigationClick, true)

    return () => {
      document.removeEventListener('click', handleInternalNavigationClick, true)

      if (supportsScrollRestoration && previousScrollRestoration) {
        window.history.scrollRestoration = previousScrollRestoration
      }
    }
  }, [])

  return null
}
