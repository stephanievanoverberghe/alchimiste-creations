import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContent } from '@/content/home';

import { ScanSearch, Layers3, Code2, Rocket, Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type HomeProcessSectionProps = {
    content: HomeContent['process'];
};

const ICONS = {
    scan: ScanSearch,
    layers: Layers3,
    code: Code2,
    rocket: Rocket,
} as const;

export function HomeProcessSection({ content }: HomeProcessSectionProps) {
    return (
        <Section>
            <Container>
                <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />

                <ol className="process-grid relative grid gap-5 md:grid-cols-2" aria-label="Étapes du process">
                    <div aria-hidden="true" className="process-rail pointer-events-none absolute left-4.5 top-2 hidden h-[calc(100%-16px)] w-px md:hidden" />

                    {content.steps.map((step, index) => {
                        const Icon = ICONS[step.icon];
                        return (
                            <li key={step.title} className="relative">
                                <Card className="process-card group relative overflow-hidden border-border/80 bg-background/90" style={{ animationDelay: `${index * 110}ms` }}>
                                    <div className="process-card__mesh" aria-hidden="true" />
                                    <div className="process-card__pulse" aria-hidden="true" />

                                    <div className="flex items-start gap-4">
                                        <div className="relative">
                                            <span className="process-card__iconWrap inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-background/40">
                                                <Icon className="h-5 w-5 text-accent" />
                                            </span>

                                            <span className="process-card__index absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-border/70 bg-surface-elevated px-1 text-[10px] font-semibold text-text-muted">
                                                0{index + 1}
                                            </span>

                                            <span
                                                aria-hidden="true"
                                                className={cn(
                                                    'absolute left-1/2 top-13 h-6 w-px -translate-x-1/2 bg-border/70 md:hidden',
                                                    index === content.steps.length - 1 && 'hidden',
                                                )}
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <p className="text-base font-semibold leading-snug">{step.title}</p>
                                                {step.duration ? (
                                                    <span className="process-card__duration rounded-full border border-border/70 bg-background/40 px-2.5 py-1 text-[11px] font-semibold text-text-muted">
                                                        {step.duration}
                                                    </span>
                                                ) : null}
                                            </div>

                                            <p className="mt-2 text-sm text-text-muted">{step.description}</p>

                                            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-elevated/80">
                                                <span
                                                    className="process-card__progress block h-full rounded-full bg-linear-to-r from-primary via-accent to-primary"
                                                    style={{ width: `${Math.min((index + 1) * 25, 100)}%` }}
                                                />
                                            </div>

                                            <div className="mt-4 grid gap-3 lg:grid-cols-2">
                                                <div className="process-card__panel rounded-2xl border border-border/60 bg-background/30 p-4">
                                                    <p className="text-xs font-semibold tracking-wide text-text-muted">Ce que vous recevez</p>
                                                    <ul className="mt-3 space-y-2 text-sm">
                                                        {step.deliverables.map((d) => (
                                                            <li key={d} className="flex gap-2 text-text-muted">
                                                                <Check className="mt-0.5 h-4 w-4 text-accent" />
                                                                <span>{d}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {step.validation ? (
                                                    <div className="process-card__panel rounded-2xl border border-border/60 bg-background/30 p-4">
                                                        <p className="inline-flex items-center gap-1 text-xs font-semibold tracking-wide text-text-muted">
                                                            <Sparkles className="h-3.5 w-3.5 text-accent" /> Votre feu vert
                                                        </p>
                                                        <p className="mt-3 text-sm text-text-muted">{step.validation}</p>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </li>
                        );
                    })}
                </ol>
            </Container>
        </Section>
    );
}
