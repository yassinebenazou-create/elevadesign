import type { FormEvent } from 'react'
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
      <Container size="wide" className="contact-layout">
        <Reveal className="contact-copy">
          <h1 className="contact-title">
            <span>{t.contact.titleParts[0]}</span>
            <em>{t.contact.titleParts[1]}</em>
            <span>{t.contact.titleParts[2]}</span>
          </h1>
          <p>{t.contact.text}</p>
          <div className="contact-copy__details">
            <span className="contact-copy__label">{t.contact.emailProjects}</span>
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
            <span className="contact-copy__label">{t.contact.phone}</span>
            <a href={`tel:${siteConfig.contact.phone.replaceAll(' ', '')}`}>
              {siteConfig.contact.phone}
            </a>
            <span className="contact-copy__label">{t.contact.address}</span>
            <span className="contact-copy__value">{siteConfig.contact.address}</span>
            <span className="contact-copy__value">{siteConfig.contact.city}</span>
            <SocialLinks className="contact-social-links" />
          </div>
        </Reveal>

        <Reveal className="contact-form-reveal" delay={0.08}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__grid">
              <div>
                <label htmlFor="name">{t.contact.name}</label>
                <input id="name" name="name" placeholder={t.contact.namePlaceholder} required />
              </div>
              <div>
                <label htmlFor="email">{t.contact.email}</label>
                <input id="email" name="email" type="email" placeholder={t.contact.emailPlaceholder} required />
              </div>
              <div>
                <label htmlFor="phone">{t.contact.phone}</label>
                <input id="phone" name="phone" placeholder="+212 6 00 00 00 00" />
              </div>
              <div>
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
            <div>
              <label htmlFor="message">{t.contact.message}</label>
              <textarea id="message" name="message" placeholder={t.contact.messagePlaceholder} required />
            </div>
            <Button type="submit" className="contact-form__submit">
              {t.contact.submit}
            </Button>
          </form>
        </Reveal>
      </Container>
    </section>
  )
}
