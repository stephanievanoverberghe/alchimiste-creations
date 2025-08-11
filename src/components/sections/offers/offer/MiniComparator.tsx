'use client';

import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Check } from 'lucide-react';
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
    // 👉 WP par défaut
    const activeTech: Tech = techParam === 'react' ? 'react' : 'wordpress';

    // 👉 si pas de ?tech=, on l’ajoute (sans scroll)
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
                <div className="text-center lg:text-left mb-10">
                    <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        Comparer les packs
                    </span>
                    <h2 id="mini-compare-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Quel pack te convient le mieux&nbsp;?
                    </h2>
                    <p className="mt-3 text-foreground/80">Un coup d’œil rapide : prix “à partir de”, délais ({techLabel}), pour qui, et ce qui est inclus.</p>

                    {/* Switch techno */}
                    <div className="mt-5 flex justify-center lg:justify-start">
                        <div role="tablist" aria-label="Technologie" className="inline-flex items-center rounded-full border border-sauge/40 bg-background p-1 shadow-sm">
                            <button
                                role="tab"
                                aria-selected={activeTech === 'wordpress'}
                                onClick={() => setTech('wordpress')}
                                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition cursor-pointer ${
                                    activeTech === 'wordpress' ? 'bg-sauge/15 text-foreground' : 'text-foreground/70 hover:text-foreground'
                                }`}
                            >
                                WordPress
                            </button>
                            <button
                                role="tab"
                                aria-selected={activeTech === 'react'}
                                onClick={() => setTech('react')}
                                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition cursor-pointer ${
                                    activeTech === 'react' ? 'bg-sauge/15 text-foreground' : 'text-foreground/70 hover:text-foreground'
                                }`}
                            >
                                React / Next.js
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {PACKS.map((p) => {
                        const isCurrent = p.slug === current;
                        const href = `/offres/${p.slug}?tech=${activeTech}`;
                        // 👉 on lit toujours la version de la techno active
                        const prixMain = p.versions[activeTech].prix;
                        const delaiMain = p.versions[activeTech].delai;

                        const cardClasses = cn(
                            'group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-background shadow-sm transition-all',
                            !isCurrent && 'hover:-translate-y-1 hover:shadow-md',
                            isCurrent ? 'border-terracotta/50 ring-2 ring-terracotta/30' : 'border-sauge/30'
                        );

                        const IconSeparator = ({ isCurrent }: { isCurrent: boolean }) => (
                            <div className="flex items-center justify-center gap-3 w-full max-w-xs mx-auto mt-4 mb-1 group">
                                <span className={cn('h-[1px] flex-1 bg-sauge', !isCurrent && 'transition-colors duration-300 group-hover:bg-ormat')} />
                                <FontAwesomeIcon
                                    icon={ICONS[p.slug]}
                                    className={cn('text-sauge text-xl shrink-0 transition-all duration-300', !isCurrent && 'group-hover:scale-150 group-hover:text-ormat')}
                                    aria-hidden
                                />
                                <span className={cn('h-[1px] flex-1 bg-sauge', !isCurrent && 'transition-colors duration-300 group-hover:bg-ormat')} />
                            </div>
                        );

                        const Inner = (
                            <>
                                {isCurrent && (
                                    <div className="absolute top-0 left-0 right-0 z-[1] flex justify-center">
                                        <div className="mt-2 rounded-full border border-terracotta/40 bg-terracotta/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-terracotta">
                                            Pack actuel
                                        </div>
                                    </div>
                                )}

                                <div className="px-5 pt-10 text-center">
                                    <h3 className="text-lg font-semibold tracking-wide text-foreground">{p.titre}</h3>
                                    <p className="mt-1 text-sm text-foreground/80">{prixMain}</p>
                                    <IconSeparator isCurrent={isCurrent} />
                                </div>

                                <div className="p-5 space-y-4 text-sm">
                                    <div className="grid grid-cols-[auto,1fr] items-center gap-x-4">
                                        <p className="text-foreground/70 text-center">Délais</p>
                                        <p className="text-foreground font-medium text-center">{delaiMain}</p>
                                    </div>

                                    <div className="grid grid-cols-[auto,1fr] items-start gap-x-4 border-b border-b-sauge/30">
                                        <p className="text-foreground/70 text-center ">Idéal pour</p>
                                        <p className="text-foreground font-medium text-center mb-5">{p.cible}</p>
                                    </div>

                                    <div>
                                        <div className="text-foreground/70 mb-2">Inclus</div>
                                        <div>
                                            <ul className="space-y-2">
                                                {p.inclus.slice(0, 4).map((it, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <Check className="w-4 h-4 mt-0.5 shrink-0 text-sauge" />
                                                        <span className="text-foreground/90">{it}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            {p.inclus.length > 4 && <div className="mt-2 text-xs text-foreground/60">…et d’autres éléments selon le pack.</div>}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto p-5 pt-2">
                                    {!isCurrent ? (
                                        <span
                                            className={cn(
                                                'inline-block px-4 py-2 rounded-2xl text-center mb-2',
                                                'bg-terracotta group-hover:bg-terracotta/90 text-background text-xs font-semibold tracking-widest uppercase',
                                                'border-b-2 border-r-2 border-ormat transition group-hover:scale-105',
                                                'shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                                            )}
                                        >
                                            Voir ce pack
                                        </span>
                                    ) : (
                                        <div className="text-[11px] text-foreground/60">(Vous consultez ce pack)</div>
                                    )}
                                </div>

                                {!isCurrent && (
                                    <div className="pointer-events-none absolute left-5 right-5 bottom-4 h-[2px] overflow-hidden">
                                        <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                        <div
                                            className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                            aria-hidden
                                        />
                                    </div>
                                )}
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
