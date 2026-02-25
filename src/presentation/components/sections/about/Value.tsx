'use client';

import { Leaf, HeartHandshake, ListChecks, Sparkles, ShieldCheck } from 'lucide-react';

export default function ValuesSection() {
    const pillars = [
        {
            icon: HeartHandshake,
            title: 'Écoute & sécurité',
            desc: 'On prend le temps. Tu peux arriver avec du flou : je pose un cadre doux et on clarifie ensemble.',
        },
        {
            icon: ListChecks,
            title: 'Clarté qui libère',
            desc: 'Des étapes lisibles, des deadlines réalistes, des retours guidés. Tu sais toujours où on va.',
        },
        {
            icon: Sparkles,
            title: 'Sens avant tendance',
            desc: 'Un design qui respire, fidèle à ton univers. Pas d’effets gratuits : de la justesse.',
        },
        {
            icon: ShieldCheck,
            title: 'Technique qui tient',
            desc: 'Accessibilité, performance, responsive, base SEO. Un socle propre qui dure et évolue.',
        },
    ];

    return (
        <section aria-labelledby="values-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px] overflow-hidden">
            {/* Motif discret */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
            />

            <div className="relative max-w-7xl mx-auto space-y-10 md:space-y-12">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <Leaf className="w-3.5 h-3.5" aria-hidden />
                        <span>Vision & valeurs</span>
                    </span>

                    <h2 id="values-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Le cadre qui te rassure — et fait avancer ton projet
                    </h2>

                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Mon objectif : que tu te sentes compris, guidé et soulagé. On garde le sens, on simplifie la technique, et on construit un site qui te ressemble — clair,
                        vivant et durable.
                    </p>
                </div>

                {/* Mini-cartes */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {pillars.map(({ icon: Icon, title, desc }) => (
                        <li key={title} className="group rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                            <div className="flex items-center gap-3">
                                <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <Icon className="w-3.5 h-3.5" aria-hidden />
                                </span>
                                <h3 className="text-xs tracking-[0.14em] uppercase font-semibold text-terracotta">{title}</h3>
                            </div>

                            {/* Séparateur animé (cohérent site) */}
                            <div className="mt-3 relative h-[2px] overflow-hidden">
                                <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                <div
                                    className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full group-focus-within:w-1/2"
                                    aria-hidden
                                />
                            </div>

                            <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{desc}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
