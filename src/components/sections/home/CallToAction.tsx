'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function CallToActionSection() {
    return (
        <section className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="max-w-5xl mx-auto text-center space-y-8">
                {/* Badge */}
                <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                    Prêt à te lancer ?
                </span>

                {/* Titre */}
                <h2 className="text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">On crée un site vivant, à ton image</h2>

                {/* Sous-phrase */}
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-2xl mx-auto">
                    Dis-moi où tu en es. Je t’accompagne pas à pas pour poser un espace digital aligné, clair et rassurant.
                </p>

                {/* Boutons */}
                <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    {/* Micro-CTA */}
                    <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                        <Link
                            href="/contact"
                            className={cn(
                                'inline-block px-6 py-3 text-center rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                            )}
                        >
                            Réserver mon appel
                        </Link>
                        <Link
                            href="/offres"
                            className={cn(
                                'inline-block px-6 py-3 text-center rounded-2xl bg-ormat hover:bg-ormat/90 text-foreground text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                            )}
                        >
                            Voir les offres
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
