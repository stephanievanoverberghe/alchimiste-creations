import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/page-hero';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Accordion } from '@/components/ui/accordion';
import { faqs } from '@/content/faq';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
    title: 'FAQ',
    description: 'Les réponses aux objections fréquentes avant de lancer votre projet web premium.',
};

export default function FaqPage() {
    return (
        <>
            <PageHero eyebrow="FAQ" title="Réponses courtes aux questions décisives." description="L’objectif: vous aider à décider vite, sans zone grise." />
            <Section className="pt-2">
                <Container>
                    <Accordion items={faqs} />
                </Container>
            </Section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs.map((item) => ({ question: item.question, answer: item.answer })))) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        breadcrumbJsonLd([
                            { name: 'Accueil', path: '/' },
                            { name: 'FAQ', path: '/faq' },
                        ]),
                    ),
                }}
            />
        </>
    );
}
