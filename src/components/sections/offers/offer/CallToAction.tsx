// components/sections/offers/offer/FinalCTA.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import packsRaw from '@/data/packs.json';
import { cn } from '@/lib/utils';

type PackSlug = 'essentiel' | 'croissance' | 'signature';

type Pack = {
    slug: PackSlug;
    titre: string;
    sousTitre?: string;
    cible?: string;
};

const ORDER: PackSlug[] = ['essentiel', 'croissance', 'signature'];
const PACKS = (packsRaw as Pack[]).filter((p) => ORDER.includes(p.slug));

export default function CallToActionSection() {
    const pathname = usePathname();

    // /offres/[slug]
    const match = pathname.match(/^\/offres\/(essentiel|croissance|signature)\b/);
    const slug = (match?.[1] as PackSlug) ?? 'essentiel';

    const pack = PACKS.find((p) => p.slug === slug);
    const titre = pack?.titre ?? 'Pack';

    return (
        <section aria-labelledby="final-cta-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            {/* Fond or avec opacité 10% UNIQUEMENT sur mobile */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />

            {/* Vague décorative visible uniquement à partir de md */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/home-wave.png" alt="Vague décorative" className="h-auto" fill priority />
            </div>

            <div className="relative max-w-5xl mx-auto text-center lg:text-left">
                <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                    On lance {titre} ?
                </span>

                <h2 id="final-cta-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                    Prêt·e à démarrer sereinement ?
                </h2>

                {/* Pitch court, sans infos tech/prix/délais */}
                <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                    On clarifie l’objectif, on cadre la portée et on planifie la mise en ligne. Tu repars avec un plan simple et des prochaines étapes concrètes.
                </p>

                {/* Boutons → /contact */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                    <Link
                        href="/contact"
                        className={cn(
                            'px-6 py-3 rounded-2xl text-center',
                            'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                            'border-b-2 border-r-2 border-ormat transition hover:scale-105',
                            'shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                        )}
                    >
                        Demander un devis
                    </Link>

                    <Link
                        href="/contact"
                        className={cn(
                            'px-6 py-3 rounded-2xl text-center',
                            'bg-background hover:bg-foreground/5 text-foreground text-sm font-semibold tracking-widest uppercase',
                            'border border-sauge/40 transition'
                        )}
                    >
                        Réserver un appel
                    </Link>
                </div>

                {/* Micro-confiance */}
                <p className="mt-4 text-xs text-foreground/60">Réponse sous 24–48h · 1 projet/mois · Devis sans engagement</p>
            </div>
        </section>
    );
}
