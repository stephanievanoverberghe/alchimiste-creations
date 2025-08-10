'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Stethoscope, Palette, Briefcase } from 'lucide-react';

export default function IdealFitSection() {
    const items = [
        {
            icon: Stethoscope,
            title: 'Thérapeutes & praticiens',
            desc: 'Présence rassurante, claire et douce — prise de RDV simple.',
            bullets: ['Ton & visuels apaisants', 'Infos pratiques lisibles', 'Réservation externe (Calendly/Cal.com)'],
        },
        {
            icon: Palette,
            title: 'Artistes & créatifs',
            desc: 'Portfolio esthétique, focus sur les œuvres et leur intention.',
            bullets: ['Grilles visuelles harmonieuses', 'Fiches projet soignées', 'Gabarits prêts pour nouvelles séries'],
        },
        {
            icon: Briefcase,
            title: 'Indépendants & coachs',
            desc: 'Vitrine claire & évolutive, avec des appels à l’action doux.',
            bullets: ['Offres lisibles', 'Pages services structurées', 'Blog/ressources simple si besoin'],
        },
    ] as const;

    return (
        <section aria-labelledby="audience-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        Pour qui c’est fait ?
                    </span>
                    <h2 id="audience-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Tu te reconnais ici ?
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        J’accompagne surtout des profils sensibles et engagés — on pose un site clair, vivant et aligné à ton univers.
                    </p>
                </div>

                {/* Cards audiences */}
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {items.map(({ icon: Icon, title, desc, bullets }) => (
                        <li
                            key={title}
                            className="group relative rounded-b-2xl border border-sauge/30 bg-background p-5 pb-10 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                        >
                            {/* En-tête card */}
                            <div className="flex items-center gap-3">
                                <span className="grid place-content-center size-10 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <Icon className="w-5 h-5" aria-hidden />
                                </span>
                                <h3 className="text-xs tracking-[0.14em] uppercase font-semibold text-terracotta">{title}</h3>
                            </div>

                            <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{desc}</p>

                            {/* Bullets compacts */}
                            <ul className="mt-3 space-y-2">
                                {bullets.map((b) => (
                                    <li key={b} className="flex items-center gap-2 text-sm text-foreground/85">
                                        <span className="size-1.5 rounded-full bg-sauge/80" aria-hidden />
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Ruban animé en haut */}
                            <div className="absolute left-0 right-0 top-0 h-[2px]">
                                <div className="h-full w-full bg-sauge/20" aria-hidden />
                                <div
                                    className="absolute inset-y-0 left-0 h-full w-1/4 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                    aria-hidden
                                />
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Micro-note + CTA doux */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-xs text-foreground/70">Tu n’es pas exactement dans ces catégories ? Pas grave. L’important : un projet humain et aligné.</p>
                    <Link
                        href="/contact"
                        className={cn(
                            'inline-block px-6 py-3 text-center rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                        )}
                    >
                        M&apos;écrire
                    </Link>
                </div>
            </div>
        </section>
    );
}
