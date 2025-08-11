// components/sections/offers/offer/MiniProcess.tsx
'use client';

import { usePathname } from 'next/navigation';
import packsRaw from '@/data/packs.json';
import { Ear, Palette, Code2, Rocket, CalendarClock } from 'lucide-react';

type PackSlug = 'essentiel' | 'croissance' | 'signature';

type Pack = {
    slug: PackSlug;
    delaiNote?: string;
    versions?: {
        wordpress?: { delai?: string };
        react?: { delai?: string };
    };
};

const PACKS = packsRaw as unknown as Pack[];

function getPack(slug: PackSlug) {
    return PACKS.find((p) => p.slug === slug);
}

function normalizeDelai(s?: string) {
    if (!s) return undefined;
    return s.replace(/\s*à\s*/i, '–').replace(/semaines?/i, 'sem.');
}

export default function MiniProcessSection() {
    const pathname = usePathname();
    const match = pathname.match(/^\/offres\/(essentiel|croissance|signature)\/?$/);
    const key = (match?.[1] as PackSlug) ?? 'essentiel';

    const pack = getPack(key);
    const wpDelai = normalizeDelai(pack?.versions?.wordpress?.delai);
    const rnDelai = normalizeDelai(pack?.versions?.react?.delai);

    const steps = [
        {
            icon: Ear,
            label: 'Écoute & cadrage',
            desc: 'On pose l’intention, les besoins et le périmètre. Tu n’as pas besoin d’avoir tout clair : on le fait ensemble.',
        },
        {
            icon: Palette,
            label: 'Ambiance & design',
            desc: 'Moodboard léger, bases UI/UX, structure des pages. On valide l’univers avant d’avancer.',
        },
        {
            icon: Code2,
            label: 'Développement',
            desc: 'Intégration WordPress ou React/Next, responsive, SEO de base et micro-animations utiles.',
        },
        {
            icon: Rocket,
            label: 'Tests & mise en ligne',
            desc: 'Contrôles finaux, corrections, mise en ligne accompagnée + petit guide de prise en main.',
        },
    ] as const;

    return (
        <section aria-labelledby="process-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-5xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <CalendarClock className="h-3.5 w-3.5" aria-hidden />
                        Processus & délais
                    </span>
                    <h2 id="process-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Un processus clair, doux et structuré
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Quatre étapes simples pour créer un site aligné : on écoute, on pose l’ambiance, on développe, on met en ligne — sans jargon, sans pression.
                    </p>

                    {/* Chips de délais (depuis packs.json) */}
                    <div className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-start">
                        {wpDelai && (
                            <span className="inline-flex items-center gap-2 rounded-full border border-sauge/40 bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
                                WordPress&nbsp;: {wpDelai}
                            </span>
                        )}
                        {rnDelai && (
                            <span className="inline-flex items-center gap-2 rounded-full border border-sauge/40 bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
                                React / Next&nbsp;: {rnDelai}
                            </span>
                        )}
                    </div>
                </div>

                {/* Les 4 étapes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
                    {steps.map(({ icon: Icon, label, desc }, i) => (
                        <article
                            key={label}
                            className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                        >
                            {/* Header (badge n° + icône) */}
                            <div className="flex items-center gap-3">
                                <span className="inline-flex items-center justify-center size-7 rounded-full border border-ormat/30 bg-ormat/10 text-[11px] font-semibold text-ormat">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <Icon className="w-4 h-4" aria-hidden />
                                </span>
                            </div>

                            <h3 className="mt-3 text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">{label}</h3>

                            {/* Séparateur animé */}
                            <div className="mt-3 relative h-[2px] overflow-hidden" aria-hidden>
                                <div className="absolute inset-0 bg-sauge/20" />
                                <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                            </div>

                            <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{desc}</p>

                            <div className="mt-auto pt-4" />
                        </article>
                    ))}
                </div>

                {/* Micro-note seule (pas de lien externe) */}
                <p className="text-xs text-foreground/70">
                    Capacité : <strong>1 projet / mois</strong>.
                </p>

                {/* Note spécifique du pack (si présente) */}
                {pack?.delaiNote && <p className="text-xs text-foreground/70">{pack.delaiNote}</p>}
            </div>
        </section>
    );
}
