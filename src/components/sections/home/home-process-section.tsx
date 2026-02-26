import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContent } from '@/content/home';

import { ScanSearch, Layers3, Code2, Rocket, Check } from 'lucide-react';
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

                <ol className="relative grid gap-5 md:grid-cols-2" aria-label="Étapes du process">
                    {/* rail vertical (mobile) */}
                    <div aria-hidden="true" className="pointer-events-none absolute left-[18px] top-2 hidden h-[calc(100%-16px)] w-px bg-border/70 md:hidden" />

                    {content.steps.map((step, index) => {
                        const Icon = ICONS[step.icon];
                        return (
                            <li key={step.title} className="relative">
                                <Card className="group relative overflow-hidden">
                                    {/* glow */}
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
                                        style={{
                                            background:
                                                index === 0
                                                    ? 'rgba(122,84,255,0.12)'
                                                    : index === 1
                                                      ? 'rgba(19,209,255,0.10)'
                                                      : index === 2
                                                        ? 'rgba(122,84,255,0.10)'
                                                        : 'rgba(19,209,255,0.08)',
                                        }}
                                    />

                                    <div className="flex items-start gap-4">
                                        {/* badge + icon */}
                                        <div className="relative">
                                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-background/40">
                                                <Icon className="h-5 w-5 text-accent" />
                                            </span>

                                            {/* connecteur mobile */}
                                            <span
                                                aria-hidden="true"
                                                className={cn(
                                                    'absolute left-1/2 top-[52px] h-6 w-px -translate-x-1/2 bg-border/70 md:hidden',
                                                    index === content.steps.length - 1 && 'hidden',
                                                )}
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <p className="text-base font-semibold leading-snug">{step.title}</p>
                                                {step.duration ? (
                                                    <span className="rounded-full border border-border/70 bg-background/40 px-2.5 py-1 text-[11px] font-semibold text-text-muted">
                                                        {step.duration}
                                                    </span>
                                                ) : null}
                                            </div>

                                            <p className="mt-2 text-sm text-text-muted">{step.description}</p>

                                            <div className="mt-4 grid gap-3 lg:grid-cols-2">
                                                <div className="rounded-2xl border border-border/60 bg-background/30 p-4">
                                                    <p className="text-xs font-semibold tracking-wide text-text-muted">Livrables</p>
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
                                                    <div className="rounded-2xl border border-border/60 bg-background/30 p-4">
                                                        <p className="text-xs font-semibold tracking-wide text-text-muted">Validation</p>
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
