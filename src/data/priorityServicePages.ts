import type { ServiceLandingPage } from './serviceLandingPages'

// Service scope and nationwide coverage confirmed by the business on 21 October 2026.
export const priorityServicePages: ServiceLandingPage[] = [
  {
    slug: 'habillage-mural',
    path: '/services/habillage-mural',
    title: 'Habillage mural',
    metaTitle: 'Habillage mural à Casablanca et au Maroc | Eleva Design',
    metaDescription:
      'Conception, fabrication et pose d’habillage mural sur mesure à Casablanca et au Maroc : mur TV, reliefs et finitions adaptés à votre espace.',
    primaryKeyword: 'Habillage mural sur mesure au Maroc',
    secondaryKeywords: ['Habillage mural de salon', 'Composition de mur TV', 'Panneaux et finitions décoratives'],
    eyebrow: 'Habillage mural',
    h1: 'Habillage mural sur mesure à Casablanca',
    intro:
      'Donnez une place à vos murs dans votre intérieur. Eleva Design assure la conception, la fabrication et la pose de votre habillage mural sur mesure à Casablanca et dans toutes les villes du Maroc.',
    heroImage: '/images/projects/habillages mural/a2.jfif',
    heroAlt: 'Visuel du projet Habillage Mural présenté dans le portfolio Eleva Design.',
    overviewTitle: 'Un mur pensé avec les volumes qui l’entourent',
    overview: [
      'Un habillage mural peut souligner le mur principal du salon, accompagner un écran ou créer une transition entre deux espaces. La composition se définit à partir des proportions du mur, du mobilier, de la lumière et de l’ambiance recherchée.',
      'Avant de fabriquer, il faut préciser le support existant, les ouvertures, les prises et les équipements à conserver accessibles. Les textures et finitions se choisissent avec ces contraintes, pour obtenir un ensemble cohérent et adapté à l’usage quotidien.',
      'Notre portfolio présente des compositions murales qui permettent de discuter de vos préférences. Pour votre devis, indiquez la ville du projet, les dimensions approximatives et joignez vos inspirations lors de notre échange.',
    ],
    customerSection: {
      title: 'Quel habillage mural pour votre espace ?',
      intro:
        'Le choix part du mur existant, de ses dimensions et de la fonction que la composition doit remplir dans la pièce.',
      items: [
        { text: 'Dans un salon, le mur principal peut structurer la pièce sans la surcharger.' },
        { text: 'Pour un mur TV, l’écran, les prises, les câbles et l’accès aux équipements doivent être anticipés.' },
        { text: 'Les ouvertures, le mobilier, la lumière et l’état du support orientent les reliefs et les finitions.' },
        {
          text: 'Une référence visuelle est disponible dans le portfolio.',
          link: { label: 'Voir le projet Habillage Mural', path: '/projets/habillage-mural' },
        },
      ],
    },
    highlights: ['Conception adaptée à votre mur', 'Choix de textures et de finitions', 'Fabrication sur mesure', 'Pose à Casablanca et partout au Maroc'],
    processTitle: 'De la surface existante à la composition finale',
    process: [
      { title: 'Décrire le mur', text: 'Photos, dimensions et contraintes du support servent à cadrer la demande.' },
      { title: 'Composer les lignes', text: 'La répartition des panneaux, des reliefs et des finitions se travaille avec le mobilier et les équipements.' },
      { title: 'Valider la fabrication', text: 'La composition, les dimensions et les finitions sont précisées avant la fabrication.' },
      { title: 'Préparer la pose', text: 'L’intervention se coordonne selon l’état du mur, les accès au lieu et le périmètre convenu.' },
    ],
    projectSlugs: ['habillage-mural'],
    projectsTitle: 'Un projet d’habillage mural Eleva Design',
    relatedServiceSlugs: ['decoration-interieure', 'renovation-interieure', 'dressing-sur-mesure'],
    faq: [
      { question: 'Proposez-vous la fabrication et la pose de l’habillage mural ?', answer: 'Oui. Eleva Design prend en charge la conception, la fabrication et la pose. Les finitions et les contraintes du support sont définies pour chaque projet.' },
      { question: 'Peut-on habiller un mur TV ?', answer: 'Oui. Il faut prévoir les dimensions de l’écran, sa fixation, les prises, le passage des câbles et l’accès aux équipements afin de les intégrer à la composition.' },
      { question: 'Intervenez-vous en dehors de Casablanca ?', answer: 'Oui. Nous accompagnons les projets d’habillage mural à Casablanca et dans toutes les villes du Maroc. Précisez la ville et les conditions d’accès pour organiser votre demande.' },
      { question: 'Comment obtenir un prix pour un habillage mural ?', answer: 'Le devis dépend notamment de la surface, de l’état du support, de la composition et des finitions. Transmettez vos dimensions approximatives et vos photos pour préparer une proposition adaptée.' },
    ],
  },
  {
    slug: 'dressing-sur-mesure',
    path: '/services/dressing-sur-mesure',
    title: 'Dressing sur mesure',
    metaTitle: 'Dressing sur mesure à Casablanca et au Maroc | Eleva Design',
    metaDescription:
      'Dressing sur mesure à Casablanca et au Maroc : conception, fabrication et pose d’un rangement adapté à votre chambre, votre espace et vos usages.',
    primaryKeyword: 'Dressing sur mesure au Maroc',
    secondaryKeywords: ['Aménagement de dressing', 'Rangement de chambre', 'Placard adapté à votre espace'],
    eyebrow: 'Dressing sur mesure',
    h1: 'Dressing sur mesure à Casablanca',
    intro:
      'Un dressing se conçoit à partir de ce que vous rangez et de la place dont vous disposez. Eleva Design réalise la conception, la fabrication et la pose de dressings sur mesure à Casablanca et partout au Maroc.',
    heroImage: '/images/services/mobilier-matieres.jfif',
    heroAlt: 'Illustration d’ambiance : intérieur aux tons naturels, boiseries et rangements bas intégrés.',
    overviewTitle: 'Un rangement conçu autour de vos vêtements et de votre espace',
    overview: [
      'Penderie, vêtements pliés, chaussures et accessoires n’occupent pas le même volume. Définir vos besoins permet de répartir les espaces de rangement, de choisir les hauteurs utiles et de garder les objets courants facilement accessibles.',
      'Dans une chambre ou une pièce dédiée, l’implantation doit préserver la circulation et tenir compte des ouvertures. La profondeur disponible, les angles, les prises et les dimensions des murs orientent la conception du dressing.',
      'L’illustration présente une ambiance de matières et de mobilier intégré ; elle ne constitue pas une référence de dressing réalisé. Votre projet fera l’objet d’une composition propre à votre espace, avec des finitions et un périmètre convenus avant fabrication.',
    ],
    customerSection: {
      title: 'Comment préparer votre projet de dressing ?',
      intro:
        'Quelques informations concrètes permettent d’étudier un rangement adapté sans présumer de la solution avant l’examen de la pièce.',
      items: [
        { text: 'Précisez le nombre d’utilisateurs et les vêtements, chaussures ou accessoires à ranger.' },
        { text: 'Relevez les dimensions approximatives, les ouvertures, les prises et les angles de la pièce.' },
        { text: 'Indiquez la circulation à préserver et les éléments existants que vous souhaitez conserver.' },
        {
          text: 'Si toute la chambre doit être repensée, une étude plus globale peut être utile.',
          link: { label: 'Découvrir l’architecture intérieure', path: '/services/architecture-interieure' },
        },
      ],
    },
    highlights: ['Répartition selon vos besoins de rangement', 'Implantation adaptée aux dimensions', 'Conception et fabrication sur mesure', 'Pose dans toutes les villes du Maroc'],
    processTitle: 'Du besoin de rangement au dressing installé',
    process: [
      { title: 'Lister les usages', text: 'Précisez le nombre d’utilisateurs, les vêtements et les accessoires à ranger.' },
      { title: 'Étudier l’espace', text: 'Les dimensions, les ouvertures et la circulation guident la répartition des modules.' },
      { title: 'Définir le dressing', text: 'L’organisation intérieure, les façades et les finitions sont établies avant fabrication.' },
      { title: 'Organiser la pose', text: 'La fabrication et l’installation se préparent selon le projet validé et les contraintes d’accès.' },
    ],
    projectSlugs: [],
    relatedServiceSlugs: ['villas-appartements', 'architecture-interieure', 'cuisine-sur-mesure'],
    faq: [
      { question: 'La prestation comprend-elle la fabrication et la pose du dressing ?', answer: 'Oui. Eleva Design propose la conception, la fabrication et la pose de dressings sur mesure. Le devis précise le périmètre retenu pour votre espace.' },
      { question: 'Peut-on aménager un dressing dans une petite chambre ?', answer: 'Le projet dépend de la profondeur disponible et de la circulation à préserver. Des photos et les dimensions de la chambre permettent d’étudier une organisation adaptée sans présumer de la solution avant examen.' },
      { question: 'Quelles informations transmettre pour un devis dressing ?', answer: 'Indiquez la ville, les dimensions approximatives, les ouvertures et vos besoins de rangement. Ajoutez vos préférences de façades et de finitions pour préciser la demande.' },
      { question: 'Dans quelles villes installez-vous des dressings ?', answer: 'Casablanca est notre zone prioritaire. Nous prenons également en charge des projets de dressing dans toutes les villes du Maroc, avec une organisation à définir selon le lieu.' },
    ],
  },
  {
    slug: 'cuisine-sur-mesure',
    path: '/services/cuisine-sur-mesure',
    title: 'Cuisine sur mesure',
    metaTitle: 'Cuisine sur mesure à Casablanca et au Maroc | Eleva Design',
    metaDescription:
      'Cuisine sur mesure à Casablanca et au Maroc : conception, fabrication et pose, implantation fonctionnelle, rangements et finitions adaptés à votre espace.',
    primaryKeyword: 'Cuisine sur mesure au Maroc',
    secondaryKeywords: ['Aménagement de cuisine', 'Mobilier de cuisine sur mesure', 'Implantation et rangements'],
    eyebrow: 'Cuisine sur mesure',
    h1: 'Cuisine sur mesure à Casablanca',
    intro:
      'Préparer, cuisiner et ranger demandent une implantation pratique. Eleva Design vous accompagne de la conception à la fabrication et à la pose de votre cuisine sur mesure, à Casablanca et dans toutes les villes du Maroc.',
    heroImage: '/images/projects/residence-ivoire/02-living-room.jpg',
    heroAlt: 'Espace salon ouvert sur une cuisine blanche avec escalier central et table basse en bois.',
    overviewTitle: 'Une cuisine moderne adaptée à la pièce et à vos habitudes',
    overview: [
      'La conception part de vos usages, des dimensions et des contraintes existantes : arrivées d’eau, évacuations, prises, ventilation et ouvertures. Ces éléments permettent d’organiser les zones de préparation, de cuisson et de rangement.',
      'Le mobilier sur mesure donne une réponse aux dimensions de la pièce et à la place nécessaire pour vos équipements. Les façades, les surfaces et les finitions se définissent avec le projet ; les appareils à conserver ou à prévoir doivent être identifiés dès l’étude.',
      'Cette prestation porte sur la cuisine et son mobilier. Pour une réflexion sur la liaison entre une cuisine ouverte, un séjour et un salon, consultez aussi notre service Cuisine & salon. Le portfolio montre des ambiances intérieures permettant de discuter de l’intégration de votre future cuisine.',
    ],
    customerSection: {
      title: 'Implantation, rangements et finitions à définir',
      intro:
        'Une cuisine sur mesure commence par les usages, les contraintes techniques de la pièce et les équipements à intégrer.',
      items: [
        { text: 'Les zones de préparation, de cuisson et de rangement doivent rester pratiques au quotidien.' },
        { text: 'Les arrivées d’eau, évacuations, prises, ouvertures et appareils influencent directement l’implantation.' },
        {
          text: 'Pour une cuisine ouverte, la continuité avec le séjour demande une réflexion plus large.',
          link: { label: 'Voir le service Cuisine & salon', path: '/services/cuisine-salon' },
        },
        { text: 'Les éléments inclus, les finitions et les éventuels travaux préparatoires sont précisés dans le devis.' },
      ],
    },
    highlights: ['Implantation selon les contraintes du lieu', 'Rangements adaptés aux usages', 'Fabrication du mobilier sur mesure', 'Pose à Casablanca et dans tout le Maroc'],
    processTitle: 'De l’implantation à la pose de la cuisine',
    process: [
      { title: 'Cadrer le projet', text: 'Décrivez la pièce, vos habitudes, les équipements conservés et les changements souhaités.' },
      { title: 'Concevoir l’implantation', text: 'Les zones de travail, le rangement et la circulation sont organisés selon les contraintes techniques.' },
      { title: 'Préciser le devis', text: 'Dimensions, mobilier, finitions et équipements inclus ou exclus sont définis avant fabrication.' },
      { title: 'Installer la cuisine', text: 'La pose se coordonne avec la disponibilité du lieu et les éventuels travaux préparatoires prévus au projet.' },
    ],
    projectSlugs: [],
    relatedServiceSlugs: ['cuisine-salon', 'renovation-interieure', 'dressing-sur-mesure'],
    faq: [
      { question: 'Concevez-vous et installez-vous des cuisines sur mesure ?', answer: 'Oui. Eleva Design assure la conception, la fabrication et la pose de cuisines sur mesure à Casablanca et dans toutes les villes du Maroc.' },
      { question: 'Les appareils électroménagers sont-ils inclus ?', answer: 'Leur fourniture ne doit pas être présumée. Indiquez les appareils que vous possédez et ceux que vous souhaitez prévoir ; le devis doit préciser les équipements inclus ou exclus.' },
      { question: 'Comment préparer une demande de devis cuisine ?', answer: 'Transmettez la ville, un plan ou les dimensions approximatives, des photos, les positions des ouvertures et les équipements à conserver. Précisez vos attentes de rangement et de finitions.' },
      { question: 'Quelle différence avec le service Cuisine & salon ?', answer: 'La cuisine sur mesure concerne l’implantation et le mobilier de cuisine, jusqu’à la fabrication et la pose. Cuisine & salon aborde l’aménagement global et la continuité entre les espaces de vie.' },
    ],
  },
]
