// components/sections/project/ProjectProposition.tsx
import { ListChecks, CheckCircle2 } from 'lucide-react';

type Project = {
    proposition?: string[];
};

export default function PropositionSection({ project }: { project?: Project }) {
    const items = Array.isArray(project?.proposition)
        ? project!.proposition
              .map((s) => (typeof s === 'string' ? s.trim() : ''))
              .filter(Boolean)
              .slice(0, 8)
        : [];

    if (items.length === 0) return null;

    return (
        <section id="projet-proposition" aria-labelledby="projet-proposition-title" className="relative py-16 md:py-24 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-5xl mx-auto space-y-8">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <ListChecks className="w-3.5 h-3.5" aria-hidden />
                        Proposition
                    </span>
                    <h2 id="projet-proposition-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Ce qu’on a mis en place
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Une mise en œuvre concrète et lisible&nbsp;: structure, UX et intégrations clés au service des objectifs.
                    </p>
                </div>

                {/* Carte + liste en 2 colonnes (md+) */}
                <article className="group relative overflow-hidden rounded-[20px] border border-sauge/30 bg-background p-5 md:p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    {/* Motif discret */}
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
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            {items.map((line) => (
                                <li key={line} className="flex items-start gap-2.5">
                                    <CheckCircle2 className="mt-0.5 w-4.5 h-4.5 text-sauge shrink-0" aria-hidden />
                                    <span className="text-sm md:text-base text-foreground/85 leading-relaxed">{line}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Séparateur animé collé en bas */}
                    <div className="pointer-events-none absolute left-5 right-5 bottom-4 h-[2px] overflow-hidden">
                        <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                        <div
                            className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                            aria-hidden
                        />
                    </div>
                </article>
            </div>
        </section>
    );
}
