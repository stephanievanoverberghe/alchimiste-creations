'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IdCard, CalendarDays, MessageSquare, ClipboardCheck, User } from 'lucide-react';

export default function AboutPreviewSection() {
    return (
        <section aria-labelledby="about-title" className="relative overflow-x-hidden py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-7xl mx-auto">
                {/* CARD avec visuel intégré */}
                <div className="group relative overflow-hidden rounded-[28px] border border-sauge/30 bg-background shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <div className="md:grid md:grid-cols-[0.5fr_1.1fr] text-center md:text-left">
                        {/* MEDIA */}
                        <div className="relative h-56 sm:h-72 md:h-full md:min-h-[360px] lg:min-h-[420px]">
                            <Image
                                src="/home/profil.jpeg"
                                alt="Portrait de Stéphanie — Alchimiste Créations"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 40vw"
                                className="object-cover object-[50%_12%] md:object-center"
                                priority
                            />
                        </div>

                        {/* CONTENU */}
                        <div className="relative p-6 md:p-8">
                            {/* motif discret */}
                            <div
                                className="pointer-events-none absolute inset-0 opacity-10"
                                style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                                aria-hidden
                            />

                            {/* Badge */}
                            <span className="relative z-[1] inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                                <IdCard className="w-3.5 h-3.5" aria-hidden />À propos
                            </span>

                            {/* Titre */}
                            <h2
                                id="about-title"
                                className="relative z-[1] mt-5 text-terracotta font-title text-2xl md:text-3xl lg:text-4xl font-bold tracking-widest leading-tight"
                            >
                                Travailler ensemble, simplement
                            </h2>

                            {/* Séparateur animé sous le titre */}
                            <div className="relative z-[1] mt-3 h-[2px] overflow-hidden">
                                <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                <div
                                    className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                    aria-hidden
                                />
                            </div>

                            {/* Copie */}
                            <p className="relative z-[1] mt-4 text-base md:text-lg text-foreground/80 leading-relaxed">
                                Je suis Stéphanie. J’accompagne des profils sensibles et engagés avec une démarche calme et structurée&nbsp;: on clarifie l’essentiel, on avance par
                                <em> jalons courts</em>, et je gère le technique pour que tu restes focalisé·e sur ton métier.
                            </p>

                            {/* Bullets */}
                            <ul className="relative z-[1] mt-5 grid sm:grid-cols-3 gap-2.5">
                                <li className="inline-flex items-center gap-2 rounded-xl border border-sauge/30 bg-sauge/10 text-foreground/85 px-3 py-2 text-sm">
                                    <CalendarDays className="w-4 h-4 text-sauge" aria-hidden />
                                    Un projet à la fois
                                </li>
                                <li className="inline-flex items-center gap-2 rounded-xl border border-sauge/30 bg-sauge/10 text-foreground/85 px-3 py-2 text-sm">
                                    <MessageSquare className="w-4 h-4 text-sauge" aria-hidden />
                                    Retours guidés, zéro jargon
                                </li>
                                <li className="inline-flex items-center gap-2 rounded-xl border border-sauge/30 bg-sauge/10 text-foreground/85 px-3 py-2 text-sm">
                                    <ClipboardCheck className="w-4 h-4 text-sauge" aria-hidden />
                                    Livrables concrets
                                </li>
                            </ul>

                            {/* CTA */}
                            <div className="relative z-[1] mt-6 md:text-end">
                                <Link
                                    href="/me-decouvrir"
                                    className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl
                  bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold
                  tracking-widest uppercase border-b-2 border-r-2 border-ormat transition
                  hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                                >
                                    <User className="w-4 h-4" aria-hidden />
                                    Me découvrir
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
