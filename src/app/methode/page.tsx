import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/page-hero';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { breadcrumbJsonLd } from '@/lib/seo';

const steps = [
    ['01 · Vision business', 'Objectifs de vente, persona, proposition de valeur et plan d’acquisition prioritaire.'],
    ['02 · Architecture de conversion', 'Arborescence, messages-clés, preuves sociales et parcours CTA page par page.'],
    ['03 · Design & Développement', 'UI premium + intégration React/Next.js + optimisation performance, SEO et accessibilité.'],
    ['04 · Croissance continue', 'Lancement, instrumentation analytics puis itérations guidées par les données réelles.'],
];

export const metadata: Metadata = {
    title: 'Méthode',
    description: 'Une méthode structurée pour livrer vite, proprement, et avec impact business.',
};

export default function MethodePage() {
    return (
        <>
            <PageHero
                eyebrow="Méthode"
                title="Une méthode orientée résultats, pas seulement esthétique."
                description="Chaque étape sert un objectif business précis : visibilité, crédibilité, conversion et croissance."
            />
            <Section className="pt-2">
                <Container>
                    <div className="grid gap-5 md:grid-cols-2">
                        {steps.map(([title, text]) => (
                            <Card key={title}>
                                <p className="text-lg font-semibold">{title}</p>
                                <p className="mt-2 text-sm text-text-muted">{text}</p>
                            </Card>
                        ))}
                    </div>
                </Container>
            </Section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        breadcrumbJsonLd([
                            { name: 'Accueil', path: '/' },
                            { name: 'Méthode', path: '/methode' },
                        ]),
                    ),
                }}
            />
        </>
    );
}
