import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';

const steps = [
    {
        title: '1. Cadrage rapide',
        description: 'On clarifie vos objectifs, vos priorités business et l’offre la plus pertinente.',
    },
    {
        title: '2. Conception orientée conversion',
        description: 'Je structure le message, les sections et les CTA pour faciliter la prise de décision.',
    },
    {
        title: '3. Livraison accompagnée',
        description: 'Mise en ligne, vérifications essentielles et recommandations pour la suite.',
    },
];

export function OffersProcessSection() {
    return (
        <Section className="py-8 md:py-12" aria-labelledby="offers-process-title">
            <Container>
                <SectionHeading
                    id="offers-process-title"
                    eyebrow="Process"
                    title="Une collaboration simple, cadrée et rassurante"
                    description="Vous savez ce qui est fait, quand, et dans quel objectif."
                />
                <div className="grid gap-4 md:grid-cols-3">
                    {steps.map((step) => (
                        <Card key={step.title} className="border border-border/70 bg-surface/70">
                            <h3 className="text-base font-semibold text-text">{step.title}</h3>
                            <p className="mt-2 text-sm text-text-muted">{step.description}</p>
                        </Card>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
