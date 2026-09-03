import { siteConfig } from '../config/site'
import type { Project, ProjectCategory, ProjectGalleryImage } from '../types/project'

type ProjectInput = {
  slug: string
  title: string
  category: ProjectCategory
  location: string
  year: string
  type: string
  featured?: boolean
  files: string[]
  altBase: string
  shortDescription: string
  description?: string
  scope?: string[]
  materials?: string[]
}

const uploadedProject = ({
  slug,
  title,
  category,
  location,
  year,
  type,
  featured = false,
  files,
  altBase,
  shortDescription,
  description = shortDescription,
  scope = ['Concept décoratif', 'Aménagement intérieur', 'Sélection des matières'],
  materials = ['Bois', 'Pierre', 'Tons neutres'],
}: ProjectInput): Project => {
  const gallery: ProjectGalleryImage[] = files.map((file, index) => ({
    src: `/images/projects/${slug}/${file}`,
    alt: `${altBase}, vue ${index + 1}.`,
  }))

  return {
    slug,
    title,
    category,
    location,
    year,
    type,
    studio: siteConfig.name,
    featured,
    coverImage: gallery[0].src,
    coverAlt: gallery[0].alt,
    shortDescription,
    description,
    scope,
    materials,
    gallery,
  }
}

const rangeFiles = (prefix: string, extension: 'jpg' | 'webp', count: number) =>
  Array.from({ length: count }, (_, index) => `${prefix}-${String(index + 1).padStart(2, '0')}.${extension}`)

