import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContent } from '@/content/home';

type HomeProjectsSectionProps = {
    content: HomeContent['projects'];
};

export function HomeProjectsSection({ content }: HomeProjectsSectionProps) {
    return (
        <Section>
            <Container>
                <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
                <div className="grid gap-5 md:grid-cols-3">
                    {content.items.map((project) => (
                        <Card key={project.slug}>
                            <p className="text-sm text-accent">{project.sector}</p>
                            <p className="mt-2 text-lg font-semibold">{project.client}</p>
                            <p className="mt-3 text-sm text-text-muted">{project.challenge}</p>
                            <ul className="mt-4 space-y-2 text-sm" aria-label={`Résultats pour ${project.client}`}>
                                {project.outcomes.map((outcome) => (
                                    <li key={outcome}>• {outcome}</li>
                                ))}
                            </ul>
                        </Card>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
