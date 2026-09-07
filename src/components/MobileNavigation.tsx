import { X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { navigationItems, siteConfig } from '../config/site'
import { useI18n } from '../i18n/I18nProvider'
import { LanguageSwitcher } from './LanguageSwitcher'

type MobileNavigationProps = {
  isOpen: boolean
  onClose: () => void
}

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const { t } = useI18n()

  return (
    <nav
      className={`mobile-nav ${isOpen ? 'open' : ''}`}
      id="mobile-nav"
      aria-label="Navigation mobile"
      aria-hidden={!isOpen}
    >
      <div className="mobile-nav__top">
        <NavLink className="mobile-nav__logo" to="/" onClick={onClose} tabIndex={isOpen ? 0 : -1}>
          <img src={siteConfig.logo.src} alt={siteConfig.logo.alt} />
        </NavLink>
        <div className="mobile-nav__actions">
          <LanguageSwitcher isHeroStyle />
          <button
            type="button"
            className="grid size-11 place-items-center border border-white/20"
            onClick={onClose}
            aria-label="Fermer le menu"
            tabIndex={isOpen ? 0 : -1}
          >
            <X size={20} />
          </button>
        </div>
      </div>
      <div className="mobile-nav__links">
        {navigationItems.map((item) => (
          <NavLink
            className="border-b border-white/15 py-5 font-serif text-4xl text-ed-ivory"
            key={item.href}
            onClick={onClose}
            tabIndex={isOpen ? 0 : -1}
            to={item.href}
          >
            {t.navigation[item.href as keyof typeof t.navigation] ?? item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
