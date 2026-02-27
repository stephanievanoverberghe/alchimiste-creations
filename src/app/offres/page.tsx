import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/page-hero';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { offers } from '@/content/offers';
import { breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
    title: 'Offres',
    description: 'Des offres claires pour créer ou optimiser un site premium orienté conversion.',
};

export default function OffresPage() {
    return (
        <>
            <PageHero
                eyebrow="Offres"
                title="Des offres calibrées pour vos objectifs business."
                description="Chaque offre est pensée pour aller à l’essentiel : impact visuel, clarté de message, et conversion mesurable."
            />
            <Section className="pt-2">
                <Container>
                    <div className="grid gap-6 md:grid-cols-3">
                        {offers.map((offer) => (
                            <div id={offer.slug} key={offer.slug} className="scroll-mt-28">
                                <Card>
                                    <p className="text-xl font-semibold">{offer.name}</p>
                                    <p className="mt-2 text-sm text-text-muted">{offer.summary}</p>
                                    <ul className="mt-5 space-y-2 text-sm text-text-muted">
                                        {offer.deliverables.map((deliverable) => (
                                            <li key={deliverable}>• {deliverable}</li>
                                        ))}
                                    </ul>
                                    <p className="mt-5 text-sm font-medium text-accent">
                                        {offer.timeline} · {offer.priceFrom}
                                    </p>
                                </Card>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10">
                        <Button href="/contact">Discuter de votre besoin</Button>
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
