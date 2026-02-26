import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContent } from '@/content/home';

type HomeProcessSectionProps = {
    content: HomeContent['process'];
};

export function HomeProcessSection({ content }: HomeProcessSectionProps) {
    return (
        <Section>
            <Container>
                <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
                <ol className="grid gap-5 md:grid-cols-2" aria-label="Étapes du process">
                    {content.steps.map((step) => (
                        <li key={step.title}>
                            <Card>
                                <h3 className="text-lg font-semibold">{step.title}</h3>
                                <p className="mt-2 text-sm text-text-muted">{step.description}</p>
                            </Card>
                        </li>
                    ))}
                </ol>
            </Container>
        </Section>
    );
}
