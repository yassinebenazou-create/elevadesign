import { seoConfig } from '../config/seo'
import { siteConfig } from '../config/site'
import type { Project } from '../types/project'

export function absoluteSiteUrl(path = '/') {
  return `${seoConfig.siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: seoConfig.siteUrl,
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
    url: seoConfig.siteUrl,
    inLanguage: 'fr-FR',
  }
}

export function professionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteConfig.name,
    url: seoConfig.siteUrl,
    logo: absoluteSiteUrl(siteConfig.logo.src),
    image: absoluteSiteUrl(seoConfig.defaultImage),
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    areaServed: {
      '@type': 'Country',
      name: 'Maroc',
    },
    serviceType: [
      'Architecture intérieure',
      'Design intérieur',
      'Aménagement intérieur',
      'Aménagement extérieur',
      'Décoration intérieure',
    ],
    sameAs: [siteConfig.contact.instagramUrl, siteConfig.contact.facebookUrl].filter(Boolean),
  }
}

export function webPageSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: absoluteSiteUrl(path),
    inLanguage: 'fr-FR',
    isPartOf: {
      '@type': 'WebSite',
      name: seoConfig.siteName,
      url: seoConfig.siteUrl,
    },
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
      item: absoluteSiteUrl(item.path),
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
      url: seoConfig.siteUrl,
    },
    about: project.category,
    contentLocation: knownLocation ? project.location : undefined,
    dateCreated: project.year.match(/^\d{4}$/) ? project.year : undefined,
    url: absoluteSiteUrl(`/projets/${project.slug}`),
  }
}
