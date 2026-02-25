// components/method/MethodCaseStudiesSection.tsx
'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

import rawData from '@/infrastructure/content/projects.json';
import CardProject, { type CardProjectData } from '@/presentation/components/cards/CardProject';
import CardContactTeaser from '@/presentation/components/cards/CardContactTeaser';

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

export default function MethodCaseStudiesSection({ projects, ctaHref = '/projets' }: { projects?: Project[]; ctaHref?: string }) {
    const source: Project[] = Array.isArray(projects) && projects.length ? projects : (rawData as Project[]);
    const sortedByYearDesc = [...source].sort((a, b) => {
        const ay = typeof a.year === 'number' ? a.year : -Infinity;
        const by = typeof b.year === 'number' ? b.year : -Infinity;
        if (by !== ay) return by - ay;
        if ((b.status === 'wip') !== (a.status === 'wip')) return (b.status === 'wip' ? 1 : 0) - (a.status === 'wip' ? 1 : 0);
        return String(a.titre ?? a.title ?? a.name ?? '').localeCompare(String(b.titre ?? b.title ?? b.name ?? ''));
    });

    const projectCards = sortedByYearDesc.map(normalizeProject).slice(0, 2);

    return (
        <section id="etudes-de-cas" aria-labelledby="cases-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <Sparkles className="w-3.5 h-3.5" aria-hidden />
                        <span>Études de cas</span>
                    </span>
                    <h2 id="cases-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        La preuve par l’exemple — projets proches de votre besoin
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Deux projets courts&nbsp;: résultat concret, délais réels, impact mesurable.
                    </p>
                </div>

                {/* Grille : 2 projets + teaser contact (stretch en md) */}
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
                    {projectCards.map((p) => (
                        <li key={p.key} className="h-full">
                            <CardProject project={p} />
                        </li>
                    ))}

                    <li className="h-full md:col-span-2 md:hidden lg:block  lg:col-span-1">
                        <div className="h-full">
                            <CardContactTeaser />
                        </div>
                    </li>
                </ul>

                {/* Lien vers /projets (pour le “Voir plus de projets”) */}
                <div className="mt-6 md:mt-8 text-center">
                    <Link
                        href={ctaHref}
                        className="inline-block px-6 py-3 rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase
                       border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                    >
                        Voir tous les projets
                    </Link>
                </div>
            </div>
        </section>
    );
}
