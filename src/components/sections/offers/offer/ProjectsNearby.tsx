// components/sections/offers/offer/ProjectsNearby.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import projectsRaw from '@/data/projects.json';
import CardProject from '@/components/cards/CardProject';
import CardContactTeaser from '@/components/cards/CardContactTeaser';

type PackName = 'essentiel' | 'croissance' | 'signature' | 'surmesure';
type PackSlug = 'essentiel' | 'croissance' | 'signature';

type Project = {
    slug: string;
    titre: string;
    sousTitre?: string;
    image?: string;
    logo?: string;
    lien: string;
    status?: 'coded' | 'wip';
    stack?: 'react' | 'wordpress' | string;
    kind?: 'ecommerce' | 'rdv' | 'vitrine' | 'portfolio' | string;
    pack?: PackName;
    year?: number;
    city?: string;
    external?: boolean;
};

const PROJECTS = projectsRaw as unknown as Project[];

export default function ProjectsNearbySection({ limit = 2 }: { limit?: number }) {
    const pathname = usePathname();
    const match = pathname.match(/^\/offres\/(essentiel|croissance|signature)\/?$/);
    const currentPack = (match?.[1] as PackSlug) ?? 'essentiel';

    // 1) Filtrer par pack courant
    const byPack = PROJECTS.filter((p) => p.pack === currentPack);

    // 2) Trier par "derniers en date" => year desc (ceux sans year en dernier), petit tie-breaker
    const sorted = [...byPack].sort((a, b) => {
        const ay = typeof a.year === 'number' ? a.year : -Infinity;
        const by = typeof b.year === 'number' ? b.year : -Infinity;
        if (by !== ay) return by - ay;
        // wip d’abord à égalité d’année
        if ((b.status === 'wip') !== (a.status === 'wip')) {
            return (b.status === 'wip' ? 1 : 0) - (a.status === 'wip' ? 1 : 0);
        }
        // fallback alpha
        return String(a.titre ?? a.slug).localeCompare(String(b.titre ?? b.slug));
    });

    // 3) Prendre jusqu'à `limit`
    const selected = sorted.slice(0, limit);

    // 4) Compléter avec des teasers si pas assez de projets
    const missing = Math.max(0, limit - selected.length);

    return (
        <section id="nearby-projects" aria-labelledby="nearby-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-5xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <Sparkles className="w-3.5 h-3.5" aria-hidden />
                        Projets proches
                    </span>
                    <h2 id="nearby-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Études de cas similaires
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Pour te projeter concrètement : un échantillon de projets proches du pack sélectionné.
                    </p>
                </div>

                {/* Cartes (projets + fallback CardContactTeaser) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {selected.map((p) => (
                        <CardProject
                            key={p.slug}
                            project={{
                                key: p.slug,
                                title: p.titre,
                                description: p.sousTitre,
                                // CardProject utilise le logo avec motif; image ignorée
                                imageSrc: p.image || undefined,
                                logoSrc: p.logo || undefined,
                                link: p.lien,
                                status: p.status,
                                stack: p.stack,
                                kind: p.kind,
                                pack: p.pack,
                                external: p.external,
                            }}
                        />
                    ))}

                    {Array.from({ length: missing }).map((_, i) => (
                        <CardContactTeaser key={`contact-teaser-${i}`} />
                    ))}
                </div>

                {/* Lien global discret */}
                <div className="flex justify-center lg:justify-start">
                    <Link href="/projets" className="text-sm text-foreground/70 underline underline-offset-4 hover:text-foreground">
                        Voir tous les projets
                    </Link>
                </div>
            </div>
        </section>
    );
}
