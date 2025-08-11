// components/method/SEOSection.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, Tags, Share2, Network, Bot, Link2, FileText, Cookie, ShieldCheck, BarChart3, MousePointerClick, LineChart, ListChecks } from 'lucide-react';

export default function SEOSection() {
    const baseSEO = [
        { icon: Tags, label: 'Titres & metas propres' },
        { icon: FileText, label: 'HTML sémantique (Hn, landmarks)' },
        { icon: Share2, label: 'Balises OG/Twitter Card' },
        { icon: Network, label: 'Sitemap.xml + robots.txt' },
        { icon: Link2, label: 'Canonicals & maillage simple' },
    ];

    const analytics = [
        { icon: ShieldCheck, label: 'RGPD-friendly par défaut' },
        { icon: Cookie, label: 'Consent Mode V2' },
        { icon: BarChart3, label: 'Events de base (pages, CTA, formulaires)' },
        { icon: MousePointerClick, label: 'Click/submit tracking léger' },
    ];

    const advanced = [
        'Recherche d’intentions & mots-clés',
        'Plan de contenus (pages piliers / opportunités)',
        'Schema.org avancé (FAQ, HowTo, Article…)',
        'Plan de maillage interne élargi',
        'Redirects/404 + suivi post-mise en ligne',
    ];

    return (
        <section id="seo" aria-labelledby="seo-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
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
                        <Search className="w-3.5 h-3.5" aria-hidden />
                        <span>SEO & Analytics</span>
                    </span>
                    <h2 id="seo-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        SEO & analytics — la base incluse, l’avancé en option
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Un socle SEO technique propre et une mesure respectueuse de la vie privée. On peut pousser plus loin selon les objectifs.
                    </p>
                </div>

                {/* Grille 3 cartes */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {/* SEO technique (inclus) */}
                    <article className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md lg:col-span-1">
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <ListChecks className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Inclus par défaut — SEO technique</h3>
                        </div>

                        <div className="mt-3 relative h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" />
                            <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                        </div>

                        <ul className="mt-4 space-y-2">
                            {baseSEO.map(({ icon: Icon, label }) => (
                                <li key={label} className="flex items-start gap-2.5">
                                    <span className="grid place-content-center size-7 rounded-full border border-sauge/40 bg-sauge/10 text-sauge mt-0.5">
                                        <Icon className="w-3.5 h-3.5" aria-hidden />
                                    </span>
                                    <span className="text-sm text-foreground/80 leading-relaxed">{label}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto pt-4 flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 text-xs">
                                <Network className="w-3.5 h-3.5" /> sitemap.xml
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 text-xs">
                                <Bot className="w-3.5 h-3.5" /> robots.txt
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 text-xs">
                                <Share2 className="w-3.5 h-3.5" /> Open Graph
                            </span>
                        </div>

                        <div className="mt-3 rounded-xl border border-sauge/20 bg-sauge/5 p-3">
                            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-sauge/90">Exemple</p>
                            <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                                Titres H1–H3 structurés, métadonnées cohérentes, canonicals et maillage simple vers les pages “offres” & “contact”.
                            </p>
                        </div>
                    </article>

                    {/* Analytics RGPD-friendly */}
                    <article className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md lg:col-span-1">
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <ShieldCheck className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Mesure & consentement</h3>
                        </div>

                        <div className="mt-3 relative h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" />
                            <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                        </div>

                        <ul className="mt-4 space-y-2">
                            {analytics.map(({ icon: Icon, label }) => (
                                <li key={label} className="flex items-start gap-2.5">
                                    <span className="grid place-content-center size-7 rounded-full border border-sauge/40 bg-sauge/10 text-sauge mt-0.5">
                                        <Icon className="w-3.5 h-3.5" aria-hidden />
                                    </span>
                                    <span className="text-sm text-foreground/80 leading-relaxed">{label}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto pt-4 flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 text-xs">
                                <Cookie className="w-3.5 h-3.5" /> Consent Mode
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 text-xs">
                                <BarChart3 className="w-3.5 h-3.5" /> Events clé
                            </span>
                        </div>

                        <div className="mt-3 rounded-xl border border-sauge/20 bg-sauge/5 p-3">
                            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-sauge/90">Exemple</p>
                            <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                                Tracking des envois de formulaires & clics CTA, sans cookies avant consentement, rapport de base livré en fin de projet.
                            </p>
                        </div>
                    </article>

                    {/* Option avancée */}
                    <article className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md md:col-span-2 xl:col-span-1">
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <LineChart className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Option SEO avancé</h3>
                        </div>

                        <div className="mt-3 relative h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" />
                            <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                        </div>

                        <ul className="mt-4 space-y-2">
                            {advanced.map((item) => (
                                <li key={item} className="flex items-start gap-2.5">
                                    <span className="grid place-content-center size-7 rounded-full border border-sauge/40 bg-sauge/10 text-sauge mt-0.5">
                                        <Search className="w-3.5 h-3.5" aria-hidden />
                                    </span>
                                    <span className="text-sm text-foreground/80 leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto pt-4 flex items-center justify-between gap-3">
                            <p className="text-xs text-foreground/70">* Sur devis, selon volume & concurrence.</p>
                            <Link href="/offres" className="text-[11px] tracking-[0.16em] uppercase font-semibold text-terracotta hover:underline">
                                Voir les offres →
                            </Link>
                        </div>

                        <div className="mt-3 rounded-xl border border-sauge/20 bg-sauge/5 p-3">
                            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-sauge/90">Exemple</p>
                            <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                                Audit sémantique + plan d’articles, schémas FAQ/HowTo sur les pages piliers, redirections & suivi des positions 30 jours.
                            </p>
                        </div>
                    </article>
                </div>

                <p className="text-xs text-foreground/70">
                    * Le socle SEO/analytics est inclus dans chaque pack. Les actions avancées sont proposées si elles créent un gain mesurable.
                </p>
            </div>
        </section>
    );
}
