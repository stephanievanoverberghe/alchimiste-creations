// components/offers/AddonsGrid.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import packsRaw from '@/infrastructure/content/packs.json';
import type { ComponentType } from 'react';
import { cn } from '@/shared/utils/cn';
import { CalendarClock, BookOpen, Languages, FileCog, Search, ShoppingBag, FilePlus, PenTool, Palette, Type as TypeIcon, Puzzle, Boxes, Code2, FileText } from 'lucide-react';

type Tech = 'wordpress' | 'react';
type PackSlug = 'essentiel' | 'croissance' | 'signature';

type Pack = {
    slug: PackSlug;
    options?: { label: string; prix: string | { wordpress?: string; react?: string } }[];
};

const PACKS = packsRaw as Pack[];

// Helpers
const normalize = (s: string) =>
    s
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

type Meta = { key: string; icon: ComponentType<{ className?: string }>; desc: string };
function metaFor(label: string): Meta {
    const n = normalize(label);
    if (n.includes('blog')) return { key: 'blog', icon: BookOpen, desc: 'Articles, catégories, gabarit d’article.' };
    if (n.includes('formulaire')) return { key: 'form-adv', icon: FileCog, desc: 'Champs conditionnels, logique, anti-spam.' };
    if (n.includes('multilingue') || n.includes('i18n') || n.includes('langue')) return { key: 'i18n', icon: Languages, desc: 'FR/EN avec sélecteur et URLs propres.' };
    if (n.includes('reservation') || n.includes('calendly') || n.includes('cal.com')) return { key: 'booking', icon: CalendarClock, desc: 'Prise de RDV (embed) + consentement.' };
    if (n.includes('seo')) return { key: 'seo-adv', icon: Search, desc: 'Plan sémantique, maillage, données structurées.' };
    if (n.includes('page suppl')) return { key: 'page', icon: FilePlus, desc: 'Gabarit cohérent, intégré au menu.' };
    if (n.includes('logo')) return { key: 'logo', icon: PenTool, desc: '3 pistes + variantes + guide court.' };
    if (n.includes('brand kit') || n.includes('brand')) return { key: 'brand-kit', icon: Palette, desc: 'Usages, icônes, bannières (≈10 pages).' };
    if (n.includes('copywriting')) return { key: 'copy', icon: TypeIcon, desc: 'Jusqu’à 800 mots / page.' };
    if (n.includes('commerce') || n.includes('woocommerce') || n.includes('boutique')) return { key: 'ecom', icon: ShoppingBag, desc: 'Boutique WordPress (WooCommerce).' };
    return { key: 'custom', icon: Puzzle, desc: 'Extension utile adaptée au besoin.' };
}

function getPack(slug: PackSlug) {
    return PACKS.find((p) => p.slug === slug);
}

export default function OptionsGridSection({ tech, onTechChange, slug }: { tech: Tech; onTechChange: (t: Tech) => void; slug?: PackSlug }) {
    const pathname = usePathname();
    const match = pathname.match(/^\/offres\/(essentiel|croissance|signature)\/?$/);
    const key = slug ?? (match?.[1] as PackSlug) ?? 'essentiel';

    const pack = getPack(key);
    const options = pack?.options ?? [];

    return (
        <section aria-labelledby="addons-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            {/* Liseré décoratif en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            {/* Fond or mobile only */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            {/* Vague décorative (md+) */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="" fill loading="lazy" className="h-auto object-cover" />
            </div>

            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <Boxes className="w-3.5 h-3.5" aria-hidden />
                        Options {tech === 'wordpress' ? '(WordPress)' : '(React/Next.js)'}
                    </span>
                    <h2 id="addons-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Options à la carte
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">On ajoute ce qu’il faut — seulement si c’est utile à ton projet.</p>

                    {/* Switch techno — même design que PacksSection */}
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
                                        className={cn(
                                            'inline-flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl',
                                            'text-xs tracking-[0.14em] uppercase font-semibold transition transform',
                                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40 focus-visible:ring-offset-2',
                                            active ? 'bg-sauge text-background shadow-sm' : 'cursor-pointer text-sauge hover:bg-sauge/10 hover:-translate-y-[1px] hover:shadow-sm',
                                        )}
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
                    <p className="text-xs text-foreground/70">E-commerce : disponible uniquement sous WordPress.</p>
                </div>

                {/* Grid options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
                    {options.map((o, idx) => {
                        const { key: k, icon: Icon, desc } = metaFor(o.label);
                        const raw = typeof o.prix === 'string' ? o.prix : (o.prix?.[tech] ?? '—');
                        const isDevis = /devis/i.test(raw);
                        const isUnavailableReactEcom = tech === 'react' && k === 'ecom';
                        const display = isUnavailableReactEcom ? 'Non proposé en React' : isDevis ? 'Sur devis' : `À partir de ${String(raw).replace(/^\+/, '')}`;

                        return (
                            <div
                                key={`${k}-${idx}`}
                                aria-disabled={isUnavailableReactEcom}
                                className={cn(
                                    'group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all',
                                    'hover:-translate-y-0.5 hover:shadow-md',
                                    isUnavailableReactEcom && 'opacity-60',
                                )}
                            >
                                {/* Header (icône + titre) */}
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge shrink-0">
                                        <Icon className="w-4 h-4" aria-hidden />
                                    </span>
                                    <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta leading-none">{o.label}</h3>
                                </div>

                                {/* Séparateur animé */}
                                <div className="mt-3 relative h-[2px] overflow-hidden" aria-hidden>
                                    <div className="absolute inset-0 bg-sauge/20" />
                                    <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full group-focus-within:w-1/2" />
                                </div>

                                {/* Description */}
                                <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{isUnavailableReactEcom ? 'Disponible en WordPress uniquement.' : desc}</p>

                                {/* Footer (prix + techno) */}
                                <div className="mt-auto pt-4 flex items-center justify-between">
                                    <span
                                        className={cn(
                                            'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider',
                                            isUnavailableReactEcom || isDevis
                                                ? 'border-foreground/25 text-foreground/70 bg-foreground/5'
                                                : 'border-terracotta/30 text-terracotta bg-terracotta/10',
                                        )}
                                    >
                                        {display}
                                    </span>
                                    <span className="text-xs text-foreground/60">{tech === 'wordpress' ? 'WordPress' : 'React/Next'}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA global */}
                <div className="flex justify-center">
                    <Link
                        href="/contact"
                        className="inline-block px-6 py-3 text-center rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                    >
                        Réserver mon appel
                    </Link>
                </div>

                <p className="mt-3 text-xs text-foreground/70">Prix « à partir de », ajustés selon la portée exacte. Les détails sont précisés ensemble lors du premier échange.</p>
            </div>
        </section>
    );
}
