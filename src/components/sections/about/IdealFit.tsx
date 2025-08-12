'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Stethoscope, Palette, Briefcase, BadgeCheck, Mail, CalendarDays, Images, Target, Users } from 'lucide-react';

export default function IdealFitSection() {
    const items = [
        {
            icon: Stethoscope,
            title: 'Thérapeutes & praticiens',
            desc: 'Une présence apaisante qui inspire confiance, avec un parcours clair jusqu’à la prise de RDV.',
            bullets: ['Ton & visuels rassurants', 'Séances / tarifs lisibles', 'Réservation (Calendly)'],
            objective: { icon: CalendarDays, label: 'Objectif : RDV' },
        },
        {
            icon: Palette,
            title: 'Artistes & créatifs',
            desc: 'Un portfolio vivant qui met l’intention et l’œuvre au centre, prêt à évoluer avec ta pratique.',
            bullets: ['Grilles harmonieuses et modulables', 'Fiches œuvre / projet soignées', 'Gabarits prêts pour nouvelles séries'],
            objective: { icon: Images, label: 'Objectif : Portfolio vivant' },
        },
        {
            icon: Briefcase,
            title: 'Indépendants & coachs',
            desc: 'Une vitrine claire, alignée et évolutive, avec des appels à l’action doux et assumés.',
            bullets: ['Pages services structurées', 'Offres lisibles + FAQ', 'Formulaire simple / lead magnet'],
            objective: { icon: Target, label: 'Objectif : Demandes qualifiées' },
        },
    ] as const;

    return (
        <section id="audience" aria-labelledby="audience-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px] overflow-hidden">
            {/* Liseré décoratif */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            {/* Fond or (mobile only) */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            {/* Vague décorative (md+) */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="" fill priority className="h-auto object-cover" />
            </div>
            {/* Motif discret */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
            />

            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <Users className="w-3.5 h-3.5" aria-hidden />
                        <span>Pour qui c’est fait ?</span>
                    </span>

                    <h2 id="audience-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Tu te reconnais ici ?
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        J’accompagne surtout des profils sensibles et engagés. On pose un site clair, vivant et aligné — sans jargon, avec des étapes lisibles.
                    </p>
                </div>

                {/* Cards audiences */}
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
                    {items.map(({ icon: Icon, title, desc, bullets, objective }) => (
                        <li
                            key={title}
                            className="group relative h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                        >
                            {/* En-tête card */}
                            <div className="relative flex items-center gap-3">
                                <span className="grid place-content-center size-10 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <Icon className="w-5 h-5" aria-hidden />
                                </span>
                                <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">{title}</h3>
                            </div>

                            {/* Séparateur fin animé */}
                            <div className="mt-3 relative h-[2px] overflow-hidden">
                                <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                <div
                                    className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                    aria-hidden
                                />
                            </div>

                            <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{desc}</p>

                            {/* Bullets compacts */}
                            <ul className="mt-3 space-y-2">
                                {bullets.map((b) => (
                                    <li key={b} className="flex items-start gap-2">
                                        <BadgeCheck className="w-4 h-4 mt-0.5 text-sauge" aria-hidden />
                                        <span className="text-sm text-foreground/85 leading-relaxed">{b}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Footer — chip objectif */}
                            <div className="mt-auto pt-4">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-terracotta/30 bg-terracotta/10 text-terracotta px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider">
                                    <objective.icon className="w-3.5 h-3.5" aria-hidden />
                                    {objective.label}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Micro-note + CTA doux */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-xs text-foreground/70">* Tu n’es pas exactement dans ces catégories ? L’important, c’est un projet humain et aligné.</p>
                    <Link
                        href="/contact"
                        className={cn(
                            'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl',
                            'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                            'border-b-2 border-r-2 border-ormat transition hover:scale-105',
                            'shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                        )}
                    >
                        <Mail className="w-4 h-4" aria-hidden />
                        M’écrire
                    </Link>
                </div>
            </div>
        </section>
    );
}
