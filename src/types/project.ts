export type ProjectCategory =
  | 'Architecture'
  | 'Architecture résidentielle'
  | 'Design intérieur'
  | 'Aménagement extérieur'
  | 'Habillage mural'
  | 'Design commercial'
  | 'Résidentiel'
  | 'Commercial'
  | 'Rénovation'

export type ProjectGalleryImage = {
  src: string
  alt: string
}

export type Project = {
  slug: string
  title: string
  category: ProjectCategory
  location: string
  year: string
  type: string
  studio: string
  featured: boolean
  coverImage: string
  coverAlt: string
  shortDescription: string
  description: string
  scope: string[]
  materials: string[]
  gallery: ProjectGalleryImage[]
}
