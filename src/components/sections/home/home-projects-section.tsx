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
    contactHref?: string; // optionnel, sinon tu mets /contact
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
                    {displayed.map((project) => {
                        const Icon = project.icon ? ICONS[project.icon] : null;

                        return (
                            <Card key={project.slug} className="group relative overflow-hidden">
                                {/* glow */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
                                    style={{ background: 'rgba(19,209,255,0.12)' }}
                                />

                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-xs font-semibold tracking-wide text-text-muted">{project.sector}</p>
                                        <p className="mt-1 text-lg font-semibold">{project.client}</p>
                                    </div>

                                    {Icon ? (
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-background/40">
                                            <Icon className="h-5 w-5 text-accent" />
                                        </span>
                                    ) : null}
                                </div>

                                {project.image ? (
                                    <div className="mt-4 overflow-hidden rounded-2xl border border-border/70 bg-background/30">
                                        <Image
                                            src={project.image.src}
                                            alt={project.image.alt}
                                            width={640}
                                            height={360}
                                            className="h-36 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                ) : null}

                                <p className="mt-4 text-sm text-text-muted">{project.challenge}</p>

                                <ul className="mt-4 space-y-2 text-sm" aria-label={`Résultats pour ${project.client}`}>
                                    {project.outcomes.slice(0, 2).map((outcome) => (
                                        <li key={outcome} className="flex gap-2 text-text-muted">
                                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                            <span>{outcome}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {project.stack.slice(0, 4).map((tech) => (
                                        <span key={tech} className="rounded-full border border-border/70 bg-background/30 px-3 py-1 text-[11px] text-text-muted">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </Card>
                        );
                    })}

                    {/* CTA CARD */}
                    <Link
                        href={contactHref}
                        className={cn('focus-ring group rounded-lg', 'glass relative overflow-hidden p-6 md:p-8', 'transition-transform duration-300 hover:-translate-y-0.5')}
                        aria-label="Contact - Et si c’était votre projet ?"
                    >
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full blur-3xl"
                            style={{ background: 'rgba(122,84,255,0.16)' }}
                        />

                        <p className="text-sm font-semibold text-accent">Et si c’était le vôtre ?</p>
                        <h3 className="mt-2 text-lg font-semibold">On transforme votre site en levier de demandes.</h3>
                        <p className="mt-2 text-sm text-text-muted">Dites-moi ce que vous faites — je vous propose 3 axes concrets pour clarifier, rassurer et convertir.</p>

                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-text">
                            Lancer la discussion <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                    </Link>
                </div>
            </Container>
        </Section>
    );
}
