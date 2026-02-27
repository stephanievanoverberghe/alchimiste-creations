import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContent } from '@/content/home';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ChevronRight, Code2, Gauge, LayoutTemplate, Rocket, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

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
        <Section id="offers">
            <Container>
                <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
                <div className="mb-6 flex flex-wrap items-center gap-2 rounded-2xl border border-border/70 bg-background/20 p-3">
                    {['Je veux plus de clients', 'Je veux une offre claire', 'Je veux vendre sans forcer', 'Je veux un site qui rassure'].map((label) => (
                        <span
                            key={label}
                            className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/55 px-3 py-1 text-xs font-semibold text-text-muted transition-all duration-300 hover:border-accent/45 hover:text-text"
                        >
                            <ChevronRight className="h-3.5 w-3.5 text-accent" />
                            {label}
                        </span>
                    ))}
                </div>

                <div className="grid gap-5 md:grid-cols-6">
                    {content.items.map((offer, index) => {
                        const Icon = offer.icon ? ICONS[offer.icon] : Sparkles;

                        return (
                            <Link
                                key={offer.slug}
                                href={`/offres#${offer.slug}`}
                                className={cn('group block h-full md:col-span-2', offer.featured ? 'md:row-span-2' : '')}
                                aria-label={`Découvrir l'offre ${offer.name}`}
                            >
                                <Card
                                    className={cn(
                                        'relative flex h-full flex-col overflow-hidden border-border/70 bg-linear-to-b from-surface/95 to-surface/80 transition duration-300 ease-out hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_18px_40px_rgba(8,10,20,0.45)] focus-visible:border-accent/60 focus-visible:shadow-[0_18px_40px_rgba(8,10,20,0.45)]',
                                        offer.featured ? 'border-primary/70 shadow-[0_18px_45px_rgba(122,84,255,0.24)] ring-1 ring-primary/35' : '',
                                    )}
                                    style={{ animationDelay: `${index * 90}ms` }}
                                >
                                    <div className="absolute inset-x-0 top-0 h-1 -translate-y-full bg-linear-to-r from-primary/0 via-accent/80 to-primary/0 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
                                    <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/0 via-transparent to-accent/0 opacity-0 transition duration-500 group-hover:from-primary/8 group-hover:to-accent/8" />

                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl opacity-20 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 motion-safe:animate-pulse"
                                        style={{ background: offer.featured ? 'rgba(122,84,255,0.18)' : 'rgba(19,209,255,0.14)' }}
                                    />

                                    <div className="relative flex items-start gap-3">
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-background/40 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                                            <Icon className="h-5 w-5 text-accent" />
                                        </span>

                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <p className={cn('font-semibold', offer.featured ? 'text-xl' : 'text-lg')}>{offer.name}</p>
                                                {offer.featured ? (
                                                    <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-text">
                                                        Offre la plus demandée
                                                    </span>
                                                ) : null}
                                            </div>

                                            {offer.bestFor ? <p className="mt-1 text-xs text-text-muted">{offer.bestFor}</p> : null}
                                        </div>
                                    </div>

                                    <p className="relative mt-4 text-sm text-text-muted">{offer.punchline}</p>

                                    {offer.highlights?.length ? (
                                        <ul className="relative mt-4 flex flex-wrap gap-2">
                                            {offer.highlights.slice(0, 4).map((h) => (
                                                <li
                                                    key={h}
                                                    className="rounded-full border border-border/70 bg-background/35 px-3 py-1 text-[11px] font-semibold text-text-muted transition-colors duration-300 group-hover:border-accent/40 group-hover:text-text"
                                                >
                                                    {h}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : null}

                                    <div className="relative mt-5 rounded-2xl border border-border/70 bg-background/25 p-3">
                                        <p className="text-xs font-semibold tracking-wide text-accent">Ce que ça change concrètement</p>
                                        <ul className="mt-3 space-y-2 text-sm">
                                            {offer.deliverables.slice(0, 3).map((d) => (
                                                <li key={d} className="flex gap-2 text-text-muted">
                                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                                    <span>{d}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {offer.note ? (
                                        <p className="relative mt-4 text-xs text-text-muted">
                                            <span className="font-semibold text-text">Bon à savoir :</span> {offer.note}
                                        </p>
                                    ) : null}

                                    <div className="relative mt-auto pt-6">
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
            </Container>
        </Section>
    );
}
