'use client';

import Link from 'next/link';
import { cn } from '@/shared/utils/cn';
import { Ear, Palette, Code2, Rocket, CalendarDays, BadgeCheck } from 'lucide-react';
import { miniProcessCopy } from '@/infrastructure/content/shared-copy';

const stepIcons = {
    ear: Ear,
    palette: Palette,
    code: Code2,
    rocket: Rocket,
} as const;

export default function MiniProcessSection() {
    const { badge, title, intro, ctaLabel, ctaNotePrefix, ctaNoteEmphasis, ctaNoteSuffix, steps } = miniProcessCopy;

    return (
        <section id="mini-process" aria-labelledby="process-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-25 xl:px-37.5">
            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <CalendarDays className="w-3.5 h-3.5" aria-hidden />
                        <span>{badge}</span>
                    </span>

                    <h2 id="process-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        {title}
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">{intro}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
                    {steps.map(({ icon, label, description, milestone, validation }, i) => {
                        const Icon = stepIcons[icon];

                        return (
                            <article
                                key={label}
                                className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex items-center justify-center size-7 rounded-full border border-ormat/30 bg-ormat/10 text-[11px] font-semibold text-ormat">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                        <Icon className="w-4 h-4" aria-hidden />
                                    </span>
                                    <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">{label}</h3>
                                </div>

                                <div className="mt-3 relative h-0.5 overflow-hidden">
                                    <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                    <div
                                        className="absolute inset-y-0 left-0 w-0 bg-linear-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                        aria-hidden
                                    />
                                </div>

                                <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{description}</p>

                                <div className="mt-auto pt-4 flex items-center gap-2 flex-wrap">
                                    <span className="inline-flex items-center gap-1 rounded-full border border-sauge/30 bg-sauge/10 text-sauge px-2.5 py-1 text-xs">
                                        <CalendarDays className="w-3.5 h-3.5" aria-hidden />
                                        {milestone}
                                    </span>
                                    <span className="inline-flex items-center gap-1 rounded-full border border-terracotta/30 bg-terracotta/10 text-terracotta px-2.5 py-1 text-xs">
                                        <BadgeCheck className="w-3.5 h-3.5" aria-hidden />
                                        {validation}
                                    </span>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-sm text-foreground/70 italic">
                        {ctaNotePrefix}
                        <span className="not-italic font-medium text-terracotta">{ctaNoteEmphasis}</span>
                        {ctaNoteSuffix}
                    </p>
                    <Link
                        href="/methode"
                        className={cn(
                            'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl',
                            'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                            'border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]',
                        )}
                    >
                        <BadgeCheck className="w-4 h-4" aria-hidden />
                        {ctaLabel}
                    </Link>
                </div>
            </div>
        </section>
    );
}
