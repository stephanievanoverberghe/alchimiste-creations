'use client';

import { HeartHandshake, Ear, Palette, Code2, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function WhyChooseSection() {
    const points = [
        {
            icon: Ear,
            title: 'Écoute vraie',
            desc: 'On part de ce que tu ressens, même si c’est flou.',
        },
        {
            icon: HeartHandshake,
            title: 'Co‑création rassurante',
            desc: 'Jamais seule : je guide, j’explique, j’avance avec toi.',
        },
        {
            icon: Palette,
            title: 'Esthétique & sens',
            desc: 'Du beau qui raconte, pas du trend pour du trend.',
        },
        {
            icon: Code2,
            title: 'Technique soignée',
            desc: 'Code propre, responsive, SEO de base, animations légères.',
        },
        {
            icon: Leaf,
            title: 'Rythme aligné',
            desc: 'Qualité > vitesse, avec un cadre clair et humain.',
        },
    ];

    return (
        <section className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Titre & intro */}
                <div className="text-center lg:text-left">
                    <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        Pourquoi me choisir
                    </span>
                    <h2 className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">Une présence qui écoute, crée, et incarne.</h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Derrière chaque site, il y a une rencontre. Mon rôle&nbsp;: écouter, comprendre et traduire ton univers en une expérience digitale vivante, qui te ressemble
                        et qui parle à ceux que tu veux toucher.
                    </p>
                </div>
                {/* Mini-cartes */}
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {points.map(({ icon: Icon, title, desc }) => (
                        <li key={title} className="group rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                            <div className="flex items-center gap-3">
                                <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <Icon className="w-3.5 h-3.5 text-sauge" aria-hidden />
                                </span>
                                <h3 className="text-xs tracking-[0.14em] uppercase font-semibold text-terracotta">{title}</h3>
                            </div>

                            {/* Séparateur animé (remplissage gauche→droite) */}
                            <div className="mt-3 relative h-[2px] overflow-hidden">
                                <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                <div
                                    className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full group-focus-within:w-1/2"
                                    aria-hidden
                                />
                            </div>

                            <p className="mt-3 text-sm text-foreground/80 leading-relaxed line-clamp-2">{desc}</p>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        href="/methode"
                        className={cn(
                            'inline-block px-6 py-3 text-center rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                        )}
                    >
                        Découvrir mon approche
                    </Link>
                </div>
            </div>
        </section>
    );
}
