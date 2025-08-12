'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { BadgeCheck, Clock, ArrowRight } from 'lucide-react';

interface OfferCardProps {
    slug: string;
    title: string;
    subtitle: string;
    items: string[];
    price: string;
    centralIcon: IconDefinition;
    delay?: string;
    micro?: string;
}

export default function PackCard({ slug, title, subtitle, items, price, centralIcon, delay, micro }: OfferCardProps) {
    const titleId = `offer-${slug}-title`;
    const descId = `offer-${slug}-desc`;
    const preview = items.slice(0, 3);

    return (
        <Link
            href={`/offres/${slug}`}
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="group relative h-full flex flex-col rounded-[22px] border border-sauge/30 bg-background p-6 md:p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40"
        >
            {/* motif discret */}
            <div
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                aria-hidden
            />

            {/* micro-badge (optionnel) */}
            {micro && (
                <span className="absolute right-4 top-4 z-[1] inline-flex items-center gap-1.5 rounded-full border border-terracotta/30 bg-terracotta/10 text-terracotta px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider">
                    {micro}
                </span>
            )}

            {/* Header */}
            <header className="relative z-[1] text-center">
                <span className="inline-flex items-center gap-2 rounded-xl border border-sauge/30 bg-sauge/10 text-sauge px-3 py-1.5">
                    <FontAwesomeIcon icon={centralIcon} className="text-[14px]" aria-hidden />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">Pack {title}</span>
                </span>

                <h3 id={titleId} className="mt-3 text-terracotta font-title text-xl md:text-2xl font-bold tracking-widest leading-tight">
                    {subtitle}
                </h3>

                {/* Séparateur fin */}
                <div className="mt-4 relative h-[2px] overflow-hidden">
                    <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                    <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                </div>
            </header>

            {/* Contenu */}
            <div id={descId} className="relative z-[1] mt-4 flex-1">
                <ul className="grid gap-2.5 text-left">
                    {preview.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                            <BadgeCheck className="size-4 shrink-0 text-sauge translate-y-[1px]" strokeWidth={2.25} aria-hidden />
                            <span className="text-sm leading-relaxed text-foreground/85">{item}</span>
                        </li>
                    ))}
                    <li className="flex items-start gap-2.5 italic text-foreground/75">
                        <BadgeCheck className="size-4 shrink-0 text-sauge opacity-60 translate-y-[1px]" strokeWidth={2.25} aria-hidden />
                        <span className="text-sm leading-relaxed">… et des ajustements selon ton univers</span>
                    </li>
                </ul>
            </div>

            {/* Footer : chips + micro-lien*/}
            <footer className="relative z-[1] mt-6 flex flex-col gap-5 items-center justify-between">
                {/* Infos (prix / délai) */}
                <div className="flex flex-wrap items-center gap-2">
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

                {/* Micro-CTA discret */}
                <span
                    aria-hidden="true"
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]
               text-terracotta/90 hover:text-terracotta transition-colors"
                >
                    <span className="border-b border-transparent group-hover:border-terracotta/50 transition-colors">Voir le détail</span>
                    <ArrowRight className="w-4 h-4 -translate-x-0.5 transition-transform group-hover:translate-x-0.5" />
                </span>
            </footer>
        </Link>
    );
}
