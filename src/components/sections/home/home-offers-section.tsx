import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContent } from '@/content/home';
import { cn } from '@/lib/utils';
import { Code2, Gauge, LayoutTemplate, Rocket, ShieldCheck, Sparkles } from 'lucide-react';

type HomeOffersSectionProps = {
    content: HomeContent['offers'];
};

const ICONS = {
    sparkles: Sparkles,
    layout: LayoutTemplate,
    gauge: Gauge,
    code: Code2,
    rocket: Rocket,
    shield: ShieldCheck,
} as const;

export function HomeOffersSection({ content }: HomeOffersSectionProps) {
    return (
        <Section>
            <Container>
                <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />

                <div className="grid gap-5 md:grid-cols-3">
                    {content.items.map((offer) => {
                        const Icon = offer.icon ? ICONS[offer.icon] : Sparkles;

                        return (
                            <Card key={offer.slug} className={cn('group relative overflow-hidden', offer.featured ? 'border-primary/60' : 'border-border/70')}>
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    style={{ background: offer.featured ? 'rgba(122,84,255,0.16)' : 'rgba(19,209,255,0.12)' }}
                                />

                                <div className="relative flex items-start gap-3">
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-background/40">
                                        <Icon className="h-5 w-5 text-accent" />
                                    </span>

                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <p className="text-lg font-semibold">{offer.name}</p>
                                            {offer.featured ? (
                                                <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-text">
                                                    Recommandé
                                                </span>
                                            ) : null}
                                        </div>

                                        {offer.bestFor ? <p className="mt-1 text-xs text-text-muted">{offer.bestFor}</p> : null}
                                    </div>
                                </div>

                                <p className="relative mt-3 text-sm text-text-muted">{offer.punchline}</p>

                                {offer.highlights?.length ? (
                                    <ul className="relative mt-4 flex flex-wrap gap-2">
                                        {offer.highlights.slice(0, 5).map((h) => (
                                            <li key={h} className="rounded-full border border-border/70 bg-background/35 px-3 py-1 text-[11px] font-medium text-text-muted">
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}

                                <div className="relative mt-5">
                                    <p className="text-xs font-semibold tracking-wide text-text-muted">Inclus</p>
                                    <ul className="mt-3 space-y-2 text-sm">
                                        {offer.deliverables.slice(0, 6).map((d) => (
                                            <li key={d} className="flex gap-2 text-text-muted">
                                                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                                <span>{d}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {offer.note ? (
                                    <p className="relative mt-5 rounded-2xl border border-border/70 bg-background/25 p-3 text-xs text-text-muted">
                                        <span className="font-semibold text-accent">Parenthèse :</span> {offer.note}
                                    </p>
                                ) : null}

                                <div className="relative mt-6 flex items-center justify-between gap-3 border-t border-border/60 pt-4 text-xs text-text-muted">
                                    <span className="text-accent">{offer.timeline}</span>
                                    <span className="font-semibold text-text">{offer.priceFrom}</span>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </Container>
        </Section>
    );
}
