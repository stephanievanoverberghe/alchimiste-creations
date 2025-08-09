import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export type ProjectUI = {
    key: string;
    title: string;
    description: string;
    imageSrc: string;
    link: string;
    status?: 'coded' | 'wip';
};

type ProjectCardProps = { project: ProjectUI };

const statusLabel = (s?: 'coded' | 'wip') => (s === 'coded' ? 'Site codé' : s === 'wip' ? 'En construction' : undefined);

export default function ProjectCard({ project }: ProjectCardProps) {
    const label = statusLabel(project.status);

    return (
        <Link
            href={project.link}
            className="group h-full flex flex-col overflow-hidden rounded-3xl border border-sauge/30 bg-background shadow-sm transition hover:-translate-y-2 hover:shadow-md"
        >
            <div className="relative aspect-[4/3]">
                <Image
                    src={(project.imageSrc && project.imageSrc.trim()) || '/projects/overlay-projet.png'}
                    alt={project.status === 'wip' ? `${project.title} — En construction` : project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {project.status === 'wip' && <div className="absolute inset-0 bg-foreground/60" aria-hidden />}
                {label && (
                    <span className="absolute left-3 top-3 rounded-md border border-sauge/30 bg-background/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-sauge shadow-sm">
                        {label}
                    </span>
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
            </div>

            {/* Contenu */}
            <div className="p-4 flex-1">
                <h3 className="font-title text-[18px] text-brun">{project.title}</h3>
                <p className="mt-1 text-sm text-foreground/70 line-clamp-2">{project.description}</p>
            </div>

            {/* Footer fixe en bas */}
            <div className="p-4 pt-0 mt-auto">
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-sauge font-semibold bg-background border border-sauge/30 rounded-md px-3 py-1 transition-colors group-hover:bg-sauge/10">
                    Voir le projet
                    <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
                </span>
            </div>
        </Link>
    );
}
