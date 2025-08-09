'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function AboutPreviewSection() {
    return (
        <section className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Image portrait */}
                <div className="relative w-full h-[400px] lg:h-[500px] rounded-[30px] overflow-hidden shadow-lg border border-sauge/30">
                    <Image src="/home/profil.jpeg" alt="Portrait de Stéphanie - Alchimiste Créations" fill className="object-cover" priority />
                </div>

                {/* Texte présentation */}
                <div className="space-y-6 text-center lg:text-left">
                    {/* Badge */}
                    <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        À propos de moi
                    </span>

                    {/* Titre */}
                    <h2 className="text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">Mettre l&apos;humain et l’âme au cœur du web</h2>

                    {/* Paragraphe */}
                    <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                        Je suis Stéphanie, fondatrice d’<strong>Alchimiste Créations</strong>. J’accompagne artistes, thérapeutes et entrepreneurs du cœur à transformer leur
                        univers en un espace digital unique, esthétique et aligné à leurs valeurs. Mon approche mêle écoute, sensibilité et précision technique pour créer des sites
                        qui vivent et résonnent.
                    </p>

                    {/* Bouton */}
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
