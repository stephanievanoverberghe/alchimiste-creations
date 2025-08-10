'use client';

import { useMemo } from 'react';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faTint, faFire, faCheck, faMinus, faTag } from '@fortawesome/free-solid-svg-icons';

type Tech = 'wordpress' | 'react';

type PackVersion = { prix: string; delai: string };
type PackOption = { label: string; prix: string | { wordpress?: string; react?: string } };
type Pack = {
    slug: string;
    titre: string;
    sousTitre: string;
    cible?: string;
    inclus: string[];
    prix: string;
    technoChoix?: boolean;
    versions?: Record<string, PackVersion | undefined>;
    options?: PackOption[];
    delaiNote?: string;
};

const iconBySlug: Record<string, IconDefinition> = {
    essentiel: faLeaf,
    croissance: faTint,
    signature: faFire,
};

// -------- helpers ------------------------------------------------

const has = (arr: string[], re: RegExp) => arr?.some((s) => re.test(s));

// détecte indispo dans un prix string
const UNAVAILABLE_RE = /^\s*(?:—|-{1,2}|n\/?a|non)\s*$/i;

function getPages(pack: Pack) {
    const str = pack.inclus.join(' • ');
    const m = str.match(/(One-page.*?|[0-9]+\s*à\s*[0-9]+\s*pages|[0-9]+\s*pages)/i);
    if (m) return m[1].replace(/One-page.*?/i, '1 page');
    if (pack.slug === 'essentiel') return '1 page';
    if (pack.slug === 'croissance') return '4–6 pages';
    if (pack.slug === 'signature') return '6–9 pages';
    return '—';
}

// Déclare le type AVANT tout usage
type Cell = { kind: 'inc'; text?: string } | { kind: 'opt'; text: string } | { kind: 'na' };

// Renvoie directement une Cell pour une option (centralise les règles)
function optionCell(pack: Pack, key: RegExp, tech: Tech): Cell {
    const opt = pack.options?.find((o) => key.test(o.label));
    if (!opt) return { kind: 'na' };

    if (typeof opt.prix === 'string') {
        // string générique : si c’est explicitement WP/WooCommerce et qu’on affiche React → NA
        if (/woocommerce|wp|wordpress/i.test(opt.label) && tech === 'react') return { kind: 'na' };
        return UNAVAILABLE_RE.test(opt.prix) ? { kind: 'na' } : { kind: 'opt', text: opt.prix };
    }

    const p = opt.prix?.[tech];
    if (!p || UNAVAILABLE_RE.test(p)) return { kind: 'na' };
    return { kind: 'opt', text: p };
}

// -------- feature matrix (synced to packs.json) ------------------

