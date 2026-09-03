import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { SocialLinks } from '../components/SocialLinks'
import { siteConfig } from '../config/site'

export function ContactPage() {
  return (
    <section className="contact-page">
      <Container size="wide" className="contact-intro">
        <h1>
          Parlons
          <span>de votre</span>
          Projet
        </h1>

        <div className="contact-intro__content">
          <p>
            Eleva Design accompagne les projets d'aménagement intérieur et extérieur avec une
            approche attentive aux volumes, aux matières et au rythme de vie.
          </p>
          <div className="contact-intro__details">
            <a href={`tel:${siteConfig.contact.phone.replaceAll(' ', '')}`}>
              {siteConfig.contact.phone}
            </a>
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
            <span>{siteConfig.contact.address}</span>
            <span>{siteConfig.contact.city}</span>
            <SocialLinks className="contact-social-links" />
          </div>
        </div>
      </Container>

      <Container size="wide" className="contact-form-wrap">
        <form className="contact-form" noValidate>
          <div className="contact-form__grid">
            <div>
              <label htmlFor="name">Nom complet *</label>
              <input id="name" name="name" placeholder="Votre nom" required />
            </div>
            <div>
              <label htmlFor="email">Email *</label>
              <input id="email" name="email" type="email" placeholder="votre@email.com" required />
            </div>
            <div>
              <label htmlFor="phone">Téléphone</label>
              <input id="phone" name="phone" placeholder="+212 6 00 00 00 00" />
            </div>
            <div>
              <label htmlFor="projectType">Type de projet</label>
              <select id="projectType" name="projectType" defaultValue="">
                <option value="" disabled>
                  Sélectionner
                </option>
                <option>Intérieur</option>
                <option>Extérieur</option>
                <option>Home decor</option>
                <option>Autre</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="message">Décrivez votre projet *</label>
            <textarea
              id="message"
              name="message"
              placeholder="Lieu, superficie, budget estimé, vos inspirations..."
            />
          </div>
          <Button disabled type="submit" className="contact-form__submit">
            Envoyer la demande
          </Button>
        </form>
      </Container>
    </section>
  )
}
