// components/method/MethodPlanningSection.tsx
'use client';

import Link from 'next/link';
import { CalendarDays, Clock, Briefcase, CheckCircle2 } from 'lucide-react';

import packs from '@/infrastructure/content/packs.json';

type JsonPack = {
    slug: 'essentiel' | 'croissance' | 'signature';
    titre: string;
    versions: {
        wordpress: { prix: string; delai: string };
        react: { prix: string; delai: string };
    };
};

const SLUG_LABEL: Record<JsonPack['slug'], string> = {
    essentiel: 'Essentiel',
    croissance: 'Croissance',
    signature: 'Signature',
};

export default function PlanningSection() {
    const rows = (packs as JsonPack[]).map((p) => ({
        pack: SLUG_LABEL[p.slug],
        wp: p.versions.wordpress.delai,
        react: p.versions.react.delai,
    }));

    const capacite = '1 projet/mois';
    const fenetres = ['Début du mois', 'Mi-mois', 'Fin de mois'];

    return (
        <section id="planning" aria-labelledby="planning-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <CalendarDays className="w-3.5 h-3.5" aria-hidden />
                        <span>Planning & capacités</span>
                    </span>
                    <h2 id="planning-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Planning type & capacités — réalistes et transparents
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Capacité limitée pour garder de la qualité, fenêtres de départ claires, et délais indicatifs synchronisés sur tes packs.
                    </p>
                </div>

                {/* Grille 3 cartes */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {/* Capacité */}
                    <article
                        className="group relative h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md
                       before:pointer-events-none before:absolute before:-inset-px before:rounded-[20px]
                       before:p-[1px] before:opacity-0 before:transition-opacity before:duration-300
                       before:[background:conic-gradient(from_var(--angle),theme(colors.sauge/0.15),theme(colors.terracotta/0.35),theme(colors.sauge/0.15))]
                       before:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]
                       before:[mask-composite:exclude] group-hover:before:opacity-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <Briefcase className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Capacité & focus</h3>
                        </div>

                        {/* Séparateur animé */}
                        <div className="mt-3 relative h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                            <div
                                className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                aria-hidden
                            />
                        </div>

                        <ul className="mt-4 space-y-2">
                            {[
                                `${capacite} — pas de multi-projets en parallèle`,
                                'Buffers intégrés pour les cycles de retours',
                                'Pas de sur-vente : dates annoncées = dates tenues',
                            ].map((txt) => (
                                <li key={txt} className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-sauge" aria-hidden />
                                    <span className="text-sm text-foreground/80 leading-relaxed">{txt}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto pt-4 rounded-xl border border-sauge/20 bg-sauge/5 p-3">
                            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-sauge/90">Note</p>
                            <p className="mt-1 text-sm text-foreground/80 leading-relaxed">Les créneaux se remplissent vite — un acompte bloque le démarrage.</p>
                        </div>
                    </article>

                    {/* Fenêtres de départ */}
                    <article
                        className="group relative h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md
                       before:pointer-events-none before:absolute before:-inset-px before:rounded-[20px]
                       before:p-[1px] before:opacity-0 before:transition-opacity before:duration-300
                       before:[background:conic-gradient(from_var(--angle),theme(colors.sauge/0.15),theme(colors.terracotta/0.35),theme(colors.sauge/0.15))]
                       before:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]
                       before:[mask-composite:exclude] group-hover:before:opacity-100 md:col-span-1"
                    >
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <CalendarDays className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Fenêtres de départ possibles</h3>
                        </div>

                        <div className="mt-3 relative h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                            <div
                                className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                aria-hidden
                            />
                        </div>

                        <ul className="mt-4 flex flex-wrap gap-2">
                            {fenetres.map((f) => (
                                <li key={f} className="inline-flex items-center gap-2 rounded-xl border border-sauge/20 bg-sauge/5 px-3 py-1.5 text-sm text-foreground/80">
                                    <Clock className="w-4 h-4 text-sauge" aria-hidden />
                                    <span>{f}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto pt-4 flex items-center justify-between gap-3">
                            <p className="text-xs text-foreground/70">* Les créneaux sont mis à jour chaque mois.</p>
                            <Link href="/contact" className="text-[11px] tracking-[0.16em] uppercase font-semibold text-terracotta hover:underline">
                                Demander une place →
                            </Link>
                        </div>
                    </article>

                    {/* Délais indicatifs par techno — tirés de pack.json */}
                    <article
                        className="group relative h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md
                       before:pointer-events-none before:absolute before:-inset-px before:rounded-[20px]
                       before:p-[1px] before:opacity-0 before:transition-opacity before:duration-300
                       before:[background:conic-gradient(from_var(--angle),theme(colors.sauge/0.15),theme(colors.terracotta/0.35),theme(colors.sauge/0.15))]
                       before:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]
                       before:[mask-composite:exclude] group-hover:before:opacity-100 md:col-span-2 xl:col-span-1"
                    >
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <Clock className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Délais indicatifs par pack & techno</h3>
                        </div>

                        <div className="mt-3 relative h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                            <div
                                className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                aria-hidden
                            />
                        </div>

                        <div className="mt-4 overflow-hidden rounded-xl border border-sauge/20">
                            <table className="w-full text-sm">
                                <thead className="bg-sauge/5 text-foreground/70">
                                    <tr>
                                        <th className="text-left px-3 py-2 font-medium">Pack</th>
                                        <th className="text-left px-3 py-2 font-medium">WP</th>
                                        <th className="text-left px-3 py-2 font-medium">React</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((r) => (
                                        <tr key={r.pack} className="odd:bg-background even:bg-sauge/5">
                                            <td className="px-3 py-2">{r.pack}</td>
                                            <td className="px-3 py-2">{r.wp}</td>
                                            <td className="px-3 py-2">{r.react}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-3 rounded-xl border border-sauge/20 bg-sauge/5 p-3">
                            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-sauge/90">Important</p>
                            <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                                Les délais démarrent à réception des contenus et suivent les notes indiquées dans chaque pack.
                            </p>
                        </div>
                    </article>
                </div>

                <p className="text-xs text-foreground/70">* Besoin d’une fenêtre express ? Dis-le moi et on regarde ce qui est réaliste sans sacrifier la qualité.</p>
            </div>
        </section>
    );
}
