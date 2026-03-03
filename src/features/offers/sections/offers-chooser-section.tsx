import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';

type Choice = {
    title: string;
    description: string;
    href: string;
};

const choices: Choice[] = [
    {
        title: 'Je dois lancer vite une présence crédible',
        description: 'Vous avez besoin d’une page claire pour présenter votre activité et générer vos premiers contacts.',
        href: '#creation-landing-page',
    },
    {
        title: 'Je veux un site complet pour structurer mes demandes',
        description: 'Vous cherchez une base solide (4 à 8 pages) pour vendre vos services avec plus de clarté.',
        href: '#creation-site-vitrine',
    },
    {
        title: 'Mon site existe déjà mais ne convertit pas assez',
        description: 'Vous voulez reprendre la page d’accueil en priorité pour améliorer le message et les performances.',
        href: '#refonte-site-internet',
    },
];

export function OffersChooserSection() {
    return (
        <Section className="py-8 md:py-12" aria-labelledby="offres-chooser-title">
            <Container>
                <SectionHeading
                    id="offres-chooser-title"
                    eyebrow="Comment choisir ?"
                    title="En 30 secondes, trouvez l’offre qui correspond à votre priorité actuelle"
                    description="Pas besoin d’analyser 10 options. Choisissez votre situation et accédez directement à l’offre recommandée."
                />
                <div className="grid gap-4 md:grid-cols-3">
                    {choices.map((choice) => (
                        <Link key={choice.title} href={choice.href} className="focus-ring rounded-xl">
                            <Card className="h-full border-border/70 transition-transform duration-300 md:hover:-translate-y-1 md:hover:border-accent/60">
                                <h3 className="text-base font-semibold text-text">{choice.title}</h3>
                                <p className="mt-2 text-sm text-text-muted">{choice.description}</p>
                                <p className="mt-4 text-sm font-semibold text-accent">Voir l’offre adaptée →</p>
                            </Card>
                        </Link>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
