import type { NavItem } from '../types/navigation'

export const siteConfig = {
  name: 'Eleva Design',
  wordmark: 'ED',
  logo: {
    src: '/images/brand/logo-eleva.webp',
    srcSet: '/images/brand/logo-eleva-640.webp 640w, /images/brand/logo-eleva-1280.webp 1280w, /images/brand/logo-eleva.webp 2172w',
    alt: 'Eleva Design',
  },
  activity: 'Home Decor - Aménagement intérieur & extérieur',
  tagline: 'Espaces intérieurs et extérieurs composés avec justesse.',
  locale: 'fr-FR',
  contact: {
    email: 'elevadesignn@gmail.com',
    phone: '0613790624',
    phoneIcon: '/images/brand/call-icon.jpg',
    whatsappNumber: '212613790624',
    whatsappMessage: 'Bonjour, je souhaite échanger sur un projet Eleva Design.',
    whatsappIcon: '/images/brand/whatsapp-icon.webp',
    whatsappIconSrcSet: '/images/brand/whatsapp-icon-96.webp 96w, /images/brand/whatsapp-icon-192.webp 192w, /images/brand/whatsapp-icon-384.webp 384w, /images/brand/whatsapp-icon.webp 1254w',
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
  { label: 'Nos Réalisations', href: '/realisations' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Services', href: '/services' },
  { label: 'Demande de devis', href: '/contact' },
]
