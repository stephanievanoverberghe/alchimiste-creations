'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ShieldCheck, Smartphone, Accessibility, Search, FileCheck } from 'lucide-react';

export default function GuaranteesSection() {
    const items = [
        {
            icon: Smartphone,
            title: 'Rapide & mobile-first',
            desc: 'Un site fluide, optimisé pour tous les écrans.',
        },
        {
            icon: Accessibility,
            title: 'Accessibilité & bonnes pratiques',
            desc: 'Couleurs, contrastes, sémantique et navigation clairs.',
        },
        {
            icon: Search,
            title: 'SEO de base inclus',
            desc: 'Titres, metas, structure propre et performances.',
        },
        {
            icon: FileCheck,
            title: 'Passation soignée',
            desc: 'Tutoriel simple + remise des accès en fin de projet.',
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
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <ShieldCheck className="w-3.5 h-3.5" aria-hidden />
                        Ce que je garantis
                    </span>
                    <h2 className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">Des engagements concrets, pas des promesses</h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">L’objectif : un site beau, clair et fiable — qui tient dans le temps.</p>
                </div>

                {/* Cartes garanties */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {items.map(({ icon: Icon, title, desc }) => (
                        <li
                            key={title}
                            className="group relative rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="flex items-center gap-3">
                                <span className="grid place-content-center size-10 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <Icon className="w-5 h-5" aria-hidden />
                                </span>
                                <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">{title}</h3>
                            </div>

                            <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{desc}</p>

                            {/* Ligne animée gauche→droite (même effet que tu aimes) */}
                            <div className="mt-4 relative h-[2px] overflow-hidden">
                                <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                <div
                                    className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                    aria-hidden
                                />
                            </div>
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
