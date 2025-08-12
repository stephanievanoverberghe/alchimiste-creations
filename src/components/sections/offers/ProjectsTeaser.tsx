'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Sparkles, Mail } from 'lucide-react'; // ⟵ Mail ajouté ici
import rawProjects from '@/data/projects.json';
import CardProject, { type CardProjectData } from '@/components/cards/CardProject';
import CardContactTeaser from '@/components/cards/CardContactTeaser';

type RawProject = {
    slug?: string;
    id?: string | number;
    titre?: string;
    title?: string;
    sousTitre?: string;
    description?: string;
    image?: string;
    imageSrc?: string;
    cover?: string;
    logo?: string;
    lien?: string;
    link?: string;
    status?: 'coded' | 'wip';
    stack?: 'wordpress' | 'react' | 'mixte' | string;
    kind?: 'vitrine' | 'portfolio' | 'ecommerce' | 'rdv' | string;
    year?: number;
    city?: string;
    external?: boolean;
};

function normalize(p: RawProject, idx: number): CardProjectData {
    const title = p.title ?? p.titre ?? `Projet ${idx + 1}`;
    const description = p.description ?? p.sousTitre ?? '';
    const imageSrc = p.image || p.imageSrc || p.cover || '';
    const logoSrc = p.logo || undefined;

    const link =
        p.link ??
        p.lien ??
        (p.slug
            ? `/projets/${p.slug}`
            : `/projets/${title
                  .toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^a-z0-9-]/g, '')}`);

    const external = typeof p.external === 'boolean' ? p.external : /^https?:\/\//i.test(link);

    return {
        key: (p.slug ?? p.id ?? title).toString(),
        title,
        description,
        imageSrc,
        logoSrc,
        link,
        status: p.status,
        stack: p.stack,
        kind: p.kind,
        external,
    };
}

const ALL: (CardProjectData & { year?: number })[] = ((rawProjects as RawProject[]) ?? []).map((p, i) => Object.assign(normalize(p, i), { year: p.year }));

export default function ProjectsTeaserSection({ limit = 3 }: { limit?: number }) {
    const sorted = [...ALL].sort((a, b) => {
        const ay = typeof a.year === 'number' ? a.year! : -Infinity;
        const by = typeof b.year === 'number' ? b.year! : -Infinity;
        if (by !== ay) return by - ay;
        if ((b.status === 'wip') !== (a.status === 'wip')) {
            return (b.status === 'wip' ? 1 : 0) - (a.status === 'wip' ? 1 : 0);
        }
        return String(a.title).localeCompare(String(b.title));
    });

    const items = sorted.slice(0, limit);
    const missing = Math.max(0, limit - items.length);

    return (
        <section aria-labelledby="projects-teaser-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <Sparkles className="w-3.5 h-3.5" aria-hidden />
                        Projets récents
                    </span>
                    <h2 id="projects-teaser-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Un aperçu de ce qu’on crée ensemble
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Des sites vivants, clairs et sensibles — alignés avec l’univers de chaque client.
                    </p>
                </div>

                {/* Grille projets (+ teaser si pas assez) */}
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {items.map((p) => (
                        <li key={p.key}>
                            <CardProject project={p} />
                        </li>
                    ))}

                    {Array.from({ length: missing }).map((_, i) => (
                        <li key={`contact-teaser-${i}`}>
                            <CardContactTeaser />
                        </li>
                    ))}
                </ul>

                {/* CTA bas de section — styles cohérents CTA */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Link
                        href="/projets"
                        className={cn(
                            'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-center',
                            'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                            'border-b-2 border-r-2 border-ormat transition hover:scale-105',
                            'shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                        )}
                    >
                        <Sparkles className="w-4 h-4" aria-hidden />
                        Voir tous les projets
                    </Link>

                    <Link
                        href="/contact"
                        className={cn(
                            'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-center',
                            'border border-sauge/40 bg-background hover:bg-sauge/10 text-sm font-semibold tracking-widest uppercase transition hover:scale-105'
                        )}
                    >
                        <Mail className="w-4 h-4" aria-hidden />
                        Parler de ton projet
                    </Link>
                </div>
            </div>
        </section>
    );
}
