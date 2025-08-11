'use client';

import { useMemo, useState, useEffect } from 'react';
import rawFaq from '@/data/faq.json';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Search as SearchIcon, X as ClearIcon, Tag as TagIcon } from 'lucide-react';

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

/** Synonymes FR */
const SYNONYMS_GROUPS: Record<string, string[]> = {
    paiement: [
        'payer',
        'paiements',
        'règlement',
        'reglement',
        'acompte',
        'échelonné',
        'echelonne',
        'échelonnable',
        'versement',
        'facture',
        'facturation',
        'régler',
        'regler',
        'tarif',
        'budget',
        'coût',
        'cout',
        'devis',
        'prix',
    ],
    delai: ['délais', 'delais', 'deadline', 'temps', 'planning', 'timeline', 'livraison'],
    hebergement: ['hébergement', 'hebergement', 'hébergeur', 'hebergeur', 'serveur', 'ovh', 'domaine', 'dns'],
    seo: ['référencement', 'referencement', 'google', 'moteur', 'mots cles', 'mots-cles', 'motsclés', 'meta', 'metas', 'open graph', 'sitemap'],
    wordpress: ['wp'],
    react: ['next', 'nextjs', 'next.js', 'sur-mesure', 'sur mesure'],
    maintenance: ['maj', 'mise à jour', 'mise a jour', 'updates', 'sauvegarde', 'backup', 'support'],
    rdv: ['rendez-vous', 'rendez vous', 'appel', 'calendly', 'prise de rdv', 'prise de rendez-vous'],
    contenu: ['textes', 'photos', 'images', 'rédaction', 'redaction', 'copywriting', 'contenus', 'copy'],
    multilingue: ['langues', 'traduction', 'i18n'],
    licences: ['polices', 'fonts', 'icônes', 'icones', 'assets'],
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

/** Levenshtein light */
function editDistance(a: string, b: string) {
    const m = a.length,
        n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
            if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
                dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1);
            }
        }
    }
    return dp[m][n];
}

/** Teste si un token matche (exact/fuzzy/prefix) le haystack d'un item */
function tokenMatches(hayWords: string[], t: string) {
    if (hayWords.includes(t)) return true;

    // fuzzy: distance 1 pour 4–5 lettres, 2 pour >=6 (à ajuster si tu veux)
    const tol = t.length >= 6 ? 2 : t.length >= 4 ? 1 : 0;
    if (tol > 0) {
        for (const w of hayWords) {
            if (editDistance(w, t) <= tol) return true;
        }
    }

    if (t.length >= 3 && hayWords.some((w) => w.startsWith(t))) return true;
    return false;
}