function featureMatrix(tech: Tech) {
    const features: Array<{ key: string; label: string; value: (p: Pack) => Cell }> = [
        { key: 'pages', label: 'Pages incluses', value: (p) => ({ kind: 'inc', text: getPages(p) }) },

        // Identité & éditorial
        {
            key: 'identite',
            label: 'Identité visuelle',
            value: (p) => {
                if (has(p.inclus, /Identité web mini/i)) return { kind: 'inc', text: 'Mini palette + duo typo' };
                if (has(p.inclus, /Moodboard \+ bases UI/i)) return { kind: 'inc', text: 'Moodboard + bases UI' };
                if (has(p.inclus, /Charte graphique web courte/i)) return { kind: 'inc', text: 'Charte web (4–6p) + UI kit' };
                return { kind: 'na' };
            },
        },
        { key: 'logoEss', label: 'Logo essentiel', value: (p) => (has(p.inclus, /Logo essentiel/i) ? { kind: 'inc', text: 'Wordmark/monogramme' } : { kind: 'na' }) },
        { key: 'tone', label: 'Ton éditorial', value: (p) => (has(p.inclus, /Ton éditorial/i) ? { kind: 'inc' } : { kind: 'na' }) },

        // Contenus & blog
        {
            key: 'blog',
            label: 'Blog',
            value: (p) => {
                const included = has(p.inclus, /\bBlog inclus\b/i) || has(p.inclus, /gabarit d’article/i);
                return included ? { kind: 'inc' } : optionCell(p, /blog/i, tech);
            },
        },

        // UI/animations
        {
            key: 'anim',
            label: 'Animations',
            value: (p) =>
                has(p.inclus, /micro-animations soignées/i)
                    ? { kind: 'inc', text: 'Micro-animations' }
                    : has(p.inclus, /Animations légères/i)
                    ? { kind: 'inc', text: 'Légères' }
                    : { kind: 'na' },
        },

        // SEO & a11y
        { key: 'seoBase', label: 'SEO de base', value: (p) => (has(p.inclus, /SEO de base/i) ? { kind: 'inc' } : { kind: 'na' }) },
        { key: 'seoOpti', label: 'SEO optimisé', value: (p) => (has(p.inclus, /SEO optimisé/i) ? { kind: 'inc' } : { kind: 'na' }) },
        { key: 'a11y', label: 'Accessibilité', value: (p) => (has(p.inclus, /Accessibilité/i) ? { kind: 'inc' } : { kind: 'na' }) },

        // Perfs & technique
        {
            key: 'perf',
            label: 'Optimisations performance',
            value: (p) => (has(p.inclus, /Optimisations perfs/i) ? { kind: 'inc', text: 'Images, fonts, Lighthouse' } : { kind: 'na' }),
        },
        {
            key: 'migration',
            label: 'Migration / mise en forme contenu',
            value: (p) => (has(p.inclus, /Migration.*(pages|contenu)/i) ? { kind: 'inc', text: 'Jusqu’à 6 pages' } : { kind: 'na' }),
        },

        // Prise en main
        {
            key: 'handoff',
            label: 'Prise en main',
            value: (p) => {
                if (has(p.inclus, /mini-guide/i)) return { kind: 'inc', text: 'Mini-guide' };
                if (has(p.inclus, /Guide d’utilisation/i)) return { kind: 'inc', text: 'Guide d’utilisation' };
                if (has(p.inclus, /Formation 1h/i)) return { kind: 'inc', text: 'Formation 1h + livret' };
                return { kind: 'na' };
            },
        },

        // Support & maintenance
        {
            key: 'support',
            label: 'Support post-livraison',
            value: (p) => {
                const m = p.inclus.find((s) => /Support\s*\d+\s*jours/i.test(s))?.match(/(\d+)\s*jours/i);
                return m ? { kind: 'inc', text: `${m[1]} jours` } : { kind: 'na' };
            },
        },
        { key: 'maint', label: 'Maintenance 1 mois', value: (p) => (has(p.inclus, /Maintenance 1 mois incluse/i) ? { kind: 'inc' } : { kind: 'na' }) },

        // Options (tech-aware)
        { key: 'formAdv', label: 'Formulaire avancé', value: (p) => (has(p.inclus, /Formulaire.*avanc/i) ? { kind: 'inc' } : optionCell(p, /Formulaire.*avanc/i, tech)) },
        { key: 'booking', label: 'Réservation en ligne', value: (p) => optionCell(p, /Réservation/i, tech) },
        { key: 'i18n', label: 'Multilingue', value: (p) => optionCell(p, /Multilingue/i, tech) },
        { key: 'seoPlus', label: 'SEO avancé + stratégie', value: (p) => optionCell(p, /SEO avancé/i, tech) },
        { key: 'extraPage', label: 'Page supplémentaire', value: (p) => optionCell(p, /Page supplémentaire/i, tech) },
        { key: 'logoAdv', label: 'Logo avancé', value: (p) => optionCell(p, /Logo avancé/i, tech) },
        { key: 'brandKit', label: 'Brand kit étendu', value: (p) => optionCell(p, /Brand kit étendu/i, tech) },
        { key: 'copyLong', label: 'Copywriting long', value: (p) => optionCell(p, /Copywriting long/i, tech) },

        // E-commerce
        {
            key: 'ecom',
            label: 'E-commerce',
            value: (p) => {
                if (has(p.inclus, /e-?commerce/i)) return { kind: 'inc' };
                // capte e-commerce/woocommerce ; cas React + libellé Woo/WP => NA même si prix string
                return optionCell(p, /e-?commerce|woocommerce/i, tech);
            },
        },
    ];

    return features;
}

// -------- UI atoms ----------------------------------------------

function CellBadge({ cell }: { cell: Cell }) {
    const base = 'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] uppercase tracking-wider font-semibold';

    if (cell.kind === 'inc') {
        return (
            <span className={`${base} border border-sauge/30 bg-sauge/10 text-sauge`}>
                <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
                {cell.text ?? 'Inclus'}
            </span>
        );
    }
    if (cell.kind === 'opt') {
        return (
            <span className={`${base} border border-terracotta/30 bg-terracotta/10 text-terracotta`}>
                <FontAwesomeIcon icon={faTag} className="w-3 h-3" />
                Option {cell.text}
            </span>
        );
    }
    return (
        <span className={`${base} border border-foreground/15 bg-foreground/5 text-foreground/60`}>
            <FontAwesomeIcon icon={faMinus} className="w-3 h-3" />—
        </span>
    );
}

// -------- main component ----------------------------------------

