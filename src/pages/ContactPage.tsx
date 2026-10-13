import type { FormEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { Seo } from '../components/Seo'
import { SocialLinks } from '../components/SocialLinks'
import { siteConfig } from '../config/site'
import { useI18n } from '../i18n/I18nProvider'
import { getRouteSeo } from '../seo/routeSeo'

const otherProjectType = 'Autre'

const projectTypeGroups = [
  {
    label: 'Espaces intérieurs',
    options: [
      'Salon',
      'Séjour',
      'Salle à manger',
      'Cuisine',
      'Chambre parentale',
      'Chambre enfant',
      'Dressing',
      'Salle de bain',
      'Salle d’eau',
      'WC',
      'Entrée',
      'Bureau',
    ],
  },
  {
    label: 'Espaces extérieurs',
    options: ['Terrasse', 'Jardin', 'Balcon', 'Piscine'],
  },
  {
    label: 'Espaces professionnels',
    options: ['Commerce', 'Restaurant', 'Café', 'Salon de beauté'],
  },
  {
    label: 'Projet global',
    options: [
      'Villa complète',
      'Appartement complet',
      'Rénovation complète',
      'Décoration intérieure',
      'Aménagement extérieur',
      otherProjectType,
    ],
  },
] as const

export function ContactPage() {
  const { t } = useI18n()
  const seo = getRouteSeo('/contact')
  const [selectedProjectTypes, setSelectedProjectTypes] = useState<string[]>([])
  const [isProjectTypeOpen, setIsProjectTypeOpen] = useState(false)
  const [projectTypeError, setProjectTypeError] = useState('')
  const projectTypeRef = useRef<HTMLDivElement | null>(null)
  const hasVerifiedAddress = !siteConfig.contact.address.toLowerCase().includes('renseigner')
  const addressHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${siteConfig.contact.address} ${siteConfig.contact.city}`,
  )}`
  const hasOtherProjectType = selectedProjectTypes.includes(otherProjectType)
  const projectTypeButtonText = selectedProjectTypes.length
    ? selectedProjectTypes.join(', ')
    : t.contact.select

  useEffect(() => {
    const closeProjectTypeMenu = (event: PointerEvent) => {
      if (!projectTypeRef.current?.contains(event.target as Node)) {
        setIsProjectTypeOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeProjectTypeMenu)

    return () => {
      document.removeEventListener('pointerdown', closeProjectTypeMenu)
    }
  }, [])

  const toggleProjectType = (projectType: string) => {
    setSelectedProjectTypes((currentProjectTypes) => {
      const nextProjectTypes = currentProjectTypes.includes(projectType)
        ? currentProjectTypes.filter((currentProjectType) => currentProjectType !== projectType)
        : [...currentProjectTypes, projectType]

      if (nextProjectTypes.length) {
        setProjectTypeError('')
      }

      return nextProjectTypes
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget

    if (!form.reportValidity()) {
      return
    }

    const formData = new FormData(form)
    const projectTypes = formData
      .getAll('projectTypes')
      .map((value) => String(value).trim())
      .filter(Boolean)

    if (!projectTypes.length) {
      setProjectTypeError('Sélectionnez au moins un type de projet.')
      setIsProjectTypeOpen(true)
      return
    }

    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const phone = String(formData.get('phone') ?? '').trim()
    const otherProjectTypeSpecification = String(formData.get('otherProjectType') ?? '').trim()
    const projectType = projectTypes
      .map((value) =>
        value === otherProjectType && otherProjectTypeSpecification
          ? `${value} (${otherProjectTypeSpecification})`
          : value,
      )
      .join(', ')
    const message = String(formData.get('message') ?? '').trim()
    const whatsappMessage = [
      siteConfig.contact.whatsappMessage,
      '',
      `${t.contact.name.replace(' *', '')}: ${name}`,
      `${t.contact.email.replace(' *', '')}: ${email}`,
      phone ? `${t.contact.phone}: ${phone}` : '',
      `${t.contact.projectType}: ${projectType}`,
      `${t.contact.message.replace(' *', '')}: ${message}`,
    ]
      .filter(Boolean)
      .join('\n')

    window.open(
      `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <section className="contact-page">
      <Seo
        title={seo.title}
        description={seo.description}
        canonicalPath="/contact"
        jsonLd={seo.jsonLd}
      />
      <section className="contact-hero" aria-label="Contact Eleva Design">
        <Container size="narrow" className="contact-hero__inner">
          <Reveal className="contact-copy">
            <h1 className="contact-title">
              <span>{t.contact.titleParts[0]}</span>
              {' '}
              <em>{t.contact.titleParts[1]}</em>
              {' '}
              <span>{t.contact.titleParts[2]}</span>
            </h1>
            <p>{t.contact.text}</p>
          </Reveal>
        </Container>
      </section>

      <Container size="narrow" className="contact-layout">
        <Reveal className="contact-form-reveal" delay={0.08}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__grid">
              <div className="contact-field">
                <label htmlFor="name">{t.contact.name}</label>
                <input id="name" name="name" placeholder={t.contact.namePlaceholder} required />
              </div>
              <div className="contact-field">
                <label htmlFor="email">{t.contact.email}</label>
                <div className="contact-input-wrap">
                  <Mail size={18} aria-hidden="true" />
                  <input id="email" name="email" type="email" placeholder={t.contact.emailPlaceholder} required />
                </div>
              </div>
              <div className="contact-field">
                <label htmlFor="phone">{t.contact.phone}</label>
                <div className="contact-input-wrap">
                  <Phone size={18} aria-hidden="true" />
                  <input id="phone" name="phone" placeholder={siteConfig.contact.phone} />
                </div>
              </div>
              <div className="contact-field contact-field--project-type" ref={projectTypeRef}>
                <label id="projectTypeLabel" htmlFor="projectTypeButton">
                  {t.contact.projectType}
                </label>
                <div className="contact-project-type">
                  <button
                    type="button"
                    className="contact-project-type__button"
                    id="projectTypeButton"
                    onClick={() => setIsProjectTypeOpen((current) => !current)}
                    aria-controls="projectTypeMenu"
                    aria-expanded={isProjectTypeOpen}
                    aria-invalid={projectTypeError ? true : undefined}
                    aria-labelledby="projectTypeLabel projectTypeButton"
                  >
                    <span>{projectTypeButtonText}</span>
                    <ChevronDown size={18} aria-hidden="true" />
                  </button>
                  {projectTypeError ? (
                    <p className="contact-field__error" role="alert">
                      {projectTypeError}
                    </p>
                  ) : null}
                  {isProjectTypeOpen ? (
                    <div
                      className="contact-project-type__menu"
                      id="projectTypeMenu"
                      role="group"
                      aria-labelledby="projectTypeLabel"
                    >
                      {projectTypeGroups.map((group) => (
                        <fieldset className="contact-project-type__group" key={group.label}>
                          <legend>{group.label}</legend>
                          <div className="contact-project-type__options">
                            {group.options.map((option) => (
                              <label className="contact-project-type__option" key={option}>
                                <input
                                  type="checkbox"
                                  name="projectTypes"
                                  value={option}
                                  checked={selectedProjectTypes.includes(option)}
                                  onChange={() => toggleProjectType(option)}
                                />
                                <span>{option}</span>
                              </label>
                            ))}
                          </div>
                        </fieldset>
                      ))}
                    </div>
                  ) : null}
                </div>
                {hasOtherProjectType ? (
                  <div className="contact-field contact-field--other-project">
                    <label htmlFor="otherProjectType">Précisez votre demande</label>
                    <input
                      id="otherProjectType"
                      name="otherProjectType"
                      placeholder="Exemple : showroom, espace bien-être..."
                      required
                    />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="contact-field contact-field--message">
              <label htmlFor="message">{t.contact.message}</label>
              <textarea id="message" name="message" placeholder={t.contact.messagePlaceholder} required />
            </div>
            <div className="contact-form__actions">
              <Button type="submit" variant="secondary" className="contact-form__submit">
                {t.contact.submit}
              </Button>
            </div>
          </form>
        </Reveal>

        <Reveal className="contact-details" delay={0.12}>
          <div className="contact-details__intro">
            <h2>{t.contact.detailsTitle}</h2>
            <p>{t.contact.detailsText}</p>
          </div>
          <div className="contact-details__grid">
            <a className="contact-detail-card" href={`mailto:${siteConfig.contact.email}`}>
              <span className="contact-detail-card__icon">
                <Mail size={18} aria-hidden="true" />
              </span>
              <span>
                <span className="contact-copy__label">{t.contact.emailProjects}</span>
                <span className="contact-detail-card__value contact-detail-card__value--email">
                  {siteConfig.contact.email}
                </span>
              </span>
            </a>
            <a className="contact-detail-card" href={`tel:${siteConfig.contact.phone.replaceAll(' ', '')}`}>
              <span className="contact-detail-card__icon">
                <Phone size={18} aria-hidden="true" />
              </span>
              <span>
                <span className="contact-copy__label">{t.contact.phone}</span>
                <span className="contact-detail-card__value">{siteConfig.contact.phone}</span>
              </span>
            </a>
            {hasVerifiedAddress ? (
              <a
                className="contact-detail-card"
                href={addressHref}
                target="_blank"
                rel="noreferrer"
                aria-label={`${t.contact.address}: ${siteConfig.contact.address}, ${siteConfig.contact.city}`}
              >
                <span className="contact-detail-card__icon">
                  <MapPin size={18} aria-hidden="true" />
                </span>
                <span>
                  <span className="contact-copy__label">{t.contact.address}</span>
                  <span className="contact-detail-card__value">
                    {siteConfig.contact.address}
                    <br />
                    {siteConfig.contact.city}
                  </span>
                </span>
              </a>
            ) : null}
          </div>
          <SocialLinks className="contact-social-links" showArrow showPhone={false} />
        </Reveal>
      </Container>
    </section>
  )
}
