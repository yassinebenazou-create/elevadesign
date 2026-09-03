import { Button } from '../components/Button'
import { Container } from '../components/Container'

export function NotFoundPage() {
  return (
    <section className="section-space">
      <Container size="narrow">
        <p className="eyebrow">404</p>
        <h1 className="heading-xl">Page introuvable</h1>
        <p className="lede mt-5">La route demandée n'existe pas encore dans le portfolio.</p>
        <Button to="/" className="mt-8">
          Retour accueil
        </Button>
      </Container>
    </section>
  )
}
