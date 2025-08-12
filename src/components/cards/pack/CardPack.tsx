'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { BadgeCheck, Clock, ArrowRight } from 'lucide-react';

interface PackCardProps {
    slug: string;
    title: string;
    subtitle: string;
    items: string[];
    price: string;
    delay?: string;
    micro?: string;
    centralIcon: IconDefinition;
    cible?: string;
}

export default function PackCard({ slug, title, subtitle, items, price, delay, centralIcon, cible, micro }: PackCardProps) {
    const titleId = `pack-${slug}-title`;
    const descId = `pack-${slug}-desc`;

    return (
        <Link
            href={`/offres/${slug}`}
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="group relative flex flex-col rounded-[22px] border border-sauge/30 bg-background p-6 md:p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40"
        >
            {/* motif discret */}
            <div
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                aria-hidden
            />

            {/* micro-badge (ex: Le + demandé) */}
            {micro && (
                <span className="absolute right-4 top-4 z-[1] inline-flex items-center gap-1.5 rounded-full border border-terracotta/30 bg-terracotta/10 text-terracotta px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider">
                    {micro}
                </span>
            )}

            {/* Header */}
            <header className="relative z-[1] text-center">
                <div className="inline-flex items-center gap-2 rounded-xl border border-sauge/30 bg-sauge/10 text-sauge px-3 py-1.5">
                    <FontAwesomeIcon icon={centralIcon} className="text-[14px]" aria-hidden />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">Pack {title}</span>
                </div>

                <h3 id={titleId} className="mt-3 text-terracotta font-title text-xl md:text-2xl font-bold tracking-widest leading-tight">
                    {subtitle}
                </h3>

                {cible && <p className="mt-1 text-xs md:text-sm italic text-foreground/75">{cible}</p>}

                {/* Séparateur fin */}
                <div className="mt-4 relative h-[2px] overflow-hidden">
                    <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                    <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                </div>
            </header>

            {/* Contenu */}
            <div id={descId} className="relative z-[1] mt-4 flex-1">
                {/* Liste d’inclus (compacte, cohérente avec le site) */}
                <ul className="grid gap-2.5 text-left">
                    {items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                            <BadgeCheck className="size-4 shrink-0 text-sauge translate-y-[1px]" aria-hidden />
                            <span className="text-sm leading-relaxed text-foreground/85">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Footer prix/délais + CTA visuel */}
            <footer className="relative z-[1] mt-6">
                <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-terracotta/30 bg-terracotta/10 text-terracotta px-3 py-1.5 text-sm font-semibold">
                        {price}
                    </span>
                    {delay && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-sauge/30 bg-sauge/10 text-sauge px-3 py-1.5 text-xs">
                            <Clock className="w-3.5 h-3.5" aria-hidden />
                            Délai&nbsp;: {delay}
                        </span>
                    )}
                </div>

                {/* Bouton (visuel) – toute la card est cliquable */}
                <div className="flex justify-center">
                    <span
                        aria-hidden="true"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl
                       bg-terracotta group-hover:bg-terracotta/90 text-background text-sm font-semibold
                       tracking-widest uppercase border-b-2 border-r-2 border-ormat transition
                       group-hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                    >
                        Découvrir ce pack
                        <ArrowRight className="w-4 h-4 -mr-0.5 -translate-x-1 transition-transform group-hover:translate-x-0" />
                    </span>
                </div>
            </footer>
        </Link>
    );
}
