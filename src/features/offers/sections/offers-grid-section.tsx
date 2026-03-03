import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import type { Offer } from '@/content/schemas';
import { formatPrice, formatTimeline } from '@/features/offers/lib/offer-formatters';

type OffersGridSectionProps = {
    offers: Offer[];
};

export function OffersGridSection({ offers }: OffersGridSectionProps) {
    return (
        <Section className="py-8 md:py-12" aria-labelledby="offres-grid-title">
            <Container>
                <SectionHeading
                    id="offres-grid-title"
                    eyebrow="Comparatif rapide"
                    title="3 offres, un même objectif : plus de clarté et plus d’opportunités"
                    description="Commencez par celle qui correspond à votre situation actuelle. Vous pourrez toujours élargir le périmètre ensuite."
                />
                <div className="grid gap-5 md:grid-cols-3">
                    {offers.map((offer) => (
                        <div key={offer.slug} id={offer.slug} className="scroll-mt-28">
                            <Card
                                className={`border p-5 transition-all duration-300 md:hover:-translate-y-1 ${
                                    offer.featured ? 'border-primary/60 bg-primary/5 shadow-[var(--shadow-glow)]' : 'border-border/70 bg-surface/70 md:hover:border-accent/60'
                                }`}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <h3 className="text-lg font-semibold text-text">{offer.name}</h3>
                                    {offer.featured ? <Badge className="border-primary/50 bg-primary/10 text-primary">Le plus choisi</Badge> : null}
                                </div>
                                <p className="mt-2 text-sm text-text-muted">{offer.summary}</p>
                                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border/60 pt-4 text-sm">
                                    <p>
                                        <span className="block text-xs uppercase tracking-wide text-text-muted">Délai</span>
                                        <span className="font-semibold text-text">{formatTimeline(offer.timeline)}</span>
                                    </p>
                                    <p>
                                        <span className="block text-xs uppercase tracking-wide text-text-muted">Budget</span>
                                        <span className="font-semibold text-text">{formatPrice(offer.priceFrom)}</span>
                                    </p>
                                </div>
                                <p className="mt-4 text-sm text-text-muted">{offer.bestFor}</p>
                                <div className="mt-5 flex flex-wrap gap-2">
                                    <Link href={`#detail-${offer.slug}`} className="focus-ring text-sm font-semibold text-accent">
                                        Voir les détails ↓
                                    </Link>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