/** Scoring (le bonus featured ne s'applique que sans requête) */
function scoreItem(
    _ignored: unknown, // (supprimé dans l’appel, on garde le slot si tu veux éviter de tout renommer)
    item: FaqItem & { hay: string; hayWords: string[]; tagsCanon: string[] },
    tokens: string[],
    activeTag: string | null
) {
    if (tokens.length === 0 && !activeTag) {
        return (item.featured ? 100 : 0) + (100 - Math.min(item.order ?? 999, 100));
    }

    let score = 0;
    if (activeTag && item.tagsCanon.includes(strip(activeTag))) score += 30;

    for (const t of tokens) {
        if (item.hayWords.includes(t)) {
            score += 12;
            continue;
        }

        const tol = t.length >= 4 ? 1 : 0;
        if (tol > 0 && item.hayWords.some((w) => editDistance(w, t) <= tol)) {
            score += 7;
            continue;
        }

        if (t.length >= 3 && item.hayWords.some((w) => w.startsWith(t))) {
            score += 4;
            continue;
        }
    }

    return score;
}

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
    const [openId, setOpenId] = useState<string | null>(null);

    // Recherche debounced
    const [rawQuery, setRawQuery] = useState('');
    const [query, setQuery] = useState('');
    useEffect(() => {
        const id = setTimeout(() => setQuery(rawQuery), 180);
        return () => clearTimeout(id);
    }, [rawQuery]);

    // Tag actif
    const [activeTag, setActiveTag] = useState<string | null>(null);

    // Tri de base
    const baseSorted = useMemo(
        () => ALL.slice().sort((a, b) => Number(b.featured) - Number(a.featured) || (a.order ?? 999) - (b.order ?? 999) || a.q.localeCompare(b.q, 'fr')),
        []
    );

    // Pré-canonisation
    const itemsCanon = useMemo(
        () =>
            baseSorted.map((f) => {
                const tagsCanon = (f.tags ?? []).map((t) => strip(t));
                const hayQ = canonString(f.q);
                const hayA = canonString(f.a);
                const hayTags = tagsCanon.join(' ');
                const hay = `${hayQ} ${hayA} ${hayTags}`;
                const hayWords = hay.split(/\s+/).filter(Boolean);
                return { ...f, hay, hayWords, tagsCanon };
            }),
        [baseSorted]
    );

    // Tous les tags (full) avec compteur
    const allTags = useMemo(() => {
        if (mode !== 'full') return [] as { tag: string; count: number }[];
        const counts = new Map<string, number>();
        for (const it of baseSorted) {
            for (const t of it.tags ?? []) {
                const key = t.trim();
                if (!key) continue;
                counts.set(key, (counts.get(key) ?? 0) + 1);
            }
        }
        return Array.from(counts.entries())
            .map(([tag, count]) => ({ tag, count }))
            .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'fr'));
    }, [baseSorted, mode]);

    // Filtrage + scoring (NE renvoie rien si aucun token ne matche)
    const filteredScored = useMemo(() => {
        const tokens = canonWords(query);

        const hasRealMatch = (it: (typeof itemsCanon)[number]) => {
            if (tokens.length === 0) return true;
            // chaque token doit matcher sur l’ITEM (pas le dataset)
            return tokens.every((t) => tokenMatches(it.hayWords, t));
        };

        const prefiltered = itemsCanon.filter((it) => (activeTag ? it.tagsCanon.includes(strip(activeTag)) : true));

        const base =
            tokens.length > 0
                ? prefiltered.filter(hasRealMatch) // si rien ne matche, on renvoie vide
                : prefiltered;

        return base
            .map((f) => ({ item: f, score: scoreItem(undefined, f, tokens, activeTag) }))
            .sort((a, b) => b.score - a.score || a.item.q.localeCompare(b.item.q, 'fr'))
            .map((x) => x.item);
    }, [itemsCanon, query, activeTag]);

    // Visible
    const visible = useMemo(() => {
        if (mode === 'full') return filteredScored;
        const onlyFeatured = filteredScored.filter((f) => f.featured);
        return (onlyFeatured.length ? onlyFeatured : filteredScored).slice(0, limit);
    }, [filteredScored, mode, limit]);

    useEffect(() => {
        setOpenId(null);
    }, [query, activeTag, mode]);

    // JSON-LD
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
                            value={rawQuery}
                            onChange={(e) => setRawQuery(e.target.value)}
                            placeholder="Rechercher une question… (paiement, délais, SEO, WordPress…)"
                            className="w-full rounded-2xl border border-sauge/40 bg-background px-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sauge/40"
                            aria-label="Rechercher dans la FAQ"
                            autoComplete="off"
                            spellCheck={false}
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" aria-hidden />
                        {rawQuery && (
                            <button
                                type="button"
                                onClick={() => setRawQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-foreground/5"
                                aria-label="Effacer la recherche"
                            >
                                <ClearIcon className="w-4 h-4 text-foreground/60" />
                            </button>
                        )}
                    </label>

                    {/* Tous les tags avec compteur */}
                    {allTags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setActiveTag(null)}
                                className={cn(
                                    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border',
                                    activeTag === null ? 'bg-sauge/15 border-sauge/40 cursor-default' : 'border-sauge/30 hover:bg-sauge/10 cursor-pointer'
                                )}
                            >
                                <TagIcon className="w-3.5 h-3.5" />
                                Tout
                            </button>
                            {allTags.map(({ tag, count }) => (
                                <button
                                    key={tag}
                                    onClick={() => setActiveTag((cur) => (cur === tag ? null : tag))}
                                    className={cn(
                                        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border',
                                        activeTag === tag ? 'bg-sauge/15 border-sauge/40 cursor-default' : 'border-sauge/30 hover:bg-sauge/10 cursor-pointer'
                                    )}
                                    aria-pressed={activeTag === tag}
                                >
                                    <TagIcon className="w-3.5 h-3.5" />
                                    {tag}
                                    <span className="opacity-70">· {count}</span>
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

                            {/* Séparateur animé */}
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
                        Pas de résultat. Essaie avec un autre terme (ex. “paiement”, “délais”, “SEO”, “WordPress”…).
                    </li>
                )}
            </ul>

            <div className="mt-10 flex flex-col items-center lg:items-start gap-3">
                {mode === 'compact' && (
                    <Link
                        href="/faq"
                        className={cn(
                            'mt-2 w-auto self-center lg:self-start px-6 py-3 rounded-2xl text-center',
                            'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                            'border-b-2 border-r-2 border-ormat transition hover:scale-105',
                            'shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                        )}
                    >
                        Voir toutes les questions
                    </Link>
                )}

                <p className="text-xs text-foreground/70 text-center lg:text-left">
                    Il te manque une info ?{' '}
                    <Link href="/contact" className={cn('underline underline-offset-4 decoration-sauge hover:opacity-80')}>
                        Écris-moi
                    </Link>{' '}
                    et je t’aide avec plaisir.
                </p>
            </div>

            {withJsonLd && jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
        </>
    );
}
