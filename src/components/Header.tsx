import { Menu } from 'lucide-react'
import { Fragment, useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navigationItems, siteConfig } from '../config/site'
import { useI18n } from '../i18n/I18nProvider'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileNavigation } from './MobileNavigation'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const { pathname } = useLocation()
  const { t } = useI18n()
  const isHome = pathname === '/'
  const useHeroStyle = isHome && !hasScrolled && !isMenuOpen

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    const updateHeader = () => {
      setHasScrolled(window.scrollY > 60)
    }

    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateHeader)
    }
  }, [])

  return (
    <>
      <header
        className={`site-header ${isHome ? 'site-header--hero' : ''} ${hasScrolled ? 'solid' : ''}`}
        id="header"
      >
        <div className="header-inner">
          <NavLink className="header-logo" to="/" aria-label="Accueil Eleva Design">
            <img src={siteConfig.logo.src} alt={siteConfig.logo.alt} />
          </NavLink>

          <div className="mobile-header-actions" aria-label="Actions rapides">
            <LanguageSwitcher isHeroStyle={useHeroStyle} />
            <NavLink className="mobile-header-contact" to="/contact">
              {t.navigation['/contact']}
            </NavLink>
          </div>

          <nav className="nav-list" aria-label="Navigation principale">
            {navigationItems.map((item) => {
              const isContact = item.href === '/contact'
              const className = [
                useHeroStyle ? 'nav-link nav-link--hero' : 'nav-link',
                isContact ? 'nav-link--contact' : '',
              ].join(' ')

              return (
                <Fragment key={item.href}>
                  {isContact ? <LanguageSwitcher isHeroStyle={useHeroStyle} /> : null}
                  <NavLink className={className} to={item.href}>
                    {t.navigation[item.href as keyof typeof t.navigation] ?? item.label}
                  </NavLink>
                </Fragment>
              )
            })}
          </nav>

          <button
            type="button"
            className={`nav-toggle ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>
      <MobileNavigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
