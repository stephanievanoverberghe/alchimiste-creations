'use client';

import { useMemo, useState, useEffect } from 'react';
import rawFaq from '@/data/faq.json';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Search as SearchIcon } from 'lucide-react';

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

/** Synonymes “fr” – complète librement */
const SYNONYMS_GROUPS: Record<string, string[]> = {
    paiement: ['payer', 'paiements', 'règlement', 'reglement', 'acompte', 'échelonné', 'echelonne', 'échelonnable', 'versement', 'facture', 'facturation', 'régler', 'regler'],
    delai: ['délais', 'delais', 'deadline', 'temps', 'planning', 'timeline', 'livraison'],
    hebergement: ['hébergement', 'hebergement', 'hébergeur', 'hebergeur', 'serveur', 'ovh', 'domaine', 'dns'],
    seo: ['référencement', 'referencement', 'google', 'moteur', 'mots cles', 'mots-cles', 'motsclés', 'meta', 'metas', 'open graph', 'sitemap'],
    wordpress: ['wp'],
    react: ['next', 'nextjs', 'next.js', 'sur-mesure', 'sur mesure'],
    prix: ['tarif', 'budget', 'coût', 'cout', 'devis'],
    maintenance: ['maj', 'mise à jour', 'mise a jour', 'updates', 'sauvegarde', 'backup'],
    rdv: ['rendez-vous', 'rendez vous', 'appel', 'calendly', 'prise de rdv', 'prise de rendez-vous'],
    contenu: ['textes', 'photos', 'images', 'rédaction', 'redaction', 'copywriting', 'contenus', 'copy'],
    multilingue: ['langues', 'traduction', 'i18n'],
};

const strip = (s: string) =>
    s
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

const buildSynIndex = () => {
    const index: Record<string, string> = {};
    for (const [canon, variants] of Object.entries(SYNONYMS_GROUPS)) {
        index[strip(canon)] = strip(canon);
        for (const v of variants) index[strip(v)] = strip(canon);
    }
    return index;
};
const SYN_INDEX = buildSynIndex();

const canonWords = (s: string) =>
    strip(s)
        .replace(/[^a-z0-9]+/g, ' ')
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => SYN_INDEX[w] ?? w);

const canonString = (s: string) => canonWords(s).join(' ');

/**
 * - mode 'compact' : 6 items (featured d’abord sinon fallback), lien “Voir toutes…”.
 * - mode 'full'    : tout, recherche + tags.
 * Accordéon forcé partout → 1 seule FAQ ouverte à la fois (openId unique).
 */
export default function FAQBareList({
    mode = 'compact',
    withJsonLd = false,
    limit = 6,
    className = '',
}: {
    mode?: 'compact' | 'full';
    withJsonLd?: boolean;
    limit?: number;
    className?: string;
}) {
    // Accordéon global
    const [openId, setOpenId] = useState<string | null>(null);

    // Recherche + tags (full)
    const [query, setQuery] = useState('');
    const [activeTag, setActiveTag] = useState<string | null>(null);

    // Tri
    const items = useMemo(() => {
        return ALL.slice().sort((a, b) => Number(b.featured) - Number(a.featured) || (a.order ?? 999) - (b.order ?? 999) || a.q.localeCompare(b.q, 'fr'));
    }, []);

    // Prépare un “haystack” canonique par item (robuste aux accents/synonymes)
    const itemsWithCanon = useMemo(
        () =>
            items.map((f) => ({
                ...f,
                hay: canonString(`${f.q} ${f.a} ${(f.tags ?? []).join(' ')}`),
            })),
        [items]
    );

    // Tags (full uniquement)
    const tags = useMemo(() => {
        if (mode !== 'full') return [];
        const set = new Set<string>();
        items.forEach((f) => (f.tags ?? []).forEach((t) => set.add(t)));
        return Array.from(set).sort().slice(0, 8);
    }, [items, mode]);

    // Filtrage (full) avec synonymes
    const filtered = useMemo(() => {
        if (mode !== 'full') return itemsWithCanon;
        const qTokens = canonWords(query);
        return itemsWithCanon.filter((f) => {
            const matchTag = activeTag ? (f.tags ?? []).includes(activeTag) : true;
            if (!matchTag) return false;
            if (qTokens.length === 0) return true;
            return qTokens.every((t) => f.hay.includes(t));
        });
    }, [itemsWithCanon, mode, query, activeTag]);

    // Visible
    const visible = useMemo(() => {
        if (mode === 'full') return filtered;
        const onlyFeatured = filtered.filter((f) => f.featured);
        return (onlyFeatured.length ? onlyFeatured : filtered).slice(0, limit);
    }, [filtered, mode, limit]);

    // Reset l’élément ouvert si recherche/tag change
    useEffect(() => {
        setOpenId(null);
    }, [query, activeTag, mode]);

    // JSON-LD (facultatif)
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
        <>
            {mode === 'full' && (
                <div className="mb-4 md:mb-6 flex flex-col gap-3">
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

            <ul className={`grid grid-cols-1 gap-4 md:gap-5 ${className}`}>
                {visible.map((f) => {
                    const isOpen = openId === f.id;
                    return (
                        <li
                            key={f.id}
                            role="button"
                            tabIndex={0}
                            aria-expanded={isOpen}
                            aria-controls={`faq-panel-${f.id}`}
                            onClick={() => setOpenId((prev) => (prev === f.id ? null : f.id))}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setOpenId((prev) => (prev === f.id ? null : f.id));
                                }
                            }}
                            className="group relative rounded-[20px] border border-sauge/30 bg-background p-5 pb-10 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40 cursor-pointer"
                        >
                            <h3 className="text-[14px] md:text-base font-semibold text-foreground/90">{f.q}</h3>

                            <div
                                id={`faq-panel-${f.id}`}
                                className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] mt-2' : 'grid-rows-[0fr] mt-0'}`}
                            >
                                <div className="overflow-hidden">
                                    <p className="text-sm text-foreground/80 leading-relaxed">{f.a}</p>
                                </div>
                            </div>

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

                {visible.length === 0 && <li className="rounded-[20px] border border-sauge/30 bg-background p-5 text-sm text-foreground/70">Pas de résultat.</li>}
            </ul>

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

            {withJsonLd && jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
        </>
    );
}
