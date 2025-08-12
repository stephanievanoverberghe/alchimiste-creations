'use client';

import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { BadgeCheck, Clock, FileText, Code2, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import packsRaw from '@/data/packs.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTint, faFire, faLeaf } from '@fortawesome/free-solid-svg-icons';

type Tech = 'wordpress' | 'react';
type PackSlug = 'essentiel' | 'croissance' | 'signature';

type PackVersion = { prix: string; delai: string };
type PackJSON = {
    slug: PackSlug;
    titre: string;
    sousTitre?: string;
    cible: string;
    prix: string;
    inclus: string[];
    technoChoix?: boolean;
    versions: { wordpress: PackVersion; react: PackVersion };
};

const ORDER: PackSlug[] = ['essentiel', 'croissance', 'signature'];
const PACKS = (packsRaw as PackJSON[]).filter((p) => ORDER.includes(p.slug)).sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug));

const ICONS: Record<PackSlug, IconDefinition> = {
    essentiel: faTint,
    croissance: faLeaf,
    signature: faFire,
};

export default function MiniComparatorSection() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const match = pathname.match(/^\/offres\/(essentiel|croissance|signature)\b/);
    const current = (match?.[1] as PackSlug) ?? 'essentiel';

    const techParam = (searchParams.get('tech') ?? '').toLowerCase();
    const activeTech: Tech = techParam === 'react' ? 'react' : 'wordpress';

    useEffect(() => {
        if (!techParam) {
            const params = new URLSearchParams(searchParams);
            params.set('tech', 'wordpress');
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        }
    }, [techParam, searchParams, pathname, router]);

    const setTech = (t: Tech) => {
        const params = new URLSearchParams(searchParams);
        params.set('tech', t);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const techLabel = activeTech === 'wordpress' ? 'WordPress' : 'React/Next.js';

    return (
        <section aria-labelledby="mini-compare-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-7xl mx-auto">
                {/* En-tête */}
                <div className="text-center lg:text-left mb-10">
                    <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <SlidersHorizontal className="w-3.5 h-3.5 inline mr-2" aria-hidden />
                        Comparer les packs
                    </span>
                    <h2 id="mini-compare-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Quel pack te convient le mieux&nbsp;?
                    </h2>
                    <p className="mt-3 text-foreground/80">Un coup d’œil rapide : prix «&nbsp;à partir de&nbsp;», délais ({techLabel}), pour qui, et ce qui est inclus.</p>

                    {/* Switch techno — harmonisé (WP / React) */}
                    <div className="mt-5 flex justify-center lg:justify-start">
                        <div className="w-full grid grid-cols-2 sm:inline-flex rounded-2xl border border-sauge/30 bg-background p-1 sm:w-auto">
                            {(['wordpress', 'react'] as Tech[]).map((t) => {
                                const active = t === activeTech;
                                const label = t === 'wordpress' ? 'WP' : 'React';
                                const aria = t === 'wordpress' ? 'WordPress (éditeur visuel)' : 'React/Next.js (sur-mesure)';
                                return (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setTech(t)}
                                        aria-pressed={active}
                                        aria-current={active ? 'true' : undefined}
                                        aria-label={aria}
                                        title={aria}
                                        className={cn(
                                            'inline-flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl',
                                            'text-xs tracking-[0.14em] uppercase font-semibold transition transform',
                                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40 focus-visible:ring-offset-2',
                                            active ? 'bg-sauge text-background shadow-sm' : 'cursor-pointer text-sauge hover:bg-sauge/10 hover:-translate-y-[1px] hover:shadow-sm'
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

                {/* Cartes comparatives — design aligné aux cards d’offres */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {PACKS.map((p) => {
                        const isCurrent = p.slug === current;
                        const href = `/offres/${p.slug}?tech=${activeTech}`;
                        const { prix: prixMain, delai: delaiMain } = p.versions[activeTech];

                        const cardClasses = cn(
                            'group relative h-full flex flex-col rounded-[22px] border bg-background p-6 md:p-7 shadow-sm transition-all',
                            isCurrent ? 'border-terracotta/50 ring-2 ring-terracotta/30' : 'border-sauge/30 hover:-translate-y-0.5 hover:shadow-md'
                        );

                        const Inner = (
                            <>
                                {/* motif discret */}
                                <div
                                    className="pointer-events-none absolute inset-0 opacity-10"
                                    style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                                    aria-hidden
                                />

                                {/* micro-badge “pack actuel” */}
                                {isCurrent && (
                                    <span className="absolute right-4 top-4 z-[1] inline-flex items-center gap-1.5 rounded-full border border-terracotta/30 bg-terracotta/10 text-terracotta px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider">
                                        Pack actuel
                                    </span>
                                )}

                                {/* Header */}
                                <header className="relative z-[1] text-center mt-6">
                                    <span className="inline-flex items-center gap-2 rounded-xl border border-sauge/30 bg-sauge/10 text-sauge px-3 py-1.5">
                                        <FontAwesomeIcon icon={ICONS[p.slug]} className="text-[14px]" aria-hidden />
                                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">Pack {p.titre.replace(/^Pack\s+/i, '')}</span>
                                    </span>

                                    <h3 className="mt-3 text-terracotta font-title text-xl md:text-2xl font-bold tracking-widest leading-tight">{p.sousTitre ?? p.titre}</h3>

                                    {/* Séparateur animé */}
                                    <div className="mt-4 relative h-[2px] overflow-hidden">
                                        <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                        <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                                    </div>
                                </header>

                                {/* Contenu */}
                                <div className="relative z-[1] mt-4 flex-1 space-y-4">
                                    {/* Prix + Délai + Cible */}
                                    <div className="flex flex-wrap items-center justify-center gap-2">
                                        <span className="inline-flex items-center gap-2 rounded-full border border-terracotta/30 bg-terracotta/10 text-terracotta px-3 py-1.5 text-sm font-semibold">
                                            {prixMain}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-sauge/30 bg-sauge/10 text-sauge px-3 py-1.5 text-xs">
                                            <Clock className="w-3.5 h-3.5" aria-hidden />
                                            Délai&nbsp;: {delaiMain}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 gap-2 border-y border-sauge/20 py-3">
                                        <p className="text-foreground/70 text-center text-sm leading-relaxed">Idéal pour</p>
                                        <p className="text-foreground font-medium text-center">{p.cible}</p>
                                    </div>

                                    {/* Inclus (aperçu) */}
                                    <div>
                                        <div className="text-foreground/70 mb-2 text-sm">Inclus</div>
                                        <ul className="grid gap-2.5 text-left">
                                            {p.inclus.slice(0, 4).map((it, i) => (
                                                <li key={i} className="flex items-start gap-2.5">
                                                    <BadgeCheck className="size-4 shrink-0 text-sauge translate-y-[1px]" strokeWidth={2.25} aria-hidden />
                                                    <span className="text-sm leading-relaxed text-foreground/85">{it}</span>
                                                </li>
                                            ))}
                                            {p.inclus.length > 4 && (
                                                <li className="flex items-start gap-2.5 italic text-foreground/75">
                                                    <BadgeCheck className="size-4 shrink-0 text-sauge opacity-60 translate-y-[1px]" strokeWidth={2.25} aria-hidden />
                                                    <span className="text-sm leading-relaxed">… et d’autres éléments selon le pack</span>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>

                                {/* Footer */}
                                <footer className="relative z-[1] mt-6">
                                    {isCurrent ? (
                                        <div className="text-[11px] text-foreground/60 text-center">(Vous consultez ce pack)</div>
                                    ) : (
                                        <span
                                            className={cn(
                                                'inline-block w-full text-center px-4 py-2 rounded-2xl',
                                                'bg-terracotta group-hover:bg-terracotta/90 text-background text-xs font-semibold tracking-widest uppercase',
                                                'border-b-2 border-r-2 border-ormat transition group-hover:scale-105',
                                                'shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                                            )}
                                        >
                                            Voir ce pack
                                        </span>
                                    )}
                                </footer>
                            </>
                        );

                        return isCurrent ? (
                            <div key={p.slug} className={cardClasses} aria-current="page" role="group">
                                {Inner}
                            </div>
                        ) : (
                            <Link key={p.slug} href={href} aria-label={`Voir le ${p.titre}`} className={cardClasses} role="group">
                                {Inner}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
