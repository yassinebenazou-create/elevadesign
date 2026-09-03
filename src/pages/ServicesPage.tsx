import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'

const services = [
  'Home decor',
  'Aménagement intérieur',
  'Aménagement extérieur',
  'Sélection mobilier et matières',
]

export function ServicesPage() {
  return (
    <section className="section-space">
      <Container>
        <SectionHeading
          eyebrow="Savoir-faire"
          title="Services"
          description="Structure minimale des services. Les descriptions détaillées seront composées dans la phase dédiée."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article className="border border-ed-border bg-ed-white p-6" key={service}>
              <h2 className="font-serif text-2xl text-ed-black">{service}</h2>
              <p className="mt-4 text-sm leading-7 text-ed-muted">
                Description temporaire à remplacer par le contenu Eleva Design.
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
