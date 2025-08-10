// components/offers/Included.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import packsRaw from '@/data/packs.json';
import { Check } from 'lucide-react';

type PackSlug = 'essentiel' | 'croissance' | 'signature';

type Pack = {
    slug: PackSlug;
    titre: string;
    sousTitre: string;
    cible?: string;
    inclus: string[];
    prix: string;
    technoChoix?: boolean;
    versions?: {
        wordpress?: { prix?: string; delai?: string };
        react?: { prix?: string; delai?: string };
    };
    options?: { label: string; prix: string | { wordpress?: string; react?: string } }[];
    exclusions?: string[];
    delaiNote?: string;
};

const PACKS = packsRaw as unknown as Pack[];

function getPack(slug: PackSlug): Pack | undefined {
    return PACKS.find((p) => p.slug === slug);
}

export default function IncludedSection({ slug, max = 8 }: { slug?: PackSlug; max?: number }) {
    const pathname = usePathname();
    const match = pathname.match(/^\/offres\/(essentiel|croissance|signature)\/?$/);
    const key = slug ?? (match?.[1] as PackSlug) ?? 'essentiel';

    // Hook en haut (évite l’avertissement “hooks conditionnels”)
    const [expanded, setExpanded] = useState(false);

    const pack = getPack(key);
    if (!pack) return null;

    const items = pack.inclus ?? [];
    const visible = expanded ? items : items.slice(0, max);
    const hasMore = items.length > max;

    return (
        <section id="included" aria-labelledby="included-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-5xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        Inclus
                    </span>
                    <h2 id="included-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Ce que tu reçois
                    </h2>
                </div>

                {/* Liste (design d’origine) */}
                <ul className="grid gap-3 md:gap-4 md:grid-cols-2">
                    {visible.map((txt, i) => (
                        <li key={i} className="flex items-start gap-3 rounded-xl border border-sauge/30 bg-background px-4 py-3 shadow-sm">
                            <Check aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-terracotta" strokeWidth={2.5} />
                            <span className="text-sm md:text-base leading-relaxed text-foreground/90">{txt}</span>
                        </li>
                    ))}
                </ul>

                {/* Toggle “voir tout” si besoin */}
                {hasMore && (
                    <div className="pt-2">
                        <button
                            type="button"
                            onClick={() => setExpanded((v) => !v)}
                            className="rounded-2xl cursor-pointer border border-sauge/40 px-4 py-2 text-xs md:text-sm font-semibold tracking-widest uppercase hover:bg-sauge/10 transition"
                            aria-expanded={expanded}
                            aria-controls="included"
                        >
                            {expanded ? 'Voir moins' : 'Voir tout'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
