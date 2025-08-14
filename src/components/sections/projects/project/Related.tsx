// components/sections/projects/project/Related.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { LayoutGrid } from 'lucide-react';
import projectsData from '@/data/projects.json';
import CardProject, { type CardProjectData } from '@/components/cards/CardProject';
import ContactTeaserCard from '@/components/cards/CardContactTeaser';

type RawProject = {
    id?: number | string;
    slug?: string;
    titre?: string;
    title?: string;
    sousTitre?: string;
    logo?: string;
    media?: { cover?: string };
    lien?: string;
    urls?: { caseStudy?: string };
    status?: 'coded' | 'wip' | string;
    stack?: string;
    kind?: string;
    pack?: string;
    external?: boolean;
    featured?: boolean;
    priority?: number;
    year?: number;
    sector?: string;
    visibility?: string;
};

type RelatedProps = {
    currentSlug: string;
    sector?: string;
    kind?: string;
};

const mapToCard = (p: RawProject): CardProjectData => {
    const title = (p.titre || p.title || p.slug || 'Projet').trim();
    const link = (p.lien && p.lien.trim()) || (p.urls?.caseStudy && p.urls.caseStudy.trim()) || (p.slug ? `/projets/${p.slug}` : undefined);

    return {
        key: String(p.slug ?? p.id ?? title),
        title,
        description: p.sousTitre,
        imageSrc: p.media?.cover || undefined,
        logoSrc: p.logo || undefined,
        link,
        status: (p.status as CardProjectData['status']) || undefined,
        stack: p.stack,
        kind: p.kind,
        pack: (p.pack as CardProjectData['pack']) || undefined,
        external: p.external,
    };
};

const sortProjects = (arr: RawProject[]) =>
    arr.slice().sort((a, b) => {
        // 1) featured d'abord
        if ((b.featured ? 1 : 0) !== (a.featured ? 1 : 0)) return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        // 2) priority croissante (1,2,3…)
        const pa = typeof a.priority === 'number' ? a.priority : Number.POSITIVE_INFINITY;
        const pb = typeof b.priority === 'number' ? b.priority : Number.POSITIVE_INFINITY;
        if (pa !== pb) return pa - pb;
        // 3) year décroissant (plus récent d'abord)
        const ya = typeof a.year === 'number' ? a.year : -1;
        const yb = typeof b.year === 'number' ? b.year : -1;
        if (yb !== ya) return yb - ya;
        // 4) titre alpha
        const ta = (a.titre || a.title || a.slug || '').toLowerCase();
        const tb = (b.titre || b.title || b.slug || '').toLowerCase();
        return ta.localeCompare(tb);
    });

export default function RelatedSection({ currentSlug, sector, kind }: RelatedProps) {
    const RAW: RawProject[] = Array.isArray(projectsData) ? (projectsData as RawProject[]) : [];

    // Base des projets affichables (autres que le courant)
    const base = RAW.filter((p) => (p.visibility ?? 'public') === 'public' && typeof p.slug === 'string' && p.slug !== currentSlug);
    if (base.length === 0) return null;

    const sRef = (sector ?? '').toLowerCase();
    const kRef = (kind ?? '').toLowerCase();

    // 1) même type (kind)
    const sameKind = base.filter((p) => (p.kind ?? '').toLowerCase() === kRef);

    // 2) même secteur, sans doublons
    const sameSector = base.filter((p) => (p.sector ?? '').toLowerCase() === sRef && !sameKind.some((x) => x.slug === p.slug));

    // 3) le reste
    const others = base.filter((p) => !sameKind.some((x) => x.slug === p.slug) && !sameSector.some((x) => x.slug === p.slug));

    const ordered: RawProject[] = [...sortProjects(sameKind), ...sortProjects(sameSector), ...sortProjects(others)];
    const selected = ordered.slice(0, 3);
    const cards: CardProjectData[] = selected.map(mapToCard);
    const fill = Math.max(0, 3 - cards.length);

    return (
        <section id="projets-lies" aria-labelledby="projets-lies-title" className="relative py-16 md:py-24 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="" fill priority className="h-auto object-cover" />
            </div>
            <div className="relative max-w-7xl mx-auto space-y-8">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <LayoutGrid className="w-3.5 h-3.5" aria-hidden />
                        Projets liés
                    </span>
                    <h2 id="projets-lies-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        À explorer aussi
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Même type en priorité, puis projets proches. Et s’il en manque, on t’invite à discuter du tien.
                    </p>
                </div>

                {/* Grille 3 colonnes max */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {cards.map((c) => (
                        <li key={c.key}>
                            <CardProject project={c} />
                        </li>
                    ))}

                    {/* Teasers contact pour compléter à 3 */}
                    {Array.from({ length: fill }).map((_, i) => (
                        <li key={`contact-teaser-${i}`}>
                            <ContactTeaserCard />
                        </li>
                    ))}
                </ul>

                {/* Lien vers tout le portfolio */}
                <div className="pt-2 text-center">
                    <Link
                        href="/projets"
                        className={cn(
                            'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl',
                            'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                            'border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                        )}
                        aria-label="Voir tous les projets"
                    >
                        <LayoutGrid className="w-4 h-4" aria-hidden />
                        Tous les projets
                    </Link>
                </div>
            </div>
        </section>
    );
}
