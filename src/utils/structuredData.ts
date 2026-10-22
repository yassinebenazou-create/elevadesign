import { seoConfig } from '../config/seo'
import { siteConfig } from '../config/site'
import type { Project } from '../types/project'
import { preferredPagePath } from './urls'

export function absoluteSiteUrl(path = '/') {
  return `${seoConfig.siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

export function absolutePageUrl(path = '/') {
  return absoluteSiteUrl(preferredPagePath(path))
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': absoluteSiteUrl('/#organization'),
    name: siteConfig.name,
    url: absolutePageUrl('/'),
    logo: absoluteSiteUrl(siteConfig.logo.src),
    email: siteConfig.contact.email,
    sameAs: [siteConfig.contact.instagramUrl, siteConfig.contact.facebookUrl].filter(Boolean),
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoConfig.siteName,
    url: absolutePageUrl('/'),
    inLanguage: 'fr-FR',
  }
}

export function businessSchema() {
  const hasVerifiedAddress = !siteConfig.contact.address.toLowerCase().includes('renseigner')
  return {
    ...organizationSchema(),
    // Do not claim LocalBusiness eligibility without a verified physical address.
    '@type': hasVerifiedAddress ? 'LocalBusiness' : 'Organization',
    address: hasVerifiedAddress ? {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address,
      addressCountry: 'MA',
    } : undefined,
    image: absoluteSiteUrl(seoConfig.defaultImage),
    telephone: `+${siteConfig.contact.whatsappNumber}`,
    areaServed: {
      '@type': 'Country',
      name: 'Maroc',
    },
  }
}

export function webPageSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: absolutePageUrl(path),
    inLanguage: 'fr-FR',
    isPartOf: {
      '@type': 'WebSite',
      name: seoConfig.siteName,
      url: absolutePageUrl('/'),
    },
  }
}

export function serviceSchema({
  name,
  description,
  path,
  serviceType,
}: {
  name: string
  description: string
  path: string
  serviceType: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    url: absolutePageUrl(path),
    provider: {
      '@id': absoluteSiteUrl('/#organization'),
    },
    areaServed: {
      '@type': 'Country',
      name: 'Maroc',
    },
  }
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolutePageUrl(item.path),
    })),
  }
}

export function projectSchema(project: Project, description: string) {
  const knownLocation = !project.location.toLowerCase().includes('renseigner')

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description,
    image: absoluteSiteUrl(project.coverImage),
    creator: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: absolutePageUrl('/'),
    },
    about: project.category,
    contentLocation: knownLocation ? { '@type': 'Place', name: project.location } : undefined,
    temporalCoverage: project.year.match(/^\d{4}$/) ? project.year : undefined,
    url: absolutePageUrl(`/projets/${project.slug}`),
  }
}
