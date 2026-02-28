import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { PageHero } from '@/components/sections/page-hero';
import { offers } from '@/content/offers';
import { breadcrumbJsonLd } from '@/lib/seo';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

type OfferPageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return offers.map((offer) => ({ slug: offer.slug }));
}

export async function generateMetadata({ params }: OfferPageProps): Promise<Metadata> {
    const { slug } = await params;
    const offer = offers.find((item) => item.slug === slug);

    if (!offer) {
        return {
            title: 'Offre introuvable',
        };
    }

    return {
        title: `${offer.name} | Offre`,
        description: offer.summary,
    };
}

export default async function OfferDetailsPage({ params }: OfferPageProps) {
    const { slug } = await params;
    const offer = offers.find((item) => item.slug === slug);

    if (!offer) {
        notFound();
    }

    return (
        <>
            <PageHero eyebrow="Offre" title={offer.name} description={offer.punchline} />

            <Section className="pt-2">
                <Container className="space-y-6">
                    <article className="glass rounded-lg border border-border/70 p-6 md:p-8">
                        <p className="text-sm text-text-muted">{offer.summary}</p>

                        {offer.bestFor ? (
                            <p className="mt-4 text-sm text-text-muted">
                                <strong className="text-text">Idéal pour :</strong> {offer.bestFor}
                            </p>
                        ) : null}

                        <div className="mt-6">
                            <h2 className="text-base font-semibold text-text">Ce que vous obtenez</h2>
                            <ul className="mt-3 space-y-2 text-sm text-text-muted">
                                {offer.deliverables.map((deliverable) => (
                                    <li key={deliverable} className="flex gap-2">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                                        <span>{deliverable}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {offer.priceFactors?.length ? (
                            <div className="mt-6">
                                <h2 className="text-base font-semibold text-text">Ce qui peut faire varier le tarif</h2>
                                <ul className="mt-3 flex flex-wrap gap-2 text-xs">
                                    {offer.priceFactors.map((factor) => (
                                        <li key={factor} className="rounded-full border border-border/70 bg-background/40 px-3 py-1 text-text-muted">
                                            {factor}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}

                        <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-sm">
                            <span className="font-semibold text-accent">{offer.timeline}</span>
                            <span className="font-semibold text-text">{offer.priceFrom}</span>
                        </div>
                    </article>

                    <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
                        <Link href="/offres" className="focus-ring rounded-md text-accent hover:text-accent-strong">
                            ← Voir toutes les offres
                        </Link>
                        <Link href="/contact" className="focus-ring inline-flex items-center gap-2 rounded-md text-text hover:text-accent">
                            Discuter de cette offre <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </Container>
            </Section>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        breadcrumbJsonLd([
                            { name: 'Accueil', path: '/' },
                            { name: 'Offres', path: '/offres' },
                            { name: offer.name, path: `/offres/${offer.slug}` },
                        ]),
                    ),
                }}
            />
        </>
    );
}
