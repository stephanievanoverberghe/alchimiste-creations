import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/page-hero';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { offers } from '@/content/offers';
import { breadcrumbJsonLd } from '@/lib/seo';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Offres',
    description: 'Des offres claires pour créer ou améliorer votre site avec un objectif business concret.',
};

export default function OffresPage() {
    return (
        <>
            <PageHero
                eyebrow="Offres"
                title="Choisissez l’offre qui répond à votre besoin maintenant."
                description="Offre principale : création de site vitrine. Offre secondaire : refonte d’un site existant pour clarifier le message et générer plus de demandes."
            />
            <Section className="pt-2">
                <Container>
                    <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-border/70 bg-background/20 p-3">
                        {['Vous savez quoi choisir en 30 secondes', 'Des résultats concrets, pas du blabla', 'Un accompagnement clair de A à Z'].map((point) => (
                            <span key={point} className="rounded-full border border-border/70 bg-background/55 px-3 py-1 text-xs font-semibold text-text-muted">
                                {point}
                            </span>
                        ))}
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {offers.map((offer) => (
                            <div id={offer.slug} key={offer.slug} className="scroll-mt-28">
                                <Link href={`/offres/${offer.slug}`} className="focus-ring block rounded-xl">
                                    <Card className="group relative h-full overflow-hidden border-border/70 bg-linear-to-b from-surface/95 to-surface/80 transition duration-300 hover:-translate-y-1 hover:border-accent/55">
                                        <div className="absolute inset-x-0 top-0 h-1 -translate-y-full bg-linear-to-r from-primary/0 via-accent/80 to-primary/0 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" />

                                        <p className="text-xl font-semibold">{offer.name}</p>
                                        <p className="mt-2 text-sm text-text-muted">{offer.summary}</p>

                                        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent">Concrètement, vous obtenez :</p>
                                        <ul className="mt-3 space-y-2 text-sm text-text-muted">
                                            {offer.deliverables.map((deliverable) => (
                                                <li key={deliverable} className="flex gap-2">
                                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                                                    <span>{deliverable}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-sm">
                                            <span className="font-semibold text-accent">{offer.timeline}</span>
                                            <span className="font-semibold text-text">{offer.priceFrom}</span>
                                        </div>
                                        <p className="mt-4 text-sm font-semibold text-accent">Voir l’offre détaillée →</p>
                                    </Card>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10">
                        <Button href="/contact" className="inline-flex items-center gap-2">
                            Discuter de votre besoin
                            <ArrowRight className="h-4 w-4" />
                        </Button>
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
                        ]),
                    ),
                }}
            />
        </>
    );
}
