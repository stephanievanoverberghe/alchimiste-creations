// components/method/MethodTLDRSection.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Ruler, Layers, Repeat, Timer, Briefcase } from 'lucide-react';

type TLDRStats = {
    delaisMoyens?: string;
    cyclesRetours?: string;
    capaciteProjets?: string;
};

export default function TLDRSection(props: TLDRStats) {
    const metrics = {
        delaisMoyens: props.delaisMoyens ?? '2–6 semaines',
        cyclesRetours: props.cyclesRetours ?? '1–2 cycles/étape',
        capaciteProjets: props.capaciteProjets ?? '1 projet/mois',
    };

    const pillars = [
        {
            icon: Ruler,
            title: 'Cadrage précis',
            desc: "Objectifs, audience, pages, contenus : on sait où l'on va avant de produire.",
        },
        {
            icon: Layers,
            title: 'Petits lots',
            desc: 'On avance par blocs courts (wireframes → UI → dev) pour rester focus et souple.',
        },
        {
            icon: Repeat,
            title: 'Retours balisés',
            desc: 'Fenêtres de feedback prévues + checklists claires pour valider sereinement.',
        },
    ] as const;

    return (
        <section id="tldr" aria-labelledby="tldr-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            {/* Liseré décoratif en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            {/* Fond or avec opacité 10% UNIQUEMENT sur mobile */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />

            {/* Vague décorative visible uniquement à partir de md */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="Vague décorative" className="h-auto" fill priority />
            </div>
            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête (mêmes patterns que tes sections) */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <Timer className="w-3.5 h-3.5" aria-hidden />
                        <span>En bref</span>
                    </span>
                    <h2 id="tldr-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        La méthode en 60&nbsp;secondes
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Trois piliers simples, trois chiffres utiles — et un accès direct au détail du process.
                    </p>
                </div>

                {/* Grille : 3 piliers + 3 chiffres (pattern cartes identique à MiniProcess) */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6">
                    {/* 3 piliers */}
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                        {pillars.map(({ icon: Icon, title, desc }, i) => (
                            <article
                                key={title}
                                className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex items-center justify-center size-7 rounded-full border border-ormat/30 bg-ormat/10 text-[11px] font-semibold text-ormat">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                        <Icon className="w-4 h-4" aria-hidden />
                                    </span>
                                    <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">{title}</h3>
                                </div>

                                <div className="mt-3 relative h-[2px] overflow-hidden">
                                    <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                    <div
                                        className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                        aria-hidden
                                    />
                                </div>

                                <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{desc}</p>
                            </article>
                        ))}
                    </div>

                    {/* 3 chiffres */}
                    <aside className="lg:col-span-2 rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm">
                        <ul className="divide-y divide-sauge/20">
                            <li className="py-3 flex items-start gap-3">
                                <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge shrink-0">
                                    <Timer className="w-4 h-4" aria-hidden />
                                </span>
                                <div>
                                    <p className="text-sm font-medium tracking-wide">Délais moyens</p>
                                    <p className="text-sm text-foreground/80">{metrics.delaisMoyens}</p>
                                </div>
                            </li>
                            <li className="py-3 flex items-start gap-3">
                                <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge shrink-0">
                                    <Repeat className="w-4 h-4" aria-hidden />
                                </span>
                                <div>
                                    <p className="text-sm font-medium tracking-wide">Retours prévus</p>
                                    <p className="text-sm text-foreground/80">{metrics.cyclesRetours}</p>
                                </div>
                            </li>
                            <li className="py-3 flex items-start gap-3">
                                <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge shrink-0">
                                    <Briefcase className="w-4 h-4" aria-hidden />
                                </span>
                                <div>
                                    <p className="text-sm font-medium tracking-wide">Capacité projets</p>
                                    <p className="text-sm text-foreground/80">{metrics.capaciteProjets}</p>
                                </div>
                            </li>
                        </ul>

                        <div className="mt-4 flex items-center justify-between gap-3">
                            <p className="text-xs text-foreground/70">* Indications moyennes, précisées au cadrage.</p>
                            <Link href="#process" className="text-[11px] tracking-[0.16em] uppercase font-semibold text-terracotta hover:underline">
                                Voir le détail du process →
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
