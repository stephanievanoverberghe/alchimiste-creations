// components/method/MethodPrinciplesSection.tsx
'use client';

import { Leaf, Accessibility, Gauge, UserCheck, ShieldCheck, Sparkles, ScrollText } from 'lucide-react';

type Principle = {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    desc: string;
    example: string;
};

export default function PrinciplesSection({ principles }: { principles?: Principle[] }) {
    const items: Principle[] = principles ?? [
        {
            icon: Leaf,
            title: 'Sobriété par design',
            desc: "Un site épuré, lisible, sans surcharge technique ni effets inutiles. On va à l'essentiel pour servir ton contenu et tes objectifs.",
            example: 'Concrètement : grilles simples, palettes limitées, composants réutilisables, pas de plugins gadgets.',
        },
        {
            icon: Accessibility,
            title: 'Accessibilité AA',
            desc: 'Contrastes, focus visibles, sémantique propre et clavier : ton site reste utilisable par tout le monde.',
            example: 'Concrètement : tests clavier/lecteur d’écran, alt text systématique, hiérarchie Hn maîtrisée.',
        },
        {
            icon: Gauge,
            title: 'Performance mesurée',
            desc: "Budgets clairs (images, polices) et suivi Web Vitals. L'expérience reste fluide du mobile à l'ultra-large.",
            example: 'Concrètement : images en WebP/AVIF, font-display swap, LCP cible < 2.5s, audit Lighthouse à chaque étape.',
        },
        {
            icon: UserCheck,
            title: 'Ownership client',
            desc: 'Tu possèdes ton site, tes accès et tes contenus. Je te remets tout et je te forme à l’utiliser.',
            example: 'Concrètement : remise des codes, accès admin, guide de prise en main + replay vidéo.',
        },
        {
            icon: ShieldCheck,
            title: 'Cadre & sérénité',
            desc: 'Des étapes courtes, des fenêtres de retours balisées et des critères de validation explicites.',
            example: 'Concrètement : jalons “wireframe → UI → dev”, 1–2 cycles de retours/étape, checklists de sortie.',
        },
        {
            icon: Sparkles,
            title: 'Soin du détail utile',
            desc: 'Micro-interactions et finitions quand elles servent la compréhension ou la conversion — pas pour “faire joli”.',
            example: 'Concrètement : états de survol/focus cohérents, transitions légères, vide d’état soigné.',
        },
    ];

    return (
        <section id="principes" aria-labelledby="principes-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête (badge + H2 + phrase) */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <ScrollText className="w-3.5 h-3.5" aria-hidden />
                        <span>Principes</span>
                    </span>
                    <h2 id="principes-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Principes & philosophie de travail
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Ce qui guide mes décisions et la qualité du résultat — avec, pour chaque principe, la façon dont ça se traduit dans ton projet.
                    </p>
                </div>

                {/* Grille de cartes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {items.map(({ icon: Icon, title, desc, example }) => (
                        <article
                            key={title}
                            className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="flex items-center gap-3">
                                <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <Icon className="w-4 h-4" aria-hidden />
                                </span>
                                <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">{title}</h3>
                            </div>

                            {/* Séparateur animé */}
                            <div className="mt-3 relative h-[2px] overflow-hidden">
                                <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                <div
                                    className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                    aria-hidden
                                />
                            </div>

                            {/* Corps flexible : desc prend la place dispo, l'exemple colle en bas */}
                            <div className="flex-1 flex flex-col">
                                <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{desc}</p>

                                <div className="mt-auto pt-4">
                                    <div className="rounded-xl border border-sauge/20 bg-sauge/5 p-3">
                                        <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-sauge/90">Exemple</p>
                                        <p className="mt-1 text-sm text-foreground/80 leading-relaxed">{example}</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <p className="text-xs text-foreground/70">* Chaque principe peut être contractualisé en critères vérifiables (checklists & budgets).</p>
            </div>
        </section>
    );
}
