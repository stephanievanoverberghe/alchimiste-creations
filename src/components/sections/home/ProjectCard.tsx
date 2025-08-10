'use client';

import Link from 'next/link';
import Image from 'next/image';

export type ProjectUI = {
    key: string;
    title: string;
    description: string;
    imageSrc: string;
    link: string;
    status?: 'coded' | 'wip';
    stack?: 'wordpress' | 'react' | 'mixte';
    kind?: 'vitrine' | 'portfolio' | 'ecommerce';
    year?: number;
    city?: string;
    external?: boolean;
};

const statusLabel = (s?: 'coded' | 'wip') => (s === 'coded' ? 'Site codé' : s === 'wip' ? 'En construction' : undefined);

export default function ProjectCard({ project }: { project: ProjectUI }) {
    const label = statusLabel(project.status);

    const altLabel = project.status === 'wip' ? `${project.title} — maquette en construction` : `${project.title} — aperçu du site`;

    const chip =
        'inline-flex items-center text-xs rounded-md border text-terracotta border-terracotta/30 bg-terracotta/10 px-2 py-1 text-[11px] tracking-[0.12em] uppercase text-foreground/70';

    return (
        <Link
            href={project.link}
            aria-label={`Voir le projet : ${project.title}`}
            prefetch={project.external ? false : undefined}
            target={project.external ? '_blank' : undefined}
            rel={project.external ? 'noopener noreferrer' : undefined}
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-sauge/30 bg-background shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-md pb-8"
        >
            {/* Media */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-t-3xl">
                <Image
                    src={(project.imageSrc && project.imageSrc.trim()) || '/projects/overlay-projet.png'}
                    alt={altLabel}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                    priority
                />

                {project.status === 'wip' && <div className="absolute inset-0 bg-foreground/60" aria-hidden />}

                {label && (
                    <span
                        className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] shadow-sm border ${
                            project.status === 'wip' ? 'border-ormat bg-ormat/50 text-background' : 'border-sauge bg-sauge/50 text-background'
                        }`}
                    >
                        {label}
                    </span>
                )}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background via-background/0 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-background" aria-hidden />
            </div>

            {/* Contenu */}
            <div className="px-4 pt-4">
                <h3 className="text-sm md:text-base font-semibold text-foreground/90">{project.title}</h3>
                {project.description && <p className="mt-1 text-xs md:text-sm text-foreground/70 line-clamp-2">{project.description}</p>}

                {(project.stack || project.kind || project.year || project.city) && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {project.stack && <span className={chip}>{project.stack}</span>}
                        {project.kind && <span className={chip}>{project.kind}</span>}
                    </div>
                )}
            </div>

            {/* Barre animée alignée en bas */}
            <div className="pointer-events-none absolute left-4 right-4 bottom-4 h-[2px] overflow-hidden">
                <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                <div
                    className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                    aria-hidden
                />
            </div>
        </Link>
    );
}
