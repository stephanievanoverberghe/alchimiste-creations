import Image from 'next/image';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContent } from '@/content/home';
import { cn } from '@/lib/utils';

import { Gauge, Layers, Search, ShieldCheck, Sparkles, Waypoints } from 'lucide-react';

type HomeProofsSectionProps = {
    content: HomeContent['proofs'];
};

const ICONS = {
    flow: Waypoints,
    layers: Layers,
    shield: ShieldCheck,
    sparkles: Sparkles,
    gauge: Gauge,
    search: Search,
} as const;

function ProofCard({ item }: { item: HomeContent['proofs']['cards'][number] }) {
    const Icon = ICONS[item.icon];

    return (
        <Card className="relative overflow-hidden">
            <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full blur-3xl" style={{ background: 'rgba(19, 209, 255, 0.12)' }} />
            <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-background/40">
                    <Icon className="h-5 w-5 text-accent" />
                </span>
                <div className="min-w-0">
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-text-muted">{item.description}</p>
                </div>
            </div>

            {item.image ? (
                <div className="mt-4 overflow-hidden rounded-2xl border border-border/70 bg-background/40 p-3">
                    <div className="flex items-center gap-3">
                        <Image src={item.image.src} alt={item.image.alt} width={44} height={44} />
                        <p className="text-xs text-text-muted">
                            <span className="font-medium text-text">Signal :</span> {item.emphasis ?? 'Clarté, confiance, action.'}
                        </p>
                    </div>
                </div>
            ) : item.emphasis ? (
                <p className="mt-4 text-xs text-text-muted">
                    <span className="font-medium text-accent">Signal :</span> {item.emphasis}
                </p>
            ) : null}

            <ul className="mt-5 space-y-2 text-sm">
                {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-text-muted">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{bullet}</span>
                    </li>
                ))}
            </ul>
        </Card>
    );
}

export function HomeProofsSection({ content }: HomeProofsSectionProps) {
    return (
        <Section className="pt-2">
            <Container>
                <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />

                <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr] lg:items-start">
                    {/* Stats */}
                    <Card className="relative overflow-hidden">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -left-12 -top-12 h-44 w-44 rounded-full blur-3xl"
                            style={{ background: 'rgba(122, 84, 255, 0.14)' }}
                        />
                        <h3 className="text-sm font-medium text-text-muted">Repères immédiats</h3>

                        <ul className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1" aria-label="Statistiques clés">
                            {content.stats.map((stat) => (
                                <li
                                    key={stat.label}
                                    className={cn('rounded-xl border border-border/70 bg-background/70 p-3', 'transition-transform duration-200 hover:-translate-y-0.5')}
                                >
                                    <p className="text-xl font-semibold text-primary">{stat.value}</p>
                                    <p className="text-sm text-text-muted">{stat.label}</p>
                                </li>
                            ))}
                        </ul>

                        <p className="mt-4 text-xs text-text-muted">Des repères simples, un cadre clair, et une exécution propre — pour décider sans stress.</p>
                    </Card>

                    {/* Proof cards */}
                    <div className="grid gap-5">
                        {content.cards.map((item) => (
                            <ProofCard key={item.title} item={item} />
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
