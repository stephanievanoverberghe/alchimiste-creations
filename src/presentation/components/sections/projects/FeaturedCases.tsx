// components/sections/projects/FeaturedCases.tsx

import Link from 'next/link';
import { Sparkles, BadgeCheck } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { getProjects } from '@/features/catalog/application/use-cases/getProjects';
import CardFeaturedCases, { type RawProject } from '@/presentation/components/cards/projects/CardFeaturedCases';

type Props = {
    max?: number;
    slugs?: string[];
};

export default async function FeaturedCases({ max = 3, slugs }: Props) {
    const rawUnknown: unknown = await getProjects();
    const all: RawProject[] = Array.isArray(rawUnknown) ? (rawUnknown as RawProject[]) : [];

    // Sélection
    const bySlug = (s: string) => all.find((p) => (p.slug ?? '').toString() === s);
    const manual = (slugs ?? []).map(bySlug).filter((p): p is RawProject => Boolean(p));
    const pool = all.filter((p) => !slugs || !slugs.includes(p.slug ?? ''));

    const sorted = pool.slice().sort((a, b) => {
        const af = a.featured ? 1 : 0,
            bf = b.featured ? 1 : 0;
        if (af !== bf) return bf - af;
        const ap = typeof a.priority === 'number' ? a.priority : Number.POSITIVE_INFINITY;
        const bp = typeof b.priority === 'number' ? b.priority : Number.POSITIVE_INFINITY;
        if (ap !== bp) return ap - bp;
        const ay = typeof a.year === 'number' ? a.year : -Infinity;
        const by = typeof b.year === 'number' ? b.year : -Infinity;
        return by - ay;
    });

    const auto = sorted.slice(0, Math.max(0, max - manual.length));
    const items = [...manual, ...auto].slice(0, max);

    if (items.length === 0) return null;

    return (
        <section id="featured-cases" aria-labelledby="featured-cases-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <Sparkles className="w-3.5 h-3.5" aria-hidden />
                        <span>Projets mis en avant</span>
                    </span>

                    <h2 id="featured-cases-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Études de cas courtes — claires et incarnées
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Contexte, intention, résultat. 2–3 projets qui donnent le ton avant d’explorer la grille complète.
                    </p>
                </div>

                {/* Grille de cards */}
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((p, i) => (
                        <li key={p.slug ?? `featured-${i}`}>
                            <CardFeaturedCases project={p} />
                        </li>
                    ))}
                </ul>

                {/* Micro-note + CTA */}
                <div className="flex flex-col md:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-sm text-foreground/70 italic">
                        * Je prends <span className="not-italic font-medium text-terracotta">1 projet par mois</span> pour garder de la profondeur.
                    </p>
                    <Link
                        href="/contact"
                        className={cn(
                            'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl',
                            'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                            'border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]',
                        )}
                    >
                        <BadgeCheck className="w-4 h-4" aria-hidden />
                        Discuter de mon projet
                    </Link>
                </div>
            </div>
        </section>
    );
}
