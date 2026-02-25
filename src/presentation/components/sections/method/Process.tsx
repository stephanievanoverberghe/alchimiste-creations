'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ListChecks, Search, FileText, Palette, Code2, ClipboardCheck, Rocket as RocketLucide, CalendarDays, BadgeCheck, Clock } from 'lucide-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faLeaf, faTint, faFire } from '@fortawesome/free-solid-svg-icons';

type TechKey = 'wp' | 'react';
type PackKey = 'essentiel' | 'croissance' | 'signature';

type Step = {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    goal: string;
    deliverables: string[];
    week: string;
    validation?: string;
};

type PackData = {
    label: string;
    steps: Step[];
};

const DATA: Record<PackKey, Record<TechKey, PackData>> = {
    essentiel: {
        wp: {
            label: 'Essentiel (WP)',
            steps: [
                {
                    icon: Search,
                    title: 'Découverte & objectifs',
                    goal: "Aligner l'intention, l’audience et les pages clés.",
                    deliverables: ['Brief de projet', 'Arbo V1'],
                    week: 'Semaine 1',
                    validation: 'Go cadrage',
                },
                {
                    icon: FileText,
                    title: 'Cadrage & UI light',
                    goal: 'Valider les parcours & un style sobre pour aller vite.',
                    deliverables: ['Wireframes light', 'Style tile (couleurs/typo)'],
                    week: 'Semaine 1–2',
                    validation: 'OK wireframes',
                },
                {
                    icon: Code2,
                    title: 'Intégration',
                    goal: 'Monter la préprod propre (perfs/a11y/SEO de base).',
                    deliverables: ['Pré-production', 'Titres & metas', 'A11y baseline'],
                    week: 'Semaine 2–3',
                    validation: 'Recette prête',
                },
                {
                    icon: RocketLucide,
                    title: 'Mise en ligne & passation',
                    goal: 'Basculer en prod et te rendre autonome.',
                    deliverables: ['DNS/SSL', 'Accès & codes', 'Guide + replay'],
                    week: 'Semaine 3',
                    validation: 'Clôture',
                },
            ],
        },
        react: {
            label: 'Essentiel (React)',
            steps: [
                {
                    icon: Search,
                    title: 'Découverte & objectifs',
                    goal: "Aligner l'intention, l’audience et les pages clés.",
                    deliverables: ['Brief de projet', 'Arbo V1'],
                    week: 'Semaine 1',
                    validation: 'Go cadrage',
                },
                {
                    icon: FileText,
                    title: 'Cadrage & UI light',
                    goal: 'Valider les parcours & un style sobre pour aller vite.',
                    deliverables: ['Wireframes light', 'Style tile (couleurs/typo)'],
                    week: 'Semaine 1–2',
                    validation: 'OK wireframes',
                },
                {
                    icon: Code2,
                    title: 'Intégration',
                    goal: 'Montage Next/React (perfs/a11y/SEO de base).',
                    deliverables: ['Pré-production', 'Titres & metas', 'A11y baseline'],
                    week: 'Semaine 2–3',
                    validation: 'Recette prête',
                },
                {
                    icon: RocketLucide,
                    title: 'Mise en ligne & passation',
                    goal: 'Basculer en prod et te rendre autonome.',
                    deliverables: ['DNS/SSL', 'Accès & codes', 'Guide + replay'],
                    week: 'Semaine 3–4',
                    validation: 'Clôture',
                },
            ],
        },
    },
    croissance: {
        wp: {
            label: 'Croissance (WP)',
            steps: [
                {
                    icon: Search,
                    title: 'Découverte & objectifs',
                    goal: 'Intention, audience, pages clés, contraintes.',
                    deliverables: ['Brief de projet', 'Arbo V1'],
                    week: 'Semaine 1',
                    validation: 'Go cadrage',
                },
                {
                    icon: FileText,
                    title: 'Cadrage & contenu',
                    goal: 'Parcours, wireframes, inventaire contenus, ton.',
                    deliverables: ['Wireframes low-fi', 'Inventaire contenus', 'Ton éditorial'],
                    week: 'Sem. 2–3',
                    validation: 'OK wireframes',
                },
                {
                    icon: Palette,
                    title: 'Design & prototypes',
                    goal: 'UI, composants, micro-interactions.',
                    deliverables: ['UI pages clés', 'UI Kit', 'Prototypes Figma'],
                    week: 'Sem. 3–4',
                    validation: 'OK UI',
                },
                {
                    icon: Code2,
                    title: 'Intégration & dev',
                    goal: 'Perfs, accessibilité, SEO de base.',
                    deliverables: ['Pré-production', 'A11y baseline', 'Titres/metas'],
                    week: 'Sem. 4–5',
                    validation: 'Recette prête',
                },
                {
                    icon: ClipboardCheck,
                    title: 'Recette & corrections',
                    goal: 'Tests a11y, responsive, formulaires.',
                    deliverables: ['Checklists validées', 'Correctifs'],
                    week: 'Semaine 5',
                    validation: 'OK mise en ligne',
                },
                {
                    icon: RocketLucide,
                    title: 'Mise en ligne & passation',
                    goal: 'DNS/SSL, guides, formation vidéo.',
                    deliverables: ['Accès & codes', 'Guide + replay'],
                    week: 'Sem. 5–6',
                    validation: 'Clôture',
                },
            ],
        },
        react: {
            label: 'Croissance (React)',
            steps: [
                {
                    icon: Search,
                    title: 'Découverte & objectifs',
                    goal: 'Intention, audience, pages clés, contraintes.',
                    deliverables: ['Brief de projet', 'Arbo V1'],
                    week: 'Semaine 1',
                    validation: 'Go cadrage',
                },
                {
                    icon: FileText,
                    title: 'Cadrage & contenu',
                    goal: 'Parcours, wireframes, inventaire contenus, ton.',
                    deliverables: ['Wireframes low-fi', 'Inventaire contenus', 'Ton éditorial'],
                    week: 'Sem. 2–3',
                    validation: 'OK wireframes',
                },
                {
                    icon: Palette,
                    title: 'Design & prototypes',
                    goal: 'UI, composants, micro-interactions.',
                    deliverables: ['UI pages clés', 'UI Kit', 'Prototypes Figma'],
                    week: 'Sem. 3–4',
                    validation: 'OK UI',
                },
                {
                    icon: Code2,
                    title: 'Intégration & dev',
                    goal: 'Next/React, perfs, accessibilité, SEO de base.',
                    deliverables: ['Pré-production', 'A11y baseline', 'Titres/metas'],
                    week: 'Sem. 4–6',
                    validation: 'Recette prête',
                },
                {
                    icon: ClipboardCheck,
                    title: 'Recette & corrections',
                    goal: 'Tests a11y, responsive, formulaires.',
                    deliverables: ['Checklists validées', 'Correctifs'],
                    week: 'Semaine 6',
                    validation: 'OK mise en ligne',
                },
                {
                    icon: RocketLucide,
                    title: 'Mise en ligne & passation',
                    goal: 'DNS/SSL, guides, formation vidéo.',
                    deliverables: ['Accès & codes', 'Guide + replay'],
                    week: 'Sem. 6–7',
                    validation: 'Clôture',
                },
            ],
        },
    },
    signature: {
        wp: {
            label: 'Signature (WP)',
            steps: [
                {
                    icon: Search,
                    title: 'Atelier stratégique',
                    goal: 'Vision, positionnement, priorités, cibles.',
                    deliverables: ['Note de cadrage', 'Personas rapides'],
                    week: 'Sem. 1–2',
                    validation: 'Go cadrage',
                },
                {
                    icon: FileText,
                    title: 'Cadrage & contenu',
                    goal: 'Parcours, wireframes, inventaire (incl. blog).',
                    deliverables: ['Wireframes flows', 'Inventaire blog', 'Ton éditorial'],
                    week: 'Sem. 2–4',
                    validation: 'OK wireframes',
                },
                {
                    icon: Palette,
                    title: 'Design étendu',
                    goal: 'UI pages clés, composants & mini-charte.',
                    deliverables: ['UI pages', 'UI Kit', 'Mini-charte'],
                    week: 'Sem. 4–6',
                    validation: 'OK UI',
                },
                {
                    icon: Code2,
                    title: 'Dev & intégration',
                    goal: 'Perfs, a11y AA, SEO base, blog.',
                    deliverables: ['Pré-production', 'SEO on-page', 'Blog'],
                    week: 'Sem. 6–9',
                    validation: 'Recette prête',
                },
                {
                    icon: ClipboardCheck,
                    title: 'QA renforcée',
                    goal: 'Tests devices, formulaires, microcopy.',
                    deliverables: ['Checklists validées', 'Correctifs'],
                    week: 'Sem. 9–10',
                    validation: 'OK mise en ligne',
                },
                {
                    icon: RocketLucide,
                    title: 'Mise en ligne & passation',
                    goal: 'DNS/SSL, guides, formation vidéo.',
                    deliverables: ['Accès & codes', 'Guide + replay'],
                    week: 'Sem. 10–12',
                    validation: 'Clôture',
                },
            ],
        },
        react: {
            label: 'Signature (React)',
            steps: [
                {
                    icon: Search,
                    title: 'Atelier stratégique',
                    goal: 'Vision, positionnement, priorités, cibles.',
                    deliverables: ['Note de cadrage', 'Personas rapides'],
                    week: 'Sem. 1–2',
                    validation: 'Go cadrage',
                },
                {
                    icon: FileText,
                    title: 'Cadrage & contenu',
                    goal: 'Parcours, wireframes, inventaire (incl. blog).',
                    deliverables: ['Wireframes flows', 'Inventaire blog', 'Ton éditorial'],
                    week: 'Sem. 2–4',
                    validation: 'OK wireframes',
                },
                {
                    icon: Palette,
                    title: 'Design étendu',
                    goal: 'UI pages clés, composants & mini-charte.',
                    deliverables: ['UI pages', 'UI Kit', 'Mini-charte'],
                    week: 'Sem. 4–7',
                    validation: 'OK UI',
                },
                {
                    icon: Code2,
                    title: 'Dev & intégration',
                    goal: 'Next/React, perfs, a11y AA, SEO base, blog.',
                    deliverables: ['Pré-production', 'SEO on-page', 'Blog'],
                    week: 'Sem. 7–11',
                    validation: 'Recette prête',
                },
                {
                    icon: ClipboardCheck,
                    title: 'QA renforcée',
                    goal: 'Tests devices, formulaires, microcopy.',
                    deliverables: ['Checklists validées', 'Correctifs'],
                    week: 'Sem. 11–13',
                    validation: 'OK mise en ligne',
                },
                {
                    icon: RocketLucide,
                    title: 'Mise en ligne & passation',
                    goal: 'DNS/SSL, guides, formation vidéo.',
                    deliverables: ['Accès & codes', 'Guide + replay'],
                    week: 'Sem. 13–14',
                    validation: 'Clôture',
                },
            ],
        },
    },
};

