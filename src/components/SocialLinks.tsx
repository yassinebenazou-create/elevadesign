import { siteConfig } from '../config/site'

type SocialLinksProps = {
  className?: string
}

function InstagramIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="5" width="14" height="14" rx="4" />
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="16.4" cy="7.7" r="0.75" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.2 8.1h2.1V5h-2.8c-3 0-4.5 1.8-4.5 4.6v2H6.7v3.2H9V21h3.4v-6.2h3l0.5-3.2h-3.5V9.9c0-1.1 0.4-1.8 1.8-1.8Z" />
    </svg>
  )
}

export function SocialLinks({ className = '' }: SocialLinksProps) {
  return (
    <div className={`social-links ${className}`.trim()}>
      <a
        className="social-link"
        href={siteConfig.contact.instagramUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram Eleva Design"
      >
        <InstagramIcon />
        <span>{siteConfig.contact.instagramHandle}</span>
      </a>
      <a
        className="social-link"
        href={siteConfig.contact.facebookUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook Eleva Design"
      >
        <FacebookIcon />
        <span>Facebook</span>
      </a>
    </div>
  )
}
