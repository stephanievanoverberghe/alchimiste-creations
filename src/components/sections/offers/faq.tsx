'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { HelpCircle, Search as SearchIcon } from 'lucide-react';
import rawFaq from '@/data/faq.json';

type Tech = 'wordpress' | 'react';
type FaqItem = {
    id: string;
    q: string;
    a: string;
    tags?: string[];
    tech?: 'any' | 'wordpress' | 'react';
    featured?: boolean;
    order?: number;
};

const ALL: FaqItem[] = (rawFaq as FaqItem[]).map((f) => ({
    tech: 'any',
    featured: false,
    order: 999,
    ...f,
}));

export default function FAQSections({
    tech,
    mode = 'compact', // 'compact' sur Offres, 'full' sur /faq
    withJsonLd = false, // true uniquement sur /faq
    accordion, // override optionnel
}: {
    tech: Tech;
    mode?: 'compact' | 'full';
    withJsonLd?: boolean;
    accordion?: boolean;
}) {
    const [query, setQuery] = useState('');
    const [activeTag, setActiveTag] = useState<string | null>(null);

    // état pour "une seule ouverte à la fois"
    const [openId, setOpenId] = useState<string | null>(null);
    // état pour "plusieurs ouvertes"
    const [openIds, setOpenIds] = useState<Set<string>>(new Set());

    // par défaut: compact => accordion, full => multi
    const useAccordion = accordion ?? mode === 'compact';

    const toggleOne = (id: string) => setOpenId((prev) => (prev === id ? null : id));
    const toggleInSet = (set0: Set<string>, id: string) => {
        const s = new Set(set0);
        if (s.has(id)) s.delete(id);
        else s.add(id);
        return s;
    };

    const toggleMany = (id: string) => setOpenIds((prev) => toggleInSet(prev, id));

    // Tri & filtre par techno
    const items = useMemo(() => {
        const techFiltered = ALL.filter((f) => f.tech === 'any' || f.tech === tech);
        return techFiltered.slice().sort((a, b) => Number(b.featured) - Number(a.featured) || (a.order ?? 999) - (b.order ?? 999) || a.q.localeCompare(b.q, 'fr'));
    }, [tech]);

    // Filtres recherche + tag (uniquement en full)
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return items.filter((f) => {
            const matchTag = mode === 'full' && activeTag ? (f.tags ?? []).includes(activeTag) : true;
            const matchQuery = mode === 'full' && q ? f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q) : true;
            return matchTag && matchQuery;
        });
    }, [items, query, activeTag, mode]);

    // Visible : compact = featured (fallback sinon) limité à 6
    const visible = useMemo(() => {
        if (mode === 'full') return filtered;
        const onlyFeatured = filtered.filter((f) => f.featured);
        return (onlyFeatured.length ? onlyFeatured : filtered).slice(0, 6);
    }, [filtered, mode]);

    // Tags (limités) uniquement en full
    const tags = useMemo(() => {
        if (mode !== 'full') return [];
        const set = new Set<string>();
        items.forEach((f) => (f.tags ?? []).forEach((t) => set.add(t)));
        return Array.from(set).sort().slice(0, 8);
    }, [items, mode]);

    // JSON-LD optionnel
    const jsonLd = useMemo(() => {
        if (!withJsonLd) return null;
        const mainEntity = visible.slice(0, 10).map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
        }));
        return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity };
    }, [visible, withJsonLd]);

    return (
        <section aria-labelledby="faq-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />

            <div className="relative max-w-5xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <HelpCircle className="w-3.5 h-3.5" aria-hidden />
                        FAQ offres
                    </span>
                    <h2 id="faq-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Questions fréquentes
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        On clarifie l’essentiel : techno, délais, paiement, contenus et SEO — sans jargon.
                    </p>
                </div>

                {/* Recherche + tags (full uniquement) */}
                {mode === 'full' && (
                    <div className="flex flex-col gap-3">
                        <label className="relative block">
                            <span className="sr-only">Rechercher dans la FAQ</span>
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Rechercher une question…"
                                className="w-full rounded-2xl border border-sauge/40 bg-background px-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sauge/40"
                            />
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" aria-hidden />
                        </label>

                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setActiveTag(null)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                                        activeTag === null ? 'bg-sauge/15 border-sauge/40' : 'border-sauge/30 hover:bg-sauge/10'
                                    }`}
                                >
                                    Tout
                                </button>
                                {tags.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setActiveTag((cur) => (cur === t ? null : t))}
                                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                                            activeTag === t ? 'bg-sauge/15 border-sauge/40' : 'border-sauge/30 hover:bg-sauge/10'
                                        }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Liste Q/R */}
                <ul className="grid grid-cols-1 gap-4 md:gap-5">
                    {visible.map((f) => {
                        const isOpen = useAccordion ? openId === f.id : openIds.has(f.id);
                        return (
                            <li
                                key={f.id}
                                role="button"
                                tabIndex={0}
                                aria-expanded={isOpen}
                                aria-controls={`faq-panel-${f.id}`}
                                onClick={() => {
                                    if (useAccordion) {
                                        toggleOne(f.id);
                                    } else {
                                        toggleMany(f.id);
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        if (useAccordion) {
                                            toggleOne(f.id);
                                        } else {
                                            toggleMany(f.id);
                                        }
                                    }
                                }}
                                className="group relative rounded-[20px] border border-sauge/30 bg-background p-5 pb-10 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40 cursor-pointer"
                            >
                                <h3 className="text-[14px] md:text-base font-semibold text-foreground/90">{f.q}</h3>

                                {/* Panneau animé */}
                                <div
                                    id={`faq-panel-${f.id}`}
                                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] mt-2' : 'grid-rows-[0fr] mt-0'}`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="text-sm text-foreground/80 leading-relaxed">{f.a}</p>
                                    </div>
                                </div>

                                {/* Ligne animée en bas */}
                                <div className="absolute left-5 right-5 bottom-5 h-[2px] overflow-hidden">
                                    <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                    <div
                                        className={`absolute inset-y-0 left-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out ${
                                            isOpen ? 'w-1/2' : 'w-0'
                                        } group-hover:w-full`}
                                        aria-hidden
                                    />
                                </div>
                            </li>
                        );
                    })}

                    {visible.length === 0 && (
                        <li className="rounded-[20px] border border-sauge/30 bg-background p-5 text-sm text-foreground/70">
                            Pas de résultat pour ta recherche. Essaie un autre mot-clé.
                        </li>
                    )}
                </ul>

                {/* Lien “voir tout” en compact */}
                {mode === 'compact' && (
                    <Link
                        href="/faq"
                        className={cn(
                            'inline-block mt-2 px-6 py-3 rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                        )}
                    >
                        <div className="text-center">Voir toutes les questions</div>
                    </Link>
                )}

                <p className="text-xs text-foreground/70">
                    Il te manque une info ?{' '}
                    <Link href="/contact" className={cn('underline underline-offset-4 decoration-sauge hover:opacity-80')}>
                        Écris-moi
                    </Link>{' '}
                    et je t’aide avec plaisir.
                </p>
            </div>

            {withJsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /> : null}
        </section>
    );
}
