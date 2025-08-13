// components/sections/projects/project/Stack.tsx
import Image from 'next/image';
import { Code2, Layers, Tags } from 'lucide-react';

type Project = {
    stack?: string;
    stackTags?: string[];
    tags?: string[];
};

const tone = {
    sauge: 'border-sauge/30 bg-sauge/10 text-sauge',
    terracotta: 'border-terracotta/30 bg-terracotta/10 text-terracotta',
} as const;

function stackLabel(v?: string) {
    const s = (v ?? '').toLowerCase();
    if (s.includes('react')) return 'React';
    if (s.includes('wordpress')) return 'WordPress';
    return v || 'Stack';
}

function prettyTag(v: string) {
    const s = v.trim().toLowerCase();
    const map: Record<string, string> = {
        nextjs: 'Next.js',
        tailwind: 'Tailwind CSS',
        stripe: 'Stripe',
        woocommerce: 'WooCommerce',
        gutenberg: 'Gutenberg',
        acf: 'ACF',
        booking: 'Booking',
        'seo-local': 'SEO local',
        'images-optimized': 'Images optimisées',
        'framer-motion': 'Framer Motion',
        calendly: 'Calendly',
    };
    return map[s] || v;
}

export default function StackSection({ project }: { project?: Project }) {
    const stack = stackLabel(project?.stack);
    const stackTags = Array.from(new Set((project?.stackTags ?? []).filter(Boolean))).slice(0, 12);
    const scopeTags = Array.from(new Set((project?.tags ?? []).filter(Boolean))).slice(0, 16);

    const hasStack = Boolean(project?.stack || stackTags.length);
    const hasScope = scopeTags.length > 0;
    if (!hasStack && !hasScope) return null;

    return (
        <section id="projet-stack" aria-labelledby="projet-stack-title" className="relative py-16 md:py-24 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="" fill priority className="h-auto object-cover" />
            </div>
            <div className="relative max-w-5xl mx-auto space-y-8">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <Tags className="w-3.5 h-3.5" aria-hidden />
                        Stack & périmètre
                    </span>
                    <h2 id="projet-stack-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Ce qu’on a utilisé • Ce qu’on a couvert
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Les briques techniques et l’étendue fonctionnelle — pour situer rapidement le terrain de jeu.
                    </p>
                </div>

                {/* Grille : Stack technique / Périmètre & modules */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {hasStack && (
                        <article className="group relative rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                            {/* motif discret */}
                            <div
                                className="pointer-events-none absolute inset-0 opacity-10"
                                style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                                aria-hidden
                            />
                            <div className="relative z-[1]">
                                <div className="flex items-center gap-3">
                                    <span className="grid place-content-center size-10 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                        <Code2 className="w-5 h-5" aria-hidden />
                                    </span>
                                    <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Stack technique</h3>
                                </div>

                                {/* séparateur animé */}
                                <div className="mt-3 relative h-[2px] overflow-hidden">
                                    <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                    <div
                                        className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                        aria-hidden
                                    />
                                </div>

                                {/* Chips stack */}
                                <ul className="mt-3 flex flex-wrap items-center gap-2">
                                    {project?.stack && (
                                        <li>
                                            <span
                                                className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${tone.sauge}`}
                                            >
                                                {stack}
                                            </span>
                                        </li>
                                    )}
                                    {stackTags.map((t) => (
                                        <li key={t}>
                                            <span
                                                className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${tone.sauge}`}
                                            >
                                                {prettyTag(t)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    )}

                    {hasScope && (
                        <article className="group relative rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                            {/* motif discret */}
                            <div
                                className="pointer-events-none absolute inset-0 opacity-10"
                                style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                                aria-hidden
                            />
                            <div className="relative z-[1]">
                                <div className="flex items-center gap-3">
                                    <span className="grid place-content-center size-10 rounded-full border border-terracotta/40 bg-terracotta/10 text-terracotta">
                                        <Layers className="w-5 h-5" aria-hidden />
                                    </span>
                                    <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Périmètre & modules</h3>
                                </div>

                                {/* séparateur animé */}
                                <div className="mt-3 relative h-[2px] overflow-hidden">
                                    <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                    <div
                                        className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                        aria-hidden
                                    />
                                </div>

                                {/* Chips périmètre */}
                                <ul className="mt-3 flex flex-wrap items-center gap-2">
                                    {scopeTags.map((t) => (
                                        <li key={t}>
                                            <span
                                                className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${tone.terracotta}`}
                                            >
                                                {prettyTag(t)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    )}
                </div>
            </div>
        </section>
    );
}
