'use client';

import { Leaf, Accessibility, Gauge, UserCheck, ShieldCheck, Sparkles, ScrollText } from 'lucide-react';
import type { MethodPrincipleIcon } from '@/domain/method';
import { getMethodPrinciplesContent } from '@/application/method/use-cases/getMethodPrinciplesContent';

const principleIconMap: Record<MethodPrincipleIcon, React.ComponentType<{ className?: string }>> = {
    leaf: Leaf,
    accessibility: Accessibility,
    gauge: Gauge,
    userCheck: UserCheck,
    shieldCheck: ShieldCheck,
    sparkles: Sparkles,
};

export default function PrinciplesSection() {
    const content = getMethodPrinciplesContent();

    return (
        <section id="principes" aria-labelledby="principes-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-25 xl:px-37.5">
            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <ScrollText className="w-3.5 h-3.5" aria-hidden />
                        <span>{content.badge}</span>
                    </span>
                    <h2 id="principes-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        {content.title}
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">{content.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {content.principles.map(({ icon, title, desc, example }) => {
                        const Icon = principleIconMap[icon];

                        return (
                            <article
                                key={title}
                                className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                        <Icon className="w-4 h-4" aria-hidden />
                                    </span>
                                    <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">{title}</h3>
                                </div>

                                <div className="mt-3 relative h-0.5 overflow-hidden">
                                    <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                    <div
                                        className="absolute inset-y-0 left-0 w-0 bg-linear-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                        aria-hidden
                                    />
                                </div>

                                <div className="flex-1 flex flex-col">
                                    <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{desc}</p>

                                    <div className="mt-auto pt-4">
                                        <div className="rounded-xl border border-sauge/20 bg-sauge/5 p-3">
                                            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-sauge/90">{content.exampleLabel}</p>
                                            <p className="mt-1 text-sm text-foreground/80 leading-relaxed">{example}</p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <p className="text-xs text-foreground/70">{content.footnote}</p>
            </div>
        </section>
    );
}
