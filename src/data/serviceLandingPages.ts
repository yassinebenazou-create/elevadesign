import { priorityServicePages } from './priorityServicePages'

export type ServiceLandingPage = {
  slug: string
  path: string
  title: string
  metaTitle: string
  metaDescription: string
  primaryKeyword: string
  secondaryKeywords: string[]
  eyebrow: string
  h1: string
  intro: string
  heroImage: string
  heroAlt: string
  overviewTitle: string
  overview: string[]
  highlights: string[]
  processTitle: string
  process: { title: string; text: string }[]
  projectSlugs: string[]
  relatedServiceSlugs: string[]
  faq: { question: string; answer: string }[]
}

export const serviceLandingPages: ServiceLandingPage[] = [
  ...priorityServicePages,
  {
    slug: 'architecture-interieure',
    path: '/services/architecture-interieure',
    title: 'Architecture intérieure',
    metaTitle: 'Architecture intérieure au Maroc | Eleva Design',
    metaDescription:
      "Eleva Design accompagne les projets d'architecture intérieure au Maroc : volumes, circulation, lumière, matières et détails pour villas, appartements et espaces professionnels.",
    primaryKeyword: 'architecture intérieure au Maroc',
    secondaryKeywords: [
      'design intérieur Maroc',
      'aménagement intérieur Maroc',
      'architecture intérieure villa Maroc',
      'architecture intérieure appartement Maroc',
    ],
    eyebrow: 'Service',
    h1: 'Architecture intérieure au Maroc',
    intro:
      "Eleva Design conçoit des intérieurs lisibles, chaleureux et fonctionnels pour les lieux de vie, les villas, les appartements et les espaces professionnels au Maroc.",
    heroImage: '/images/services/amenagement-interieur.jfif',
    heroAlt: 'Intérieur contemporain lumineux avec lignes sobres, bois, pierre et baies vitrées.',
    overviewTitle: 'Donner une structure claire à chaque espace',
    overview: [
      "L'architecture intérieure commence par les usages : circuler, recevoir, cuisiner, travailler, se reposer et vivre un lieu sans effort. Le studio étudie les volumes, les proportions, les axes de vue et la lumière pour créer une base cohérente avant de travailler l'ambiance.",
      "Cette approche s'applique aux projets résidentiels comme aux espaces professionnels. Elle permet de relier les pièces, d'améliorer la lecture du lieu et de donner aux matières, au mobilier et aux finitions une place juste.",
    ],
    highlights: [
      'Analyse des volumes, circulations et usages',
      'Intentions de matières, lumière et ambiance',
      'Agencement intérieur partiel ou global',
      'Cohérence entre esthétique, confort et fonctionnalité',
    ],
    processTitle: "Comment se construit l'accompagnement",
    process: [
      {
        title: 'Comprendre le lieu',
        text: "Le projet démarre par l'écoute des besoins, des habitudes et des contraintes du bien afin de définir une direction réaliste.",
      },
      {
        title: 'Structurer les espaces',
        text: 'Les volumes, la circulation et les zones de vie sont organisés pour rendre le lieu plus fluide et plus lisible.',
      },
      {
        title: 'Composer les détails',
        text: 'Les matières, les teintes, la lumière, le mobilier et les finitions sont choisis pour renforcer une ambiance cohérente.',
      },
      {
        title: 'Préparer la demande',
        text: 'Les échanges permettent de préciser les pièces concernées, les priorités et les éléments nécessaires à un devis adapté.',
      },
    ],
    projectSlugs: ['residence-ivoire', 'villa-horizon', 'villas-assinie-int'],
    relatedServiceSlugs: ['decoration-interieure', 'villas-appartements', 'renovation-interieure'],
    faq: [
      {
        question: "Eleva Design intervient-il sur une seule pièce ?",
        answer:
          "Oui. L'accompagnement peut concerner une pièce précise ou un projet plus global selon les besoins exprimés dans la demande de devis.",
      },
      {
        question: "L'architecture intérieure inclut-elle la décoration ?",
        answer:
          "Les deux sujets peuvent se compléter. L'architecture intérieure structure l'espace, tandis que la décoration affine l'atmosphère, les matières et les finitions.",
      },
      {
        question: 'Quels types de lieux sont concernés ?',
        answer:
          'Les projets présentés couvrent notamment des résidences privées, villas, salons, chambres, bureaux et espaces commerciaux au Maroc.',
      },
    ],
  },
  {
    slug: 'decoration-interieure',
    path: '/services/decoration-interieure',
    title: 'Décoration intérieure',
    metaTitle: 'Décoration intérieure au Maroc | Eleva Design',
    metaDescription:
      'Décoration intérieure au Maroc par Eleva Design : couleurs, textures, mobilier, habillages muraux et finitions pour salons, chambres, villas et appartements.',
    primaryKeyword: 'décoration intérieure au Maroc',
    secondaryKeywords: [
      'décorateur intérieur Maroc',
      'home decor Maroc',
      'décoration salon Maroc',
      'décoration chambre Maroc',
    ],
    eyebrow: 'Service',
    h1: 'Décoration intérieure au Maroc',
    intro:
      "Une décoration intérieure réussie ne surcharge pas le lieu : elle révèle son caractère avec des matières, des couleurs, des objets et des détails choisis avec précision.",
    heroImage: '/images/services/decoration-styling.jfif',
    heroAlt: 'Salon raffiné aux tons clairs avec mobilier contemporain, bois et lumière naturelle.',
    overviewTitle: 'Créer une atmosphère juste et durable',
    overview: [
      "Eleva Design travaille la décoration comme une composition complète : palette de couleurs, textures, mobilier, éclairage, objets, habillages muraux et finitions. Chaque choix sert l'équilibre du lieu et son usage quotidien.",
      "L'objectif est de donner une identité élégante aux salons, chambres, séjours ou espaces professionnels, sans inventer une ambiance déconnectée de la vie réelle du client.",
    ],
    highlights: [
      'Palette de couleurs et matières',
      'Mobilier, objets décoratifs et finitions',
      'Habillages muraux et détails de caractère',
      'Ambiance cohérente pour pièces de vie et espaces privés',
    ],
    processTitle: 'Une décoration pensée comme un ensemble',
    process: [
      {
        title: 'Définir une direction',
        text: "Les inspirations et les usages du lieu sont clarifiés pour éviter les choix décoratifs isolés.",
      },
      {
        title: 'Choisir les matières',
        text: 'Les textures, teintes, textiles, bois, pierres et finitions sont sélectionnés pour construire une ambiance lisible.',
      },
      {
        title: 'Composer le mobilier',
        text: 'Le mobilier et les objets sont placés selon les proportions, la circulation et la lumière disponible.',
      },
      {
        title: 'Finaliser les détails',
        text: "Les derniers éléments décoratifs renforcent l'identité du lieu sans alourdir sa lecture.",
      },
    ],
    projectSlugs: ['salon-a1', 'chambre-a1', 'habillage-mural'],
    relatedServiceSlugs: ['habillage-mural', 'architecture-interieure', 'cuisine-salon', 'villas-appartements'],
    faq: [
      {
        question: 'La décoration concerne-t-elle uniquement les salons ?',
        answer:
          'Non. Les projets Eleva Design couvrent aussi les chambres, espaces de vie, habillages muraux, bureaux et lieux commerciaux.',
      },
      {
        question: 'Peut-on garder une partie du mobilier existant ?',
        answer:
          "La demande peut préciser les éléments à conserver. Le travail décoratif s'adapte alors aux contraintes réelles du lieu.",
      },
      {
        question: "La décoration peut-elle accompagner une rénovation ?",
        answer:
          "Oui. Une rénovation intérieure peut intégrer une réflexion décorative afin d'assurer la cohérence entre les nouveaux volumes, les matières et les finitions.",
      },
    ],
  },
  {
    slug: 'cuisine-salon',
    path: '/services/cuisine-salon',
    title: 'Cuisine et salon',
    metaTitle: 'Aménagement cuisine et salon au Maroc | Eleva Design',
    metaDescription:
      'Aménagement de cuisine et salon au Maroc : espaces de vie fonctionnels, chaleureux et cohérents pour recevoir, cuisiner et vivre au quotidien.',
    primaryKeyword: 'aménagement cuisine et salon au Maroc',
    secondaryKeywords: [
      'design salon Maroc',
      'aménagement séjour Maroc',
      'cuisine ouverte salon Maroc',
      'décoration salon moderne Maroc',
    ],
    eyebrow: 'Service',
    h1: 'Aménagement cuisine et salon au Maroc',
    intro:
      'Le salon, le séjour et la cuisine structurent la vie quotidienne. Eleva Design les conçoit comme des espaces connectés, accueillants et faciles à vivre.',
    heroImage: '/images/projects/residence-ivoire/02-living-room.jpg',
    heroAlt: 'Espace salon ouvert sur une cuisine blanche avec escalier central et table basse en bois.',
    overviewTitle: 'Relier confort, circulation et réception',
    overview: [
      "Dans un espace de vie, chaque détail compte : distance entre les assises, relation avec la cuisine, lumière naturelle, rangements, matières et points de vue. Le studio cherche une organisation qui accompagne la réception autant que le quotidien.",
      "L'aménagement cuisine et salon peut prendre la forme d'une pièce ouverte, d'un séjour plus structuré ou d'une ambiance décorative autour du mobilier, des murs, des textiles et de l'éclairage.",
    ],
    highlights: [
      'Agencement du salon, séjour et salle à manger',
      'Relation entre cuisine ouverte et espace de vie',
      'Choix des assises, tables, luminaires et matières',
      'Ambiance chaleureuse pour recevoir et vivre au quotidien',
    ],
    processTitle: 'Construire une pièce de vie cohérente',
    process: [
      {
        title: 'Étudier les habitudes',
        text: 'Recevoir, cuisiner, regarder, discuter ou circuler : les usages guident la disposition.',
      },
      {
        title: 'Organiser les zones',
        text: 'Les zones salon, séjour, cuisine et circulation sont clarifiées pour éviter les espaces confus.',
      },
      {
        title: 'Travailler les matières',
        text: 'La palette, les revêtements, les textiles et le mobilier donnent une continuité visuelle.',
      },
      {
        title: 'Préparer le devis',
        text: 'La demande précise les pièces concernées, les attentes et les contraintes pour faciliter un échange utile.',
      },
    ],
    projectSlugs: ['residence-ivoire', 'salon-a1', 'salon-a2'],
    relatedServiceSlugs: ['architecture-interieure', 'decoration-interieure', 'renovation-interieure'],
    faq: [
      {
        question: 'Eleva Design peut-il travailler un salon sans refaire toute la maison ?',
        answer:
          "Oui. Le formulaire de devis permet de sélectionner plusieurs espaces ou seulement le salon, le séjour, la salle à manger ou la cuisine.",
      },
      {
        question: 'La cuisine est-elle pensée avec le salon ?',
        answer:
          "Lorsque les espaces sont liés, la cuisine et le salon sont étudiés ensemble pour préserver la circulation, les vues et l'harmonie des matières.",
      },
      {
        question: 'Quels projets peuvent servir de référence ?',
        answer:
          "Résidence Ivoire et les projets Salon A1 et Salon A2 montrent des approches d'espaces de vie résidentiels au Maroc.",
      },
    ],
  },
  {
    slug: 'villas-appartements',
    path: '/services/villas-appartements',
    title: 'Villas et appartements',
    metaTitle: 'Aménagement villa et appartement au Maroc | Eleva Design',
    metaDescription:
      'Aménagement de villa et appartement au Maroc : intérieur, décoration, pièces de vie, suites, chambres, salles de bain et continuité avec les espaces extérieurs.',
    primaryKeyword: 'aménagement villa et appartement au Maroc',
    secondaryKeywords: [
      'architecture intérieure villa Maroc',
      'design appartement Maroc',
      'aménagement résidentiel Maroc',
      'décoration villa Maroc',
    ],
    eyebrow: 'Service',
    h1: 'Aménagement de villas et appartements au Maroc',
    intro:
      "Eleva Design accompagne les biens résidentiels avec une vision globale ou pièce par pièce, du salon aux chambres, en passant par les suites, dressings, salles de bain et extérieurs.",
    heroImage: '/images/projects/villa-horizon/01-cover.jpg',
    heroAlt: 'Villa contemporaine de plusieurs niveaux avec baies vitrées, jardin et piscine éclairée au crépuscule.',
    overviewTitle: 'Un cadre résidentiel cohérent, du premier regard au détail',
    overview: [
      "Une villa ou un appartement demande une lecture complète : entrée, pièces de vie, espaces de nuit, rangements, salles d'eau, terrasses ou jardin. Le studio veille à l'unité entre les volumes, les matières et les usages.",
      "Selon le besoin, l'accompagnement peut concerner une rénovation partielle, un aménagement global ou une intervention ciblée sur des pièces prioritaires.",
    ],
    highlights: [
      'Villas contemporaines, appartements et résidences privées',
      'Salons, chambres, suites, dressings et salles de bain',
      'Continuité entre intérieur, terrasse, jardin ou piscine',
      'Ambiance résidentielle élégante et fonctionnelle',
    ],
    processTitle: 'Adapter la méthode au bien résidentiel',
    process: [
      {
        title: 'Identifier les priorités',
        text: 'Le projet distingue les pièces à transformer, les éléments à conserver et les usages à améliorer.',
      },
      {
        title: 'Créer une ligne directrice',
        text: 'Une même intention relie les espaces sans imposer une répétition rigide.',
      },
      {
        title: 'Traiter les transitions',
        text: "Les passages entre entrée, séjour, nuit et extérieur sont pensés pour créer une expérience fluide.",
      },
      {
        title: 'Décliner les détails',
        text: 'Les matériaux, couleurs et finitions sont adaptés à chaque espace tout en gardant une cohérence globale.',
      },
    ],
    projectSlugs: ['villa-horizon', 'villa-celia', 'residence-ivoire'],
    relatedServiceSlugs: ['architecture-interieure', 'decoration-interieure', 'renovation-interieure'],
    faq: [
      {
        question: 'Faut-il réaménager toute la villa ou tout l’appartement ?',
        answer:
          "Non. L'accompagnement peut être global ou concentré sur quelques espaces comme le salon, la chambre parentale, la cuisine ou la terrasse.",
      },
      {
        question: 'Les extérieurs peuvent-ils être intégrés au projet ?',
        answer:
          "Oui. Les services Eleva Design incluent l'aménagement extérieur, notamment terrasses, jardins, balcons et espaces autour de la piscine.",
      },
      {
        question: 'Les projets sont-ils limités à une seule ville ?',
        answer:
          'Le positionnement actuel du site présente Eleva Design comme un studio intervenant auprès de clients au Maroc.',
      },
    ],
  },
  {
    slug: 'restaurants-cafes-commerces',
    path: '/services/restaurants-cafes-commerces',
    title: 'Restaurants, cafés et commerces',
    metaTitle: 'Design restaurant, café et commerce au Maroc | Eleva Design',
    metaDescription:
      'Design intérieur de restaurants, cafés et commerces au Maroc : ambiance client, parcours, mobilier, éclairage et identité décorative par Eleva Design.',
    primaryKeyword: 'design restaurant café commerce au Maroc',
    secondaryKeywords: [
      'design commercial Maroc',
      'aménagement restaurant Maroc',
      'décoration café Maroc',
      'aménagement commerce Maroc',
    ],
    eyebrow: 'Service',
    h1: 'Design de restaurants, cafés et commerces au Maroc',
    intro:
      "Pour un lieu commercial, l'intérieur doit accueillir, orienter et marquer la mémoire du visiteur. Eleva Design conçoit des ambiances client lisibles, confortables et distinctives.",
    heroImage: '/images/projects/maison-neroli/02-seating.jpg',
    heroAlt: 'Salle de restaurant élégante avec plafond en lames de bois, tables dressées et banquettes rouges.',
    overviewTitle: "Concevoir une expérience client, pas seulement un décor",
    overview: [
      "Un restaurant, un café ou un commerce a besoin d'une atmosphère, mais aussi d'un parcours clair, d'assises confortables, d'un éclairage maîtrisé et de matières capables de porter l'identité du lieu.",
      "Les projets commerciaux présentés par Eleva Design montrent une attention forte aux plafonds, banquettes, bars, murs décoratifs et lumières d'ambiance, sans inventer de promesses opérationnelles ou commerciales.",
    ],
    highlights: [
      'Concept intérieur pour restaurants, cafés et commerces',
      'Ambiance client, parcours et zones d’accueil',
      'Éclairage décoratif, bars, banquettes et matières',
      'Identité visuelle du lieu traduite dans l’espace',
    ],
    processTitle: 'Une approche centrée sur le lieu et ses visiteurs',
    process: [
      {
        title: 'Clarifier le concept',
        text: "L'identité recherchée, le public et les usages du lieu servent de base à la direction intérieure.",
      },
      {
        title: 'Organiser le parcours',
        text: "Les zones d'accueil, de circulation, d'assise ou de présentation sont hiérarchisées.",
      },
      {
        title: "Créer l'ambiance",
        text: "La lumière, les matières, les formes et les détails décoratifs donnent au lieu sa personnalité.",
      },
      {
        title: 'Préparer la demande',
        text: 'La prise de contact précise le type de commerce, la surface, le niveau de transformation et les attentes.',
      },
    ],
    projectSlugs: ['maison-neroli', 'restaurant-wakame', 'restaurant-wakame2'],
    relatedServiceSlugs: ['architecture-interieure', 'decoration-interieure', 'renovation-interieure'],
    faq: [
      {
        question: 'Eleva Design a-t-il des références restaurant ?',
        answer:
          'Oui. Les projets Maison Néroli, Restaurant Wakame et Restaurant Wakame 2 sont référencés dans le portfolio.',
      },
      {
        question: 'La page concerne-t-elle aussi les cafés et commerces ?',
        answer:
          'Oui, cette catégorie est mentionnée dans les services du site. Les références visibles concernent surtout des espaces commerciaux et restaurants.',
      },
      {
        question: 'Le design commercial inclut-il la décoration ?',
        answer:
          "Oui, lorsque le projet le demande, l'ambiance décorative, le mobilier, les matières et l'éclairage font partie de la réflexion.",
      },
    ],
  },
  {
    slug: 'renovation-interieure',
    path: '/services/renovation-interieure',
    title: 'Rénovation intérieure',
    metaTitle: 'Rénovation intérieure au Maroc | Eleva Design',
    metaDescription:
      'Rénovation intérieure au Maroc : relecture des volumes, aménagement, décoration, matières et nouveaux usages pour villas, appartements et espaces professionnels.',
    primaryKeyword: 'rénovation intérieure au Maroc',
    secondaryKeywords: [
      'rénovation appartement Maroc',
      'rénovation villa Maroc',
      'réaménagement intérieur Maroc',
      'rénovation décoration Maroc',
    ],
    eyebrow: 'Service',
    h1: 'Rénovation intérieure au Maroc',
    intro:
      "Rénover un intérieur, c'est relire un lieu existant pour l'adapter à de nouveaux usages, à une meilleure circulation et à une atmosphère plus cohérente.",
    heroImage: '/images/projects/residence-ivoire/01-cover.jpg',
    heroAlt: 'Salon contemporain lumineux avec canapé gris, escalier en verre et grandes fenêtres.',
    overviewTitle: 'Transformer sans perdre le sens du lieu',
    overview: [
      "Eleva Design aborde la rénovation comme une relecture : comprendre ce qui fonctionne, identifier ce qui freine les usages, puis recomposer les volumes, les matières et les détails avec mesure.",
      "Le site présente notamment des projets de réaménagement intérieur, de décoration de salons et chambres, ainsi que des espaces résidentiels et commerciaux pouvant servir de références visuelles pour une demande de devis.",
    ],
    highlights: [
      'Réaménagement intérieur partiel ou complet',
      'Actualisation des matières, couleurs et finitions',
      'Amélioration de la circulation et des usages',
      'Cohérence entre ancien espace et nouvelle ambiance',
    ],
    processTitle: 'Une rénovation structurée par les priorités',
    process: [
      {
        title: 'Observer l’existant',
        text: 'Le point de départ consiste à comprendre les forces, limites et contraintes du lieu actuel.',
      },
      {
        title: 'Définir le niveau d’intervention',
        text: 'La demande peut porter sur une rénovation complète, une pièce précise ou une mise à jour décorative.',
      },
      {
        title: 'Recomposer les espaces',
        text: 'La circulation, les proportions, le mobilier et les matières sont réajustés pour servir les nouveaux usages.',
      },
      {
        title: 'Soigner la finition',
        text: 'Les détails, éclairages, textures et habillages apportent la cohérence finale au projet.',
      },
    ],
    projectSlugs: ['residence-ivoire', 'salon-a2', 'chambre-a2'],
    relatedServiceSlugs: ['architecture-interieure', 'decoration-interieure', 'villas-appartements'],
    faq: [
      {
        question: 'La rénovation intérieure peut-elle être partielle ?',
        answer:
          'Oui. Une demande peut concerner une seule pièce, plusieurs espaces ou une rénovation plus globale selon les priorités du client.',
      },
      {
        question: 'Quels espaces peuvent être rénovés ?',
        answer:
          'Le formulaire de devis permet notamment de sélectionner salon, séjour, cuisine, chambres, dressing, salles de bain, bureaux, commerces et autres espaces.',
      },
      {
        question: 'Eleva Design affiche-t-il des prix de rénovation ?',
        answer:
          "Non. Aucun prix standard n'est affiché, car le niveau d'intervention dépend du lieu, des surfaces, des contraintes et des choix de finition.",
      },
    ],
  },
]

export function getServiceLandingPageBySlug(slug: string | undefined) {
  return serviceLandingPages.find((page) => page.slug === slug)
}

export function getRelatedServiceLandingPages(slugs: string[]) {
  return slugs
    .map((slug) => getServiceLandingPageBySlug(slug))
    .filter((page): page is ServiceLandingPage => Boolean(page))
}
