'use client';

import Link from 'next/link';
import { Gem, HeartHandshake, Ear, Palette, Code2, Leaf, BadgeCheck } from 'lucide-react';

export default function WhyChooseSection() {
    const points = [
        { icon: Ear, title: 'Écoute vraie', desc: 'On part de ce que tu ressens — même si c’est flou.' },
        { icon: HeartHandshake, title: 'Co-création rassurante', desc: 'Jamais seule : je guide, j’explique, on avance ensemble.' },
        { icon: Palette, title: 'Esthétique & intention', desc: 'Du beau qui a du sens, pas juste une tendance.' },
        { icon: Code2, title: 'Technique soignée', desc: 'Code propre, rapide, accessible, SEO de base.' },
        { icon: Leaf, title: 'Rythme aligné', desc: 'Qualité > vitesse, avec un cadre clair et humain.' },
    ];

    return (
        <section aria-labelledby="why-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            {/* Motif discret */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
            />

            <div className="relative max-w-7xl mx-auto space-y-10 md:space-y-12">
                {/* Header */}
                <div className="group text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <Gem className="w-3.5 h-3.5" aria-hidden />
                        Ce qui change avec moi
                    </span>

                    <h2 id="why-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Une collaboration douce, claire… et exigeante
                    </h2>

                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl mx-auto lg:mx-0">
                        Mon rôle : traduire ton univers en un site vivant et lisible. Tu avances avec des repères nets, des retours guidés — sans jargon ni pression.
                    </p>
                </div>

                {/* Mini-cartes */}
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {points.map(({ icon: Icon, title, desc }) => (
                        <li
                            key={title}
                            className="group rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-within:shadow-md"
                        >
                            <div className="flex items-center gap-3">
                                <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <Icon className="w-4 h-4" aria-hidden />
                                </span>
                                <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">{title}</h3>
                            </div>

                            {/* séparateur animé dans la carte */}
                            <div className="mt-3 relative h-[2px] overflow-hidden">
                                <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                <div
                                    className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full group-focus-within:w-2/3"
                                    aria-hidden
                                />
                            </div>

                            <p className="mt-3 text-sm text-foreground/85 leading-relaxed">{desc}</p>
                        </li>
                    ))}
                </ul>

                {/* CTA (cohérent) */}
                <div className="text-center">
                    <Link
                        href="/methode"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl
  bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold
  tracking-widest uppercase border-b-2 border-r-2 border-ormat transition
  hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                    >
                        <BadgeCheck className="w-4 h-4" aria-hidden />
                        Découvrir la méthode
                    </Link>
                </div>
            </div>
        </section>
    );
}
