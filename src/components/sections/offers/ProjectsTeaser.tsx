'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import rawProjects from '@/data/projects.json';
import ProjectCard, { type ProjectUI } from '@/components/sections/home/ProjectCard';

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
    lien?: string;
    link?: string;
    status?: 'coded' | 'wip';
    stack?: 'wordpress' | 'react' | 'mixte';
    kind?: 'vitrine' | 'portfolio' | 'ecommerce';
    year?: number;
    city?: string;
    external?: boolean;
};

function normalize(p: RawProject, idx: number): ProjectUI {
    const title = p.title ?? p.titre ?? `Projet ${idx + 1}`;
    const description = p.description ?? p.sousTitre ?? '';
    const imageSrc = p.image || p.imageSrc || p.cover || '';
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
        link,
        status: p.status,
        stack: p.stack,
        kind: p.kind,
        year: p.year,
        city: p.city,
        external,
    };
}

const PROJECTS: ProjectUI[] = ((rawProjects as RawProject[]) ?? []).map(normalize);

export default function ProjectsTeaserSection({ limit = 3 }: { limit?: number }) {
    // les plus récents d’abord (prend les N derniers puis reverse)
    const items = PROJECTS.slice(-limit).reverse();

    return (
        <section aria-labelledby="projects-teaser-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-5xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
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

                {/* Grille projets */}
                {items.length > 0 ? (
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {items.map((p) => (
                            <li key={p.key}>
                                <ProjectCard project={p} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    // Fallback si pas encore de projets
                    <div className="rounded-3xl border border-sauge/30 p-8 text-center">
                        <p className="text-sm md:text-base text-foreground/80">
                            Les études de cas arrivent bientôt. En attendant, parle-moi de ton projet — on voit ensemble ce qui est juste pour toi.
                        </p>
                        <div className="mt-4 flex justify-center gap-3">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                            >
                                M’écrire
                            </Link>
                            <Link
                                href="/offres"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-sauge/40 text-sm font-semibold tracking-widest uppercase hover:bg-sauge/10"
                            >
                                Voir les packs
                            </Link>
                        </div>
                    </div>
                )}

                {/* CTA bas de section */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                        href="/projets"
                        className={cn(
                            'inline-block px-6 py-3 text-center rounded-2xl bg-ormat hover:bg-ormat/90 text-foreground text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                        )}
                    >
                        Voir tous les projets
                    </Link>
                    <Link
                        href="/contact"
                        className={cn(
                            'inline-block px-6 py-3 text-center rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                        )}
                    >
                        Parler de votre projet
                    </Link>
                </div>
            </div>
        </section>
    );
}
