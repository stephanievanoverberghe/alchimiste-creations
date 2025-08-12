'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { GalleryVerticalEnd, LayoutGrid } from 'lucide-react';
import rawData from '@/data/projects.json';
import CardProject, { type CardProjectData } from '@/components/cards/CardProject';
import CardContactTeaser from '@/components/cards/CardContactTeaser';

type Project = {
    slug?: string;
    id?: string | number;
    title?: string;
    titre?: string;
    name?: string;
    description?: string;
    sousTitre?: string;
    subtitle?: string;
    imageSrc?: string;
    image?: string;
    cover?: string;
    logo?: string;
    link?: string;
    lien?: string;
    status?: 'coded' | 'wip';
    stack?: 'wordpress' | 'react' | 'mixte' | string;
    kind?: 'vitrine' | 'portfolio' | 'ecommerce' | 'rdv' | string;
    year?: number;
    city?: string;
    external?: boolean;
};

function normalizeProject(p: Project, idx: number): CardProjectData {
    const title = p.title ?? p.titre ?? p.name ?? `Projet ${idx + 1}`;
    const description = p.description ?? p.sousTitre ?? p.subtitle ?? '';
    const imageSrc = p.imageSrc || p.image || p.cover || '';
    const logoSrc = p.logo || undefined;
    const link =
        p.link ??
        p.lien ??
        (p.slug
            ? `/projets/${p.slug}`
            : `/projets/${(title || 'projet')
                  .toString()
                  .toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^a-z0-9\-]/g, '')}`);

    const status = p.status ?? (p.slug === 'norel-art' ? 'coded' : p.slug === 'ania-sophro' ? 'wip' : undefined);
    const external = typeof p.external === 'boolean' ? p.external : /^https?:\/\//i.test(link);

    return {
        key: (p.slug ?? p.id ?? title).toString(),
        title,
        description,
        imageSrc,
        logoSrc,
        link,
        status,
        stack: p.stack,
        kind: p.kind,
        external,
    };
}

export default function ProjectsSection({ projects, ctaHref = '/projets' }: { projects?: Project[]; ctaHref?: string }) {
    const source: Project[] = Array.isArray(projects) && projects.length ? projects : (rawData as Project[]);

    const sortedByYearDesc = [...source].sort((a, b) => {
        const ay = typeof a.year === 'number' ? a.year : -Infinity;
        const by = typeof b.year === 'number' ? b.year : -Infinity;
        if (by !== ay) return by - ay;
        if ((b.status === 'wip') !== (a.status === 'wip')) return (b.status === 'wip' ? 1 : 0) - (a.status === 'wip' ? 1 : 0);
        return String(a.titre ?? a.title ?? a.name ?? '').localeCompare(String(b.titre ?? b.title ?? b.name ?? ''));
    });

    const mapped: CardProjectData[] = sortedByYearDesc.map(normalizeProject);
    const projectCards = mapped.slice(0, 2);

    return (
        <section className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            {/* Liseré haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            {/* Fond or mobile only */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            {/* Vague décorative (md+) */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="" fill priority className="h-auto object-cover" />
            </div>

            <div className="relative mx-auto w-full max-w-7xl">
                {/* Header */}
                <div className="group text-center lg:text-left mb-12">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <GalleryVerticalEnd className="w-3.5 h-3.5" aria-hidden />
                        <span>Réalisations</span>
                    </span>

                    <h2 className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Des sites vivants, alignés — au service de l’essentiel
                    </h2>

                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Un aperçu de deux projets récents — clairs, sensibles et performants. Le reste ? À découvrir dans le portfolio.
                    </p>
                </div>

                {/* Grid */}
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
                    {projectCards.map((p) => (
                        <li key={p.key} className="h-full">
                            <CardProject project={p} />
                        </li>
                    ))}
                    {/* Teaser contact */}
                    <li className="h-full">
                        <CardContactTeaser />
                    </li>
                </ul>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <Link
                        href={ctaHref}
                        className={cn(
                            'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl',
                            'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                            'border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                        )}
                    >
                        <LayoutGrid className="w-4 h-4" aria-hidden />
                        Voir tous les projets
                    </Link>
                </div>
            </div>
        </section>
    );
}
