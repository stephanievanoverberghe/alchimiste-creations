'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GalleryVerticalEnd, LayoutGrid } from 'lucide-react';
import projectsData from '@/data/projects.json';
import CardProject, { type CardProjectData } from '@/components/cards/CardProject';
import ContactTeaserCard from '@/components/cards/CardContactTeaser';

type PackSlug = 'essentiel' | 'croissance' | 'signature';

// JSON brut (souple)
type RawProject = {
    slug?: string;
    titre?: string;
    title?: string;
    sousTitre?: string;
    description?: string;
    image?: string;
    logo?: string;
    lien?: string;
    urls?: { caseStudy?: string };
    status?: string;
    stack?: 'react' | 'wordpress' | string;
    kind?: 'ecommerce' | 'rdv' | 'vitrine' | 'portfolio' | string;
    pack?: 'essentiel' | 'croissance' | 'signature' | 'surmesure' | string;
    year?: number;
    location?: { city?: string };
    external?: boolean;
    media?: { cover?: string };
};

const slugify = (s: string) =>
    s
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

function toCard(p: RawProject): CardProjectData {
    const title = p.titre ?? p.title ?? 'Projet';
    const rawLink = p.lien ?? p.urls?.caseStudy ?? (p.slug ? `/projets/${p.slug}` : `/projets/${slugify(title)}`);
    const external = typeof p.external === 'boolean' ? p.external : /^https?:\/\//i.test(String(rawLink));
    const statusNorm = (p.status ?? '').toLowerCase();
    const status: CardProjectData['status'] | undefined = statusNorm === 'wip' ? 'wip' : statusNorm === 'coded' ? 'coded' : undefined;

    return {
        key: String(p.slug ?? title),
        title,
        description: p.sousTitre ?? p.description,
        imageSrc: p.image ?? p.media?.cover ?? undefined,
        logoSrc: p.logo ?? undefined,
        link: String(rawLink),
        status,
        stack: p.stack,
        kind: p.kind,
        pack: p.pack,
        external,
    };
}

export default function ProjectsNearbySection({ limit = 3 }: { limit?: number }) {
    const pathname = usePathname();
    const match = pathname.match(/^\/offres\/(essentiel|croissance|signature)\/?$/);
    const currentPack = (match?.[1] as PackSlug) ?? 'essentiel';

    // 0) sécuriser la lecture du JSON
    const RAW: RawProject[] = Array.isArray(projectsData) ? (projectsData as RawProject[]) : [];

    // 1) Filtrer par pack courant
    const byPack = RAW.filter((p) => p.pack === currentPack);

    // 2) Trier par année desc, puis wip en premier, puis alpha
    const sorted = byPack.slice().sort((a, b) => {
        const ay = typeof a.year === 'number' ? a.year : -Infinity;
        const by = typeof b.year === 'number' ? b.year : -Infinity;
        if (by !== ay) return by - ay;

        const aw = (a.status ?? '').toLowerCase() === 'wip' ? 1 : 0;
        const bw = (b.status ?? '').toLowerCase() === 'wip' ? 1 : 0;
        if (bw !== aw) return bw - aw;

        return String(a.titre ?? a.slug ?? '').localeCompare(String(b.titre ?? b.slug ?? ''));
    });

    // 3) Mapper → CardProjectData et limiter
    const selected: CardProjectData[] = sorted.slice(0, limit).map(toCard);

    // 4) Slots manquants (si pas assez de projets)
    const missing = Math.max(0, limit - selected.length);

    return (
        <section id="nearby-projects" aria-labelledby="nearby-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <GalleryVerticalEnd className="w-3.5 h-3.5" aria-hidden />
                        Projets proches
                    </span>
                    <h2 id="nearby-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Études de cas similaires
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Pour te projeter concrètement : un échantillon de projets proches du pack sélectionné.
                    </p>
                </div>

                {/* Cartes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {selected.map((project) => (
                        <CardProject key={project.key} project={project} />
                    ))}

                    {/* Fallbacks éventuels (si tu as un composant teaser) */}
                    {Array.from({ length: missing }).map((_, i) => (
                        <ContactTeaserCard key={`contact-teaser-${i}`} />
                    ))}
                </div>

                {/* Bouton cohérent */}
                <div className="flex justify-center lg:justify-start">
                    <Link
                        href="/projets"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl
           bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold
           tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105
           shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                    >
                        <LayoutGrid className="w-4 h-4" aria-hidden />
                        Voir tous les projets
                    </Link>
                </div>
            </div>
        </section>
    );
}
