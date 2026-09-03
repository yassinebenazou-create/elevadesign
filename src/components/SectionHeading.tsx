type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  id?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  id,
}: SectionHeadingProps) {
  return (
    <div className={`section-heading ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className="heading-xl" id={id}>{title}</h1>
      {description ? <p className="lede">{description}</p> : null}
    </div>
  )
}
