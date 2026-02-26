'use client';

import { Leaf, HeartHandshake, ListChecks, Sparkles, ShieldCheck } from 'lucide-react';
import { aboutValuesCopy } from '@/infrastructure/content/about-copy';

export default function ValuesSection() {
    const pillars = [
        { icon: HeartHandshake, ...aboutValuesCopy.pillars[0] },
        { icon: ListChecks, ...aboutValuesCopy.pillars[1] },
        { icon: Sparkles, ...aboutValuesCopy.pillars[2] },
        { icon: ShieldCheck, ...aboutValuesCopy.pillars[3] },
    ];

    return (
        <section aria-labelledby="values-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-25 xl:px-37.5 overflow-hidden">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
            />

            <div className="relative max-w-7xl mx-auto space-y-10 md:space-y-12">
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <Leaf className="w-3.5 h-3.5" aria-hidden />
                        <span>{aboutValuesCopy.badge}</span>
                    </span>

                    <h2 id="values-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        {aboutValuesCopy.title}
                    </h2>

                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">{aboutValuesCopy.intro}</p>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {pillars.map(({ icon: Icon, title, desc }) => (
                        <li key={title} className="group rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                            <div className="flex items-center gap-3">
                                <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <Icon className="w-3.5 h-3.5" aria-hidden />
                                </span>
                                <h3 className="text-xs tracking-[0.14em] uppercase font-semibold text-terracotta">{title}</h3>
                            </div>

                            <div className="mt-3 relative h-0.5overflow-hidden">
                                <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                <div
                                    className="absolute inset-y-0 left-0 w-0 bg-linear-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full group-focus-within:w-1/2"
                                    aria-hidden
                                />
                            </div>

                            <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{desc}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
