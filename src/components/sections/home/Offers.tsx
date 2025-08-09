'use client';

import { useEffect, useState } from 'react';
import OfferCard from './OfferCard';
import { faLeaf, faTint, faFire } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { getPacks } from '@/lib/getPacks';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

// Type minimal aligné avec packs.json (on n'utilise que ces champs ici)
interface Pack {
    slug: string;
    titre: string;
    sousTitre: string;
    inclus: string[];
    prix: string;
}

export default function OffersSection() {
    const [packs, setPacks] = useState<Pack[] | null>(null);

    useEffect(() => {
        (async () => {
            const data = await getPacks();
            setPacks(data);
        })();
    }, []);

    // Icônes par slug (fiable même si l’ordre des packs change)
    const iconBySlug: Record<string, IconDefinition> = {
        essentiel: faLeaf,
        croissance: faTint,
        signature: faFire,
    };

    return (
        <section className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            {/* Liseré décoratif en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            {/* Fond or mobile only */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            {/* Vague décorative (md+) */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="Vague décorative" className="h-auto" fill priority />
            </div>

            <div className="relative max-w-5xl mx-auto space-y-12">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        Pensé avec toi, façonné pour toi
                    </span>

                    <h2 className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">Choisis l’élan qui te ressemble</h2>

                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Chaque projet est une rencontre. Ici, on crée un site vivant, aligné et fluide — un espace qui te prolonge, sans jargon ni pression.
                    </p>
                </div>

                {/* Grille des offres */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {packs
                        ? packs.map((pack) => (
                              <OfferCard
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
                              <div key={i} className="border border-sauge/30 rounded-[30px] p-8 shadow-sm animate-pulse">
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

                {/* CTA global */}
                <div className="text-center">
                    <Link
                        href="/offres"
                        className={cn(
                            'inline-block px-6 py-3 text-center rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                        )}
                    >
                        Voir les détails des offres
                    </Link>
                </div>
            </div>
        </section>
    );
}
