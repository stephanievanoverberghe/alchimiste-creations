'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IdCard, Ear, HeartHandshake, Leaf, ListChecks, MessageSquareHeart } from 'lucide-react';

export default function StorySection() {
    const points = [
        { icon: Ear, label: 'Écoute active', desc: 'On cadre l’essentiel sans jargon, à ton rythme.' },
        { icon: HeartHandshake, label: 'Co-création guidée', desc: 'Un fil rouge clair, des jalons courts, des retours simples.' },
        { icon: Leaf, label: 'Soin & justesse', desc: 'Design sensible, code propre, accessibilité & base SEO.' },
    ];

    return (
        <section aria-labelledby="story-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px] overflow-hidden">
            {/* Liseré décoratif en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            {/* Fond or mobile only */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            {/* Vague décorative (md+) */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="" fill priority className="h-auto object-cover" />
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* CARD “carte de visite” */}
                <div className="group relative overflow-hidden rounded-[22px] border border-sauge/30 bg-background/80 p-6 md:p-8 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    {/* motif discret */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                        aria-hidden
                    />

                    <div className="relative z-[1] grid md:grid-cols-[0.6fr_1.1fr] gap-6 md:gap-10 items-center">
                        {/* VISUEL (dans la carte) */}
                        <div className="relative h-56 sm:h-64 md:h-[360px] lg:h-[420px] rounded-[18px] overflow-hidden border border-sauge/30 shadow">
                            <Image
                                src="/home/profil.jpeg"
                                alt="Portrait de Stéphanie — Alchimiste Créations"
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 42vw, 40vw"
                                className="object-cover object-[50%_12%] md:object-center"
                            />
                        </div>

                        {/* CONTENU */}
                        <div className="text-center md:text-left">
                            {/* Badge avec icône */}
                            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                                <IdCard className="w-3.5 h-3.5" aria-hidden />
                                Qui je suis
                            </span>

                            {/* Titre (sans animation) */}
                            <h2 id="story-title" className="mt-4 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                                Je crée des sites qui respirent — utiles, beaux et alignés
                            </h2>

                            {/* Pitch court */}
                            <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed">
                                Développeuse web freelance à Lille (WordPress & React), j’aide artistes, thérapeutes et indépendants à transformer une vision en site lisible,
                                rassurant et performant. Moins de technique pour toi, plus de clarté pour tes visiteurs — et plus de demandes qualifiées.
                            </p>

                            {/* Mini-cartes valeurs (avec anim au hover uniquement ici) */}
                            <ul className="mt-5 grid sm:grid-cols-3 gap-3">
                                {points.map(({ icon: Icon, label, desc }) => (
                                    <li
                                        key={label}
                                        className="group/val rounded-[16px] border border-sauge/30 bg-background p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                                <Icon className="w-4 h-4" aria-hidden />
                                            </span>
                                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">{label}</h3>
                                        </div>

                                        {/* barre animée au hover */}
                                        <div className="mt-3 relative h-[2px] overflow-hidden">
                                            <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                            <div
                                                className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover/val:w-full"
                                                aria-hidden
                                            />
                                        </div>

                                        <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{desc}</p>
                                    </li>
                                ))}
                            </ul>

                            {/* CTAs cohérents */}
                            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl
                  bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold
                  tracking-widest uppercase border-b-2 border-r-2 border-ormat transition
                  hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                                >
                                    <MessageSquareHeart className="w-4 h-4" aria-hidden />
                                    Me contacter
                                </Link>

                                <Link
                                    href="/methode"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl
                  border border-sauge/40 bg-background hover:bg-sauge/10 text-sm font-semibold
                  tracking-widest uppercase transition hover:scale-105"
                                >
                                    <ListChecks className="w-4 h-4" aria-hidden />
                                    Découvrir mon approche
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /CARD */}
            </div>
        </section>
    );
}