const PACK_FA_ICONS: Record<PackKey, IconDefinition> = {
    essentiel: faLeaf,
    croissance: faTint,
    signature: faFire,
};

function getDuration(pack: PackKey, tech: TechKey) {
    if (pack === 'essentiel') return tech === 'wp' ? '≈ 2–3 semaines' : '≈ 3–4 semaines';
    if (pack === 'croissance') return tech === 'wp' ? '≈ 4–6 semaines' : '≈ 5–7 semaines';
    return tech === 'wp' ? '≈ 8–12 semaines' : '≈ 10–14 semaines';
}

export default function ProcessSection({ initialPack = 'croissance', initialTech = 'wp' }: { initialPack?: PackKey; initialTech?: TechKey }) {
    const [pack, setPack] = useState<PackKey>(initialPack);
    const [tech, setTech] = useState<TechKey>(initialTech);

    const { steps, label } = DATA[pack][tech];
    const duration = getDuration(pack, tech);

    return (
        <section id="process" aria-labelledby="process-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
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
                        <ListChecks className="w-3.5 h-3.5" aria-hidden />
                        <span>Process détaillé</span>
                    </span>
                    <h2 id="process-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        La timeline du projet — étapes & jalons
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        1–2 cycles de retours à chaque jalon, critères de validation explicites et transparence sur les livrables.
                    </p>
                </div>

                {/* Switch Pack + Tech */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    {/* Packs — icônes seules en mobile, icône+label en ≥ sm */}
                    <div className="inline-grid grid-cols-3 sm:inline-flex rounded-2xl border border-sauge/30 bg-background p-1 w-full sm:w-auto">
                        {(['essentiel', 'croissance', 'signature'] as PackKey[]).map((p) => {
                            const active = p === pack;
                            const label = p === 'essentiel' ? 'Essentiel' : p === 'croissance' ? 'Croissance' : 'Signature';
                            return (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => setPack(p)}
                                    aria-pressed={active}
                                    aria-current={active ? 'true' : undefined}
                                    aria-label={label}
                                    title={label}
                                    className={`inline-flex items-center justify-center gap-2 w-full px-2 py-2 sm:px-3 sm:py-2 rounded-xl
                    text-xs tracking-[0.14em] uppercase font-semibold transition transform
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/40 focus-visible:ring-offset-2
                    ${active ? 'bg-terracotta text-background shadow-sm' : 'cursor-pointer text-terracotta hover:bg-terracotta/10 hover:-translate-y-[1px] hover:shadow-sm'}`}
                                >
                                    <FontAwesomeIcon icon={PACK_FA_ICONS[p]} className="text-[18px] sm:text-[14px]" aria-hidden />
                                    <span className="hidden sm:inline">{label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Tech */}
                    <div className="w-full grid grid-cols-2 sm:inline-flex rounded-2xl border border-sauge/30 bg-background p-1 sm:w-auto">
                        {(['wp', 'react'] as TechKey[]).map((t) => {
                            const active = t === tech;
                            const label = t === 'wp' ? 'WP' : 'React';
                            return (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setTech(t)}
                                    aria-pressed={active}
                                    aria-current={active ? 'true' : undefined}
                                    aria-label={label}
                                    title={label}
                                    className={`inline-flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl
                    text-xs tracking-[0.14em] uppercase font-semibold transition transform
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40 focus-visible:ring-offset-2
                    ${active ? 'bg-sauge text-background shadow-sm' : 'cursor-pointer text-sauge hover:bg-sauge/10 hover:-translate-y-[1px] hover:shadow-sm'}`}
                                >
                                    {t === 'wp' ? <FileText className="w-4 h-4" aria-hidden /> : <Code2 className="w-4 h-4" aria-hidden />}
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Résumé pack sélectionné */}
                <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-foreground/80">
                    <span className="inline-flex items-center gap-2 rounded-xl border border-sauge/30 bg-sauge/10 text-sauge px-3 py-1.5">
                        <FontAwesomeIcon icon={PACK_FA_ICONS[pack]} className="text-[16px]" aria-hidden />
                        {label}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-xl border border-ormat/30 bg-ormat/10 text-ormat px-3 py-1.5">
                        <Clock className="w-4 h-4" aria-hidden />
                        Durée indicative&nbsp;: {duration}
                    </span>
                </div>

                {/* Timeline en cartes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {steps.map(({ icon: Icon, title, goal, deliverables, week, validation }, i) => (
                        <article
                            key={`${title}-${i}`}
                            className="group relative h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="flex items-center gap-3">
                                <span className="inline-flex items-center justify-center size-7 rounded-full border border-ormat/30 bg-ormat/10 text-[11px] font-semibold text-ormat">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <Icon className="w-4 h-4" aria-hidden />
                                </span>
                                <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">{title}</h3>
                            </div>

                            <div className="mt-3 relative h-[2px] overflow-hidden">
                                <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                            </div>

                            <div className="flex-1 flex flex-col">
                                <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{goal}</p>
                                <ul className="mt-3 space-y-2">
                                    {deliverables.map((d) => (
                                        <li key={d} className="flex items-start gap-2.5">
                                            <BadgeCheck className="w-4 h-4 mt-0.5 text-sauge" aria-hidden />
                                            <span className="text-sm text-foreground/80 leading-relaxed">{d}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-auto pt-4 flex items-center gap-2 flex-wrap">
                                    <span className="inline-flex items-center gap-1 rounded-full border border-sauge/30 bg-sauge/10 text-sauge px-2.5 py-1 text-xs">
                                        <CalendarDays className="w-3.5 h-3.5" aria-hidden />
                                        {week}
                                    </span>
                                    {validation && (
                                        <span className="inline-flex items-center gap-1 rounded-full border border-terracotta/30 bg-terracotta/10 text-terracotta px-2.5 py-1 text-xs">
                                            <BadgeCheck className="w-3.5 h-3.5" aria-hidden />
                                            {validation}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <p className="text-xs text-foreground/70">
                    * Chaque étape prévoit <strong>1–2 cycles de retours</strong> avec des fenêtres dédiées et une checklist de sortie.
                </p>
            </div>
        </section>
    );
}
