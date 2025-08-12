// components/home/PromiseSection.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, BadgeCheck, Feather, ShieldCheck, CalendarClock } from 'lucide-react';

export default function PromiseSection({ note = 'Réponse sous 24–48h ouvrées — devis sans engagement.' }: { note?: string }) {
    return (
        <section id="promise" aria-labelledby="promise-title" className="relative overflow-x-hidden py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            {/* Liseré décoratif en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            {/* Fond or avec opacité 10% UNIQUEMENT sur mobile */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />

            {/* Vague décorative visible uniquement à partir de md */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="Vague décorative" className="h-auto" fill priority />
            </div>
            <div className="relative max-w-5xl mx-auto text-center space-y-6 group">
                {/* badge */}
                <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                    <Sparkles className="w-3.5 h-3.5" aria-hidden />
                    Ma promesse
                </span>

                {/* titre */}
                <h2 id="promise-title" className="text-terracotta font-title text-[22px] md:text-4xl font-bold tracking-widest leading-tight">
                    Un site clair, sensible et durable — qui te ressemble
                </h2>

                {/* Séparateur animé sous le titre */}
                <div className="relative mx-auto w-full max-w-2xl h-[2px] overflow-hidden">
                    <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                    <div
                        className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                        aria-hidden
                    />
                </div>

                {/* sous-phrase */}
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-2xl mx-auto">
                    Je transforme ton univers en une présence digitale lisible et vivante&nbsp;: un design qui respire, un socle technique propre, et des repères clairs pour guider
                    les bonnes personnes.
                </p>

                {/* 3 piliers */}
                <ul className="mt-1 flex flex-wrap items-center justify-center gap-2.5">
                    <li>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-sauge/30 bg-sauge/10 text-sauge px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em]">
                            <BadgeCheck className="w-3.5 h-3.5" aria-hidden /> Clair
                        </span>
                    </li>
                    <li>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-terracotta/30 bg-terracotta/10 text-terracotta px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em]">
                            <Feather className="w-3.5 h-3.5" aria-hidden /> Sensible
                        </span>
                    </li>
                    <li>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em]">
                            <ShieldCheck className="w-3.5 h-3.5" aria-hidden /> Durable
                        </span>
                    </li>
                </ul>

                {/* CTA unique */}
                <div className="pt-2">
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl
                       bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold
                       tracking-widest uppercase border-b-2 border-r-2 border-ormat transition
                       hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                    >
                        <CalendarClock className="w-4 h-4" aria-hidden />
                        Réserver un appel
                    </Link>
                </div>

                {/* micro-note */}
                <p className="text-xs text-foreground/70">* {note}</p>
            </div>
        </section>
    );
}
