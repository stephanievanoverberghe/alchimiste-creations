// components/method/MethodDeliverablesSection.tsx
'use client';

import Image from 'next/image';
import { Gift, FileCode, KeySquare, BookOpen, PlayCircle, ShieldCheck, FileText, BadgeCheck, LifeBuoy, Wrench, CalendarClock } from 'lucide-react';

export default function DeliverablesSection() {
    const deliverables = [
        { icon: FileCode, label: 'Code source (repo Git) & assets' },
        { icon: KeySquare, label: 'Accès transmis : CMS, hébergeur, DNS' },
        { icon: BookOpen, label: 'Guides d’utilisation (PDF / Notion)' },
        { icon: PlayCircle, label: 'Replay formation (vidéo courte)' },
    ];

    const ip = [
        { icon: ShieldCheck, label: 'Cession des droits à réception du solde' },
        { icon: FileText, label: 'Licences tiers remises (images, polices, plugins)' },
        { icon: BadgeCheck, label: 'Dépôts & accès passés à votre nom' },
    ];

    const support = [
        { icon: LifeBuoy, label: 'Support post-lancement (fenêtre définie par pack)' },
        { icon: Wrench, label: 'Corrections mineures incluses' },
        { icon: CalendarClock, label: 'Option maintenance (MAJ, sauvegardes, monitoring)' },
    ];

    return (
        <section id="livrables" aria-labelledby="livrables-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            {/* Liseré décoratif en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            {/* Fond or avec opacité 10% UNIQUEMENT sur mobile */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />

            {/* Vague décorative visible uniquement à partir de md */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="Vague décorative" className="h-auto" fill priority />
            </div>

            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <Gift className="w-3.5 h-3.5" aria-hidden />
                        <span>Livrables & passation</span>
                    </span>
                    <h2 id="livrables-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Tout remettre proprement — accès, guides & autonomie
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        On clôture avec une passation claire&nbsp;: codes, accès, guides et replay. Vous repartez autonome, avec les bonnes pratiques en poche.
                    </p>
                </div>

                {/* Grille 3 cartes */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {/* 1) Ce que vous recevez */}
                    <article
                        className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm
                              transition-all hover:-translate-y-0.5 hover:shadow-md hover:scale-[1.01]"
                    >
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <FileCode className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Ce que vous recevez</h3>
                        </div>

                        <div className="mt-3 relative h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" />
                            <div
                                className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge
                              transition-[width] duration-500 ease-out group-hover:w-full"
                            />
                        </div>

                        <ul className="mt-4 space-y-2">
                            {deliverables.map(({ icon: Icon, label }) => (
                                <li key={label} className="flex items-start gap-2.5">
                                    <span className="grid place-content-center size-7 rounded-full border border-sauge/40 bg-sauge/10 text-sauge mt-0.5">
                                        <Icon className="w-3.5 h-3.5" aria-hidden />
                                    </span>
                                    <span className="text-sm text-foreground/80 leading-relaxed">{label}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-4 pt-4 rounded-xl border border-sauge/20 bg-sauge/5 p-3">
                            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-sauge/90">Exemple</p>
                            <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                                Repo Git final + accès CMS/hébergeur, guide d’utilisation (PDF/Notion) et replay vidéo de 20–30&nbsp;min.
                            </p>
                        </div>
                    </article>

                    {/* 2) Propriété & licences */}
                    <article
                        className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm
                              transition-all hover:-translate-y-0.5 hover:shadow-md hover:scale-[1.01]"
                    >
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <ShieldCheck className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Propriété & licences</h3>
                        </div>

                        <div className="mt-3 relative h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" />
                            <div
                                className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge
                              transition-[width] duration-500 ease-out group-hover:w-full"
                            />
                        </div>

                        <ul className="mt-4 space-y-2">
                            {ip.map(({ icon: Icon, label }) => (
                                <li key={label} className="flex items-start gap-2.5">
                                    <span className="grid place-content-center size-7 rounded-full border border-sauge/40 bg-sauge/10 text-sauge mt-0.5">
                                        <Icon className="w-3.5 h-3.5" aria-hidden />
                                    </span>
                                    <span className="text-sm text-foreground/80 leading-relaxed">{label}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto pt-4 rounded-xl border border-sauge/20 bg-sauge/5 p-3">
                            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-sauge/90">Exemple</p>
                            <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                                Transfert de propriété du domaine & du repo, liste des licences (photos/fonts/plugins) jointe au livret de passation.
                            </p>
                        </div>
                    </article>

                    {/* 3) Support & maintenance (stretch en md) */}
                    <article
                        className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm
                              transition-all hover:-translate-y-0.5 hover:shadow-md hover:scale-[1.01]
                              md:col-span-2 xl:col-span-1"
                    >
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <LifeBuoy className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Support & maintenance</h3>
                        </div>

                        <div className="mt-3 relative h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" />
                            <div
                                className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge
                              transition-[width] duration-500 ease-out group-hover:w-full"
                            />
                        </div>

                        <ul className="mt-4 space-y-2">
                            {support.map(({ icon: Icon, label }) => (
                                <li key={label} className="flex items-start gap-2.5">
                                    <span className="grid place-content-center size-7 rounded-full border border-sauge/40 bg-sauge/10 text-sauge mt-0.5">
                                        <Icon className="w-3.5 h-3.5" aria-hidden />
                                    </span>
                                    <span className="text-sm text-foreground/80 leading-relaxed">{label}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-3">
                            <p className="text-xs text-foreground/70">* La durée de support varie selon le pack (Essentiel/Croissance/Signature).</p>
                        </div>
                    </article>
                </div>

                <p className="text-xs text-foreground/70">* Objectif&nbsp;: autonomie totale. Tout est remis, expliqué et documenté — sans dépendance cachée.</p>
            </div>
        </section>
    );
}
