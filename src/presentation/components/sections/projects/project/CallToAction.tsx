// components/sections/projects/CallToActionProjects.tsx
'use client';

import Link from 'next/link';
import { CalendarClock, LayoutGrid, ShieldCheck, Clock as ClockIcon, UserCheck, MapPin, Layers3, Code2 } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

type ProjectMini = {
    slug?: string;
    titre?: string;
    title?: string;
    kind?: string; // 'vitrine' | 'portfolio' | 'ecommerce' | 'rdv' | ...
    stack?: string; // 'react' | 'wordpress' | 'mixte' | ...
    pack?: 'essentiel' | 'croissance' | 'signature' | 'surmesure' | string;
    sector?: string;
    year?: number;
    location?: { city?: string };
};

export default function CallToActionSection({
    project,
    note = 'Réponse sous 24–48h ouvrées — échange sans pression.',
    className,
}: {
    project?: ProjectMini;
    note?: string;
    className?: string;
}) {
    const title = (project?.titre || project?.title || '').trim();
    const city = project?.location?.city?.trim();
    const year = typeof project?.year === 'number' ? project!.year : undefined;

    const kind = labelKind(project?.kind);
    const stack = labelStack(project?.stack);

    // — Chips de contexte à afficher si présents
    const contextChips: { icon: React.ElementType; text: string }[] = [];
    if (kind) contextChips.push({ icon: Layers3, text: kind });
    if (stack) contextChips.push({ icon: Code2, text: stack });
    if (city) contextChips.push({ icon: MapPin, text: city });
    if (year) contextChips.push({ icon: ClockIcon, text: String(year) });

    // — Lien Contact pré-rempli avec contexte projet
    const params = new URLSearchParams();
    if (project?.slug) params.set('fromProject', project.slug);
    if (project?.kind) params.set('kind', project.kind);
    if (project?.stack) params.set('stack', project.stack);
    if (project?.pack) params.set('pack', project.pack);
    const contactHref = `/contact${params.toString() ? `?${params.toString()}` : ''}`;

    // — Lien Offres (si pack “surmesure”, on redirige sur signature par défaut)
    const offresHref = '/offres';

    return (
        <section id="cta-projects" aria-labelledby="cta-projects-title" className={cn('relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]', className)}>
            <div className="relative max-w-7xl mx-auto">
                {/* Carte CTA */}
                <div className="group relative overflow-hidden rounded-[22px] border border-sauge/30 bg-background/70 p-6 md:p-10 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    {/* motif discret */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
                            backgroundSize: '16px 16px',
                            color: 'var(--color-ormat)',
                        }}
                        aria-hidden
                    />

                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-6 relative z-[1]">
                        <div>
                            <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                                <UserCheck className="w-3.5 h-3.5" aria-hidden />
                                <span>Et si on créait le vôtre&nbsp;?</span>
                            </span>

                            <h2 id="cta-projects-title" className="mt-4 md:mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                                {kind ? (
                                    <>
                                        Créer le vôtre — <span className="whitespace-nowrap">{kind}</span>
                                    </>
                                ) : (
                                    'Un projet aligné, clair et durable'
                                )}
                            </h2>

                            <p className="mt-3 text-base md:text-lg text-foreground/80 max-w-2xl">
                                {title ? (
                                    <>
                                        Inspiré par <strong className="text-foreground">{title}</strong>
                                        {city ? <> — {city}</> : null}
                                        {year ? <> • {year}</> : null}. On part de votre intention, on pose le cadre et on avance pas à pas —{' '}
                                        <em className="not-italic">sans jargon, sans pression</em>.
                                    </>
                                ) : (
                                    <>
                                        On part de votre intention, on pose le cadre et on avance pas à pas — <em className="not-italic">sans jargon, sans pression</em>.
                                    </>
                                )}
                            </p>

                            {/* Chips contexte (kind/stack/ville/année) */}
                            {contextChips.length > 0 && (
                                <ul className="mt-4 flex flex-wrap items-center gap-2">
                                    {contextChips.map(({ icon: Icon, text }) => (
                                        <li key={text}>
                                            <span className="inline-flex items-center gap-2 rounded-full border border-sauge/30 bg-sauge/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-sauge">
                                                <Icon className="w-3.5 h-3.5" aria-hidden />
                                                {text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Boutons */}
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 shrink-0">
                            <Link
                                href={contactHref}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                                aria-label="Réserver un appel découverte"
                            >
                                <CalendarClock className="w-4 h-4" aria-hidden />
                                Réserver un appel
                            </Link>
                            <Link
                                href={offresHref}
                                // Correction : on passe direct offresHref (simplifié)
                                // mais on laisse une petite garde en cas de refactor.
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-sauge/40 bg-background hover:bg-sauge/10 text-sm font-semibold tracking-widest uppercase transition hover:scale-105"
                                aria-label="Voir les packs"
                            >
                                <LayoutGrid className="w-4 h-4" aria-hidden />
                                Voir mes packs
                            </Link>
                        </div>
                    </div>

                    {/* micro-confiances */}
                    <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-foreground/80 relative z-[1]">
                        <div className="inline-flex items-center gap-2 rounded-xl border border-sauge/30 bg-sauge/10 px-3 py-2">
                            <ClockIcon className="w-3.5 h-3.5 text-sauge" aria-hidden />1 projet / mois
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-xl border border-terracotta/30 bg-terracotta/10 px-3 py-2">
                            <ShieldCheck className="w-3.5 h-3.5 text-terracotta" aria-hidden />
                            Accompagnement humain
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-xl border border-sauge/30 bg-sauge/10 px-3 py-2">
                            <LayoutGrid className="w-3.5 h-3.5 text-sauge" aria-hidden />
                            Devis clair & transparent
                        </div>
                    </div>

                    {/* note + séparateur animé bas */}
                    <div className="mt-4 md:mt-6 text-xs text-foreground/70 relative z-[1]">{note}</div>
                    <div className="pointer-events-none absolute left-6 right-6 bottom-6 h-[2px] overflow-hidden">
                        <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                        <div
                            className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                            aria-hidden
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ----------------- Helpers ----------------- */
function labelKind(k?: string) {
    switch ((k ?? '').toLowerCase()) {
        case 'ecommerce':
            return 'E-commerce';
        case 'vitrine':
            return 'Site vitrine';
        case 'portfolio':
            return 'Portfolio';
        case 'rdv':
            return 'RDV';
        default:
            return undefined;
    }
}
function labelStack(s?: string) {
    switch ((s ?? '').toLowerCase()) {
        case 'react':
            return 'React';
        case 'wordpress':
            return 'WP';
        case 'mixte':
            return 'Stack mixte';
        default:
            return s?.trim() || undefined;
    }
}
