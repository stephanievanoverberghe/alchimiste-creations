'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PackCard from '@/presentation/components/cards/pack/CardMiniPack';
import { faLeaf, faTint, faFire } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Layers3, Mail } from 'lucide-react';

interface Pack {
    slug: string;
    titre: string;
    sousTitre: string;
    inclus: string[];
    prix: string;
}

async function getPacks() {
    const { getPacks } = await import('@/features/catalog/application/use-cases/getPacks');
    return getPacks();
}

export default function OffersSection() {
    const [packs, setPacks] = useState<Pack[] | null>(null);

    useEffect(() => {
        (async () => setPacks(await getPacks()))();
    }, []);

    const iconBySlug: Record<string, IconDefinition> = {
        essentiel: faLeaf,
        croissance: faTint,
        signature: faFire,
    };

    return (
        <section aria-labelledby="offers-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            {/* Liseré décoratif en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            {/* Fond or (mobile only) */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            {/* Vague décorative (md+) */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="" fill priority className="h-auto object-cover" />
            </div>
            {/* Motif discret */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                aria-hidden
            />

            <div className="relative max-w-7xl mx-auto space-y-12">
                {/* En-tête */}
                <div className="group text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <Layers3 className="w-3.5 h-3.5" aria-hidden />
                        Packs sur-mesure, rythme serein
                    </span>

                    <h2 id="offers-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Choisis l’élan qui te ressemble
                    </h2>

                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl mx-auto lg:mx-0">
                        Trois niveaux clairs — de l’essentiel au sur-mesure. Design sensible, code propre, SEO de base. Choisis un point de départ, on ajuste le reste.
                    </p>
                </div>

                {/* Grille des offres */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {packs
                        ? packs.map((pack) => (
                              <PackCard
                                  key={pack.slug}
                                  slug={pack.slug}
                                  title={pack.titre.replace(/^Pack\s+/i, '')}
                                  subtitle={pack.sousTitre}
                                  items={pack.inclus}
                                  price={pack.prix}
                                  centralIcon={iconBySlug[pack.slug] || faLeaf}
                              />
                          ))
                        : Array.from({ length: 3 }).map((_, i) => (
                              <div key={i} className="border border-sauge/30 rounded-[22px] p-6 md:p-7 shadow-sm animate-pulse bg-background">
                                  <div className="h-5 w-2/3 bg-sauge/20 rounded mb-4" />
                                  <div className="h-4 w-1/3 bg-terracotta/20 rounded mb-6" />
                                  <div className="space-y-3">
                                      <div className="h-4 w-4/5 bg-sauge/20 rounded" />
                                      <div className="h-4 w-3/5 bg-sauge/20 rounded" />
                                      <div className="h-4 w-2/3 bg-sauge/20 rounded" />
                                  </div>
                              </div>
                          ))}
                </div>

                {/* CTA section (primaire + secondaire plus doux) */}
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                    <Link
                        href="/offres"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl
            bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold
            tracking-widest uppercase border-b-2 border-r-2 border-ormat transition
            hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                    >
                        <Layers3 className="w-4 h-4" aria-hidden />
                        Comparer les packs
                    </Link>

                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl
            border border-sauge/40 bg-background hover:bg-sauge/10 text-sm font-semibold
            tracking-widest uppercase transition hover:scale-105"
                    >
                        <Mail className="w-4 h-4" aria-hidden />
                        Me contacter
                    </Link>
                </div>
            </div>
        </section>
    );
}
