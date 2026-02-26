import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContent } from '@/content/home';

type HomeArchitectureSectionProps = {
    content: HomeContent['architecture'];
};

export function HomeArchitectureSection({ content }: HomeArchitectureSectionProps) {
    return (
        <Section>
            <Container>
                <SectionHeading eyebrow={content.eyebrow} title={content.title} />
                <div className="grid gap-5 md:grid-cols-3">
                    {content.pillars.map((pillar) => (
                        <Card key={pillar.title}>
                            <p className="text-sm font-medium text-accent">{pillar.title}</p>
                            <p className="mt-2 text-base font-semibold">{pillar.text}</p>
                        </Card>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
