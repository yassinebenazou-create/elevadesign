import { NavLink } from 'react-router-dom'
import { navigationItems, siteConfig } from '../config/site'
import { useI18n } from '../i18n/I18nProvider'
import { SocialLinks } from './SocialLinks'

export function Footer() {
  const { t } = useI18n()
  const hasVerifiedAddress = !siteConfig.contact.address.toLowerCase().includes('renseigner')

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <NavLink className="footer-logo" to="/" aria-label="Accueil Eleva Design">
            <img src={siteConfig.logo.src} srcSet={siteConfig.logo.srcSet} sizes="288px" alt={siteConfig.logo.alt} width={2172} height={724} loading="lazy" />
          </NavLink>
          {t.footer.tagline ? <p className="footer-tagline">{t.footer.tagline}</p> : null}
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
          {hasVerifiedAddress ? <p>{siteConfig.contact.address}</p> : null}
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
        <p>
          © 2026 Eleva Design. Tous droits réservés. — Site créé par{' '}
          <a
            className="footer-link footer-bottom__link"
            href="https://portfolio-peach-three-57.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yassine Benazzou
          </a>
        </p>
      </div>
    </footer>
  )
}
