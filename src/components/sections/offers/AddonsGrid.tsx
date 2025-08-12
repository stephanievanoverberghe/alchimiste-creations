'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ComponentType } from 'react';
import { CalendarClock, BookOpen, Languages, FileCog, Search, ShoppingBag, FileText, Code2 } from 'lucide-react';

type Tech = 'wordpress' | 'react';

type Addon = {
    key: string;
    title: string;
    desc: string;
    icon: ComponentType<{ className?: string }>;
    price: { wordpress?: string; react?: string };
};

const ADDONS: Addon[] = [
    { key: 'blog', title: 'Blog', desc: 'Articles, catégories, gabarit d’article.', icon: BookOpen, price: { wordpress: '+200€', react: '+350€' } },
    { key: 'form-adv', title: 'Formulaire avancé', desc: 'Champs conditionnels, logique, anti-spam.', icon: FileCog, price: { wordpress: '+50€', react: '+120€' } },
    { key: 'i18n', title: 'Multilingue', desc: 'FR/EN avec sélecteur et URLs propres.', icon: Languages, price: { wordpress: '+300€', react: '+500€' } },
    { key: 'booking', title: 'Réservation en ligne', desc: 'Embed Calendly / Cal.com + consentement RGPD.', icon: CalendarClock, price: { wordpress: '+250€', react: '+180€' } },
    { key: 'seo-adv', title: 'SEO avancé + stratégie', desc: 'Plan sémantique, maillage, données structurées.', icon: Search, price: { wordpress: '+400€', react: '+400€' } },
    { key: 'ecom', title: 'E-commerce', desc: 'Boutique WordPress (WooCommerce).', icon: ShoppingBag, price: { wordpress: 'Sur devis', react: '—' } },
];

export default function AddonsGridSection({ tech, onTechChange }: { tech: Tech; onTechChange: (t: Tech) => void }) {
    return (
        <section aria-labelledby="addons-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            {/* Liseré en haut */}
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
                        {tech === 'wordpress' ? <FileText className="w-3.5 h-3.5" aria-hidden /> : <Code2 className="w-3.5 h-3.5" aria-hidden />}
                        <span>{tech === 'wordpress' ? 'Options (WordPress)' : 'Options (React)'}</span>
                    </span>

                    <h2 id="addons-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Options à la carte
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">On ajoute ce qu’il faut — seulement si c’est utile à ton projet.</p>

                    {/* Switch techno — même design que les autres sections */}
                    <div className="mt-4 flex justify-center lg:justify-start">
                        <div className="w-full grid grid-cols-2 sm:inline-flex rounded-2xl border border-sauge/30 bg-background p-1 sm:w-auto">
                            {(['wordpress', 'react'] as Tech[]).map((t) => {
                                const active = t === tech;
                                const label = t === 'wordpress' ? 'WP' : 'React';
                                const aria = t === 'wordpress' ? 'WordPress (éditeur visuel)' : 'React/Next.js (sur-mesure)';
                                return (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => onTechChange(t)}
                                        aria-pressed={active}
                                        aria-current={active ? 'true' : undefined}
                                        aria-label={aria}
                                        title={aria}
                                        className={`inline-flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl
                                text-xs tracking-[0.14em] uppercase font-semibold transition transform
                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40 focus-visible:ring-offset-2
                                ${active ? 'bg-sauge text-background shadow-sm' : 'cursor-pointer text-sauge hover:bg-sauge/10 hover:-translate-y-[1px] hover:shadow-sm'}`}
                                    >
                                        {t === 'wordpress' ? <FileText className="w-4 h-4" aria-hidden /> : <Code2 className="w-4 h-4" aria-hidden />}
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Micro-notes */}
                    <p className="mt-3 text-xs text-foreground/70">Devis personnalisé après un premier échange — pas de commande en ligne.</p>
                    <p className="text-xs text-foreground/70">E-commerce : disponible uniquement sous WordPress pour le moment.</p>
                </div>

                {/* Grid options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch">
                    {ADDONS.map((a) => {
                        const Icon = a.icon;
                        const raw = a.price[tech] ?? '—';
                        const isDevis = /devis/i.test(raw);
                        const isUnavailableReactEcom = tech === 'react' && a.key === 'ecom';
                        const display = isUnavailableReactEcom ? 'Non proposé en React' : isDevis ? 'Sur devis' : `À partir de ${raw.replace(/^\+/, '')}`;

                        return (
                            <article
                                key={a.key}
                                className={[
                                    'group relative h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all',
                                    'hover:-translate-y-0.5 hover:shadow-md',
                                    isUnavailableReactEcom ? 'opacity-60 cursor-not-allowed' : '',
                                ].join(' ')}
                            >
                                <div className="relative z-[1]">
                                    {/* Header (icône + titre) */}
                                    <div className="flex items-center gap-3">
                                        <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                            <Icon className="w-4 h-4" aria-hidden />
                                        </span>
                                        <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">{a.title}</h3>
                                    </div>

                                    {/* Ligne décorative (cohérente) */}
                                    <div className="mt-3 relative h-[2px] overflow-hidden">
                                        <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                        <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                                    </div>

                                    {/* Description */}
                                    <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{isUnavailableReactEcom ? 'Disponible en WordPress uniquement.' : a.desc}</p>
                                </div>

                                {/* Footer fixé en bas */}
                                <div className="relative z-[1] mt-auto pt-4 flex items-center justify-between">
                                    <span
                                        className={[
                                            'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider',
                                            isUnavailableReactEcom || isDevis
                                                ? 'border-foreground/25 text-foreground/70 bg-foreground/5'
                                                : 'border-terracotta/30 text-terracotta bg-terracotta/10',
                                        ].join(' ')}
                                    >
                                        {display}
                                    </span>
                                    <span className="text-xs text-foreground/60">{tech === 'wordpress' ? 'WordPress' : 'React'}</span>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* CTA global */}
                <div className="flex justify-center">
                    <Link
                        href="/contact"
                        className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl
               bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold
               tracking-widest uppercase border-b-2 border-r-2 border-ormat transition
               hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                    >
                        <CalendarClock className="w-4 h-4" aria-hidden />
                        Réserver un appel
                    </Link>
                </div>

                <p className="mt-3 text-xs text-foreground/70">
                    * Prix « à partir de », ajustés selon la portée exacte. Les détails sont précisés ensemble lors du premier échange.
                </p>
            </div>
        </section>
    );
}
