// components/method/MethodChangeManagementSection.tsx
'use client';

import Image from 'next/image';
import { GitPullRequest, AlertTriangle, Snowflake, CalendarClock, Euro, ClipboardList, BadgeCheck, Check } from 'lucide-react';

export default function ChangeManagementSection() {
    const changeFlow = [
        'On capture la demande (ticket Notion/email) avec objectif & contexte.',
        'Mini chiffrage : effort (heures/jours) + impact délai/prix.',
        'Validation écrite → intégration au prochain lot/jalon.',
    ];

    const notIncluded = [
        'E-commerce complet & tunnel de paiement avancé',
        'Multi-langue complexe (i18n + contenus traduits)',
        'CRM/ERP sur mesure ou intégrations lourdes tierces',
        'Fonctionnalités app (auth, espace membre avancé)',
    ];

    const freezeFlow = [
        'Fin de cadrage → “gel” des contenus pour produire sereinement.',
        'Modifs majeures hors fenêtre de retours → nouveau lot chiffré.',
        'Retard contenus > 7 jours : on replanifie (dé-gel) sur le prochain créneau.',
    ];

    return (
        <section id="changements" aria-labelledby="changements-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
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
                        <GitPullRequest className="w-3.5 h-3.5" aria-hidden />
                        <span>Gestion des changements</span>
                    </span>
                    <h2 id="changements-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Scope & risques — des règles simples pour rester sereins
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Nouvelles demandes chiffrées en toute transparence, hors-scope clarifié dès le départ et mécanisme de gel/dé-gel pour éviter les dérapages.
                    </p>
                </div>

                {/* Grille 3 cartes */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {/* 1) Change request */}
                    <article className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md lg:col-span-1">
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <GitPullRequest className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Nouvelle demande (change request)</h3>
                        </div>

                        <div className="mt-3 relative h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" />
                            <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                        </div>

                        <ul className="mt-4 space-y-2">
                            {changeFlow.map((label) => (
                                <li key={label} className="flex items-start gap-2.5">
                                    <span className="grid place-content-center size-7 rounded-full border border-sauge/40 bg-sauge/10 text-sauge mt-0.5">
                                        <BadgeCheck className="w-3.5 h-3.5" aria-hidden />
                                    </span>
                                    <span className="text-sm text-foreground/80 leading-relaxed">{label}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto pt-4 flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 text-xs">
                                <CalendarClock className="w-3.5 h-3.5" /> Estimation &lt; 48h
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 text-xs">
                                <Euro className="w-3.5 h-3.5" /> Impact délai/prix
                            </span>
                        </div>

                        <div className="mt-3 rounded-xl border border-sauge/20 bg-sauge/5 p-3">
                            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-sauge/90">Exemple</p>
                            <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                                “Ajouter un carrousel sur la Home” → 0,5&nbsp;j → +2 jours sur le jalon UI. On intègre au lot suivant après OK écrit.
                            </p>
                        </div>
                    </article>

                    {/* 2) Hors-scope (non inclus par défaut) */}
                    <article className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md lg:col-span-1">
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <AlertTriangle className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Hors scope (non inclus par défaut)</h3>
                        </div>

                        <div className="mt-3 relative h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" />
                            <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                        </div>

                        <ul className="mt-4 space-y-2">
                            {notIncluded.map((label) => (
                                <li key={label} className="flex items-start gap-2.5">
                                    <span className="grid place-content-center size-7 rounded-full border border-sauge/40 bg-sauge/10 text-sauge mt-0.5">
                                        <ClipboardList className="w-3.5 h-3.5" aria-hidden />
                                    </span>
                                    <span className="text-sm text-foreground/80 leading-relaxed">{label}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto pt-4 flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 text-xs">
                                <Euro className="w-3.5 h-3.5" /> Sur devis
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 text-xs">
                                <Check className="w-3.5 h-3.5" /> Option possible
                            </span>
                        </div>

                        <div className="mt-3 rounded-xl border border-sauge/20 bg-sauge/5 p-3">
                            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-sauge/90">Exemple</p>
                            <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                                Passage en multi-langue + back-office de traduction : hors scope initial → chiffrage dédié + planning ajusté.
                            </p>
                        </div>
                    </article>

                    {/* 3) Gel / dé-gel des contenus */}
                    <article className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md md:col-span-2 xl:col-span-1">
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <Snowflake className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Gel / dé-gel des contenus</h3>
                        </div>

                        <div className="mt-3 relative h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" />
                            <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                        </div>

                        <ul className="mt-4 space-y-2">
                            {freezeFlow.map((label) => (
                                <li key={label} className="flex items-start gap-2.5">
                                    <span className="grid place-content-center size-7 rounded-full border border-sauge/40 bg-sauge/10 text-sauge mt-0.5">
                                        <BadgeCheck className="w-3.5 h-3.5" aria-hidden />
                                    </span>
                                    <span className="text-sm text-foreground/80 leading-relaxed">{label}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto pt-4 flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 text-xs">
                                <CalendarClock className="w-3.5 h-3.5" /> Fenêtre de retours
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 text-xs">
                                <Euro className="w-3.5 h-3.5" /> Replanif si retard
                            </span>
                        </div>

                        <div className="mt-3 rounded-xl border border-sauge/20 bg-sauge/5 p-3">
                            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-sauge/90">Exemple</p>
                            <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                                Retard textes de 10 jours pendant l’intégration&nbsp;: on “gèle” la pré-prod et on bascule la mise en ligne sur la fenêtre suivante.
                            </p>
                        </div>
                    </article>
                </div>

                <p className="text-xs text-foreground/70">
                    * Objectif : rester prévisibles. Chaque changement est loggé, chiffré et validé avant exécution, sans surprise côté délais ou budget.
                </p>
            </div>
        </section>
    );
}
