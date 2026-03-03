'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const proofChips = ['Réponse en 24h', '100% sur mesure', 'Objectif : plus de demandes qualifiées'];

export function OffersHeroSection() {
    const [imageError, setImageError] = useState(false);

    return (
        <Section className="pb-8 pt-6 md:pb-12 md:pt-14" aria-labelledby="offres-hero-title">
            <Container>
                <div className="md:hidden">
                    <Card className="overflow-hidden border-border/70 p-0">
                        {imageError ? (
                            <div className="h-48 bg-linear-to-br from-primary/20 via-accent/20 to-surface" aria-hidden="true" />
                        ) : (
                            <Image
                                src="/images/offer-hero.png"
                                alt="Aperçu d'une page vitrine claire et structurée"
                                width={1200}
                                height={720}
                                className="h-48 w-full object-cover"
                                onError={() => setImageError(true)}
                                priority
                            />
                        )}
                    </Card>

                    <div className="mt-6 space-y-4">
                        <Badge>Offres</Badge>
                        <h1 id="offres-hero-title" className="typography-h1 text-balance">
                            Une offre claire pour transformer votre site en levier commercial.
                        </h1>
                        <p className="typography-body-lg">
                            Vous voulez un site qui inspire confiance et facilite la prise de contact. Ici, vous choisissez une offre lisible, avec prix, délais et livrables
                            annoncés.
                        </p>
                        <div className="flex flex-wrap gap-2" aria-label="Preuves de confiance">
                            {proofChips.map((chip) => (
                                <Badge key={chip} className="bg-surface">
                                    {chip}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="hidden grid-cols-12 items-center gap-8 md:grid" role="presentation">
                    <div className="col-span-7 space-y-5">
                        <Badge>Offres</Badge>
                        <h1 id="offres-hero-title-desktop" className="typography-h1 text-balance">
                            Choisissez l’offre adaptée à votre niveau de maturité digitale.
                        </h1>
                        <p className="typography-body-lg max-w-2xl">
                            Création, vitrine complète ou refonte stratégique : chaque offre est pensée pour clarifier votre message, renforcer votre crédibilité et vous aider à
                            convertir plus régulièrement.
                        </p>
                        <div className="flex flex-wrap gap-2" aria-label="Preuves de confiance">
                            {proofChips.map((chip) => (
                                <Badge key={chip}>{chip}</Badge>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-3 pt-2">
                            <Button href="/contact">Réserver un appel</Button>
                            <Button href="/contact#devis" variant="secondary">
                                Demander un devis
                            </Button>
                        </div>
                    </div>
                    <Card className="col-span-5 overflow-hidden border-border/70 p-0">
                        {imageError ? (
                            <div className="h-full min-h-80 bg-linear-to-br from-primary/20 via-accent/20 to-surface" aria-hidden="true" />
                        ) : (
                            <Image
                                src="/images/offer-hero.png"
                                alt="Aperçu d'une page vitrine claire et structurée"
                                width={1200}
                                height={720}
                                className="h-full min-h-80 w-full object-cover"
                                onError={() => setImageError(true)}
                                priority
                            />
                        )}
                    </Card>
                </div>
            </Container>

            <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border/70 bg-background/95 p-3 backdrop-blur md:hidden">
                <Container className="px-0">
                    <div className="grid grid-cols-2 gap-2">
                        <Button href="/contact" className="w-full px-3 text-xs">
                            Réserver un appel
                        </Button>
                        <Button href="/contact#devis" variant="secondary" className="w-full px-3 text-xs">
                            Demander un devis
                        </Button>
                    </div>
                </Container>
            </div>
        </Section>
    );
}
