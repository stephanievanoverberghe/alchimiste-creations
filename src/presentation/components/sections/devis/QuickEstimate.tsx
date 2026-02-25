'use client';

import { useMemo, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { cn } from '@/shared/utils/cn';
import { Calculator, ChevronRight, FileText, Code2, Leaf, Droplets, Flame, Plus, BadgeCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
    estimate,
    findOptionObject,
    getPack,
    isIncludedByDefault,
    optionDefinitions,
    optionPrice,
    type FormState,
    type OptionKey,
    type PackSlug,
    type TechKey,
} from '@/application/catalog/services/quickEstimate';

const PACK_ICONS: Record<PackSlug, LucideIcon> = {
    essentiel: Leaf,
    croissance: Droplets,
    signature: Flame,
};

function formatEUR(n: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

declare global {
    interface Window {
        dataLayer?: Array<Record<string, unknown>>;
    }
}
const pushDl = (event: string, detail?: Record<string, unknown>) => window?.dataLayer?.push(detail ? { event, ...detail } : { event });

export default function QuickEstimateSection({ id = 'quick-estimate', className }: { id?: string; className?: string }) {
    const [state, setState] = useState<FormState>({
        pack: 'essentiel', // ⬅️ défaut
        tech: 'wordpress',
        features: { blog: false, formulaire: false, rdv: false, multilingue: false },
    });

    const packData = useMemo(() => getPack(state.pack), [state.pack]);
    const result = useMemo(() => estimate(state), [state]);

    const motifStyle: CSSProperties = {
        backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
        backgroundSize: '16px 16px',
        color: 'var(--color-ormat)',
    };

    const Chip = ({ active, onClick, icon: Icon, children }: { active: boolean; onClick: () => void; icon: LucideIcon; children: string }) => (
        <button
            type="button"
            onClick={() => {
                onClick();
                pushDl('devis_estimate_interact', { field: 'pack' });
            }}
            aria-pressed={active}
            className={cn(
                'inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition',
                'border bg-background',
                active ? 'bg-terracotta text-background border-terracotta/50 hover:bg-terracotta/90' : 'border-sauge/30 text-foreground hover:bg-sauge/10',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            )}
        >
            <Icon className="w-4 h-4" aria-hidden />
            {children}
        </button>
    );

    const SwitchTech = () => (
        <div className="inline-flex rounded-2xl border border-sauge/30 bg-background p-1">
            {(['wordpress', 'react'] as TechKey[]).map((t) => {
                const on = state.tech === t;
                const label = t === 'wordpress' ? 'WordPress' : 'React';
                return (
                    <button
                        key={t}
                        type="button"
                        aria-pressed={on}
                        aria-current={on ? 'true' : undefined}
                        onClick={() => {
                            setState((s) => ({ ...s, tech: t }));
                            pushDl('devis_estimate_interact', { field: 'tech', value: t });
                        }}
                        className={cn(
                            'inline-flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl',
                            'text-xs tracking-[0.14em] uppercase font-semibold transition transform',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40 focus-visible:ring-offset-2',
                            on ? 'bg-sauge text-background shadow-sm' : 'cursor-pointer text-sauge hover:bg-sauge/10 hover:-translate-y-px hover:shadow-sm',
                        )}
                    >
                        {t === 'wordpress' ? <FileText className="w-4 h-4" aria-hidden /> : <Code2 className="w-4 h-4" aria-hidden />}
                        {label}
                    </button>
                );
            })}
        </div>
    );

    const toggleFeature = (k: OptionKey) =>
        setState((s) => {
            const next = { ...s.features, [k]: !s.features[k] };
            pushDl('devis_estimate_interact', { field: 'feature', key: k, value: next[k] });
            return { ...s, features: next };
        });

    const breakdown = useMemo(() => {
        if (!packData || !result.ok) return [];
        const rows: Array<{ label: string; price: number; muted?: boolean }> = [];

        rows.push({
            label: `${packData.titre.replace(/^Pack\s+/i, '')} • ${state.tech === 'wordpress' ? 'WordPress' : 'React'}`,
            price: result.base ?? 0,
        });

        (Object.keys(optionDefinitions) as OptionKey[]).forEach((k) => {
            const optObj = findOptionObject(packData, k);
            if (!optObj) return; // non proposé sur ce pack
            const included = isIncludedByDefault(packData, k);
            const chosen = state.features[k];

            const optLabel = optObj.label ?? optionDefinitions[k].label;

            if (included) {
                rows.push({ label: `${optLabel} (inclus)`, price: 0, muted: true });
            } else if (chosen) {
                rows.push({ label: optLabel, price: optionPrice(packData, k, state.tech) });
            }
        });

        return rows;
    }, [packData, result.ok, result.base, state.tech, state.features]);

    return (
        <section id={id} className={cn('relative py-12 md:py-20 px-6 md:px-8 lg:px-25 xl:px-37.5', className)} aria-labelledby="quick-estimate-title">
            <div className="relative max-w-7xl mx-auto space-y-8">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <Calculator className="w-3.5 h-3.5" aria-hidden />
                        Estimation rapide (optionnelle)
                    </span>
                    <h2 id="quick-estimate-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Un ordre de grandeur en 3 clics
                    </h2>
                    <p className="mt-4 text-foreground/80">
                        Choisis un <strong>niveau</strong>, une <strong>techno</strong> et <strong>0–4 options</strong>. On affiche une fourchette indicative —
                        <em> à affiner selon périmètre</em>.
                    </p>
                </div>

                <form
                    className="grid gap-6 rounded-[22px] border border-sauge/30 bg-background p-5 md:p-6 shadow-sm"
                    onSubmit={(e) => {
                        e.preventDefault();
                        pushDl('devis_estimate_submit', { ...state });
                    }}
                >
                    <fieldset>
                        <legend className="text-sm font-semibold text-foreground/90">Niveau envisagé</legend>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                            {(['essentiel', 'croissance', 'signature'] as PackSlug[]).map((slug) => {
                                const Icon = PACK_ICONS[slug];
                                const label = getPack(slug)?.titre.replace(/^Pack\s+/i, '') ?? slug;
                                return (
                                    <Chip key={slug} active={state.pack === slug} onClick={() => setState((s) => ({ ...s, pack: slug }))} icon={Icon}>
                                        {label}
                                    </Chip>
                                );
                            })}
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-semibold text-foreground/90">Technologie</legend>
                        <div className="mt-3">
                            <SwitchTech />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-semibold text-foreground/90">Options</legend>
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {(Object.keys(optionDefinitions) as OptionKey[]).map((k) => {
                                const optObj = packData ? findOptionObject(packData, k) : undefined;
                                const included = packData ? isIncludedByDefault(packData, k) : false;
                                const available = !!optObj;
                                const disabled = included || !available;
                                const badge = included ? 'Inclus' : !available ? 'Non proposé' : null;

                                return (
                                    <label
                                        key={k}
                                        className={cn(
                                            'inline-flex items-center justify-between gap-3 rounded-xl border px-3 py-2',
                                            'bg-background border-sauge/30',
                                            disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-sauge/10',
                                        )}
                                    >
                                        <span className="inline-flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                className="size-4 accent-sauge"
                                                checked={state.features[k] && !disabled}
                                                onChange={() => {
                                                    if (!disabled) toggleFeature(k);
                                                }}
                                                aria-label={optionDefinitions[k].label}
                                                disabled={disabled}
                                            />
                                            <span className="text-sm">{optionDefinitions[k].label}</span>
                                        </span>

                                        {badge && (
                                            <span
                                                className={cn(
                                                    'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wider',
                                                    'text-foreground bg-background',
                                                    included ? 'border-sauge/50' : 'border-foreground/30',
                                                )}
                                                aria-label={included ? 'Option incluse' : 'Option non proposée'}
                                                title={included ? 'Option incluse' : 'Option non proposée'}
                                            >
                                                <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full', included ? 'bg-sauge' : 'bg-foreground/50')} />
                                                {badge}
                                            </span>
                                        )}
                                    </label>
                                );
                            })}
                        </div>
                        {packData && (
                            <p className="mt-2 text-xs text-foreground/60">
                                Base du calcul : {packData.titre.replace(/^Pack\s+/i, '')} ({state.tech === 'wordpress' ? 'WordPress' : 'React'}).
                            </p>
                        )}
                    </fieldset>
                </form>

                <article className="group relative overflow-hidden rounded-[22px] border border-sauge/30 bg-background p-5 md:p-6 shadow-sm">
                    <div className="pointer-events-none absolute inset-0 opacity-10" style={motifStyle} aria-hidden />

                    <header className="relative z-1 flex flex-wrap items-baseline justify-between gap-3">
                        <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Estimation indicative</h3>
                        {result.ok && (
                            <span className="inline-flex items-center gap-2 rounded-full border border-sauge/30 bg-sauge/10 text-sauge px-3 py-1.5 text-xs">
                                Délai type : {result.delay ?? 'à préciser'}
                            </span>
                        )}
                    </header>
                    <div className="relative z-1 mt-3 h-0.5 overflow-hidden">
                        <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                        <div
                            className="absolute inset-y-0 left-0 w-0 bg-linear-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                            aria-hidden
                        />
                    </div>

                    <div className="relative z-1 mt-3">
                        {result.ok ? (
                            <>
                                <p className="text-xl md:text-2xl font-title text-terracotta">
                                    {formatEUR(result.min)} – {formatEUR(result.max)} <span className="text-sm align-middle text-foreground/70">TTC</span>
                                </p>

                                {/* Breakdown */}
                                {breakdown.length > 0 && (
                                    <ul className="mt-3 grid gap-2">
                                        {breakdown.map((row, i) => (
                                            <li key={i} className="flex items-center justify-between gap-3">
                                                <span className={cn('inline-flex items-center gap-2 text-sm', row.muted && 'text-foreground/60')}>
                                                    {i === 0 ? (
                                                        <BadgeCheck className="w-4 h-4 text-sauge" aria-hidden />
                                                    ) : (
                                                        <Plus className="w-4 h-4 text-foreground/50" aria-hidden />
                                                    )}
                                                    {row.label}
                                                </span>
                                                <span className={cn('text-sm', row.muted ? 'text-foreground/60' : 'text-foreground/90')}>
                                                    {row.price > 0 ? `+ ${formatEUR(row.price)}` : '—'}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        ) : (
                            <p className="text-foreground/70">Complète les 3 champs pour afficher la fourchette indicative.</p>
                        )}

                        <p className="mt-2 text-sm text-foreground/70">
                            La borne basse ne descend pas sous le <strong>“À partir de” réel</strong> (pack + options cochées). La borne haute ajoute ~15 % pour couvrir les écarts
                            de périmètre (contenus, perfs, intégrations). <br></br>
                            <em>E-commerce : sur devis.</em>
                        </p>

                        {/* CTA */}
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                            <Link
                                href={`/devis?pack=${encodeURIComponent(state.pack)}&tech=${state.tech}#brief-express`}
                                className={cn(
                                    'group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl',
                                    'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                                    'border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]',
                                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                                )}
                                onClick={() => pushDl('devis_estimate_go_brief')}
                            >
                                Ouvrir le brief express
                                <ChevronRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" aria-hidden />
                            </Link>

                            <Link
                                href="/offres"
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold tracking-widest uppercase border border-sauge/30 bg-background hover:bg-sauge/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                onClick={() => pushDl('devis_view_packs_click', { origin: 'quick_estimate' })}
                            >
                                Voir les packs
                            </Link>
                        </div>
                    </div>
                </article>

                {/* Note transparence */}
                <p className="text-xs text-foreground/60">
                    Estimation à titre informatif. Le devis final dépendra du périmètre réel (pages, contenus, intégrations, accessibilité/perfs). Aucun cookie tiers requis pour ce
                    calcul.
                </p>
            </div>
        </section>
    );
}
