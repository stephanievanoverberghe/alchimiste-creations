'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';

type Neighbor = {
    slug: string;
    titre?: string;
    title?: string;
    logo?: string;
};

export default function NavSection({ prev, next }: { prev?: Neighbor; next?: Neighbor }) {
    const label = (p?: Neighbor) => (p?.titre || p?.title || p?.slug || '').trim();

    if (!prev && !next) {
        return (
            <section className="relative py-12 md:py-16 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 place-items-center">
                        <Link
                            href="/projets"
                            className={cn(
                                'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl',
                                'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                                'border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                            )}
                            aria-label="Voir tous les projets"
                        >
                            <LayoutGrid className="w-4 h-4" aria-hidden />
                            Tous les projets
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative py-12 md:py-16 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {/* Précédent */}
                    {prev ? (
                        <Link
                            href={`/projets/${prev.slug}`}
                            className="group relative rounded-[20px] border border-foreground/15 bg-ormat/10 p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
                            aria-label={`Projet précédent : ${label(prev)}`}
                        >
                            {/* motif discret */}
                            <div
                                className="pointer-events-none absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
                                    backgroundSize: '16px 16px',
                                    color: 'var(--color-ormat)',
                                }}
                                aria-hidden
                            />
                            <div className="relative z-[1] text-left">
                                <span className="inline-flex items-center gap-2 rounded-full border border-ormat/30 bg-background text-ormat px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
                                    <ArrowLeft className="w-4 h-4" />
                                    Précédent
                                </span>
                                <h3 className="mt-2 text-base md:text-lg font-semibold text-foreground line-clamp-2">{label(prev)}</h3>

                                {/* barre fine, neutre */}
                                <div className="mt-4 h-[2px] w-full bg-foreground/10 overflow-hidden">
                                    <span className="block h-full w-0 bg-gradient-to-r from-terracotta/70 to-terracotta transition-[width] duration-500 ease-out group-hover:w-full" />
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <div className="hidden md:block" />
                    )}

                    {/* Tous les projets */}
                    <div className="grid place-items-center">
                        <Link
                            href="/projets"
                            className={cn(
                                'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl',
                                'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                                'border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                            )}
                            aria-label="Voir tous les projets"
                        >
                            <LayoutGrid className="w-4 h-4" aria-hidden />
                            Tous les projets
                        </Link>
                    </div>

                    {/* Suivant */}
                    {next ? (
                        <Link
                            href={`/projets/${next.slug}`}
                            className="group relative rounded-[20px] border border-foreground/15 bg-ormat/10 p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
                            aria-label={`Projet suivant : ${label(next)}`}
                        >
                            {/* motif discret */}
                            <div
                                className="pointer-events-none absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
                                    backgroundSize: '16px 16px',
                                    color: 'var(--color-ormat)',
                                }}
                                aria-hidden
                            />
                            <div className="relative z-[1] text-right">
                                <span className="inline-flex items-center gap-2 rounded-full border border-terracotta/30 bg-background text-terracotta px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
                                    Suivant
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                                <h3 className="mt-2 text-base md:text-lg font-semibold text-foreground line-clamp-2">{label(next)}</h3>

                                <div className="mt-4 h-[2px] w-full bg-foreground/10 overflow-hidden">
                                    <span className="block h-full w-0 ml-auto bg-gradient-to-l from-terracotta/70 to-terracotta transition-[width] duration-500 ease-out group-hover:w-full" />
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <div className="hidden md:block" />
                    )}
                </div>
            </div>
        </section>
    );
}
