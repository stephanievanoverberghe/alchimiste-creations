import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContent } from '@/content/home';

type HomeOffersSectionProps = {
    content: HomeContent['offers'];
};

export function HomeOffersSection({ content }: HomeOffersSectionProps) {
    return (
        <Section>
            <Container>
                <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
                <div className="grid gap-5 md:grid-cols-3">
                    {content.items.map((offer) => (
                        <Card key={offer.slug} className={offer.featured ? 'border-primary/60' : ''}>
                            <p className="text-lg font-semibold">{offer.name}</p>
                            <p className="mt-2 text-sm text-text-muted">{offer.punchline}</p>
                            <p className="mt-4 text-xs text-accent">
                                {offer.timeline} · {offer.priceFrom}
                            </p>
                        </Card>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
