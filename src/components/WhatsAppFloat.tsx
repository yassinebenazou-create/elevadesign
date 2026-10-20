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
      <img src={siteConfig.contact.whatsappIcon} srcSet={siteConfig.contact.whatsappIconSrcSet} sizes="64px" width={1254} height={1254} alt="" aria-hidden="true" />
    </a>
  )
}
