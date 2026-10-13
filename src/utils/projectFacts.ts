import type { Project } from '../types/project'

export function isKnownProjectValue(value: string | undefined) {
  if (!value) return false

  return !value.toLowerCase().includes('renseigner')
}

export function getProjectMetaParts(project: { category: string; location: string; year: string }) {
  return [
    project.category,
    isKnownProjectValue(project.location) ? project.location : undefined,
    isKnownProjectValue(project.year) ? project.year : undefined,
  ].filter((part): part is string => Boolean(part))
}

export function getProjectSeoTitle(project: Project) {
  const knownLocation = isKnownProjectValue(project.location)
  const locationText = knownLocation && project.location.toLowerCase() !== 'maroc'
    ? ` à ${project.location}`
    : ' au Maroc'
  const subject = project.type || project.category

  return `${project.title} | ${subject}${locationText} | Eleva Design`
}

export function getProjectSeoDescription(project: Project) {
  const knownLocation = isKnownProjectValue(project.location)
  const knownYear = isKnownProjectValue(project.year)
  const context = [
    project.type,
    knownLocation ? project.location : undefined,
    knownYear ? project.year : undefined,
  ].filter(Boolean)

  if (context.length === 0) {
    return project.shortDescription
  }

  return `${project.shortDescription} ${context.join(' · ')}.`
}
