import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContent } from '@/content/home';
import { Code2, Layers3, Search, ArrowRight } from 'lucide-react';

type Props = {
    architecture: HomeContent['architecture'];
    process: HomeContent['process'];
};

const ICONS = {
    scan: Search,
    layers: Layers3,
    code: Code2,
} as const;

export function HomeMethodSection({ architecture, process }: Props) {
    const steps = process.steps.slice(0, 3);

    return (
        <Section id="methode">
            <Container>
                <SectionHeading
                    eyebrow="Bloc 3 — Méthode en 3 étapes"
                    title="Ces blocages se corrigent avec une méthode simple en 3 étapes."
                    description="On fusionne stratégie de contenu et exécution pour aller de la clarté à la prise de contact, sans jargon technique."
                />

                <div className="grid gap-4 lg:grid-cols-3">
                    {steps.map((step, index) => {
                        const Icon = ICONS[step.icon as keyof typeof ICONS] ?? Search;
                        const pillar = architecture.pillars[index];

                        return (
                            <Card key={step.title} className="border-border/80 bg-background/90">
                                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-background/60">
                                    <Icon className="h-4 w-4 text-accent" />
                                </div>
                                <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
                                <p className="mt-2 text-sm text-text-muted">{step.description}</p>
                                <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-accent">
                                    {pillar.title} <ArrowRight className="h-3.5 w-3.5" /> {pillar.headline}
                                </p>
                            </Card>
                        );
                    })}
                </div>
            </Container>
        </Section>
    );
}
