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
                <div className="mt-5 flex flex-wrap items-center gap-2 rounded-2xl border border-border/70 bg-background/20 p-3">
                    {SUMMARY_CHIPS.map((label) => (
                        <span
                            key={label}
                            className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/55 px-3 py-1 text-xs font-semibold text-text-muted"
                        >
                            <ChevronRight className="h-3.5 w-3.5 text-accent" />
                            {label}
                        </span>
                    ))}
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {content.items.map((offer, index) => {
                        const Icon = offer.icon ? ICONS[offer.icon] : Sparkles;

                        return (
                            <Link key={offer.slug} href={`/offres#${offer.slug}`} className="group block h-full" aria-label={`Découvrir l'offre ${offer.name}`}>
                                <Card
                                    className={cn(
                                        'relative flex h-full flex-col border-border/70 bg-linear-to-b from-surface/95 to-surface/80 p-5 transition duration-300 ease-out hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_18px_40px_rgba(8,10,20,0.45)]',
                                        offer.featured ? 'border-primary/70 ring-1 ring-primary/35 shadow-[0_18px_45px_rgba(122,84,255,0.24)]' : '',
                                    )}
                                    style={{ animationDelay: `${index * 70}ms` }}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-background/40 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2">
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
                                                    className="rounded-full border border-border/70 bg-background/35 px-3 py-1 text-[11px] font-semibold text-text-muted transition-colors duration-300 group-hover:border-accent/40 group-hover:text-text"
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

                                        <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-text transition-transform duration-300 group-hover:translate-x-1">
                                            Voir l&apos;offre détaillée
                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                        </p>
                                    </div>
                                </Card>
                            </Link>
                        );
                    })}
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
