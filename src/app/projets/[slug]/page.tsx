import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { PageHero } from '@/components/sections/page-hero';
import { projects } from '@/content/projects';
import { breadcrumbJsonLd } from '@/lib/seo';

type ProjectPageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((item) => item.slug === slug);

    if (!project) {
        return {
            title: 'Projet introuvable',
        };
    }

    return {
        title: `${project.client} | Projet`,
        description: `${project.client} (${project.sector}) : ${project.challenge}`,
    };
}

export default async function ProjectDetailsPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = projects.find((item) => item.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <>
            <PageHero eyebrow="Projet" title={project.client} description={project.solution} />

            <Section className="pt-2">
                <Container className="space-y-6">
                    <article className="glass rounded-lg border border-border/70 p-6 md:p-8">
                        <p className="text-xs uppercase tracking-wider text-accent">{project.sector}</p>

                        <div className="mt-4 space-y-4 text-sm text-text-muted">
                            <p>
                                <strong className="text-text">Enjeu :</strong> {project.challenge}
                            </p>
                            <p>
                                <strong className="text-text">Solution :</strong> {project.solution}
                            </p>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-base font-semibold text-text">Résultats obtenus</h2>
                            <ul className="mt-3 space-y-2 text-sm text-text-muted">
                                {project.outcomes.map((outcome) => (
                                    <li key={outcome}>• {outcome}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-base font-semibold text-text">Interventions</h2>
                            <ul className="mt-3 flex flex-wrap gap-2 text-xs">
                                {project.stack.map((item) => (
                                    <li key={item} className="rounded-full border border-border/70 bg-background/40 px-3 py-1 text-text-muted">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>

                    <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
                        <Link href="/projets" className="focus-ring rounded-md text-accent hover:text-accent-strong">
                            ← Voir tous les projets
                        </Link>
                        {project.liveUrl ? (
                            <Link href={project.liveUrl} target="_blank" rel="noreferrer" className="focus-ring rounded-md text-text hover:text-accent">
                                Visiter le site en ligne ↗
                            </Link>
                        ) : null}
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
                            { name: project.client, path: `/projets/${project.slug}` },
                        ]),
                    ),
                }}
            />
        </>
    );
}
