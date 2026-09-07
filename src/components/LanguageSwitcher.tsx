import { Check } from 'lucide-react'
import type { ComponentType } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { languageOptions, type LanguageCode } from '../i18n/translations'

type LanguageOption = {
  code: LanguageCode
  label: string
  shortLabel: string
  Flag: ComponentType
}

type LanguageSwitcherProps = {
  isHeroStyle?: boolean
}

function EnglishFlag() {
  return (
    <svg className="language-switcher__flag" viewBox="0 0 32 22" aria-hidden="true">
      <rect width="32" height="22" fill="#0a3a82" />
      <path d="M0 0h4.2L32 19.1V22h-4.2L0 2.9zM32 0h-4.2L0 19.1V22h4.2L32 2.9z" fill="#fff" />
      <path d="M0 0h2.2L32 20.5V22h-2.2L0 1.5zM32 0h-2.2L0 20.5V22h2.2L32 1.5z" fill="#c8102e" />
      <path d="M13 0h6v22h-6zM0 8h32v6H0z" fill="#fff" />
      <path d="M14.2 0h3.6v22h-3.6zM0 9.2h32v3.6H0z" fill="#c8102e" />
    </svg>
  )
}

function SpanishFlag() {
  return (
    <svg className="language-switcher__flag" viewBox="0 0 32 22" aria-hidden="true">
      <rect width="32" height="22" fill="#c60b1e" />
      <rect y="5.5" width="32" height="11" fill="#ffc400" />
    </svg>
  )
}

function FrenchFlag() {
  return (
    <svg className="language-switcher__flag" viewBox="0 0 32 22" aria-hidden="true">
      <rect width="10.67" height="22" fill="#0055a4" />
      <rect x="10.67" width="10.66" height="22" fill="#fff" />
      <rect x="21.33" width="10.67" height="22" fill="#ef4135" />
    </svg>
  )
}

function ItalianFlag() {
  return (
    <svg className="language-switcher__flag" viewBox="0 0 32 22" aria-hidden="true">
      <rect width="10.67" height="22" fill="#009246" />
      <rect x="10.67" width="10.66" height="22" fill="#fff" />
      <rect x="21.33" width="10.67" height="22" fill="#ce2b37" />
    </svg>
  )
}

const flags: Record<LanguageCode, ComponentType> = {
  en: EnglishFlag,
  es: SpanishFlag,
  fr: FrenchFlag,
  it: ItalianFlag,
}

const languages: LanguageOption[] = languageOptions.map((language) => ({
  ...language,
  Flag: flags[language.code],
}))

export function LanguageSwitcher({ isHeroStyle = false }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { language: activeLanguage, setLanguage } = useI18n()
  const rootRef = useRef<HTMLDivElement>(null)
  const activeOption = languages.find((language) => language.code === activeLanguage) ?? languages[2]

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div className="language-switcher" ref={rootRef}>
      <button
        type="button"
        className={`language-switcher__button ${isHeroStyle ? 'language-switcher__button--hero' : ''}`}
        onClick={() => setIsOpen((current) => !current)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <activeOption.Flag />
        <span>{activeOption.shortLabel}</span>
      </button>

      <div className={`language-switcher__menu ${isOpen ? 'is-open' : ''}`} role="menu">
        {languages.map(({ code, label, Flag }) => {
          const isActive = code === activeLanguage

          return (
            <button
              type="button"
              className="language-switcher__option"
              key={code}
              onClick={() => {
                setLanguage(code)
                setIsOpen(false)
              }}
              role="menuitemradio"
              aria-checked={isActive}
            >
              <Flag />
              <span>{label}</span>
              {isActive ? <Check className="language-switcher__check" size={22} strokeWidth={3} /> : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
