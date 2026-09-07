import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { seoConfig } from '../config/seo'

type SeoProps = {
  title: string
  description: string
  image?: string
  canonicalPath?: string
  robots?: string
  type?: 'website' | 'article'
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

const managedSelector = 'meta[data-seo="managed"], link[data-seo="managed"], script[data-seo="managed"]'

function absoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl
  }

  return `${seoConfig.siteUrl}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    element.dataset.seo = 'managed'
    document.head.appendChild(element)
  }

  element.content = content
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    element.dataset.seo = 'managed'
    document.head.appendChild(element)
  }

  element.href = href
}

export function Seo({
  title,
  description,
  image = seoConfig.defaultImage,
  canonicalPath,
  robots = 'index, follow',
  type = 'website',
  jsonLd,
}: SeoProps) {
  const location = useLocation()

  useEffect(() => {
    const canonicalUrl = absoluteUrl(canonicalPath ?? location.pathname)
    const imageUrl = absoluteUrl(image)

    document.title = title
    document.documentElement.lang = 'fr'

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', robots)
    upsertCanonical(canonicalUrl)

    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:locale', seoConfig.locale)
    upsertMeta('property', 'og:site_name', seoConfig.siteName)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:image', imageUrl)

    upsertMeta('name', 'twitter:card', seoConfig.twitterCard)
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', imageUrl)

    document.head.querySelectorAll('script[data-seo="managed"]').forEach((element) => element.remove())

    if (jsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.seo = 'managed'
      script.text = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }
  }, [canonicalPath, description, image, jsonLd, location.pathname, robots, title, type])

  return null
}

export function cleanupManagedSeo() {
  document.head.querySelectorAll(managedSelector).forEach((element) => element.remove())
}
