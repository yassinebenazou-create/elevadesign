import { pageSeo, seoConfig } from '../config/seo'
import { projects } from '../data/projects'
import {
  breadcrumbSchema,
  organizationSchema,
  professionalServiceSchema,
  projectSchema,
  webPageSchema,
  websiteSchema,
} from '../utils/structuredData'

export type RouteSeo = {
  path: string
  title: string
  description: string
  canonicalPath: string
  image?: string
  robots?: string
  type?: 'website' | 'article'
  priority: number
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

const staticRoutes: RouteSeo[] = [
  {
    path: '/',
    title: pageSeo.home.title,
    description: pageSeo.home.description,
    canonicalPath: '/',
    image: seoConfig.defaultImage,
    priority: 1,
    jsonLd: [
      organizationSchema(),
      websiteSchema(),
      professionalServiceSchema(),
      webPageSchema(pageSeo.home.h1, pageSeo.home.description, '/'),
    ],
  },
  {
    path: '/projets',
    title: pageSeo.projects.title,
    description: pageSeo.projects.description,
    canonicalPath: '/projets',
    priority: 0.9,
    jsonLd: [
      breadcrumbSchema([
        { name: 'Accueil', path: '/' },
        { name: 'Projets', path: '/projets' },
      ]),
      webPageSchema(pageSeo.projects.h1, pageSeo.projects.description, '/projets'),
    ],
  },
  {
    path: '/realisations',
    title: pageSeo.realisations.title,
    description: pageSeo.realisations.description,
    canonicalPath: '/realisations',
    priority: 0.78,
    jsonLd: [
      breadcrumbSchema([
        { name: 'Accueil', path: '/' },
        { name: 'Nos Réalisations', path: '/realisations' },
      ]),
      webPageSchema(pageSeo.realisations.h1, pageSeo.realisations.description, '/realisations'),
    ],
  },
  {
    path: '/services',
    title: pageSeo.services.title,
    description: pageSeo.services.description,
    canonicalPath: '/services',
    priority: 0.88,
    jsonLd: [
      professionalServiceSchema(),
      breadcrumbSchema([
        { name: 'Accueil', path: '/' },
        { name: 'Services', path: '/services' },
      ]),
      webPageSchema(pageSeo.services.h1, pageSeo.services.description, '/services'),
    ],
  },
  {
    path: '/a-propos',
    title: pageSeo.about.title,
    description: pageSeo.about.description,
    canonicalPath: '/a-propos',
    priority: 0.75,
    jsonLd: [
      breadcrumbSchema([
        { name: 'Accueil', path: '/' },
        { name: 'À propos', path: '/a-propos' },
      ]),
      webPageSchema(pageSeo.about.h1, pageSeo.about.description, '/a-propos'),
    ],
  },
  {
    path: '/contact',
    title: pageSeo.contact.title,
    description: pageSeo.contact.description,
    canonicalPath: '/contact',
    priority: 0.8,
    jsonLd: [
      professionalServiceSchema(),
      breadcrumbSchema([
        { name: 'Accueil', path: '/' },
        { name: 'Contact', path: '/contact' },
      ]),
      webPageSchema(pageSeo.contact.h1, pageSeo.contact.description, '/contact'),
    ],
  },
]

const projectRoutes: RouteSeo[] = projects.map((project) => {
  const path = `/projets/${project.slug}`
  const title = `${project.title} | ${project.category} au Maroc | Eleva Design`
  const description = project.shortDescription

  return {
    path,
    title,
    description,
    canonicalPath: path,
    image: project.coverImage,
    type: 'article',
    priority: project.featured ? 0.72 : 0.65,
    jsonLd: [
      breadcrumbSchema([
        { name: 'Accueil', path: '/' },
        { name: 'Projets', path: '/projets' },
        { name: project.title, path },
      ]),
      projectSchema(project, description),
    ],
  }
})

export const indexableRoutes: RouteSeo[] = [...staticRoutes, ...projectRoutes]

export const notFoundRouteSeo: RouteSeo = {
  path: '/404',
  title: pageSeo.notFound.title,
  description: pageSeo.notFound.description,
  canonicalPath: '/404',
  robots: 'noindex, follow',
  priority: 0,
}

function normalizePath(path: string) {
  if (path === '') return '/'
  const withoutQuery = path.split(/[?#]/)[0] || '/'
  return withoutQuery.length > 1 ? withoutQuery.replace(/\/$/, '') : withoutQuery
}

export function getRouteSeo(path: string) {
  const normalizedPath = normalizePath(path)
  return indexableRoutes.find((route) => route.path === normalizedPath) ?? notFoundRouteSeo
}

export function getSitemapRoutes() {
  return indexableRoutes
}
