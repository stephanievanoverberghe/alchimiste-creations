import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/sections/page-hero';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { projects } from '@/content/projects';
import { breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
    title: 'Projets',
    description: 'Une sélection de projets orientés résultats: conversion, clarté et performance.',
};

export default function ProjetsPage() {
    return (
        <>
            <PageHero
                eyebrow="Projets"
                title="Chaque projet répond à un objectif business concret."
                description="Positionnement, conversion, lisibilité : les choix UI servent d’abord les résultats."
            />
            <Section className="pt-2">
                <Container>
                    <div className="grid gap-5 md:grid-cols-2">
                        {projects.map((project) => (
                            <Link key={project.slug} href={`/projets/${project.slug}`} className="focus-ring rounded-lg">
                                <Card className="h-full border border-border/70 transition duration-300 hover:-translate-y-1 hover:border-accent/60">
                                    <p className="text-xs uppercase tracking-wider text-accent">{project.sector}</p>
                                    <h2 className="mt-2 text-xl font-semibold">{project.client}</h2>
                                    <p className="mt-3 text-sm text-text-muted">
                                        <strong>Enjeu :</strong> {project.challenge}
                                    </p>
                                    <p className="mt-2 text-sm text-text-muted">
                                        <strong>Solution :</strong> {project.solution}
                                    </p>
                                    <ul className="mt-4 space-y-2 text-sm">
                                        {project.outcomes.map((outcome) => (
                                            <li key={outcome}>• {outcome}</li>
                                        ))}
                                    </ul>
                                    <p className="mt-4 text-sm font-semibold text-accent">Voir le descriptif du projet →</p>
                                </Card>
                            </Link>
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
                            { name: 'Projets', path: '/projets' },
                        ]),
                    ),
                }}
            />
        </>
    );
}
