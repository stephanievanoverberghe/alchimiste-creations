'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, Check, Clock, FileText, Code2 } from 'lucide-react';
import packsData from '@/data/packs.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faTint, faFire } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type TechKey = 'wordpress' | 'react';

type RawPack = {
    slug: string;
    titre: string;
    sousTitre?: string;
    cible?: string;
    inclus?: string[];
    prix?: string;
    technoChoix?: boolean;
    versions?: Partial<Record<TechKey, { prix?: string; delai?: string }>>;
};

type Props = {
    id?: string;
    className?: string;
    ctaHref?: string; // ex: "/offres"
    ctaLabel?: string; // ex: "Voir les packs"
};

// Icônes FontAwesome par slug
const iconBySlug: Record<string, IconDefinition> = {
    essentiel: faLeaf,
    croissance: faTint,
    signature: faFire,
};

function getPackIcon(slug: string): IconDefinition {
    return iconBySlug[slug] ?? faLeaf;
}

export default function ContactOffers({ id = 'contact-offres', className, ctaHref = '/offres', ctaLabel = 'Voir les packs' }: Props) {
    const packs = useMemo<RawPack[]>(() => (Array.isArray(packsData) ? (packsData as RawPack[]).filter((p) => typeof p?.slug === 'string') : []), []);

    const [active, setActive] = useState<string | null>(packs[0]?.slug ?? null);
    // ⬇️ Switch techno géré par pack (comme avant)
    const [techBySlug, setTechBySlug] = useState<Record<string, TechKey>>(() => Object.fromEntries(packs.map((p) => [p.slug, 'wordpress'])));

    const activePack = packs.find((p) => p.slug === active) || null;
    const selectedTech: TechKey | undefined = activePack?.technoChoix ? techBySlug[activePack.slug] : undefined;

    const displayPrice = activePack && activePack.technoChoix && selectedTech ? activePack.versions?.[selectedTech]?.prix || activePack.prix : activePack?.prix;

    const displayDelay = activePack && activePack.technoChoix && selectedTech ? activePack.versions?.[selectedTech]?.delai : undefined;

    const scope = (activePack?.inclus ?? []).slice(0, 6);

    const ctaTo = activePack ? `${ctaHref}?pack=${encodeURIComponent(activePack.slug)}${selectedTech ? `&tech=${encodeURIComponent(selectedTech)}` : ''}` : ctaHref;

    return (
        <section id={id} className={cn('relative py-16 md:py-24 px-6 md:px-8 lg:px-[100px] xl:px-[150px]', className)} aria-labelledby="contact-offres-title">
            <div className="relative max-w-5xl mx-auto space-y-8">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        Packs & périmètre
                    </span>
                    <h2 id="contact-offres-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Aligner les attentes sans quitter la page
                    </h2>
                    <p className="mt-4 text-foreground/80">Choisis un niveau pour situer le périmètre. On ajuste ensemble pendant l’appel.</p>
                </div>

                {/* Chips niveaux (avec FA icons) */}
                <div className="flex flex-wrap items-center gap-2">
                    {packs.map((p) => {
                        const isActive = active === p.slug;
                        return (
                            <button
                                key={p.slug}
                                type="button"
                                onClick={() => setActive((prev) => (prev === p.slug ? null : p.slug))}
                                aria-pressed={isActive}
                                className={cn(
                                    'group inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition',
                                    'border bg-background',
                                    isActive ? 'bg-terracotta text-background border-terracotta/50 hover:bg-terracotta/90' : 'border-sauge/30 text-foreground hover:bg-sauge/10',
                                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                                )}
                            >
                                <span
                                    className={cn(
                                        'grid place-content-center size-6 rounded-full border',
                                        isActive ? 'border-background/40 bg-background/20 text-background' : 'border-sauge/40 bg-sauge/10 text-sauge'
                                    )}
                                    aria-hidden
                                >
                                    <FontAwesomeIcon icon={getPackIcon(p.slug)} className="w-3.5 h-3.5" />
                                </span>
                                {p.titre.replace(/^Pack\s+/i, '')}
                                {isActive && <Check className="w-4 h-4" aria-hidden />}
                            </button>
                        );
                    })}
                </div>

                {/* Cartouche périmètre */}
                <div className="min-h-[120px]">
                    {activePack ? (
                        <article className="group relative overflow-hidden rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                            {/* motif discret */}
                            <div
                                className="pointer-events-none absolute inset-0 opacity-10"
                                style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                                aria-hidden
                            />

                            {/* Header */}
                            <header className="relative z-[1] flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                        <FontAwesomeIcon icon={getPackIcon(activePack.slug)} className="w-4 h-4" aria-hidden />
                                    </span>
                                    <div>
                                        <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">{activePack.titre}</h3>
                                        {(activePack.sousTitre || activePack.cible) && (
                                            <p className="text-xs text-foreground/70">
                                                {activePack.sousTitre}
                                                {activePack.cible ? (activePack.sousTitre ? ' • ' : '') + activePack.cible : ''}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {displayPrice && (
                                        <span className="inline-flex items-center rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 text-[11px]">
                                            {displayPrice}
                                        </span>
                                    )}
                                    {displayDelay && (
                                        <span className="inline-flex items-center gap-1 rounded-full border border-sauge/30 bg-sauge/10 text-sauge px-2.5 py-1 text-[11px]">
                                            <Clock className="w-3.5 h-3.5" aria-hidden />
                                            {displayDelay}
                                        </span>
                                    )}
                                </div>
                            </header>

                            {/* Séparateur animé */}
                            <div className="relative z-[1] mt-3 h-[2px] overflow-hidden">
                                <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                <div
                                    className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                    aria-hidden
                                />
                            </div>

                            {/* ⬇️ Switch techno — même endroit (dans la carte), design demandé */}
                            {activePack.technoChoix && (
                                <div className="relative z-[1] mt-4">
                                    <div className="flex justify-start">
                                        <div className="w-full grid grid-cols-2 sm:inline-flex rounded-2xl border border-sauge/30 bg-background p-1 sm:w-auto">
                                            {(['wordpress', 'react'] as TechKey[]).map((t) => {
                                                const isOn = selectedTech === t;
                                                const label = t === 'wordpress' ? 'WP' : 'React';
                                                const aria = t === 'wordpress' ? 'WordPress (éditeur visuel)' : 'React/Next.js (sur-mesure)';
                                                return (
                                                    <button
                                                        key={t}
                                                        type="button"
                                                        onClick={() => setTechBySlug((s) => ({ ...s, [activePack.slug]: t }))}
                                                        aria-pressed={isOn}
                                                        aria-current={isOn ? 'true' : undefined}
                                                        aria-label={aria}
                                                        title={aria}
                                                        className={cn(
                                                            'inline-flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl',
                                                            'text-xs tracking-[0.14em] uppercase font-semibold transition transform',
                                                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40 focus-visible:ring-offset-2',
                                                            isOn
                                                                ? 'bg-sauge text-background shadow-sm'
                                                                : 'cursor-pointer text-sauge hover:bg-sauge/10 hover:-translate-y-[1px] hover:shadow-sm'
                                                        )}
                                                    >
                                                        {t === 'wordpress' ? <FileText className="w-4 h-4" aria-hidden /> : <Code2 className="w-4 h-4" aria-hidden />}
                                                        {label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Inclus (extrait) */}
                            {scope.length > 0 && (
                                <ul className="relative z-[1] mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {scope.map((s) => (
                                        <li key={s} className="inline-flex items-start gap-2 text-sm text-foreground/85">
                                            <span className="mt-1 size-4 grid place-content-center rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                                <Check className="w-3 h-3" aria-hidden />
                                            </span>
                                            <span>{s}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* CTA */}
                            <div className="relative z-[1] mt-4">
                                <a
                                    href={ctaTo}
                                    className={cn(
                                        'group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl',
                                        'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                                        'border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]',
                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                                    )}
                                >
                                    {ctaLabel}
                                    <ChevronRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" aria-hidden />
                                </a>
                            </div>
                        </article>
                    ) : (
                        <div className="flex flex-wrap items-center gap-3">
                            <a
                                href={ctaHref}
                                className={cn(
                                    'group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl',
                                    'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                                    'border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]',
                                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                                )}
                            >
                                {ctaLabel}
                                <ChevronRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" aria-hidden />
                            </a>
                            <span className="text-xs text-foreground/60">Sélectionne un pack pour voir un périmètre type.</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
