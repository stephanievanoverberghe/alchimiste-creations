// src/components/sections/devis/PacksReminder.tsx
'use client';

import { useMemo, useState, type CSSProperties, type MouseEvent, type KeyboardEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/shared/utils/cn';
import { ChevronRight, Check, Clock, FileText, Code2, Boxes } from 'lucide-react';
import packsData from '@/infrastructure/content/packs.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faTint, faFire } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type TechKey = 'wordpress' | 'react';
type PackSlug = 'essentiel' | 'croissance' | 'signature';

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
    /** Lien de l’en-tête (ex: "/offres") */
    ctaHref?: string;
    ctaLabel?: string;
    /** Label du bouton primaire (pré-sélection) */
    presetLabel?: string;
    /** Active le switch WP/React dans la carte (par défaut false) */
    enableSwitch?: boolean;
    /** Sélections initiales injectées par la page serveur */
    initialPack?: PackSlug;
    initialTech?: TechKey;
};

const iconBySlug: Record<PackSlug, IconDefinition> = {
    essentiel: faLeaf,
    croissance: faTint,
    signature: faFire,
};

function getPackIcon(slug: string): IconDefinition {
    return iconBySlug[slug as PackSlug] ?? faLeaf;
}

function cleanPrice(p?: string) {
    return p ? p.replace(/^À partir de\s*/i, 'Dès ') : undefined;
}

function delayRange(versions?: Partial<Record<TechKey, { delai?: string }>>) {
    if (!versions) return undefined;
    const vals = Object.values(versions) as Array<{ delai?: string } | undefined>;
    const nums: number[] = [];
    for (const v of vals) {
        const s = v?.delai ?? '';
        for (const m of s.matchAll(/(\d+)\s*(?:à|-|–|—)?\s*(\d+)?/g)) {
            const a = Number(m[1]);
            const b = Number(m[2] ?? m[1]);
            if (!Number.isNaN(a)) nums.push(a);
            if (!Number.isNaN(b)) nums.push(b);
        }
    }
    if (!nums.length) return undefined;
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    return min === max ? `${min} sem.` : `${min}–${max} sem.`;
}

function scopeLabel(p: RawPack): string | undefined {
    const first = p.inclus?.[0] || '';
    if (/one[- ]?page/i.test(first)) return 'One-page / mini-site';
    const m = (p.inclus ?? []).join(' • ').match(/(\d+)\s*à\s*(\d+)\s*pages/i);
    if (m) return `${m[1]}–${m[2]} pages`;
    return p.cible || p.sousTitre;
}

