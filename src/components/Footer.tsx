import { NavLink } from 'react-router-dom'
import { navigationItems, siteConfig } from '../config/site'
import { SocialLinks } from './SocialLinks'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <NavLink className="footer-logo" to="/" aria-label="Accueil Eleva Design">
            <img src={siteConfig.logo.src} alt={siteConfig.logo.alt} />
          </NavLink>
          <p className="footer-tagline">
            {siteConfig.activity}. Contenu de démonstration, prêt à être remplacé par les
            informations officielles du studio.
          </p>
        </div>

        <div className="footer-col">
          <span className="footer-col-title">Navigation</span>
          <nav aria-label="Navigation pied de page">
            {navigationItems.map((item) => (
              <NavLink className="footer-link" key={item.href} to={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="footer-col">
          <span className="footer-col-title">Contact</span>
          <p>{siteConfig.contact.address}</p>
          <p>
            <a className="footer-link" href={`mailto:${siteConfig.contact.email}`}>
              {siteConfig.contact.email}
            </a>
          </p>
          <p>
            <a className="footer-link" href={`tel:${siteConfig.contact.phone.replaceAll(' ', '')}`}>
              {siteConfig.contact.phone}
            </a>
          </p>
        </div>

        <div className="footer-col">
          <span className="footer-col-title">Suivez-nous</span>
          <SocialLinks />
        </div>
      </div>
      <div className="footer-bottom">
        <p>Tous droits réservés, 2026 - Eleva Design</p>
      </div>
    </footer>
  )
}
