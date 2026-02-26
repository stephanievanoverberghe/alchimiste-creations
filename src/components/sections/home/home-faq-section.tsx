import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Accordion } from '@/components/ui/accordion';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContent } from '@/content/home';

type HomeFaqSectionProps = {
    content: HomeContent['faq'];
};

export function HomeFaqSection({ content }: HomeFaqSectionProps) {
    return (
        <Section>
            <Container>
                <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
                <Accordion items={content.questions} />
            </Container>
        </Section>
    );
}
