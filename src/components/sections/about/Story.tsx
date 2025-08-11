'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Ear, HeartHandshake, Leaf } from 'lucide-react';

export default function StorySection() {
    const points = [
        { icon: Ear, label: 'Écoute vraie', desc: 'On part de ton énergie, même si tout n’est pas clair.' },
        { icon: HeartHandshake, label: 'Co-création', desc: 'Je guide et j’explique, sans jargon ni pression.' },
        { icon: Leaf, label: 'Soin & justesse', desc: 'Du code propre, un design vivant, pensé pour durer.' },
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

            <div className="relative max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-end">
                {/* Colonne texte */}
                <div className="space-y-6 text-center lg:text-left">
                    {/* Badge */}
                    <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        Qui je suis
                    </span>

                    {/* Titre */}
                    <h2 className="text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Une développeuse qui crée des sites vivants, alignés à ton univers
                    </h2>

                    {/* Pitch court */}
                    <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                        Je suis Stéphanie, fondatrice d’Alchimiste Créations. J’allie design sensible et code précis (WordPress & React/Next.js) pour transformer ton essence en
                        présence digitale claire, fluide et durable.
                    </p>

                    {/* Bullets “valeurs” */}
                    <ul className="grid sm:grid-cols-3 gap-4">
                        {points.map(({ icon: Icon, label, desc }) => (
                            <li
                                key={label}
                                className="group rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                        <Icon className="w-4 h-4" aria-hidden />
                                    </span>
                                    <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">{label}</h3>
                                </div>

                                {/* Séparateur avec remplissage animé */}
                                <div className="mt-3 relative h-[2px] overflow-hidden">
                                    {/* piste discrète */}
                                    <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                    {/* barre qui se remplit au hover */}
                                    <div
                                        className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full group-focus-within:w-1/2"
                                        aria-hidden
                                    />
                                </div>

                                <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{desc}</p>
                            </li>
                        ))}
                    </ul>
                    {/* Micro-CTA */}
                    <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                        <Link
                            href="/methode"
                            className={cn(
                                'inline-block px-6 py-3 text-center rounded-2xl bg-ormat hover:bg-ormat/90 text-foreground text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                            )}
                        >
                            Découvrir mon approche
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

                {/* Image portrait */}
                <div className="relative w-full h-[400px] lg:h-[500px] rounded-[30px] overflow-hidden shadow-lg border border-sauge/30">
                    <Image src="/home/profil.jpeg" alt="Portrait de Stéphanie - Alchimiste Créations" fill className="object-cover" priority />
                </div>
            </div>
        </section>
    );
}
