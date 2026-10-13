import { projects } from './projects'
import { serviceLandingPages } from './serviceLandingPages'

export const generalServicesLink = {
  path: '/services',
  title: 'Services Eleva Design',
  description: 'Explorer les services d’architecture intérieure, décoration et aménagement.',
}

export const projectServiceMap: Record<string, string[]> = {
  'residence-ivoire': [
    'architecture-interieure',
    'cuisine-salon',
    'renovation-interieure',
    'villas-appartements',
  ],
  'villa-horizon': ['villas-appartements', 'architecture-interieure'],
  'maison-neroli': ['restaurants-cafes-commerces', 'decoration-interieure'],
  'salon-a1': ['cuisine-salon', 'decoration-interieure'],
  'salon-a2': ['cuisine-salon', 'decoration-interieure'],
  'chambre-a1': ['decoration-interieure', 'architecture-interieure'],
  'chambre-a2': ['decoration-interieure', 'architecture-interieure'],
  'chambre-a3': ['decoration-interieure'],
  'chambre-a4': ['decoration-interieure'],
  'bureau-b1': ['architecture-interieure', 'decoration-interieure'],
  'bureau-b2': ['architecture-interieure'],
  'bureau-b3': ['architecture-interieure', 'decoration-interieure'],
  'restaurant-wakame': ['restaurants-cafes-commerces', 'decoration-interieure'],
  'restaurant-wakame2': ['restaurants-cafes-commerces', 'decoration-interieure'],
  'villa-b3': ['villas-appartements', 'architecture-interieure'],
  'villa-c1': ['villas-appartements', 'architecture-interieure'],
  'villa-celia': ['villas-appartements', 'architecture-interieure'],
  'villa-h1': ['villas-appartements', 'architecture-interieure'],
  'villa-h2': ['villas-appartements', 'architecture-interieure', 'cuisine-salon'],
  'villa-m1': ['villas-appartements'],
  'villas-assinie-int': ['villas-appartements', 'architecture-interieure'],
  'habillage-mural': ['decoration-interieure'],
  'lotissement-campus': [],
}

export const portfolioServiceLinks = [
  'architecture-interieure',
  'decoration-interieure',
  'cuisine-salon',
  'villas-appartements',
  'restaurants-cafes-commerces',
  'renovation-interieure',
] as const

export function getProjectServices(projectSlug: string) {
  const serviceSlugs = projectServiceMap[projectSlug] ?? []

  return serviceSlugs
    .map((slug) => serviceLandingPages.find((service) => service.slug === slug))
    .filter((service): service is (typeof serviceLandingPages)[number] => Boolean(service))
}

export function getRelatedProjects(projectSlug: string, limit = 3) {
  const currentProject = projects.find((project) => project.slug === projectSlug)

  if (!currentProject) return []

  const currentServices = new Set(projectServiceMap[projectSlug] ?? [])

  return projects
    .filter((project) => project.slug !== projectSlug)
    .map((project) => {
      const projectServices = projectServiceMap[project.slug] ?? []
      const serviceOverlap = projectServices.filter((service) => currentServices.has(service)).length
      const sameCategory = project.category === currentProject.category ? 1 : 0
      const sameType = project.type === currentProject.type ? 1 : 0
      const score = serviceOverlap * 3 + sameCategory * 2 + sameType

      return { project, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ project }) => project)
}

export function getProjectsForService(serviceSlug: string, preferredSlugs: string[] = [], limit = 3) {
  const preferredProjects = preferredSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is (typeof projects)[number] => Boolean(project))

  const mappedProjects = projects.filter((project) =>
    (projectServiceMap[project.slug] ?? []).includes(serviceSlug),
  )

  return [...preferredProjects, ...mappedProjects]
    .filter((project, index, list) => list.findIndex((item) => item.slug === project.slug) === index)
    .slice(0, limit)
}
