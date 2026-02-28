import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContent } from '@/content/home';
import { Code2, Layers3, Search, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
    architecture: HomeContent['architecture'];
    process: HomeContent['process'];
};

const ICONS = {
    scan: Search,
    layers: Layers3,
    code: Code2,
} as const;

const PILLAR_META: Record<'Attire' | 'Convainc' | 'Convertit', { kicker: string; aura: string; chip: string }> = {
    Attire: { kicker: 'Compréhension immédiate', aura: 'rgba(19,209,255,0.18)', chip: 'Signal clair' },
    Convainc: { kicker: 'Confiance & réassurance', aura: 'rgba(122,84,255,0.2)', chip: 'Confiance active' },
    Convertit: { kicker: 'Action simple & visible', aura: 'rgba(142,246,170,0.18)', chip: 'Passage à l’action' },
};

export function HomeMethodSection({ architecture, process }: Props) {
    const steps = process.steps.slice(0, 3);

    return (
        <Section id="methode" className="relative overflow-hidden">
            <Container>
                <SectionHeading eyebrow={process.eyebrow} title={process.title} description={process.description} />

                <div className="mt-7 grid gap-4 lg:grid-cols-3">
                    {steps.map((step, index) => {
                        const Icon = ICONS[step.icon as keyof typeof ICONS] ?? Search;
                        const pillar = architecture.pillars[index];
                        const meta = PILLAR_META[pillar.title];

                        return (
                            <Card
                                key={step.title}
                                className={cn(
                                    'process-card group relative overflow-hidden rounded-3xl border border-border/70 bg-surface/70 p-5 sm:p-6',
                                    'ring-1 ring-white/5 backdrop-blur-xl',
                                )}
                                style={{ animationDelay: `${index * 90}ms` }}
                            >
                                <div aria-hidden="true" className="process-card__mesh" />
                                <div aria-hidden="true" className="process-card__pulse" style={{ background: `radial-gradient(circle, ${meta?.aura}, transparent 65%)` }} />

                                <div className="relative flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <span className="process-card__index inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/75 text-xs font-semibold text-accent">
                                            0{index + 1}
                                        </span>

                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-accent">{pillar.title}</p>
                                            <p className="mt-1 text-xs text-text-muted">{meta?.kicker}</p>
                                        </div>
                                    </div>

                                    {step.duration ? (
                                        <span className="process-card__duration rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs font-semibold text-text-muted">
                                            {step.duration}
                                        </span>
                                    ) : null}
                                </div>

                                <div className="relative mt-4 flex items-start gap-3">
                                    <span className="process-card__iconWrap inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-border/70 bg-background/65">
                                        <Icon className="h-4 w-4 text-accent" />
                                    </span>

                                    <div className="min-w-0">
                                        <h3 className="typography-h4">{step.title}</h3>
                                        <p className="mt-2 text-sm text-text-muted">{step.description}</p>
                                    </div>
                                </div>

                                {step.deliverables?.length ? (
                                    <ul className="mt-4 space-y-2 text-sm text-text-muted">
                                        {step.deliverables.slice(0, 2).map((deliverable) => (
                                            <li key={deliverable} className="flex items-start gap-2">
                                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                                                <span className="text-pretty">{deliverable}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}

                                <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/60 pt-4">
                                    <p className="text-xs font-semibold text-text-muted">Effet attendu</p>

                                    <p className="inline-flex items-center gap-2 text-xs font-semibold text-accent transition-transform duration-300 group-hover:translate-x-1">
                                        {pillar.headline}
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </p>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </Container>
        </Section>
    );
}
