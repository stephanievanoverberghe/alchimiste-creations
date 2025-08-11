'use client';

import { ShieldCheck, Accessibility, Gauge, Zap, Image as ImageIcon, Type, Cpu, CheckCircle2, BarChart3 } from 'lucide-react';

export default function QualitySection() {
    const a11yChecks = [
        'Contrastes AA conformes',
        'Focus visibles & cohérents',
        'Structure sémantique (Hn, landmarks)',
        'Alt text descriptifs',
        'Formulaires : labels/erreurs/aria',
        'Navigation clavier complète',
    ];

    const perfBudgets = [
        { label: 'LCP (mobile)', value: '< 2.5s' },
        { label: 'Images', value: 'WebP/AVIF — Hero ≤ 200KB, autres ≤ 80KB' },
        { label: 'Polices', value: '2 familles max, swap, ≤ 120KB total' },
        { label: 'JS initial', value: '≤ 160KB (compressé)' },
        { label: 'CLS', value: '< 0.1' },
        { label: 'TTI', value: 'souple, dépend du pack/tech' },
    ];

    const tools = [
        { icon: Gauge, name: 'Lighthouse', desc: 'Audit de performance & bonnes pratiques.' },
        { icon: BarChart3, name: 'Web Vitals', desc: 'Suivi LCP/CLS/INP en local & prod.' },
        { icon: Accessibility, name: 'axe DevTools', desc: 'Analyse a11y automatisée (WCAG).' },
        { icon: Cpu, name: 'Coverage/Profiler', desc: 'Contrôle JS/CSS inutilisés.' },
    ];

    return (
        <section id="qualite" aria-labelledby="qualite-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <ShieldCheck className="w-3.5 h-3.5" aria-hidden />
                        <span>Qualité • Perfs • A11y</span>
                    </span>
                    <h2 id="qualite-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Qualité, performances & accessibilité — des critères vérifiables
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        On transforme les promesses en critères concrets&nbsp;: <em>checklists</em>, <em>budgets</em> et <em>mesures</em> intégrées au process.
                    </p>
                </div>

                {/* Grille 3 cartes */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {/* A11y */}
                    <article className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md lg:col-span-1">
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <Accessibility className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Accessibilité AA</h3>
                        </div>

                        <div className="mt-3 relative h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                            <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                        </div>

                        <ul className="mt-4 space-y-2">
                            {a11yChecks.map((item) => (
                                <li key={item} className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-sauge" aria-hidden />
                                    <span className="text-sm text-foreground/80 leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto pt-4 rounded-xl border border-sauge/20 bg-sauge/5 p-3">
                            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-sauge/90">Exemple</p>
                            <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                                Contrôle des contrastes, parcours clavier complet, libellés explicites et structure Hn soignée dès les maquettes.
                            </p>
                        </div>
                    </article>

                    {/* Budgets de perfs */}
                    <article className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md lg:col-span-1">
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <Gauge className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Budgets de performance</h3>
                        </div>

                        <div className="mt-3 relative h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" />
                            <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                        </div>

                        <ul className="mt-4 grid grid-cols-1 gap-2">
                            {perfBudgets.map((b) => (
                                <li key={b.label} className="flex items-start gap-2.5">
                                    <Zap className="w-4 h-4 mt-0.5 text-ormat" aria-hidden />
                                    <div>
                                        <p className="text-sm font-medium tracking-wide">{b.label}</p>
                                        <p className="text-sm text-foreground/80">{b.value}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto pt-4 flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 text-xs">
                                <ImageIcon className="w-3.5 h-3.5" /> WebP/AVIF
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 text-xs">
                                <Type className="w-3.5 h-3.5" /> font-display: swap
                            </span>
                        </div>

                        <div className="mt-3 rounded-xl border border-sauge/20 bg-sauge/5 p-3">
                            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-sauge/90">Exemple</p>
                            <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                                Optimisation d’images au build, préconnect CDN, chargement différé des scripts non critiques, découpage par pages.
                            </p>
                        </div>
                    </article>

                    {/* Mesure & suivi */}
                    <article className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md md:col-span-2 xl:col-span-1">
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <Cpu className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Mesure & suivi</h3>
                        </div>

                        <div className="mt-3 relative h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" />
                            <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                        </div>

                        <ul className="mt-4 space-y-3">
                            {tools.map(({ icon: Icon, name, desc }) => (
                                <li key={name} className="flex items-start gap-2.5">
                                    <span className="grid place-content-center size-7 rounded-full border border-sauge/40 bg-sauge/10 text-sauge mt-0.5">
                                        <Icon className="w-3.5 h-3.5" aria-hidden />
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium tracking-wide">{name}</p>
                                        <p className="text-sm text-foreground/80">{desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-4 pt-4 rounded-xl border border-sauge/20 bg-sauge/5 p-3">
                            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-sauge/90">Exemple</p>
                            <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                                Audit Lighthouse à chaque jalon, vérif Web Vitals en préprod, rapport final avec checklist signée.
                            </p>
                        </div>
                    </article>
                </div>

                <p className="text-xs text-foreground/70">
                    * Les budgets peuvent être ajustés selon le pack et la techno (WP/React) — ils sont contractables en critères de sortie.
                </p>
            </div>
        </section>
    );
}
