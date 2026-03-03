import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import type { Offer } from '@/content/schemas';
import { formatPrice, formatTimeline } from '@/features/offers/lib/offer-formatters';

type OffersDetailsSectionProps = {
    offers: Offer[];
};

export function OffersDetailsSection({ offers }: OffersDetailsSectionProps) {
    return (
        <Section className="py-8 md:py-12" aria-labelledby="offer-details-title">
            <Container>
                <SectionHeading
                    id="offer-details-title"
                    eyebrow="Détails par offre"
                    title="Ce que vous recevez, ce qui fait varier le budget, et la prochaine étape"
                    description="Chaque offre est cadrée pour vous donner de la visibilité avant de démarrer."
                />
                <div className="space-y-6">
                    {offers.map((offer) => (
                        <div key={offer.slug} className="scroll-mt-28">
                            <Card className="border border-border/70 bg-surface/70 p-5 md:p-6">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <h3 className="text-xl font-semibold text-text">{offer.name}</h3>
                                    {offer.featured ? <Badge className="border-primary/50 bg-primary/10 text-primary">Le plus choisi</Badge> : null}
                                </div>
                                <p className="mt-3 text-sm text-text-muted">{offer.punchline}</p>

                                <div className="mt-5 grid gap-5 md:grid-cols-2">
                                    <div>
                                        <h4 className="text-sm font-semibold uppercase tracking-wide text-text-muted">Livrables inclus</h4>
                                        <ul className="mt-3 space-y-2 text-sm text-text-muted">
                                            {offer.deliverables.map((deliverable) => (
                                                <li key={deliverable}>• {deliverable}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-5">
                                        <div>
                                            <h4 className="text-sm font-semibold uppercase tracking-wide text-text-muted">Budget & délai</h4>
                                            <p className="mt-3 text-sm text-text-muted">
                                                <span className="font-semibold text-text">{formatPrice(offer.priceFrom)}</span> ·{' '}
                                                <span className="font-semibold text-text">{formatTimeline(offer.timeline)}</span>
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold uppercase tracking-wide text-text-muted">Facteurs qui font varier le prix</h4>
                                            <ul className="mt-3 space-y-2 text-sm text-text-muted">
                                                {(offer.priceFactors ?? []).map((factor) => (
                                                    <li key={factor}>• {factor}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <p className="mt-5 rounded-lg border border-border/60 bg-background/40 p-3 text-sm text-text-muted">
                                    {offer.slug === 'refonte-site-internet'
                                        ? 'Refonte : la priorité est la page d’accueil (message, structure, conversion). Les pages secondaires peuvent être étendues ensuite selon vos besoins.'
                                        : offer.note}
                                </p>

                                <div className="mt-5 flex flex-wrap gap-3">
                                    <Button href={`/offres/${offer.slug}`} variant="secondary">
                                        Voir le descriptif complet
                                    </Button>
                                    <Button href="/contact">Réserver un appel</Button>
                                    <Button href="/contact#devis" variant="secondary">
                                        Demander un devis
                                    </Button>
                                    <Link href={`/offres/${offer.slug}`} className="focus-ring mt-3 inline-flex text-sm font-semibold text-accent hover:text-accent-strong">
                                        Consulter la page dédiée de cette offre →
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
