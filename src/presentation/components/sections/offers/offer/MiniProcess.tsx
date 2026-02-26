'use client';

import { usePathname } from 'next/navigation';
import packsRaw from '@/infrastructure/content/packs.json';
import { miniProcessCopy } from '@/infrastructure/content/shared-copy';
import { Ear, Palette, Code2, Rocket, CalendarClock, CalendarDays, BadgeCheck } from 'lucide-react';

type PackSlug = 'essentiel' | 'croissance' | 'signature';

type Pack = {
    slug: PackSlug;
    delaiNote?: string;
    versions?: {
        wordpress?: { delai?: string };
        react?: { delai?: string };
    };
};

const PACKS = packsRaw as unknown as Pack[];

function getPack(slug: PackSlug) {
    return PACKS.find((p) => p.slug === slug);
}

function normalizeDelai(s?: string) {
    if (!s) return undefined;
    return s.replace(/\s*à\s*/i, '–').replace(/semaines?/i, 'sem.');
}

export default function MiniProcessSection() {
    const pathname = usePathname();
    const match = pathname.match(/^\/offres\/(essentiel|croissance|signature)\/?$/);
    const key = (match?.[1] as PackSlug) ?? 'essentiel';

    const pack = getPack(key);
    const wpDelai = normalizeDelai(pack?.versions?.wordpress?.delai);
    const rnDelai = normalizeDelai(pack?.versions?.react?.delai);

    const iconMap = {
        ear: Ear,
        palette: Palette,
        code: Code2,
        rocket: Rocket,
    } as const;

    const steps = miniProcessCopy.steps.map((step) => ({
        icon: iconMap[step.icon],
        label: step.label,
        desc: step.description,
        milestone: step.milestone,
        validation: step.validation,
    }));

    return (
        <section aria-labelledby="process-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-25 xl:px-37.5">
            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <CalendarClock className="h-3.5 w-3.5" aria-hidden />
                        {miniProcessCopy.badge}
                    </span>
                    <h2 id="process-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        {miniProcessCopy.title}
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">{miniProcessCopy.intro}</p>

                    <div className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-start">
                        {wpDelai && (
                            <span className="inline-flex items-center gap-2 rounded-full border border-sauge/40 bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
                                WordPress&nbsp;: {wpDelai}
                            </span>
                        )}
                        {rnDelai && (
                            <span className="inline-flex items-center gap-2 rounded-full border border-sauge/40 bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
                                React / Next&nbsp;: {rnDelai}
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
                    {steps.map(({ icon: Icon, label, desc, milestone, validation }, i) => (
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

                            <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{desc}</p>

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
                    ))}
                </div>

                <p className="text-xs text-foreground/70">
                    {miniProcessCopy.ctaNotePrefix}
                    <strong>{miniProcessCopy.ctaNoteEmphasis}</strong>
                    {miniProcessCopy.ctaNoteSuffix}
                </p>

                {pack?.delaiNote && <p className="text-xs text-foreground/70">* {pack.delaiNote}</p>}
            </div>
        </section>
    );
}
