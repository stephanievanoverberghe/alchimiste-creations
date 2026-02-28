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

const PILLAR_META: Record<'Attire' | 'Convainc' | 'Convertit', { kicker: string }> = {
    Attire: { kicker: 'Compréhension immédiate' },
    Convainc: { kicker: 'Confiance & réassurance' },
    Convertit: { kicker: 'Action simple & visible' },
};

export function HomeMethodSection({ architecture, process }: Props) {
    const steps = process.steps.slice(0, 3);

    return (
        <Section id="methode" className="relative overflow-hidden pt-10 sm:pt-14">
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
                                    'group relative overflow-hidden border-border/80 bg-background/90 p-5 transition-all duration-300',
                                    'hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_18px_45px_rgba(8,10,20,0.45)]',
                                    'focus-visible:border-accent/60 focus-visible:shadow-[0_18px_45px_rgba(8,10,20,0.45)]',
                                )}
                                style={{ animationDelay: `${index * 70}ms` }}
                            >
                                {/* halo discret */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full blur-3xl opacity-0 transition duration-500 group-hover:opacity-30"
                                    style={{ background: index === 1 ? 'rgba(122,84,255,0.22)' : 'rgba(19,209,255,0.18)' }}
                                />

                                {/* ✅ progress header (remplace 01/02/03 + évite la répétition) */}
                                <div className="relative mb-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-accent">{pillar.title}</p>
                                            <p className="mt-1 text-xs text-text-muted">{meta?.kicker}</p>
                                        </div>

                                        {step.duration ? (
                                            <span className="shrink-0 rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-semibold text-text-muted">
                                                {step.duration}
                                            </span>
                                        ) : null}
                                    </div>

                                    {/* barre de progression visuelle */}
                                    <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-border/40">
                                        <div
                                            className={cn(
                                                'h-full rounded-full bg-accent/70 transition-all duration-500',
                                                index === 0 && 'w-1/3 group-hover:w-2/3',
                                                index === 1 && 'w-2/3 group-hover:w-full',
                                                index === 2 && 'w-full',
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* header : icon + titre */}
                                <div className="flex items-start gap-3">
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-background/60 transition-transform duration-300 group-hover:rotate-2 group-hover:scale-105">
                                        <Icon className="h-4 w-4 text-accent" />
                                    </span>

                                    <div className="min-w-0">
                                        <h3 className="typography-h4">{step.title}</h3>
                                        <p className="mt-2 text-sm text-text-muted">{step.description}</p>
                                    </div>
                                </div>

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

                                {/* footer : headline + micro motion */}
                                <div className="mt-4 flex items-center justify-between gap-3">
                                    <p className="text-xs font-semibold text-text-muted">Effet attendu</p>

                                    <p className="inline-flex items-center gap-2 text-xs font-semibold text-accent transition-transform duration-300 group-hover:translate-x-1">
                                        {pillar.headline}
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </p>
                                </div>

                                {/* underline animée */}
                                <div
                                    aria-hidden="true"
                                    className="mt-4 h-px w-full bg-linear-to-r from-accent/0 via-accent/35 to-accent/0 opacity-0 transition duration-500 group-hover:opacity-100"
                                />
                            </Card>
                        );
                    })}
                </div>
            </Container>
        </Section>
    );
}
