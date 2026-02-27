import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { cn } from '@/lib/utils';
import type { HomeContent } from '@/content/home';
import { ArrowRight, Camera, LayoutPanelTop, Sparkles, Brush, Wand2 } from 'lucide-react';

type HomeProjectsSectionProps = {
    content: HomeContent['projects'];
    contactHref?: string;
};

const ICONS = {
    camera: Camera,
    layout: LayoutPanelTop,
    sparkles: Sparkles,
    brush: Brush,
    wand2: Wand2,
} as const;

export function HomeProjectsSection({ content, contactHref = '/contact' }: HomeProjectsSectionProps) {
    const featured = content.items.filter((p) => p.featured).slice(0, 2);
    const displayed = featured.length ? featured : content.items.slice(0, 2);

    return (
        <Section>
            <Container>
                <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />

                <div className="grid gap-5 md:grid-cols-3">
                    {displayed.map((project, index) => {
                        const Icon = project.icon ? ICONS[project.icon] : null;

                        return (
                            <Card
                                key={project.slug}
                                className="group relative overflow-hidden border-border/70 bg-linear-to-b from-surface/95 to-surface/80 transition duration-300 ease-out hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_18px_40px_rgba(8,10,20,0.45)]"
                                style={{ animationDelay: `${index * 120}ms` }}
                            >
                                <div className="absolute inset-x-0 top-0 h-1 -translate-y-full bg-linear-to-r from-primary/0 via-accent/80 to-primary/0 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" />

                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl opacity-20 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 motion-safe:animate-pulse"
                                    style={{ background: 'rgba(19,209,255,0.14)' }}
                                />

                                <div className="relative flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-xs font-semibold tracking-wide text-text-muted">{project.sector}</p>
                                        <p className="mt-1 text-lg font-semibold">{project.client}</p>
                                    </div>

                                    {Icon ? (
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-background/40 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                                            <Icon className="h-5 w-5 text-accent" />
                                        </span>
                                    ) : null}
                                </div>

                                {project.image ? (
                                    <div className="relative mt-4 overflow-hidden rounded-2xl border border-border/70 bg-background/30">
                                        <Image
                                            src={project.image.src}
                                            alt={project.image.alt}
                                            width={640}
                                            height={360}
                                            className="h-36 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-surface/45 to-transparent opacity-80" />
                                    </div>
                                ) : null}

                                <div className="relative mt-4 space-y-3 text-sm text-text-muted">
                                    <p>
                                        <span className="font-semibold text-text">Avant :</span> {project.challenge}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-text">Après :</span> {project.solution}
                                    </p>
                                </div>

                                <div className="relative mt-4 rounded-2xl border border-border/70 bg-background/25 p-3">
                                    <p className="text-xs font-semibold tracking-wide text-accent">Ce que ça change concrètement</p>
                                    <ul className="mt-3 space-y-2 text-sm" aria-label={`Résultats pour ${project.client}`}>
                                        {project.outcomes.slice(0, 2).map((outcome) => (
                                            <li key={outcome} className="flex gap-2 text-text-muted">
                                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                                <span>{outcome}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>
                        );
                    })}

                    <Link
                        href={contactHref}
                        className={cn(
                            'focus-ring group rounded-lg',
                            'glass relative overflow-hidden p-6 md:p-8',
                            'transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(8,10,20,0.45)]',
                        )}
                        aria-label="Contact - Et si c’était votre projet ?"
                    >
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full blur-3xl transition-all duration-500 group-hover:scale-110"
                            style={{ background: 'rgba(122,84,255,0.16)' }}
                        />

                        <p className="text-sm font-semibold text-accent">Et si c’était le vôtre ?</p>
                        <h3 className="mt-2 text-lg font-semibold">On transforme votre site en machine à prises de contact.</h3>
                        <p className="mt-2 text-sm text-text-muted">Parlez-moi de votre activité : je vous propose un plan simple, moderne et orienté résultats.</p>

                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-text">
                            Lancer la discussion <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                    </Link>
                </div>
            </Container>
        </Section>
    );
}
