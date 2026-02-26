import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/page-hero';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { Input, Textarea } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Décrivez votre projet: réponse sous 24h avec recommandations claires et prochaines étapes.',
};

export default function ContactPage() {
    return (
        <>
            <PageHero
                eyebrow="Contact"
                title="Parlons de votre prochain site premium."
                description="Partagez vos objectifs, je vous réponds avec un plan clair, un budget estimatif et un timing réaliste."
            />
            <Section className="pt-2">
                <Container>
                    <Card className="max-w-3xl">
                        <form className="space-y-4" action="#" method="post">
                            <div className="hidden" aria-hidden>
                                <label htmlFor="website">Ne pas remplir ce champ</label>
                                <Input id="website" name="website" autoComplete="off" tabIndex={-1} />
                            </div>
                            <div>
                                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                                    Nom
                                </label>
                                <Input id="name" name="name" required placeholder="Votre nom" />
                            </div>
                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                                    Email
                                </label>
                                <Input id="email" name="email" type="email" required placeholder="vous@entreprise.com" />
                            </div>
                            <div>
                                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                                    Brief projet
                                </label>
                                <Textarea id="message" name="message" required placeholder="Objectif, délai, budget indicatif..." />
                                <p className="mt-2 text-xs text-text-muted">Vos données restent confidentielles. Réponse sous 24h ouvrées.</p>
                            </div>
                            <Button>Envoyer la demande</Button>
                        </form>
                    </Card>
                </Container>
            </Section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        breadcrumbJsonLd([
                            { name: 'Accueil', path: '/' },
                            { name: 'Contact', path: '/contact' },
                        ]),
                    ),
                }}
            />
        </>
    );
}
