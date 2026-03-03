import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function OffersFinalCtaSection() {
    return (
        <Section className="pb-28 pt-8 md:pb-12 md:pt-12" aria-labelledby="offers-final-cta-title">
            <Container>
                <Card className="border border-primary/40 bg-linear-to-br from-primary/10 via-surface to-surface-elevated p-6 md:p-8">
                    <h2 id="offers-final-cta-title" className="typography-h3 text-balance">
                        Vous hésitez encore entre deux offres ?
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm text-text-muted md:text-base">
                        Réservez un appel : en 20 minutes, on identifie la meilleure option selon vos objectifs, votre timing et votre budget.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <Button href="/contact">Réserver un appel</Button>
                        <Button href="/contact#devis" variant="secondary">
                            Demander un devis
                        </Button>
                    </div>
                </Card>
            </Container>
        </Section>
    );
}
