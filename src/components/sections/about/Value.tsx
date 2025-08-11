'use client';

import { Users, ListChecks, Sparkles, Gauge } from 'lucide-react';

export default function ValuesSection() {
    const pillars = [
        { icon: Users, title: 'Chaleur humaine', desc: 'On co-crée, sans jargon ni pression.' },
        { icon: ListChecks, title: 'Clarté & structure', desc: 'Étapes lisibles, délais posés.' },
        { icon: Sparkles, title: 'Intuition & profondeur', desc: 'Un site qui te ressemble vraiment.' },
        { icon: Gauge, title: 'Accessibilité & perfs', desc: 'Mobile, rapide, SEO de base.' },
    ];

    return (
        <section className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="max-w-5xl mx-auto space-y-12">
                {/* En-tête */}
                <div className="text-center lg:text-left mb-10 md:mb-12">
                    <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        Vision & valeurs
                    </span>
                    <h2 className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">Le cadre qui guide chaque projet</h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Un cap simple et humain : créer beau, clair et durable — sans te perdre en route.
                    </p>
                </div>

                {/* Mini-cartes */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {pillars.map(({ icon: Icon, title, desc }) => (
                        <li key={title} className="group rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                            <div className="flex items-center gap-3">
                                <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <Icon className="w-3.5 h-3.5 text-sauge" aria-hidden />
                                </span>
                                <h3 className="text-xs tracking-[0.14em] uppercase font-semibold text-terracotta">{title}</h3>
                            </div>

                            {/* Séparateur animé */}
                            <div className="mt-3 relative h-[2px] overflow-hidden">
                                <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                <div
                                    className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full group-focus-within:w-1/2"
                                    aria-hidden
                                />
                            </div>

                            <p className="mt-3 text-sm text-foreground/80 leading-relaxed line-clamp-2">{desc}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
