import { siteConfig } from '../config/site'

export function WhatsAppFloat() {
  const message = encodeURIComponent(siteConfig.contact.whatsappMessage)
  const href = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${message}`

  return (
    <a
      className="whatsapp-float"
      href={href}
      target="_blank"
      rel="noopener"
      aria-label="Nous contacter sur WhatsApp"
    >
      <img src={siteConfig.contact.whatsappIcon} alt="" aria-hidden="true" />
    </a>
  )
}
