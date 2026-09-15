import type { FormEvent } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { Seo } from '../components/Seo'
import { SocialLinks } from '../components/SocialLinks'
import { pageSeo } from '../config/seo'
import { siteConfig } from '../config/site'
import { useI18n } from '../i18n/I18nProvider'

export function ContactPage() {
  const { t } = useI18n()
  const addressHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${siteConfig.contact.address} ${siteConfig.contact.city}`,
  )}`

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget

    if (!form.reportValidity()) {
      return
    }

    const formData = new FormData(form)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const phone = String(formData.get('phone') ?? '').trim()
    const projectType = String(formData.get('projectType') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const whatsappMessage = [
      siteConfig.contact.whatsappMessage,
      '',
      `${t.contact.name.replace(' *', '')}: ${name}`,
      `${t.contact.email.replace(' *', '')}: ${email}`,
      phone ? `${t.contact.phone}: ${phone}` : '',
      projectType ? `${t.contact.projectType}: ${projectType}` : '',
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
        title={pageSeo.contact.title}
        description={pageSeo.contact.description}
        canonicalPath="/contact"
      />
      <section className="contact-hero" aria-label={pageSeo.contact.h1}>
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
              <div className="contact-field">
                <label htmlFor="projectType">{t.contact.projectType}</label>
                <select id="projectType" name="projectType" defaultValue="">
                  <option value="" disabled>
                    {t.contact.select}
                  </option>
                  <option>{t.contact.interior}</option>
                  <option>{t.contact.exterior}</option>
                  <option>{t.contact.decor}</option>
                  <option>{t.contact.other}</option>
                </select>
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
          </div>
          <SocialLinks className="contact-social-links" showArrow showPhone={false} />
        </Reveal>
      </Container>
    </section>
  )
}
