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

const STEP_LABELS = ['01', '02', '03'] as const;

export function HomeMethodSection({ architecture, process }: Props) {
    const steps = process.steps.slice(0, 3);

    return (
        <Section id="methode" className="relative overflow-hidden pt-10 sm:pt-14">
            <Container>
                <SectionHeading eyebrow={process.eyebrow} title={process.title} description={process.description} />

                {/* Stepper */}
                <div className="relative mt-7">
                    {/* ligne de progression (mobile = verticale / lg = horizontale) */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-5 top-0 hidden h-full w-px bg-linear-to-b from-accent/0 via-accent/35 to-accent/0 sm:block lg:hidden"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-linear-to-r from-accent/0 via-accent/35 to-accent/0 lg:block"
                    />

                    <div className="grid gap-4 lg:grid-cols-3">
                        {steps.map((step, index) => {
                            const Icon = ICONS[step.icon as keyof typeof ICONS] ?? Search;
                            const pillar = architecture.pillars[index];

                            return (
                                <Card
                                    key={step.title}
                                    className={cn(
                                        'group relative overflow-hidden border-border/80 bg-background/90 p-5 transition-all duration-300',
                                        'hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_18px_45px_rgba(8,10,20,0.45)]',
                                        'focus-visible:border-accent/60 focus-visible:shadow-[0_18px_45px_rgba(8,10,20,0.45)]',
                                    )}
                                    style={{ animationDelay: `${index * 80}ms` }}
                                >
                                    {/* halo hover */}
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full blur-3xl opacity-0 transition duration-500 group-hover:opacity-30"
                                        style={{ background: index === 1 ? 'rgba(122,84,255,0.22)' : 'rgba(19,209,255,0.18)' }}
                                    />
                                    {/* barre lumineuse haut */}
                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-x-0 top-0 h-1 -translate-y-full bg-linear-to-r from-primary/0 via-accent/80 to-primary/0 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                                    />

                                    {/* header : step + icon + durée */}
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-background/60 text-sm font-semibold text-text-muted">
                                                {STEP_LABELS[index] ?? '0'}
                                            </span>
                                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-background/60 transition-transform duration-300 group-hover:rotate-2 group-hover:scale-105">
                                                <Icon className="h-4 w-4 text-accent" />
                                            </span>
                                        </div>

                                        {step.duration ? (
                                            <span className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-semibold text-text-muted">
                                                {step.duration}
                                            </span>
                                        ) : null}
                                    </div>

                                    <h3 className="mt-4 typography-h4">{step.title}</h3>
                                    <p className="mt-2 text-sm text-text-muted">{step.description}</p>

                                    {/* deliverables : 2 max */}
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

                                    {/* pill "Attire/Convainc/Convertit" */}
                                    <div className="mt-4 flex items-center justify-between gap-3">
                                        <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-semibold text-text-muted">
                                            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                            {pillar.title}
                                        </span>

                                        <p className="inline-flex items-center gap-2 text-xs font-semibold text-accent transition-transform duration-300 group-hover:translate-x-1">
                                            {pillar.headline}
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </p>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
