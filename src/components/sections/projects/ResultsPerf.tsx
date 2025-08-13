// components/sections/projects/ResultsPerfSection.tsx
import { Zap, ShieldCheck, Search, Gauge, Layers, Code2, FileText, Wrench } from 'lucide-react';
import projectsData from '@/data/projects.json';

type RawProject = { stack?: string; status?: string; year?: number };

export default function ResultsPerfSection() {
    const RAW = (Array.isArray(projectsData) ? projectsData : []) as RawProject[];

    const total = RAW.length;
    const reactCount = RAW.filter((p) => (p.stack ?? '').toLowerCase().includes('react')).length;
    const wpCount = RAW.filter((p) => (p.stack ?? '').toLowerCase().includes('wordpress')).length;
    const wipCount = RAW.filter((p) => (p.status ?? '').toLowerCase() === 'wip').length;

    const years = RAW.map((p) => (typeof p.year === 'number' ? p.year : undefined)).filter(Boolean) as number[];
    const minYear = years.length ? Math.min(...years) : undefined;
    const maxYear = years.length ? Math.max(...years) : undefined;

    const metrics = [
        {
            icon: Zap,
            title: 'Images optimisées',
            desc: 'Formats modernes, lazy-loading, tailles adaptées.',
            chip: 'Performance',
        },
        {
            icon: ShieldCheck,
            title: 'Accessibilité de base',
            desc: 'Couleurs, contrastes, structure sémantique.',
            chip: 'A11y',
        },
        {
            icon: Search,
            title: 'SEO technique',
            desc: 'Balises, métas, Open Graph, maillage interne.',
            chip: 'SEO',
        },
        {
            icon: Gauge,
            title: 'Baseline Lighthouse',
            desc: 'Objectif ≥ 90 sur “Signature”.',
            chip: 'Qualité',
        },
    ] as const;

    const chips = [
        { icon: Code2, label: `React`, value: reactCount },
        { icon: FileText, label: `WordPress`, value: wpCount },
        { icon: Layers, label: `Projets`, value: total },
        { icon: Wrench, label: `En cours`, value: wipCount },
    ];

    return (
        <section aria-labelledby="results-perf-title" className="relative py-16 md:py-24 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-7xl mx-auto space-y-8">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        Résultats & perfs
                    </span>
                    <h2 id="results-perf-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Des bases solides, par défaut
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Chaque projet part d’un socle technique propre&nbsp;: performance, accessibilité, SEO et qualité mesurable.
                        {minYear && maxYear ? (
                            <>
                                {' '}
                                ({minYear}–{maxYear})
                            </>
                        ) : null}
                    </p>
                </div>

                {/* Cartes métriques */}
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {metrics.map(({ icon: Icon, title, desc, chip }) => (
                        <li key={title}>
                            <article className="group relative h-full flex flex-col overflow-hidden rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                {/* motif discret */}
                                <div
                                    className="pointer-events-none absolute inset-0 opacity-10"
                                    style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                                    aria-hidden
                                />

                                {/* Header (icône + titre) */}
                                <header className="relative z-[1] flex items-center gap-3">
                                    <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                        <Icon className="w-4 h-4" aria-hidden />
                                    </span>
                                    <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">{title}</h3>
                                </header>

                                {/* Séparateur fin sous le header */}
                                <div className="relative z-[1] mt-3 h-[2px] overflow-hidden">
                                    <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                    <div
                                        className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                        aria-hidden
                                    />
                                </div>

                                {/* Corps */}
                                <p className="relative z-[1] mt-3 text-sm text-foreground/85 leading-relaxed">{desc}</p>

                                {/* Chip */}
                                <div className="relative z-[1] mt-auto pt-4">
                                    <span className="inline-flex items-center rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 text-[11px]">{chip}</span>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>

                {/* Petites stats */}
                <div className="flex flex-wrap items-center gap-2">
                    {chips.map(({ icon: Icon, label, value }) => (
                        <span
                            key={label}
                            className="inline-flex items-center gap-2 rounded-full border border-sauge/30 bg-background px-3 py-1.5 text-sm text-foreground/85"
                            title={label}
                        >
                            <Icon className="w-4 h-4 text-sauge" aria-hidden />
                            <span className="font-medium">{label}</span>
                            <span className="inline-flex items-center rounded-full border border-sauge/30 bg-sauge/10 text-sauge px-2 py-0.5 text-[11px] ml-1">{value}</span>
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
