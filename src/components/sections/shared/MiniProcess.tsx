'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Ear, Palette, Code2, Rocket, CalendarDays, BadgeCheck } from 'lucide-react';

export default function MiniProcessSection() {
    const steps = [
        {
            icon: Ear,
            label: 'Écoute & cadrage',
            desc: 'On pose l’intention, les besoins et le périmètre. Tu n’as pas besoin d’avoir tout clair : on le fait ensemble.',
            milestone: 'Kick-off',
            validation: 'Go cadrage',
        },
        {
            icon: Palette,
            label: 'Ambiance & design',
            desc: 'Moodboard léger, bases UI/UX, structure des pages. On valide l’univers avant d’avancer.',
            milestone: 'Style + structure',
            validation: 'OK UI light',
        },
        {
            icon: Code2,
            label: 'Développement',
            desc: 'Intégration WordPress ou React/Next, responsive, SEO de base et micro-animations utiles.',
            milestone: 'Pré-prod',
            validation: 'Recette prête',
        },
        {
            icon: Rocket,
            label: 'Tests & mise en ligne',
            desc: 'Contrôles finaux, corrections, mise en ligne accompagnée + petit guide de prise en main.',
            milestone: 'Go live',
            validation: 'Passation',
        },
    ] as const;

    return (
        <section id="mini-process" aria-labelledby="process-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <CalendarDays className="w-3.5 h-3.5" aria-hidden />
                        <span>Comment ça se passe ?</span>
                    </span>

                    <h2 id="process-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Un processus clair, doux et structuré
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Quatre étapes simples pour créer un site aligné : on écoute, on pose l’ambiance, on développe, on met en ligne — sans jargon, sans pression.
                    </p>
                </div>

                {/* Les 4 étapes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
                    {steps.map(({ icon: Icon, label, desc, milestone, validation }, i) => (
                        <article
                            key={label}
                            className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                        >
                            {/* Header (n° + icône + titre) */}
                            <div className="flex items-center gap-3">
                                <span className="inline-flex items-center justify-center size-7 rounded-full border border-ormat/30 bg-ormat/10 text-[11px] font-semibold text-ormat">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <Icon className="w-4 h-4" aria-hidden />
                                </span>
                                <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">{label}</h3>
                            </div>

                            {/* Fine barre (timeline) */}
                            <div className="mt-3 relative h-[2px] overflow-hidden">
                                <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                <div
                                    className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                    aria-hidden
                                />
                            </div>

                            <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{desc}</p>

                            {/* Footer : jalon + validation */}
                            <div className="mt-auto pt-4 flex items-center gap-2 flex-wrap">
                                <span className="inline-flex items-center gap-1 rounded-full border border-sauge/30 bg-sauge/10 text-sauge px-2.5 py-1 text-xs">
                                    <CalendarDays className="w-3.5 h-3.5" aria-hidden />
                                    {milestone}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full border border-terracotta/30 bg-terracotta/10 text-terracotta px-2.5 py-1 text-xs">
                                    <BadgeCheck className="w-3.5 h-3.5" aria-hidden />
                                    {validation}
                                </span>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Micro-note + CTA cohérent */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-sm text-foreground/70 italic">
                        * Je prends <span className="not-italic font-medium text-terracotta">1 projet par mois</span> pour garder de la profondeur.
                    </p>
                    <Link
                        href="/methode"
                        className={cn(
                            'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl',
                            'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                            'border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                        )}
                    >
                        <BadgeCheck className="w-4 h-4" aria-hidden />
                        Voir la méthode en détail
                    </Link>
                </div>
            </div>
        </section>
    );
}
