// components/sections/project/ProjectTestimonial.tsx
import Image from 'next/image';
import { Quote } from 'lucide-react';

type Testi = { quote?: string; author?: string };
type Project = {
    client?: string;
    logo?: string;
    citationClient?: string;
    testimonials?: Testi[];
};

export default function TestimonialSection({ project }: { project?: Project }) {
    if (!project) return null;

    const list = (project.testimonials ?? []).filter(Boolean);
    const primaryQuote = list[0]?.quote?.trim() || project.citationClient?.trim();
    const primaryAuthor = list[0]?.author?.trim() || project.client?.trim();

    if (!primaryQuote) return null;

    return (
        <section id="projet-temoignage" aria-labelledby="projet-temoignage-title" className="relative py-16 md:py-24 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-5xl mx-auto space-y-8">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <Quote className="w-3.5 h-3.5" aria-hidden />
                        Témoignage
                    </span>
                    <h2 id="projet-temoignage-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        La voix du client
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">La preuve sociale la plus forte — rattachée directement au cas.</p>
                </div>

                {/* Carte principale */}
                <article className="group relative rounded-[20px] border border-sauge/30 bg-background p-5 md:p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
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
                        <div className="flex items-center gap-3">
                            {/* Logo (optionnel) */}
                            {project.logo ? (
                                <span className="inline-flex items-center justify-center w-10 h-10 min-w-10 min-h-10 rounded-full overflow-hidden border border-sauge/30 bg-background/80 shrink-0">
                                    <Image src={project.logo} alt="" width={40} height={40} className="w-full h-full object-contain p-1.5" />
                                </span>
                            ) : (
                                <span className="grid place-content-center size-10 rounded-full border border-sauge/30 bg-background/80 text-sauge">
                                    <Quote className="w-4 h-4" aria-hidden />
                                </span>
                            )}

                            <div className="min-w-0 w-full">
                                {/* séparateur animé */}
                                <div className="relative h-[2px] overflow-hidden">
                                    <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                    <div
                                        className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                        aria-hidden
                                    />
                                </div>

                                {/* Citation principale */}
                                <blockquote className="mt-3 text-[15px] md:text-base leading-relaxed text-foreground/90">« {primaryQuote} »</blockquote>

                                {/* Auteur */}
                                {primaryAuthor && (
                                    <footer className="mt-3 text-sm text-foreground/70">
                                        — <cite className="not-italic">{primaryAuthor}</cite>
                                    </footer>
                                )}
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}
