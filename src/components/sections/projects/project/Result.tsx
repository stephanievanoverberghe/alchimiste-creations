// components/sections/project/ProjectResult.tsx
import Image from 'next/image';
import { BadgeCheck, Image as ImageIcon, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

type KPI = {
    label: string;
    before?: string;
    after?: string;
    delta?: string;
};

type Project = {
    resultat?: string;
    media?: { cover?: string };
    titre?: string;
    title?: string;
    results?: {
        period?: string;
        kpis?: KPI[];
        highlights?: string[];
    };
    urls?: {
        live?: string; // ← URL du site live
    };
};

export default function ResultSection({ project }: { project?: Project }) {
    const hasText = Boolean(project?.resultat?.trim());
    const cover = project?.media?.cover?.trim();
    const hasCover = Boolean(cover);

    const kpis = (project?.results?.kpis ?? []).filter(Boolean).slice(0, 4);
    const hasKpis = kpis.length > 0;

    const highlights = (project?.results?.highlights ?? []).filter(Boolean).slice(0, 4);
    const hasHighlights = highlights.length > 0;

    if (!hasText && !hasCover && !hasKpis && !hasHighlights) return null;

    const title = project?.titre || project?.title || 'Projet';
    const period = project?.results?.period?.trim();
    const live = project?.urls?.live?.trim();

    return (
        <section id="projet-resultat" aria-labelledby="projet-resultat-title" className="relative py-16 md:py-24 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="" fill priority className="h-auto object-cover" />
            </div>

            <div className="relative max-w-7xl mx-auto space-y-8">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <BadgeCheck className="w-3.5 h-3.5" aria-hidden />
                        Résultat
                    </span>
                    <h2 id="projet-resultat-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Ce que ça change
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        L’impact pour les visiteurs et pour le client — en quelques lignes claires, orientées valeur.
                    </p>
                </div>

                {/* Grille texte + mini-capture */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Carte texte */}
                    {(hasText || hasKpis || hasHighlights) && (
                        <article
                            className={`group relative rounded-[20px] border border-sauge/30 bg-background p-5 pb-9 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                                !hasCover ? 'md:col-span-2' : ''
                            }`}
                        >
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
                            <div className="relative z-[1] space-y-4">
                                {/* période */}
                                {period && (
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex items-center gap-2 rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
                                            {period}
                                        </span>
                                    </div>
                                )}

                                {/* séparateur animé */}
                                <div className="relative h-[2px] overflow-hidden">
                                    <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                    <div
                                        className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                        aria-hidden
                                    />
                                </div>

                                {/* texte résultat */}
                                {hasText && <p className="text-sm md:text-base text-foreground/85 leading-relaxed">{project!.resultat}</p>}

                                {/* KPIs */}
                                {hasKpis && (
                                    <ul className="space-y-3 md:space-y-3">
                                        {kpis.map((k) => (
                                            <li key={k.label} className="rounded-xl border border-sauge/30 bg-sauge/10 p-3" aria-label={`Indicateur : ${k.label}`}>
                                                <div className="flex items-baseline justify-between gap-2">
                                                    <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-sauge/90">{k.label}</p>
                                                    {k.delta && (
                                                        <span className="inline-flex items-center rounded-full border border-terracotta/30 bg-terracotta/10 text-terracotta px-2 py-0.5 text-[11px]">
                                                            {k.delta}
                                                        </span>
                                                    )}
                                                </div>
                                                {(k.before || k.after) && (
                                                    <p className="mt-1 flex items-center gap-1.5 text-sm text-foreground/90">
                                                        {k.before && <span className="text-foreground/70">{k.before}</span>}
                                                        {k.before && k.after && <ArrowRight className="w-4 h-4 text-foreground/50" aria-hidden />}
                                                        {k.after && <span className="font-medium">{k.after}</span>}
                                                    </p>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Points forts */}
                                {hasHighlights && (
                                    <ul className="mt-2 space-y-1.5">
                                        {highlights.map((h) => (
                                            <li key={h} className="flex items-start gap-2 text-sm text-foreground/85">
                                                <CheckCircle2 className="mt-0.5 w-4 h-4 text-sauge shrink-0" aria-hidden />
                                                <span>{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </article>
                    )}

                    {/* Mini-capture cliquable (lien live) */}
                    {hasCover && (
                        <figure className="group relative self-start rounded-[20px] border border-sauge/30 bg-background p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
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
                            <div className="relative z-[1]">
                                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] border border-sauge/30 bg-sauge/5">
                                    <Image
                                        src={cover!}
                                        alt={`Aperçu — ${title}`}
                                        fill
                                        className="object-cover object-center"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority={false}
                                    />

                                    {/* Barre “fenêtre” */}
                                    <div className="absolute inset-x-0 top-0 h-7 bg-background/80 border-b border-sauge/20 flex items-center gap-1 px-3">
                                        <span className="size-2.5 rounded-full bg-sauge/40" />
                                        <span className="size-2.5 rounded-full bg-terracotta/40" />
                                        <span className="size-2.5 rounded-full bg-ormat/40" />
                                    </div>

                                    {/* Lien LIVE — toute la zone cliquable + overlay explicite */}
                                    {live && (
                                        <>
                                            <a
                                                href={live}
                                                target="_blank"
                                                rel="noreferrer"
                                                aria-label={`Voir « ${title} » en live (nouvel onglet)`}
                                                title="Voir en live"
                                                className="absolute inset-0 z-10 outline-none focus-visible:ring-2 focus-visible:ring-terracotta/60"
                                            />
                                            {/* Overlay au hover */}
                                            <div className="pointer-events-none absolute inset-0 rounded-[14px] bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />
                                            <div className="pointer-events-none absolute bottom-3 right-3 md:bottom-4 md:right-4">
                                                <span className="inline-flex items-center gap-1.5 rounded-full border border-terracotta/40 bg-background/80 text-terracotta px-3 py-1 text-[11px] md:text-xs shadow-sm transition md:opacity-0 md:translate-y-1 group-hover:opacity-100 group-hover:translate-y-0">
                                                    Voir en live <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <figcaption className="mt-3 inline-flex items-center gap-2 text-xs text-foreground/70">
                                    <ImageIcon className="w-4 h-4 text-sauge" aria-hidden />
                                    {live ? 'Aperçu du projet — cliquez pour voir en live' : 'Aperçu du projet'}
                                </figcaption>
                            </div>
                        </figure>
                    )}
                </div>
            </div>
        </section>
    );
}
