import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContent } from '@/content/home';

type HomeProofsSectionProps = {
    content: HomeContent['proofs'];
};

export function HomeProofsSection({ content }: HomeProofsSectionProps) {
    return (
        <Section className="pt-2">
            <Container>
                <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
                <div className="grid gap-5 lg:grid-cols-2">
                    <Card>
                        <h3 className="text-sm font-medium text-text-muted">Repères immédiats</h3>
                        <ul className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1" aria-label="Statistiques clés">
                            {content.stats.map((stat) => (
                                <li key={stat.label} className="rounded-xl border border-border/70 bg-background/70 p-3">
                                    <p className="text-xl font-semibold text-primary">{stat.value}</p>
                                    <p className="text-sm text-text-muted">{stat.label}</p>
                                </li>
                            ))}
                        </ul>
                    </Card>
                    <div className="grid gap-5">
                        {content.cards.map((item) => (
                            <Card key={item.title}>
                                <h3 className="text-base font-semibold">{item.title}</h3>
                                <p className="mt-2 text-sm text-text-muted">{item.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