export default function PacksComparisonSection({ packs, tech, onTechChange }: { packs: Pack[] | null; tech: Tech; onTechChange: (t: Tech) => void }) {
    const ordered = useMemo(
        () => (packs ?? []).slice().sort((a, b) => ['essentiel', 'croissance', 'signature'].indexOf(a.slug) - ['essentiel', 'croissance', 'signature'].indexOf(b.slug)),
        [packs]
    );

    const feats = useMemo(() => (packs ? featureMatrix(tech) : []), [packs, tech]);

    if (!packs) {
        return (
            <div className="rounded-3xl border border-sauge/30 bg-ivory/60 p-6 animate-pulse">
                <div className="h-5 w-40 bg-sauge/20 rounded mb-4" />
                <div className="h-4 w-full bg-sauge/15 rounded mb-2" />
                <div className="h-4 w-5/6 bg-sauge/15 rounded mb-2" />
                <div className="h-4 w-2/3 bg-sauge/15 rounded" />
            </div>
        );
    }

    return (
        <section aria-labelledby="packs-compare-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        Comparateur
                    </span>
                    <h2 id="packs-compare-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Comparer les packs
                    </h2>

                    {/* Switch techno (local) */}
                    <div className="mt-4 flex justify-center lg:justify-start">
                        <div role="tablist" aria-label="Technologie" className="inline-flex items-center rounded-full border border-sauge/40 bg-background p-1 shadow-sm">
                            <button
                                role="tab"
                                aria-selected={tech === 'wordpress'}
                                onClick={() => onTechChange('wordpress')}
                                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition cursor-pointer ${
                                    tech === 'wordpress' ? 'bg-sauge/15 text-foreground' : 'text-foreground/70 hover:text-foreground'
                                }`}
                            >
                                WordPress
                            </button>
                            <button
                                role="tab"
                                aria-selected={tech === 'react'}
                                onClick={() => onTechChange('react')}
                                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition cursor-pointer ${
                                    tech === 'react' ? 'bg-sauge/15 text-foreground' : 'text-foreground/70 hover:text-foreground'
                                }`}
                            >
                                React / Next.js
                            </button>
                        </div>
                    </div>

                    <p className="mt-3 text-sm md:text-base text-foreground/80 leading-relaxed max-w-3xl">
                        Les options (Blog, Multilingue, Réservation, E-commerce…) s’adaptent selon la techno.
                    </p>
                </div>

                {/* Table (md+) */}
                <div className="hidden md:block rounded-3xl border border-sauge/30 bg-background overflow-hidden shadow-sm">
                    <table className="w-full text-sm border-collapse">
                        <thead className="bg-ivory/70">
                            <tr className="text-left [&>th:not(:first-child)]:border-l [&>th:not(:first-child)]:border-sauge/20">
                                <th className="px-5 py-4 text-foreground/70 font-semibold">Fonctionnalités</th>
                                {ordered.map((p, i) => (
                                    <th key={p.slug} className={['px-5 py-4 align-bottom', i === 0 ? 'rounded-tr-none' : ''].join(' ')}>
                                        <div className="flex items-center gap-2">
                                            <span className="inline-grid place-content-center size-8 rounded-full border border-sauge/30 bg-sauge/10 text-sauge">
                                                <FontAwesomeIcon icon={iconBySlug[p.slug] || faLeaf} className="w-4 h-4" />
                                            </span>
                                            <span className="font-bold tracking-wider text-terracotta">{p.titre.replace(/^Pack\s+/i, '')}</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {feats.map((f, i) => (
                                <tr
                                    key={f.key}
                                    className={[
                                        i % 2 ? 'bg-gray-400/5' : 'bg-transparent',
                                        'hover:bg-gray-900/5 transition-colors',
                                        '[&>td:not(:first-child)]:border-l [&>td:not(:first-child)]:border-sauge/20',
                                    ].join(' ')}
                                >
                                    <td className="px-5 py-4 font-medium text-foreground/85">{f.label}</td>
                                    {ordered.map((p) => {
                                        const cell = f.value(p);
                                        return (
                                            <td key={p.slug + f.key} className="px-5 py-4">
                                                <CellBadge cell={cell} />
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="px-5 py-3 text-xs text-foreground/70 border-t border-sauge/30">
                        Les prix indiqués dans les options sont « à partir de » et dépendent de la portée exacte.
                    </div>
                </div>

                {/* Mobile : cartes empilées */}
                <div className="md:hidden grid grid-cols-1 gap-4">
                    {ordered.map((p) => (
                        <div key={p.slug} className="rounded-3xl border border-sauge/30 bg-background p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="inline-grid place-content-center size-8 rounded-full border border-sauge/30 bg-sauge/10 text-sauge">
                                    <FontAwesomeIcon icon={iconBySlug[p.slug] || faLeaf} className="w-4 h-4" />
                                </span>
                                <h4 className="font-bold tracking-wider text-terracotta">{p.titre.replace(/^Pack\s+/i, '')}</h4>
                            </div>
                            <ul className="space-y-3">
                                {feats.map((f) => {
                                    const cell = f.value(p);
                                    return (
                                        <li key={p.slug + f.key} className="flex items-center justify-between gap-3">
                                            <span className="text-foreground/85">{f.label}</span>
                                            <CellBadge cell={cell} />
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                    <p className="text-xs text-foreground/70">Bascule WordPress / React avec le switch ci-dessus.</p>
                </div>
            </div>
        </section>
    );
}
