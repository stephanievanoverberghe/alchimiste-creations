'use client';

import Image from 'next/image';
import { ShieldCheck, Smartphone, Accessibility, Search, BookOpen, Gauge, BadgeCheck, FileText } from 'lucide-react';

export default function GuaranteesSection() {
    const items = [
        {
            icon: Smartphone,
            title: 'Mobile-first rapide',
            desc: 'Performance soignée et chargement fluide sur tous les écrans.',
            chips: [
                { icon: Gauge, text: 'LCP ≤ 2.5s (cible)' },
                { icon: BadgeCheck, text: 'Images optimisées' },
            ],
        },
        {
            icon: Accessibility,
            title: 'Accessibilité & bonnes pratiques',
            desc: 'Structure sémantique, navigation clavier et contrastes vérifiés.',
            chips: [
                { icon: BadgeCheck, text: 'WCAG AA (cible)' },
                { icon: BadgeCheck, text: 'Labels & focus' },
            ],
        },
        {
            icon: Search,
            title: 'SEO de base',
            desc: 'Titres et metas, Open Graph, sitemap et robots configurés.',
            chips: [
                { icon: BadgeCheck, text: 'Titres & metas' },
                { icon: BadgeCheck, text: 'OG / Sitemap / Robots' },
            ],
        },
        {
            icon: BookOpen,
            title: 'Passation + mini-guide',
            desc: 'Remise des accès, guide simple et conseils d’usage pour être autonome.',
            chips: [
                { icon: FileText, text: 'Guide PDF / vidéo' },
                { icon: BadgeCheck, text: 'Accès & codes remis' },
            ],
        },
    ] as const;

    return (
        <section aria-labelledby="guarantees-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            {/* Liseré décoratif en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            {/* Fond or mobile only */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            {/* Vague décorative (md+) */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="" fill priority className="h-auto object-cover" />
            </div>

            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <ShieldCheck className="w-3.5 h-3.5" aria-hidden />
                        Mes engagements
                    </span>
                    <h2 id="guarantees-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Ce que je garantis, concrètement
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Des bases solides et durables, sans promesses creuses : un site rapide, accessible, prêt pour le SEO — et une passation claire.
                    </p>
                </div>

                {/* Cartes garanties */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {items.map(({ icon: Icon, title, desc, chips }) => (
                        <li
                            key={title}
                            className="group relative flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="flex items-center gap-3">
                                <span className="grid place-content-center size-10 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <Icon className="w-5 h-5" aria-hidden />
                                </span>
                                <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">{title}</h3>
                            </div>

                            {/* Séparateur fin */}
                            <div className="mt-3 relative h-[2px] overflow-hidden">
                                <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                <div
                                    className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                    aria-hidden
                                />
                            </div>

                            <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{desc}</p>

                            {/* Chips livrables / cibles */}
                            {chips?.length ? (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {chips.map(({ icon: CIcon, text }) => (
                                        <span key={text} className="inline-flex items-center gap-1.5 rounded-xl border border-sauge/30 bg-sauge/10 text-sauge px-3 py-1.5 text-xs">
                                            <CIcon className="w-3.5 h-3.5" aria-hidden />
                                            {text}
                                        </span>
                                    ))}
                                </div>
                            ) : null}
                        </li>
                    ))}
                </ul>

                {/* Micro-note rassurante */}
                <p className="text-xs text-foreground/70">
                    * Les objectifs de performance et d’accessibilité sont adaptés au contenu et à l’hébergement. On vise le bon équilibre vitesse / qualité / design.
                </p>
            </div>
        </section>
    );
}
