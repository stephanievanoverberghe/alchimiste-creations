// components/offers/Included.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useState, useMemo } from 'react';
import packsRaw from '@/infrastructure/content/packs.json';
import { Check, ListChecks, ChevronDown, ChevronUp } from 'lucide-react';

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

const stripPackWord = (s: string) => s.replace(/^Pack\s+/i, '');

export default function IncludedSection({ slug, max = 8 }: { slug?: PackSlug; max?: number }) {
    const pathname = usePathname();
    const match = pathname.match(/^\/offres\/(essentiel|croissance|signature)\/?$/);
    const key = useMemo<PackSlug>(() => slug ?? (match?.[1] as PackSlug) ?? 'essentiel', [slug, match]);

    const [expanded, setExpanded] = useState(false);

    const pack = getPack(key);
    if (!pack) return null;

    const items = pack.inclus ?? [];
    const visible = expanded ? items : items.slice(0, max);
    const hasMore = items.length > max;

    const packLabel = stripPackWord(pack.titre || key);

    return (
        <section id="included" aria-labelledby="included-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px] overflow-hidden">
            <div className="relative max-w-5xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête cohérente */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <ListChecks className="w-3.5 h-3.5" aria-hidden />
                        Inclus dans le pack&nbsp;{packLabel}
                    </span>
                    <h2 id="included-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Ce que tu reçois
                    </h2>
                </div>

                {/* Liste des inclus — cartes compactes, cohérentes */}
                <ul className="grid gap-3 md:gap-4 md:grid-cols-2">
                    {visible.map((txt, i) => (
                        <li
                            key={i}
                            className="group flex items-start gap-3 rounded-[16px] border border-sauge/30 bg-background px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <span className="grid place-content-center mt-0.5 size-6 rounded-full border border-sauge/40 bg-sauge/10 text-sauge shrink-0">
                                <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2.5} />
                            </span>
                            <span className="text-sm md:text-base leading-relaxed text-foreground/90">{txt}</span>
                        </li>
                    ))}
                </ul>

                {/* Note délai optionnelle */}
                {pack.delaiNote && <p className="text-xs text-foreground/70">* {pack.delaiNote}</p>}

                {/* Toggle “voir tout” — bouton secondaire cohérent */}
                {hasMore && (
                    <div className="pt-2">
                        <button
                            type="button"
                            onClick={() => setExpanded((v) => !v)}
                            className="inline-flex items-center gap-2 rounded-2xl border border-sauge/40 bg-background hover:bg-sauge/10 px-4 py-2 text-xs md:text-sm font-semibold tracking-widest uppercase transition"
                            aria-expanded={expanded}
                            aria-controls="included"
                        >
                            {expanded ? (
                                <>
                                    <ChevronUp className="w-4 h-4" aria-hidden /> Voir moins
                                </>
                            ) : (
                                <>
                                    <ChevronDown className="w-4 h-4" aria-hidden /> Voir tout
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
