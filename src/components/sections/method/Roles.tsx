'use client';

import Image from 'next/image';
import { Users, UserCheck, Handshake, CheckCircle2, Clock, FileText, LayoutTemplate, Palette, Code2, KeyRound, PlayCircle, Database } from 'lucide-react';

type RolesProps = {
    mine?: string[];
    yours?: string[];
    shared?: string[];
    sla?: {
        me?: string;
        you?: string;
    };
    formats?: string[];
};

export default function RolesSection({ mine, yours, shared, sla, formats }: RolesProps) {
    const ME = mine ?? [
        'Architecture & design système (UI Kit)',
        'Wireframes & maquettes UI',
        'Intégration (WordPress ou React)',
        'Performance, accessibilité & SEO de base',
        'Mise en ligne (DNS/SSL) & passation',
    ];

    const YOU = yours ?? [
        'Contenus (textes, images, logo) & droits/licences',
        'Accès (nom de domaine, hébergement, CMS)',
        'Validations aux jalons (wireframes → UI → dev)',
        'Retours dans les fenêtres prévues (1–2 cycles/étape)',
        'Conformité légale (mentions, CGU/CGV, cookies)',
    ];

    const SHARED = shared ?? [
        'Objectifs & priorités des pages',
        'Arborescence & parcours utilisateurs',
        'Tests de recette (formulaires, responsive)',
        'Choix des options & itérations',
        'Plan de suivi post-lancement',
    ];

    const SLA = {
        me: sla?.me ?? 'Réponse sous 24–48 h ouvrées',
        you: sla?.you ?? 'Validation sous 3 jours ouvrés',
    };

    const FORMATS = formats ?? ['Google Docs', 'Figma', 'Notion/Drive', 'CMS', 'Replay vidéo', 'Accès + codes'];

    return (
        <section id="roles" aria-labelledby="roles-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            {/* Liseré décoratif en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            {/* Fond or avec opacité 10% UNIQUEMENT sur mobile */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />

            {/* Vague décorative visible uniquement à partir de md */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="Vague décorative" className="h-auto" fill priority />
            </div>
            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête (badge + H2 + phrase) */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <Users className="w-3.5 h-3.5" aria-hidden />
                        <span>Rôles & responsabilités</span>
                    </span>
                    <h2 id="roles-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Qui fait quoi — clair, cadré, serein
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        On répartit les responsabilités pour éviter les malentendus. Trois colonnes&nbsp;:
                        <em className="not-italic"> moi / toi / partagé</em>, des délais de réponse doux, et des formats de livrables explicites.
                    </p>
                </div>

                {/* Tableau 3 colonnes (cartes) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {/* Moi */}
                    <article className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <UserCheck className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Moi</h3>
                        </div>

                        <div className="mt-3 relative h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                            <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                        </div>

                        <ul className="mt-3 space-y-2.5">
                            {ME.map((item) => (
                                <li key={item} className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-sauge" aria-hidden />
                                    <span className="text-sm text-foreground/80 leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </article>

                    {/* Toi */}
                    <article className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <Users className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Toi (client)</h3>
                        </div>

                        <div className="mt-3 relative h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                            <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                        </div>

                        <ul className="mt-3 space-y-2.5">
                            {YOU.map((item) => (
                                <li key={item} className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-sauge" aria-hidden />
                                    <span className="text-sm text-foreground/80 leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </article>

                    {/* Partagé */}
                    <article className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md md:col-span-2 xl:col-span-1">
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <Handshake className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Partagé</h3>
                        </div>

                        <div className="mt-3 relative h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                            <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                        </div>

                        <ul className="mt-3 space-y-2.5">
                            {SHARED.map((item) => (
                                <li key={item} className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-sauge" aria-hidden />
                                    <span className="text-sm text-foreground/80 leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </article>
                </div>

                {/* SLA doux + Formats des livrables */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    {/* SLA doux */}
                    <div className="rounded-[20px] border border-sauge/30 bg-background p-5">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-sauge" aria-hidden />
                            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Délais de réponse (SLA doux)</p>
                        </div>
                        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <li className="flex items-center gap-2 rounded-xl border border-sauge/20 bg-sauge/5 px-3 py-2">
                                <UserCheck className="w-4 h-4 text-sauge" aria-hidden />
                                <span className="text-sm text-foreground/80">Moi&nbsp;: {SLA.me}</span>
                            </li>
                            <li className="flex items-center gap-2 rounded-xl border border-sauge/20 bg-sauge/5 px-3 py-2">
                                <Users className="w-4 h-4 text-sauge" aria-hidden />
                                <span className="text-sm text-foreground/80">Toi&nbsp;: {SLA.you}</span>
                            </li>
                        </ul>
                        <p className="mt-2 text-xs text-foreground/70">* Hors week-ends/jours fériés. Les fenêtres de retours sont précisées à chaque jalon.</p>
                    </div>

                    {/* Formats livrables */}
                    <div className="rounded-[20px] border border-sauge/30 bg-background p-5">
                        <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-sauge" aria-hidden />
                            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Formats des livrables</p>
                        </div>

                        <ul className="mt-3 flex flex-wrap gap-2">
                            {FORMATS.map((f) => (
                                <li key={f} className="inline-flex items-center gap-2 rounded-xl border border-sauge/20 bg-sauge/5 px-3 py-1.5 text-sm text-foreground/80">
                                    {(() => {
                                        // petite association icône/format
                                        if (/figma/i.test(f)) return <LayoutTemplate className="w-4 h-4 text-sauge" aria-hidden />;
                                        if (/docs|doc/i.test(f)) return <FileText className="w-4 h-4 text-sauge" aria-hidden />;
                                        if (/palette|ui/i.test(f)) return <Palette className="w-4 h-4 text-sauge" aria-hidden />;
                                        if (/cms|wordpress|headless/i.test(f)) return <Database className="w-4 h-4 text-sauge" aria-hidden />;
                                        if (/code|repo|github/i.test(f)) return <Code2 className="w-4 h-4 text-sauge" aria-hidden />;
                                        if (/replay|video/i.test(f)) return <PlayCircle className="w-4 h-4 text-sauge" aria-hidden />;
                                        if (/accès|codes|keys?/i.test(f)) return <KeyRound className="w-4 h-4 text-sauge" aria-hidden />;
                                        return <FileText className="w-4 h-4 text-sauge" aria-hidden />;
                                    })()}
                                    <span>{f}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-2 text-xs text-foreground/70">* Un canal unique “source of truth” (ex. Notion/Email) est défini en début de projet.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
