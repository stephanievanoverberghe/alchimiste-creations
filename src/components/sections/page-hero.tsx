import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
    return (
        <Section className="pb-8">
            <Container>
                <div className="reveal-up max-w-3xl space-y-5">
                    <Badge>{eyebrow}</Badge>
                    <h1 className="typography-h1">{title}</h1>
                    <p className="typography-body-lg">{description}</p>
                </div>
            </Container>
        </Section>
    );
}
