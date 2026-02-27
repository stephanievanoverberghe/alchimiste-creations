import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Accordion } from '@/components/ui/accordion';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContent } from '@/content/home';

const FAQ_SIGNALS = ['Réponses en langage simple', 'Lecture rapide', 'Pensé pour vous rassurer'];

type HomeFaqSectionProps = {
    content: HomeContent['faq'];
};

export function HomeFaqSection({ content }: HomeFaqSectionProps) {
    return (
        <Section>
            <Container>
                <div className="faq-shell relative overflow-hidden rounded-3xl border border-border/70 bg-linear-to-b from-surface/95 via-surface/80 to-background/60 p-5 sm:p-7">
                    <div
                        aria-hidden="true"
                        className="faq-shell__orb faq-shell__orb--primary pointer-events-none absolute -right-16 top-8 h-44 w-44 rounded-full bg-primary/15 blur-3xl"
                    />
                    <div
                        aria-hidden="true"
                        className="faq-shell__orb faq-shell__orb--accent pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-accent/20 blur-3xl"
                    />
                    <div aria-hidden="true" className="faq-shell__mesh pointer-events-none absolute inset-0" />

                    <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />

                    <div className="mb-5 flex flex-wrap gap-2">
                        {FAQ_SIGNALS.map((signal, index) => (
                            <span
                                key={signal}
                                className="faq-shell__signal inline-flex items-center rounded-full border border-border/70 bg-background/45 px-3 py-1 text-xs font-semibold text-text-muted"
                                style={{ animationDelay: `${index * 120}ms` }}
                            >
                                {signal}
                            </span>
                        ))}
                    </div>

                    <Accordion items={content.questions} />
                </div>
            </Container>
        </Section>
    );
}
