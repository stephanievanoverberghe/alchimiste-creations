'use client';

import { HeartHandshake, Ear, Palette, Code2, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function WhyChooseSection() {
    const points = [
        {
            icon: Ear,
            label: 'Écoute vraie',
            desc: 'On part de ce que tu ressens, même si c’est flou.',
        },
        {
            icon: HeartHandshake,
            label: 'Co‑création rassurante',
            desc: 'Jamais seule : je guide, j’explique, j’avance avec toi.',
        },
        {
            icon: Palette,
            label: 'Esthétique & sens',
            desc: 'Du beau qui raconte, pas du trend pour du trend.',
        },
        {
            icon: Code2,
            label: 'Technique soignée',
            desc: 'Code propre, responsive, SEO de base, animations légères.',
        },
        {
            icon: Leaf,
            label: 'Rythme aligné',
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

                {/* Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {points.map(({ icon: Icon, label, desc }) => (
                        <article key={label} className="group rounded-[24px] bg-background p-6  border border-sauge/30 shadow-sm hover:shadow-md hover:bg-ivory transition-all">
                            {/* Badge de card */}
                            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase rounded-md border border-sauge/40 bg-background px-3 py-1 mb-3 text-terracotta font-semibold">
                                <Icon className="w-3.5 h-3.5 text-sauge" aria-hidden />
                                {label}
                            </span>

                            <p className="text-sm md:text-base leading-relaxed text-foreground/80">{desc}</p>

                            {/* Liseré hover subtil */}
                            <div className="mt-4 h-[2px] w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-all duration-300 group-hover:w-1/2" />
                        </article>
                    ))}
                </div>

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
