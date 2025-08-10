'use client';

import { Ear, Palette, Code2, Rocket } from 'lucide-react';

export default function ProcessSection() {
    const steps = [
        {
            icon: Ear,
            label: 'Écoute & cadrage',
            desc: 'On pose l’intention, les besoins et le périmètre. Tu n’as pas besoin d’avoir tout clair : on le fait ensemble.',
        },
        {
            icon: Palette,
            label: 'Ambiance & design',
            desc: 'Moodboard léger, bases UI/UX, structure des pages. On valide l’univers avant d’avancer.',
        },
        {
            icon: Code2,
            label: 'Développement',
            desc: 'Intégration WordPress ou React/Next, responsive, SEO de base et micro-animations utiles.',
        },
        {
            icon: Rocket,
            label: 'Tests & mise en ligne',
            desc: 'Contrôles finaux, corrections, mise en ligne accompagnée + petit guide de prise en main.',
        },
    ];

    return (
        <section className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Titre */}
                <div className="text-center">
                    <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        Ma méthode
                    </span>
                    <h2 className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">4 étapes pour créer un site qui te ressemble</h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                        Une méthode simple, humaine et créative pour transformer ton idée en un site sur-mesure qui reflète ton essence et attire les bonnes personnes.
                    </p>
                </div>

                {/* Les 4 étapes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
                    {steps.map(({ icon: Icon, label, desc }, i) => (
                        <article
                            key={label}
                            className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                        >
                            {/* Header (badge n° + icône) */}
                            <div className="flex items-center gap-3">
                                <span className="inline-flex items-center justify-center size-7 rounded-full border border-ormat/30 bg-ormat/10 text-[11px] font-semibold text-ormat">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <Icon className="w-4 h-4" aria-hidden />
                                </span>
                            </div>

                            <h3 className="mt-3 text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">{label}</h3>

                            {/* Séparateur animé */}
                            <div className="mt-3 relative h-[2px] overflow-hidden">
                                <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                <div
                                    className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                    aria-hidden
                                />
                            </div>

                            <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{desc}</p>

                            {/* Pied (poussé en bas) */}
                            <div className="mt-auto pt-4" />
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
