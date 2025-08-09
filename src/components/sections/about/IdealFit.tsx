'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Stethoscope, Palette, HeartHandshake } from 'lucide-react';

export default function IdealFitSection() {
    const audience = [
        {
            icon: Stethoscope,
            title: 'Thérapeutes & praticiens',
            line: 'Présence rassurante, prise de RDV simple.',
        },
        {
            icon: Palette,
            title: 'Artistes & créatifs',
            line: 'Portfolio esthétique, mise en valeur des œuvres.',
        },
        {
            icon: HeartHandshake,
            title: 'Indépendants du cœur',
            line: 'Vitrine claire, alignée et évolutive.',
        },
    ];
    return (
        <section className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            {/* Liseré décoratif en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            {/* Fond or mobile only */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            {/* Vague décorative (md+) */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="" fill priority className="h-auto object-cover" />
            </div>

            <div className="relative max-w-5xl mx-auto">
                {/* En-tête */}
                <div className="text-center lg:text-left mb-10 md:mb-12">
                    <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        Pour qui je suis la bonne personne
                    </span>
                    <h2 className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">Les personnes avec qui mon approche résonne</h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Si tu veux un site clair, vivant et durable, sans te perdre dans le jargon, on est au bon endroit.
                    </p>
                </div>

                {/* Cartouches */}
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {audience.map(({ icon: Icon, title, line }) => (
                        <li
                            key={title}
                            className="group relative h-full rounded-b-2xl border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md flex flex-col"
                        >
                            {/* Ruban animé en haut */}
                            <div className="absolute left-0 right-0 top-0 h-[2px]">
                                <div className="h-full w-full bg-sauge/20" aria-hidden />
                                <div
                                    className="absolute inset-y-0 left-0 h-full w-1/4 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                    aria-hidden
                                />
                            </div>

                            <div className="flex items-center gap-3 mt-1">
                                <span className="grid place-content-center size-10 rounded-xl border border-ormat/30 bg-ormat/10 text-ormat">
                                    <Icon className="w-4 h-4" aria-hidden />
                                </span>
                                <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">{title}</h3>
                            </div>

                            <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{line}</p>
                        </li>
                    ))}
                </ul>

                {/* Micro-CTA */}
                <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <Link
                        href="/offres"
                        className={cn(
                            'inline-block px-6 py-3 text-center rounded-2xl bg-ormat hover:bg-ormat/90 text-foreground text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                        )}
                    >
                        Voir les offres
                    </Link>
                    <Link
                        href="/contact"
                        className={cn(
                            'inline-block px-6 py-3 text-center rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                        )}
                    >
                        Me contacter
                    </Link>
                </div>
            </div>
        </section>
    );
}
