'use client';

import Image from 'next/image';
import PackCard from '@/presentation/components/cards/pack/CardPack';
import { getVersion, type Tech } from '@/domain/offers/packs';
import { cn } from '@/shared/utils/cn';
import { Atom, FileText, Code2, Gauge, Clock, GitBranch, Edit3, Wallet, Boxes } from 'lucide-react';

import { faLeaf, faTint, faFire } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type PackVersion = { prix: string; delai: string };
type Pack = {
    slug: string;
    titre: string;
    sousTitre: string;
    cible?: string;
    inclus: string[];
    prix: string;
    technoChoix?: boolean;
    versions?: Record<string, PackVersion | undefined>;
    delaiNote?: string;
};

const iconBySlug: Record<string, IconDefinition> = {
    essentiel: faLeaf,
    croissance: faTint,
    signature: faFire,
};

const TECH_COPY = {
    wordpress: {
        label: 'WordPress',
        pitch: 'Idéal si tu veux éditer facilement ton site (textes/images) via une interface. Délais plus courts, budget maîtrisé, écosystème mature.',
        bullets: ['Plugins éprouvés (SEO, formulaires, réservations)', 'Délais courts / mise en ligne rapide', 'Parfait pour vitrines & blogs'],
    },
    react: {
        label: 'Sur-mesure (React)',
        pitch: 'Code léger et très performant. UI/animations au cordeau. Variante sans back-office : je prends en charge les mises à jour de contenu sur demande.',
        bullets: ['Performance & sur-mesure', 'Design/animations fines et uniques', 'Site statique (pas de back-office)'],
        note: '* Pas de back-office inclus. Les modifications de contenu se font par mes soins, à la demande.',
    },
} as const;

type PacksSectionProps = {
    tech: Tech;
    onTechChange: (t: Tech) => void;
    packs: Pack[] | null;
};

export default function PacksSection({ tech, onTechChange, packs }: PacksSectionProps) {
    return (
        <section id="packs" aria-labelledby="packs-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            {/* Liseré décoratif en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            {/* Fond or mobile only */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            {/* Vague décorative (md+) */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="Vague décorative" className="h-auto" fill priority />
            </div>

            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <Boxes className="w-3.5 h-3.5" aria-hidden />
                        Les 3 packs
                    </span>
                    <h2 id="packs-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Choisis la base, on ajuste le reste
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Trois niveaux pour lancer ou faire évoluer ton site — design sensible, code propre, SEO de base & accompagnement humain.
                    </p>
                </div>

                {/* Switch techno — NE PAS TOUCHER */}
                <div className="flex justify-center lg:justify-start">
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

                {/* Micro-explication techno */}
                <div className="group relative overflow-hidden rounded-[22px] border border-sauge/30 bg-background/70 p-5 md:p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    {/* motif discret */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                        aria-hidden
                    />

                    <div className="relative z-[1] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <span className="inline-flex items-center gap-2 rounded-xl border border-terracotta/30 bg-terracotta/10 text-terracotta px-3 py-1.5">
                            {tech === 'wordpress' ? <FileText className="w-4 h-4" /> : <Atom className="w-4 h-4" />}
                            {tech === 'wordpress' ? TECH_COPY.wordpress.label : TECH_COPY.react.label}
                        </span>
                        <p className="text-sm md:text-[15px] leading-relaxed text-foreground/85 sm:max-w-[70%]">
                            {tech === 'wordpress' ? TECH_COPY.wordpress.pitch : TECH_COPY.react.pitch}
                        </p>
                    </div>

                    {/* Bullets en chips */}
                    <ul className="relative z-[1] mt-4 sm:flex gap-2">
                        {(tech === 'wordpress' ? TECH_COPY.wordpress.bullets : TECH_COPY.react.bullets).map((b) => (
                            <li key={b}>
                                <span className="inline-flex items-center gap-1 rounded-full border border-sauge/30 bg-sauge/10 text-sauge px-2.5 py-1 text-xs">
                                    <span className="size-1.5 rounded-full bg-sauge/80" />
                                    <span className="text-foreground/85">{b}</span>
                                </span>
                            </li>
                        ))}
                    </ul>

                    {/* Mini KPI barres */}
                    {(() => {
                        const KPI =
                            tech === 'wordpress'
                                ? { autonomie: 92, performance: 78, delais: 90, evol: 72, budget: 88 }
                                : { autonomie: 60, performance: 95, delais: 65, evol: 92, budget: 65 };

                        const Metric = ({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number }) => (
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-foreground/75">
                                    <Icon className="w-4 h-4 text-sauge" />
                                    {label}
                                </div>
                                <div className="h-1.5 rounded-full bg-sauge/20 overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out"
                                        style={{ width: `${value}%` }}
                                    />
                                </div>
                            </div>
                        );

                        return (
                            <div className="relative z-[1] mt-5 grid grid-cols-2 sm:grid-cols-5 gap-4">
                                <Metric icon={Edit3} label="Autonomie" value={KPI.autonomie} />
                                <Metric icon={Gauge} label="Performance" value={KPI.performance} />
                                <Metric icon={Clock} label="Délais" value={KPI.delais} />
                                <Metric icon={GitBranch} label="Évolutivité" value={KPI.evol} />
                                <Metric icon={Wallet} label="Budget" value={KPI.budget} />
                            </div>
                        );
                    })()}

                    {tech === 'react' && <p className="relative z-[1] mt-3 text-xs text-foreground/70">{TECH_COPY.react.note}</p>}
                </div>

                {/* Grille des packs (alignement hauteur) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {packs
                        ? packs.map((pack) => {
                              const v = pack.versions ? getVersion(pack.versions, tech) : undefined;
                              return (
                                  <div key={pack.slug} className="h-full">
                                      <PackCard
                                          slug={pack.slug}
                                          title={pack.titre.replace(/^Pack\s+/i, '')}
                                          subtitle={pack.sousTitre}
                                          items={pack.inclus}
                                          price={v?.prix ?? pack.prix}
                                          delay={v?.delai}
                                          centralIcon={iconBySlug[pack.slug] || faLeaf}
                                      />
                                  </div>
                              );
                          })
                        : Array.from({ length: 3 }).map((_, i) => (
                              <div key={i} className="h-full border border-sauge/30 rounded-[30px] p-8 shadow-sm animate-pulse">
                                  <div className="h-5 w-2/3 bg-sauge/20 rounded mb-4" />
                                  <div className="h-4 w-1/3 bg-terracotta/20 rounded mb-6" />
                                  <div className="space-y-3">
                                      <div className="h-4 w-4/5 bg-sauge/20 rounded" />
                                      <div className="h-4 w-3/5 bg-sauge/20 rounded" />
                                      <div className="h-4 w-2/3 bg-sauge/20 rounded" />
                                  </div>
                              </div>
                          ))}
                </div>

                {/* Note délais */}
                <p className="text-xs text-foreground/70">{packs?.find((p) => p.delaiNote)?.delaiNote ?? 'Délais indicatifs, ajustés selon besoins et disponibilité.'}</p>
            </div>
        </section>
    );
}