export const projects: Project[] = [
  {
    slug: 'residence-ivoire',
    title: 'Résidence Ivoire',
    category: 'Design intérieur',
    location: 'Casablanca',
    year: '2025',
    type: 'Résidence privée',
    studio: siteConfig.name,
    featured: true,
    coverImage: '/images/projects/residence-ivoire/01-cover.jpg',
    coverAlt: 'Salon contemporain lumineux avec canapé gris et escalier en verre.',
    shortDescription:
      'Réaménagement d’une résidence contemporaine aux lignes épurées, associant lumière naturelle, matériaux chaleureux et mobilier sur mesure.',
    description:
      'Réaménagement d’une résidence contemporaine aux lignes épurées, associant lumière naturelle, matériaux chaleureux et mobilier sur mesure.',
    scope: ['Réaménagement intérieur', 'Sélection matières', 'Mobilier sur mesure'],
    materials: ['Bois chaleureux', 'Verre', 'Tons ivoire'],
    gallery: [
      {
        src: '/images/projects/residence-ivoire/01-cover.jpg',
        alt: 'Salon contemporain lumineux avec canapé gris, escalier en verre et grandes fenêtres.',
      },
      {
        src: '/images/projects/residence-ivoire/02-living-room.jpg',
        alt: 'Espace salon ouvert sur une cuisine blanche avec escalier central et table basse en bois.',
      },
      {
        src: '/images/projects/residence-ivoire/03-seating-area.jpg',
        alt: 'Coin salon clair avec canapé beige, tableau mural, lampe et cuisine compacte en arrière-plan.',
      },
      {
        src: '/images/projects/residence-ivoire/04-staircase.jpg',
        alt: 'Salon gris baigné de lumière naturelle avec fauteuil à motif, tableaux abstraits et escalier latéral.',
      },
      {
        src: '/images/projects/residence-ivoire/05-interior-detail.jpg',
        alt: 'Salon aux tons ivoire et orangés avec plante verte, table ronde et cuisine blanche attenante.',
      },
    ],
  },
  {
    slug: 'villa-horizon',
    title: 'Villa Horizon',
    category: 'Architecture résidentielle',
    location: 'Marrakech',
    year: '2024',
    type: 'Villa contemporaine',
    studio: siteConfig.name,
    featured: true,
    coverImage: '/images/projects/villa-horizon/01-cover.jpg',
    coverAlt: 'Villa contemporaine avec piscine éclairée au crépuscule.',
    shortDescription:
      'Conception d’une villa moderne ouverte sur son jardin, avec de grandes baies vitrées, une piscine et des espaces extérieurs élégants.',
    description:
      'Conception d’une villa contemporaine ouverte sur son environnement, avec de grandes baies vitrées, une piscine et des espaces de vie lumineux.',
    scope: ['Architecture résidentielle', 'Aménagement extérieur', 'Ambiance lumineuse'],
    materials: ['Pierre', 'Verre', 'Enduit clair'],
    gallery: [
      {
        src: '/images/projects/villa-horizon/01-cover.jpg',
        alt: 'Villa contemporaine de plusieurs niveaux avec baies vitrées, jardin et piscine éclairée au crépuscule.',
      },
      {
        src: '/images/projects/villa-horizon/02-exterior.jpg',
        alt: 'Façade contemporaine blanche avec terrasse minérale, piscine et collines en arrière-plan.',
      },
      {
        src: '/images/projects/villa-horizon/03-pool-sunset.jpg',
        alt: 'Villa moderne avec piscine au coucher du soleil, terrasse en pierre et fauteuil suspendu.',
      },
      {
        src: '/images/projects/villa-horizon/04-living-room.jpg',
        alt: 'Séjour double hauteur avec grande baie vitrée donnant sur la mer, canapés gris et mur en pierre.',
      },
      {
        src: '/images/projects/villa-horizon/05-interior-view.jpg',
        alt: 'Salon contemporain ouvert sur la mer avec suspensions rondes, boiseries et larges vitrages.',
      },
    ],
  },
  {
    slug: 'maison-neroli',
    title: 'Maison Néroli',
    category: 'Design commercial',
    location: 'Rabat',
    year: '2025',
    type: 'Espace commercial',
    studio: siteConfig.name,
    featured: true,
    coverImage: '/images/projects/maison-neroli/01-cover.jpg',
    coverAlt: 'Intérieur élégant d’un restaurant avec éclairage chaleureux.',
    shortDescription:
      'Création d’un espace commercial raffiné combinant textures naturelles, éclairage d’ambiance et mobilier contemporain.',
    description:
      'Création d’un espace commercial élégant combinant textures naturelles, éclairage chaleureux et mobilier contemporain.',
    scope: ['Concept commercial', 'Mobilier contemporain', 'Éclairage d’ambiance'],
    materials: ['Textures naturelles', 'Bois', 'Lumière chaude'],
    gallery: [
      {
        src: '/images/projects/maison-neroli/01-cover.jpg',
        alt: 'Mur décoratif de restaurant avec motif végétal, miroir rétroéclairé et suspension plumeuse chaleureuse.',
      },
      {
        src: '/images/projects/maison-neroli/02-seating.jpg',
        alt: 'Salle de restaurant élégante avec plafond en lames de bois, tables dressées et banquettes rouges.',
      },
      {
        src: '/images/projects/maison-neroli/03-bar.jpg',
        alt: 'Bar de restaurant sombre avec ampoules suspendues, étagères éclairées et assises hautes.',
      },
      {
        src: '/images/projects/maison-neroli/04-lighting.jpg',
        alt: 'Salle de restaurant feutrée avec plafond courbe en bois, banquettes vertes et éclairage ponctuel.',
      },
      {
        src: '/images/projects/maison-neroli/05-interior-detail.jpg',
        alt: 'Banquette de restaurant avec niches murales en brique claire, plantes et appliques lumineuses.',
      },
    ],
  },
  uploadedProject({
    slug: 'salon-a1',
    title: 'Salon A1',
    category: 'Design intérieur',
    location: 'Maroc',
    year: 'À renseigner',
    type: 'Salon résidentiel',
    files: rangeFiles('Salon-a1', 'jpg', 7),
    altBase: 'Salon résidentiel contemporain avec aménagement décoratif',
    shortDescription: 'Aménagement d’un salon résidentiel avec une composition chaleureuse, des volumes lisibles et une atmosphère soignée.',
    scope: ['Décoration de salon', 'Agencement mobilier', 'Ambiance lumineuse'],
    materials: ['Tissus texturés', 'Bois', 'Tons ivoire'],
  }),
  uploadedProject({
    slug: 'salon-a2',
    title: 'Salon A2',
    category: 'Design intérieur',
    location: 'Maroc',
    year: 'À renseigner',
    type: 'Salon résidentiel',
    files: rangeFiles('salon-a2', 'jpg', 7),
    altBase: 'Salon élégant avec mobilier contemporain et détails décoratifs',
    shortDescription: 'Étude décorative d’un salon pensé pour conjuguer confort quotidien, lignes épurées et finitions élégantes.',
  }),
  uploadedProject({
    slug: 'chambre-a1',
    title: 'Chambre A1',
    category: 'Design intérieur',
    location: 'Maroc',
    year: 'À renseigner',
    type: 'Chambre privée',
    files: rangeFiles('chambre-a1', 'jpg', 7),
    altBase: 'Chambre contemporaine avec ambiance douce et matières chaleureuses',
    shortDescription: 'Conception d’une chambre apaisante autour de matières naturelles, rangements intégrés et éclairage discret.',
    scope: ['Décoration de chambre', 'Tête de lit', 'Éclairage décoratif'],
  }),
  uploadedProject({
    slug: 'chambre-a2',
    title: 'Chambre A2',
    category: 'Design intérieur',
    location: 'Maroc',
    year: 'À renseigner',
    type: 'Chambre privée',
    files: rangeFiles('chambre-a2', 'jpg', 7),
    altBase: 'Suite de nuit élégante avec mobilier intégré',
    shortDescription: 'Aménagement d’un espace nuit confortable avec une palette neutre, des textures raffinées et une lecture claire du volume.',
  }),
  uploadedProject({
    slug: 'chambre-a3',
    title: 'Chambre A3',
    category: 'Design intérieur',
    location: 'Maroc',
    year: 'À renseigner',
    type: 'Chambre privée',
    files: rangeFiles('chambre-a3', 'jpg', 6),
    altBase: 'Chambre contemporaine aux tons calmes et détails sur mesure',
    shortDescription: 'Projet de chambre à l’esthétique sobre, imaginé autour du confort, de la lumière et d’une finition attentive.',
  }),
  uploadedProject({
    slug: 'chambre-a4',
    title: 'Chambre A4',
    category: 'Design intérieur',
    location: 'Maroc',
    year: 'À renseigner',
    type: 'Chambre privée',
    files: rangeFiles('chambre-a4', 'jpg', 8),
    altBase: 'Chambre aménagée avec décor mural et ambiance enveloppante',
    shortDescription: 'Composition d’un espace nuit chaleureux, avec détails décoratifs, matières tactiles et mobilier adapté aux usages.',
  }),
  uploadedProject({
    slug: 'bureau-b1',
    title: 'Bureau B1',
    category: 'Design commercial',
    location: 'Maroc',
    year: 'À renseigner',
    type: 'Bureau professionnel',
    files: rangeFiles('bureau-b1', 'jpg', 6),
    altBase: 'Bureau professionnel aménagé avec mobilier contemporain',
    shortDescription: 'Aménagement d’un bureau fonctionnel et élégant, pensé pour la concentration, l’accueil et la fluidité des usages.',
    scope: ['Aménagement de bureau', 'Mobilier professionnel', 'Optimisation des usages'],
  }),
  uploadedProject({
    slug: 'bureau-b2',
    title: 'Bureau B2',
    category: 'Design commercial',
    location: 'Maroc',
    year: 'À renseigner',
    type: 'Bureau professionnel',
    files: rangeFiles('bureau-b2', 'webp', 14),
    altBase: 'Espace de travail contemporain avec zones professionnelles aménagées',
    shortDescription: 'Projet de bureau conçu comme un environnement professionnel clair, structuré et accueillant.',
  }),
  uploadedProject({
    slug: 'bureau-b3',
    title: 'Bureau B3',
    category: 'Design commercial',
    location: 'Maroc',
    year: 'À renseigner',
    type: 'Bureau professionnel',
    files: rangeFiles('bureau-b3', 'jpg', 6),
    altBase: 'Bureau contemporain avec agencement professionnel et finitions sobres',
    shortDescription: 'Aménagement d’un espace de travail aux lignes nettes, avec une ambiance premium et des détails maîtrisés.',
  }),
  uploadedProject({
    slug: 'restaurant-wakame',
    title: 'Restaurant Wakame',
    category: 'Design commercial',
    location: 'Maroc',
    year: 'À renseigner',
    type: 'Restaurant',
    files: [
      'restaurant-wakame-01.webp',
      'restaurant-wakame-02.webp',
      'restaurant-wakame-04.webp',
      'restaurant-wakame-05.webp',
      'restaurant-wakame-06.webp',
      'restaurant-wakame-07.webp',
      'restaurant-wakame-08.webp',
      'restaurant-wakame-09.webp',
      'restaurant-wakame-10.webp',
      'restaurant-wakame-11.webp',
      'restaurant-wakame-12.webp',
      'restaurant-wakame-13.webp',
      'restaurant-wakame-14.webp',
      'restaurant-wakame-15.webp',
    ],
    altBase: 'Restaurant contemporain avec ambiance intérieure travaillée',
    shortDescription: 'Création d’une atmosphère de restaurant immersive, entre confort des assises, lumière d’ambiance et identité décorative.',
    scope: ['Concept restaurant', 'Ambiance client', 'Éclairage décoratif'],
    materials: ['Bois', 'Métal', 'Lumière chaude'],
  }),
  uploadedProject({
    slug: 'restaurant-wakame2',
    title: 'Restaurant Wakame 2',
    category: 'Design commercial',
    location: 'Maroc',
    year: 'À renseigner',
    type: 'Restaurant',
    files: rangeFiles('restaurant-wakame2', 'jpg', 6),
    altBase: 'Restaurant élégant avec mobilier et éclairage décoratif',
    shortDescription: 'Déclinaison d’un espace de restauration raffiné, pensé pour l’expérience client et la cohérence visuelle.',
  }),
  uploadedProject({
    slug: 'villa-b3',
    title: 'Villa B3',
    category: 'Architecture résidentielle',
    location: 'Maroc',
    year: 'À renseigner',
    type: 'Villa contemporaine',
    files: rangeFiles('villa-b3', 'webp', 5),
    altBase: 'Villa contemporaine avec espaces intérieurs et extérieurs aménagés',
    shortDescription: 'Étude résidentielle d’une villa contemporaine ouverte sur ses espaces de vie et son environnement extérieur.',
    scope: ['Architecture résidentielle', 'Intérieur et extérieur', 'Ambiance de villa'],
  }),
  uploadedProject({
    slug: 'villa-c1',
    title: 'Villa C1',
    category: 'Architecture résidentielle',
    location: 'Maroc',
    year: 'À renseigner',
    type: 'Villa contemporaine',
    files: rangeFiles('villa-c1', 'webp', 10),
    altBase: 'Villa contemporaine avec architecture sobre et aménagement résidentiel',
    shortDescription: 'Projet de villa autour de volumes contemporains, de vues dégagées et d’un aménagement intérieur cohérent.',
  }),
  uploadedProject({
    slug: 'villa-celia',
    title: 'Villa Celia',
    category: 'Architecture résidentielle',
    location: 'Maroc',
    year: 'À renseigner',
    type: 'Villa contemporaine',
    files: rangeFiles('villa-celia', 'webp', 15),
    altBase: 'Villa résidentielle contemporaine avec détails architecturaux',
    shortDescription: 'Conception résidentielle complète avec une attention portée aux transitions entre intérieur, façade et espace extérieur.',
  }),
  uploadedProject({
    slug: 'villa-h1',
    title: 'Villa H1',
    category: 'Architecture résidentielle',
    location: 'Maroc',
    year: 'À renseigner',
    type: 'Villa contemporaine',
    files: rangeFiles('villa-h1', 'webp', 15),
    altBase: 'Villa contemporaine avec espaces lumineux et architecture horizontale',
    shortDescription: 'Projet de villa aux lignes contemporaines, organisé autour de la lumière, de la circulation et du confort résidentiel.',
  }),
  uploadedProject({
    slug: 'villa-h2',
    title: 'Villa H2',
    category: 'Architecture résidentielle',
    location: 'Maroc',
    year: 'À renseigner',
    type: 'Villa contemporaine',
    files: rangeFiles('villa-h2', 'jpg', 7),
    altBase: 'Villa contemporaine avec aménagement intérieur et extérieur',
    shortDescription: 'Aménagement résidentiel d’une villa mêlant architecture sobre, matières chaleureuses et espaces de vie fluides.',
  }),
  uploadedProject({
    slug: 'villa-m1',
    title: 'Villa M1',
    category: 'Architecture résidentielle',
    location: 'Maroc',
    year: 'À renseigner',
    type: 'Villa contemporaine',
    files: rangeFiles('villa-m1', 'webp', 2),
    altBase: 'Villa contemporaine avec composition architecturale extérieure',
    shortDescription: 'Aperçu d’un projet de villa contemporaine, prêt à être enrichi lorsque les informations complètes seront disponibles.',
    scope: ['Architecture résidentielle', 'Concept extérieur', 'Volumétrie'],
  }),
  uploadedProject({
    slug: 'villas-assinie-int',
    title: 'Villas Assinie Intérieur',
    category: 'Architecture résidentielle',
    location: 'À renseigner',
    year: 'À renseigner',
    type: 'Villas résidentielles',
    files: rangeFiles('villas-assinie-int', 'webp', 10),
    altBase: 'Villa avec espaces intérieurs aménagés et atmosphère résidentielle',
    shortDescription: 'Série d’espaces intérieurs pour villas, organisée autour du confort, de la lumière et de matières naturelles.',
  }),
  uploadedProject({
    slug: 'lotissement-campus',
    title: 'Lotissement Campus',
    category: 'Architecture',
    location: 'À renseigner',
    year: 'À renseigner',
    type: 'Projet architectural',
    files: rangeFiles('lotissement-campus', 'webp', 6),
    altBase: 'Projet architectural de lotissement avec vues d’ensemble',
    shortDescription: 'Projet architectural à l’échelle d’un ensemble, destiné à présenter une vision globale d’aménagement et d’implantation.',
    scope: ['Architecture', 'Implantation', 'Étude d’ensemble'],
    materials: ['Volumes bâtis', 'Espaces extérieurs', 'Composition paysagère'],
  }),
]

export const featuredProjects = projects.filter((project) => project.featured)

export function getProjectBySlug(slug: string | undefined) {
  return projects.find((project) => project.slug === slug)
}

export function getAdjacentProjects(slug: string) {
  const currentIndex = projects.findIndex((project) => project.slug === slug)

  if (currentIndex === -1) {
    return { previousProject: undefined, nextProject: undefined }
  }

  return {
    previousProject: projects[(currentIndex - 1 + projects.length) % projects.length],
    nextProject: projects[(currentIndex + 1) % projects.length],
  }
}
