import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navigationItems, siteConfig } from '../config/site'
import { MobileNavigation } from './MobileNavigation'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const { pathname } = useLocation()
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

          <nav className="nav-list" aria-label="Navigation principale">
            {navigationItems.map((item) => {
              const isContact = item.href === '/contact'
              const className = [
                useHeroStyle ? 'nav-link nav-link--hero' : 'nav-link',
                isContact ? 'nav-link--contact' : '',
              ].join(' ')

              return (
                <NavLink className={className} key={item.href} to={item.href}>
                  {item.label}
                </NavLink>
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