export default function PacksReminder({
    id = 'packs-reminder',
    className,
    ctaHref = '/offres',
    ctaLabel = 'Voir les packs',
    presetLabel = 'Pré-sélectionner dans le brief',
    enableSwitch = false,
    initialPack,
    initialTech,
}: Props) {
    const router = useRouter();

    const packs = useMemo<RawPack[]>(() => (Array.isArray(packsData) ? (packsData as RawPack[]).filter((p) => ['essentiel', 'croissance', 'signature'].includes(p.slug)) : []), []);

    const [active, setActive] = useState<string | null>(initialPack ?? packs[0]?.slug ?? null);

    // Tech par pack : par défaut WP, ou `initialTech` si fourni
    const [techBySlug, setTechBySlug] = useState<Record<string, TechKey>>(() => Object.fromEntries(packs.map((p) => [p.slug, initialTech ?? 'wordpress'])));

    const activePack = packs.find((p) => p.slug === active) || null;
    const selectedTech: TechKey = activePack?.technoChoix ? techBySlug[activePack.slug] : 'wordpress';

    // Prix/délai
    const displayPrice = (() => {
        if (!activePack) return undefined;
        if (activePack.technoChoix) {
            const techForDisplay: TechKey = enableSwitch ? selectedTech : (initialTech ?? 'wordpress');
            return cleanPrice(activePack.versions?.[techForDisplay]?.prix || activePack.prix);
        }
        return cleanPrice(activePack.prix);
    })();
    const displayDelay = activePack ? delayRange(activePack.versions) : undefined;

    const toDetail = activePack ? `/offres/${activePack.slug}` : ctaHref;
    const toPreset = activePack ? `/devis?pack=${encodeURIComponent(activePack.slug)}${selectedTech ? `&tech=${selectedTech}` : ''}#brief-express` : '/devis#brief-express';

    // motif discret
    const motifStyle: CSSProperties = {
        backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
        backgroundSize: '16px 16px',
        color: 'var(--color-ormat)',
    };

    // Clic card → pré-sélection
    const stop = (e: MouseEvent<HTMLElement>) => e.stopPropagation();
    const goCard = () => {
        if (activePack) router.push(toPreset);
    };
    const keyCard = (e: KeyboardEvent<HTMLElement>) => {
        if ((e.key === 'Enter' || e.key === ' ') && activePack) {
            e.preventDefault();
            router.push(toPreset);
        }
    };

    return (
        <section id={id} className={cn('relative py-16 md:py-24 px-6 md:px-8 lg:px-[100px] xl:px-[150px]', className)} aria-labelledby="packs-reminder-title">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background pointer-events-none" aria-hidden />
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0 pointer-events-none" aria-hidden />

            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0 pointer-events-none" aria-hidden>
                <Image src="/deco/about-wave.png" alt="" role="presentation" fill priority className="object-cover" sizes="100vw" />
            </div>
            <div className="relative max-w-7xl mx-auto space-y-8">
                {/* En-tête + lien Voir les packs */}
                <div className="flex items-center justify-between gap-4 text-center lg:text-left">
                    <div>
                        <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                            <Boxes className="w-3.5 h-3.5" aria-hidden />
                            Packs & périmètre
                        </span>
                        <h2 id="packs-reminder-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                            Cadrer budget & périmètre en 10&nbsp;secondes
                        </h2>
                        <p className="mt-4 text-foreground/80">
                            Choisis un pack pour visualiser la <strong>portée</strong> et un <strong>délai type</strong>, puis <strong>pré-sélectionne-le dans le brief</strong> —
                            sans engagement.
                        </p>
                    </div>
                    <Link
                        href={ctaHref}
                        className="hidden sm:inline-flex items-center gap-2 rounded-2xl border border-sauge/30 bg-background px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] hover:bg-sauge/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40"
                    >
                        {ctaLabel}
                        <ChevronRight className="w-4 h-4" aria-hidden />
                    </Link>
                </div>

                {/* Chips niveaux */}
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
                                    'group inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition cursor-pointer',
                                    'border bg-background',
                                    isActive ? 'bg-terracotta text-background border-terracotta/50 hover:bg-terracotta/90' : 'border-sauge/30 text-foreground hover:bg-sauge/10',
                                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                                )}
                            >
                                <span
                                    className={cn(
                                        'grid place-content-center size-6 rounded-full border',
                                        isActive ? 'border-background/40 bg-background/20 text-background' : 'border-sauge/40 bg-sauge/10 text-sauge',
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

                {/* Cartouche périmètre (card cliquable → pré-sélection) */}
                <div className="min-h-[120px]">
                    {activePack ? (
                        <article
                            role="link"
                            tabIndex={0}
                            onClick={goCard}
                            onKeyDown={keyCard}
                            aria-label={`Pré-sélectionner le pack ${activePack.titre} dans le brief`}
                            className="group relative overflow-hidden rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40"
                        >
                            {/* motif discret */}
                            <div className="pointer-events-none absolute inset-0 opacity-10" style={motifStyle} aria-hidden />

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
                            <div className="relative z-[1] mt-3 h-[2px] overflow-hidden">
                                <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                <div
                                    className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                    aria-hidden
                                />
                            </div>

                            {/* Bullets */}
                            <ul className="relative z-[1] mt-4 space-y-1.5 text-sm text-foreground/85">
                                {scopeLabel(activePack) && (
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 size-2 rounded-full bg-sauge/40" aria-hidden />
                                        <span>Portée : {scopeLabel(activePack)}</span>
                                    </li>
                                )}
                                {delayRange(activePack.versions) && (
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 size-2 rounded-full bg-terracotta/40" aria-hidden />
                                        <span>Délai type : {delayRange(activePack.versions)}</span>
                                    </li>
                                )}
                            </ul>

                            {/* Switch techno (optionnel) */}
                            {enableSwitch && activePack.technoChoix && (
                                <div className="relative z-[1] mt-4" onClick={stop}>
                                    <div className="flex justify-start">
                                        <div className="w-full grid grid-cols-2 sm:inline-flex rounded-2xl border border-sauge/30 bg-background p-1 sm:w-auto">
                                            {(['wordpress', 'react'] as TechKey[]).map((t) => {
                                                const on = selectedTech === t;
                                                const label = t === 'wordpress' ? 'WP' : 'React';
                                                const aria = t === 'wordpress' ? 'WordPress (éditeur visuel)' : 'React/Next.js (sur-mesure)';
                                                return (
                                                    <button
                                                        key={t}
                                                        type="button"
                                                        onClick={() => setTechBySlug((s) => ({ ...s, [activePack.slug]: t }))}
                                                        aria-pressed={on}
                                                        aria-current={on ? 'true' : undefined}
                                                        aria-label={aria}
                                                        title={aria}
                                                        className={cn(
                                                            'inline-flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl',
                                                            'text-xs tracking-[0.14em] uppercase font-semibold transition transform',
                                                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40 focus-visible:ring-offset-2',
                                                            on
                                                                ? 'bg-sauge text-background shadow-sm'
                                                                : 'cursor-pointer text-sauge hover:bg-sauge/10 hover:-translate-y-[1px] hover:shadow-sm',
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

                            {/* CTA – primaire = Pré-sélectionner, secondaire = Voir le pack */}
                            <div className="relative z-[1] mt-4 flex flex-wrap items-center gap-3" onClick={stop}>
                                <Link
                                    href={toPreset}
                                    className={cn(
                                        'group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl',
                                        'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                                        'border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]',
                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                                    )}
                                >
                                    {presetLabel}
                                    <ChevronRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" aria-hidden />
                                </Link>

                                <Link
                                    href={toDetail}
                                    className={cn(
                                        'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold tracking-widest uppercase',
                                        'border border-sauge/30 bg-background text-foreground hover:bg-sauge/10',
                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                                    )}
                                >
                                    Voir le pack
                                </Link>
                            </div>
                        </article>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
