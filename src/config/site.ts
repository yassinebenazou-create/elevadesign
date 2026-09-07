import type { NavItem } from '../types/navigation'

export const siteConfig = {
  name: 'Eleva Design',
  wordmark: 'ED',
  logo: {
    src: '/images/brand/logo-eleva.png',
    alt: 'Eleva Design',
  },
  activity: 'Home Decor - Aménagement intérieur & extérieur',
  tagline: 'Espaces intérieurs et extérieurs composés avec justesse.',
  locale: 'fr-FR',
  contact: {
    email: 'contact@elevadesign.example',
    phone: '+212 6 00 00 00 00',
    whatsappNumber: '212657075454',
    whatsappMessage: 'Bonjour, je souhaite échanger sur un projet Eleva Design.',
    whatsappIcon: '/images/brand/whatsapp-icon.png',
    address: 'Adresse du studio à renseigner',
    city: 'Maroc',
    instagramHandle: '@eleva_design1',
    instagramUrl: 'https://www.instagram.com/eleva_design1/',
    facebookUrl:
      'https://www.facebook.com/profile.php?id=61565708030086&ref=PROFILE_EDIT_xav_ig_profile_page_web#',
  },
} as const

export const navigationItems: NavItem[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Projets', href: '/projets' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
]
