import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/page-hero';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { breadcrumbJsonLd } from '@/lib/seo';

const steps = [
    ['01 · Cadrage', 'Objectifs, audience, messages, KPI et périmètre prioritaire.'],
    ['02 · Direction UI/UX', 'Wireframe orienté conversion puis design haute-fidélité.'],
    ['03 · Production', 'Intégration Next.js, performance, accessibilité et SEO technique.'],
    ['04 · Lancement', 'QA final, mise en ligne et plan d’itération post-livraison.'],
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
                title="Un process clair pour éviter les allers-retours infinis."
                description="Vous savez à tout moment où on va, ce qui est livré, et pourquoi c’est prioritaire."
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
