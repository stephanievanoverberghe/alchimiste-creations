// components/offers/HeroPack.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import rawPacks from '@/data/packs.json';
import { getVersion, type Tech } from '@/lib/packs'; // déjà utilisé dans Packs.tsx
import { cn } from '@/lib/utils';

type Slug = 'essentiel' | 'croissance' | 'signature';

type PackVersion = { prix: string; delai: string };
type Pack = {
    slug: Slug;
    titre: string;
    sousTitre: string;
    cible?: string; // “pour qui”
    versions?: Record<string, PackVersion | undefined>;
    prix: string; // fallback
    delaiNote?: string; // micro-note délais
};

const PACKS: Pack[] = rawPacks as unknown as Pack[];

function getPackBySlug(slug: Slug): Pack | undefined {
    return PACKS.find((p) => p.slug === slug);
}

export default function HeroSection({
    slug,
    tech,
    onTechChange,
}: {
    slug: Slug;
    tech: Tech; // 'wordpress' | 'react'
    onTechChange: (t: Tech) => void;
}) {
    const pack = getPackBySlug(slug);
    if (!pack) return null;

    const version = pack.versions ? getVersion(pack.versions, tech) : undefined;
    const price = version?.prix ?? pack.prix;
    const delay = version?.delai;

    const titleSansPrefix = pack.titre.replace(/^Pack\s+/i, '');

    return (
        <section aria-labelledby="hero-pack-title" className="relative overflow-hidden py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            {/* Fond or mobile-only */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            {/* Vague décorative (md+) */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/home-wave.png" alt="" fill priority className="h-auto object-cover" />
            </div>

            <div className="relative max-w-5xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête : badge + titre */}
                <div className="text-center lg:text-left">
                    <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        Pack {titleSansPrefix}
                    </span>

                    <h1 id="hero-pack-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        {pack.sousTitre}
                    </h1>

                    {pack.cible && <p className="mt-3 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">{pack.cible}</p>}
                </div>

                {/* Switch techno */}
                <div className="flex justify-center lg:justify-start">
                    <div role="tablist" aria-label="Technologie" className="inline-flex items-center rounded-full border border-sauge/40 bg-background p-1 shadow-sm">
                        <button
                            role="tab"
                            aria-selected={tech === 'wordpress'}
                            onClick={() => onTechChange('wordpress')}
                            className={cn(
                                'px-4 py-1.5 text-sm font-semibold rounded-full transition cursor-pointer',
                                tech === 'wordpress' ? 'bg-sauge/15 text-foreground' : 'text-foreground/70 hover:text-foreground'
                            )}
                        >
                            WordPress
                        </button>
                        <button
                            role="tab"
                            aria-selected={tech === 'react'}
                            onClick={() => onTechChange('react')}
                            className={cn(
                                'px-4 py-1.5 text-sm font-semibold rounded-full transition cursor-pointer',
                                tech === 'react' ? 'bg-sauge/15 text-foreground' : 'text-foreground/70 hover:text-foreground'
                            )}
                        >
                            React / Next.js
                        </button>
                    </div>
                </div>

                {/* Info prix + délais + CTAs */}
                <div className="grid grid-cols-1 sm:grid-cols-[auto_auto] lg:grid-cols-[auto_auto_1fr] items-center gap-4 md:gap-6">
                    {/* Prix */}
                    <div className="rounded-2xl border border-terracotta/30 bg-terracotta/10 px-4 py-3">
                        <div className="text-[11px] uppercase tracking-wider text-terracotta/90 font-semibold">À partir de</div>
                        <div className="text-xl md:text-2xl font-semibold text-terracotta mt-1">{price}</div>
                    </div>

                    {/* Délais */}
                    {delay && (
                        <div className="rounded-2xl border border-sauge/30 bg-sauge/10 px-4 py-3">
                            <div className="text-[11px] uppercase tracking-wider text-sauge/90 font-semibold">Délais estimés</div>
                            <div className="text-sm md:text-base text-foreground/85 mt-1">{delay}</div>
                        </div>
                    )}

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:justify-end lg:justify-start">
                        <Link
                            href={`/contact?pack=${slug}&tech=${tech}&type=devis`}
                            className="inline-block px-6 py-3 text-center rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                        >
                            Demander un devis
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-block px-6 py-3 text-center rounded-2xl border border-sauge/40 text-sm font-semibold tracking-widest uppercase hover:bg-sauge/10"
                        >
                            Réserver un appel
                        </Link>
                    </div>
                </div>

                {/* Micro-note */}
                <p className="text-xs text-foreground/70">{pack.delaiNote ?? 'Délais indicatifs, ajustés selon besoins et disponibilité.'}</p>
            </div>
        </section>
    );
}
