import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'

export function AboutPage() {
  return (
    <section className="section-space">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="Studio"
          title="À propos"
          description="Page placeholder pour présenter Eleva Design, son approche et son univers lorsque les informations officielles seront disponibles."
        />
        <div className="placeholder-panel min-h-[24rem]">
          <span>Emplacement futur pour portrait, atelier ou détail matière</span>
        </div>
      </Container>
    </section>
  )
}
