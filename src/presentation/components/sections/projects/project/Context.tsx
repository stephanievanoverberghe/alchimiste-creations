// components/sections/project/ProjectContext.tsx
import Image from 'next/image';
import { IdCard, Target, ScrollText } from 'lucide-react';

type Project = {
    pourQui?: string;
    besoin?: string;
};

export default function ContextSection({ project }: { project?: Project }) {
    const hasPourQui = Boolean(project?.pourQui?.trim());
    const hasBesoin = Boolean(project?.besoin?.trim());
    if (!hasPourQui && !hasBesoin) return null;

    return (
        <section id="projet-contexte" aria-labelledby="projet-contexte-title" className="relative py-16 md:py-24 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="" fill priority className="h-auto object-cover" />
            </div>
            <div className="relative max-w-5xl mx-auto space-y-8">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <ScrollText className="w-3.5 h-3.5" aria-hidden />
                        <span>Contexte</span>
                    </span>
                    <h2 id="projet-contexte-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Pour qui&nbsp;? • Besoin
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Ce qui caractérise le métier et l’intention du projet — pour poser le cadre avant d’entrer dans la réalisation.
                    </p>
                </div>

                {/* Deux cartes : Pour qui / Besoin */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {hasPourQui && (
                        <article className="group relative h-full rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                            {/* motif discret */}
                            <div
                                className="pointer-events-none absolute inset-0 opacity-10"
                                style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                                aria-hidden
                            />
                            <div className="relative z-[1]">
                                <div className="flex items-center gap-3">
                                    <span className="grid place-content-center size-10 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                        <IdCard className="w-5 h-5" aria-hidden />
                                    </span>
                                    <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Pour qui</h3>
                                </div>

                                {/* séparateur animé */}
                                <div className="mt-3 relative h-[2px] overflow-hidden">
                                    <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                    <div
                                        className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                        aria-hidden
                                    />
                                </div>

                                <p className="mt-3 text-sm md:text-base text-foreground/85 leading-relaxed">{project!.pourQui}</p>
                            </div>
                        </article>
                    )}

                    {hasBesoin && (
                        <article className="group relative h-full rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                            <div
                                className="pointer-events-none absolute inset-0 opacity-10"
                                style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                                aria-hidden
                            />
                            <div className="relative z-[1]">
                                <div className="flex items-center gap-3">
                                    <span className="grid place-content-center size-10 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                        <Target className="w-5 h-5" aria-hidden />
                                    </span>
                                    <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Besoin</h3>
                                </div>

                                {/* séparateur animé */}
                                <div className="mt-3 relative h-[2px] overflow-hidden">
                                    <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                    <div
                                        className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                        aria-hidden
                                    />
                                </div>

                                <p className="mt-3 text-sm md:text-base text-foreground/85 leading-relaxed">{project!.besoin}</p>
                            </div>
                        </article>
                    )}
                </div>
            </div>
        </section>
    );
}
