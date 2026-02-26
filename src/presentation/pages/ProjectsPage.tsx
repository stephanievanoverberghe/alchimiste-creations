import Link from 'next/link';
import { getSiteViewModel } from '@/application/site/use-cases/getSiteViewModel';
import { CtaBand } from '@/presentation/sections/shared/CtaBrand';
import { PageHero } from '@/presentation/sections/marketing/PageHero';
import { Section } from '@/presentation/ui/primitives/Section';

export function ProjectsPage() {
    const { site, projects } = getSiteViewModel();
    return (
        <>
            <PageHero {...site.projects.intro} primary={site.projects.intro.cta.primary} secondary={site.projects.intro.cta.secondary} />
            <Section>
                <div className="grid gap-4 md:grid-cols-2">
                    {projects.map((project) => (
                        <article key={project.slug} className="rounded-2xl border border-sauge/35 p-6">
                            <p className="text-xs uppercase tracking-[0.12em] text-terracotta">{project.sector}</p>
                            <h2 className="mt-2 text-3xl">{project.name}</h2>
                            <p className="mt-3 text-foreground/80">{project.challenge}</p>
                            <p className="mt-2 font-semibold text-terracotta">{project.outcome}</p>
                            <Link href={`/projets/${project.slug}`} className="mt-4 inline-block underline underline-offset-4">
                                Voir le projet
                            </Link>
                        </article>
                    ))}
                </div>
            </Section>
            <Section tone="dark">
                <div className="grid gap-3 md:grid-cols-2">
                    {site.projects.testimonials.map((item) => (
                        <blockquote key={item.author} className="rounded-2xl border border-white/15 p-5">
                            <p>“{item.quote}”</p>
                            <footer className="mt-3 text-sm text-white/70">— {item.author}</footer>
                        </blockquote>
                    ))}
                </div>
            </Section>
            <CtaBand title="Votre projet peut être le prochain cas d’étude." body="On construit une expérience web qui clarifie votre valeur et facilite la prise de décision." />
        </>
    );
}
