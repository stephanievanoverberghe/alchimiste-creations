import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContent } from '@/content/home';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ChevronRight, Code2, Gauge, LayoutTemplate, Rocket, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';

type HomeOffersSectionProps = {
    content: HomeContent['offers'];
};

const ICONS = {
    sparkles: Sparkles,
    layout: LayoutTemplate,
    zap: Zap,
    gauge: Gauge,
    code: Code2,
    rocket: Rocket,
    shield: ShieldCheck,
} as const;

const SUMMARY_CHIPS = ['One Page pour démarrer', 'Site vitrine pour accélérer', 'Refonte si votre base existe déjà'] as const;

export function HomeOffersSection({ content }: HomeOffersSectionProps) {
    return (
        <Section id="offers">
            <Container>
                <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
                <div className="offers-shell mt-6">
                    <div className="offers-shell__mesh" aria-hidden="true" />
                    <div className="offers-shell__glow offers-shell__glow--primary" aria-hidden="true" />
                    <div className="offers-shell__glow offers-shell__glow--accent" aria-hidden="true" />

                    <div className="offers-shell__chips">
                        {SUMMARY_CHIPS.map((label) => (
                            <span key={label} className="offers-shell__chip">
                                <ChevronRight className="h-3.5 w-3.5 text-accent" />
                                {label}
                            </span>
                        ))}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {content.items.map((offer, index) => {
                            const Icon = offer.icon ? ICONS[offer.icon] : Sparkles;

                            return (
                                <Link key={offer.slug} href={`/offres/${offer.slug}`} className="offers-card group block h-full" aria-label={`Découvrir l'offre ${offer.name}`}>
                                    <Card
                                        className={cn(
                                            'offers-card__surface relative flex h-full flex-col overflow-hidden border-border/70 bg-linear-to-br from-surface to-surface-elevated/85 p-5',
                                            offer.featured ? 'offers-card__surface--featured' : '',
                                        )}
                                        style={{ animationDelay: `${index * 90}ms` }}
                                    >
                                        <span className="offers-card__spotlight" aria-hidden="true" />
                                        <div className="flex items-start gap-3">
                                            <span className="offers-card__icon inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-background/40">
                                                <Icon className="h-5 w-5 text-accent" />
                                            </span>

                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <p className={cn('font-semibold', offer.featured ? 'text-xl' : 'text-lg')}>{offer.name}</p>
                                                    {offer.featured ? (
                                                        <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-text">
                                                            Le plus demandé
                                                        </span>
                                                    ) : null}
                                                </div>

                                                {offer.bestFor ? <p className="mt-1 line-clamp-1 text-xs text-text-muted">{offer.bestFor}</p> : null}
                                            </div>
                                        </div>
                                        <p className="mt-3 text-sm text-text-muted">{offer.punchline}</p>

                                        {offer.highlights?.length ? (
                                            <ul className="mt-4 flex flex-wrap gap-2">
                                                {offer.highlights.slice(0, 2).map((h) => (
                                                    <li
                                                        key={h}
                                                        className="offers-card__tag rounded-full border border-border/70 bg-background/35 px-3 py-1 text-[11px] font-semibold text-text-muted"
                                                    >
                                                        {h}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : null}

                                        <div className="mt-auto pt-6">
                                            <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-4 text-xs text-text-muted">
                                                <span className="font-semibold text-accent">{offer.timeline}</span>
                                                <span className="font-semibold text-text">{offer.priceFrom}</span>
                                            </div>

                                            <p className="offers-card__cta mt-3 inline-flex items-center gap-1 text-xs font-semibold text-text">
                                                Voir l&apos;offre détaillée
                                                <ArrowUpRight className="h-3.5 w-3.5" />
                                            </p>
                                        </div>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-6 flex justify-center">
                    <Link
                        href="/offres"
                        className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-background/40 px-4 py-2 text-sm font-semibold text-text-muted hover:border-accent/50 hover:text-text"
                    >
                        Voir toutes les offres & tarifs <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </div>
            </Container>
        </Section>
    );
}
