import { NavLink } from 'react-router-dom'
import { navigationItems, siteConfig } from '../config/site'
import { useI18n } from '../i18n/I18nProvider'
import { SocialLinks } from './SocialLinks'

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <NavLink className="footer-logo" to="/" aria-label="Accueil Eleva Design">
            <img src={siteConfig.logo.src} alt={siteConfig.logo.alt} />
          </NavLink>
          <p className="footer-tagline">{t.footer.tagline}</p>
        </div>

        <div className="footer-col">
          <span className="footer-col-title">{t.footer.navigation}</span>
          <nav aria-label="Navigation pied de page">
            {navigationItems.map((item) => (
              <NavLink className="footer-link" key={item.href} to={item.href}>
                {t.navigation[item.href as keyof typeof t.navigation] ?? item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="footer-col">
          <span className="footer-col-title">{t.footer.contact}</span>
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
          <span className="footer-col-title">{t.footer.follow}</span>
          <SocialLinks />
        </div>
      </div>
      <div className="footer-bottom">
        <p>{t.footer.rights}</p>
      </div>
    </footer>
  )
}
