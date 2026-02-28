import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContent } from '@/content/home';
import { Code2, Layers3, Search, ArrowRight, CheckCircle2 } from 'lucide-react';

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
                <SectionHeading eyebrow={process.eyebrow} title={process.title} description={process.description} />

                <div className="mt-6 grid gap-4 lg:grid-cols-3">
                    {steps.map((step, index) => {
                        const Icon = ICONS[step.icon as keyof typeof ICONS] ?? Search;
                        const pillar = architecture.pillars[index];

                        return (
                            <Card key={step.title} className="border-border/80 bg-background/90 p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-background/60">
                                        <Icon className="h-4 w-4 text-accent" />
                                    </div>

                                    {step.duration ? (
                                        <span className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-semibold text-text-muted">
                                            {step.duration}
                                        </span>
                                    ) : null}
                                </div>

                                <h3 className="mt-4 typography-h4">{step.title}</h3>
                                <p className="mt-2 text-sm text-text-muted">{step.description}</p>

                                {step.deliverables?.length ? (
                                    <ul className="mt-4 space-y-2 text-sm text-text-muted">
                                        {step.deliverables.slice(0, 2).map((d) => (
                                            <li key={d} className="flex gap-2">
                                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                                                <span className="text-pretty">{d}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}

                                <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-accent">
                                    {pillar.title} <ArrowRight className="h-3.5 w-3.5" /> {pillar.headline}
                                </p>
                            </Card>
                        );
                    })}
                </div>

                <div className="mt-6 rounded-2xl border border-border/70 bg-background/70 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent">Étape suivante</p>
                    <p className="mt-2 text-sm text-text-muted">{process.transitionToOffers}</p>
                </div>
            </Container>
        </Section>
    );
}
