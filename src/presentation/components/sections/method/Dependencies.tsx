import { Box, FileText, FolderOpen, Globe, Image as ImageIcon, KeySquare, Link2, ListChecks, ShieldCheck, Type, type LucideIcon } from 'lucide-react';

import { getMethodDependenciesContent } from '@/application/method/use-cases/getMethodDependenciesContent';
import type { MethodDependencyCard, MethodDependencyIcon } from '@/domain/method';

const ICON_BY_KEY: Record<MethodDependencyIcon, LucideIcon> = {
    fileText: FileText,
    image: ImageIcon,
    keySquare: KeySquare,
    globe: Globe,
    shieldCheck: ShieldCheck,
    folderOpen: FolderOpen,
    type: Type,
    link2: Link2,
    listChecks: ListChecks,
};

const CARD_COL_SPAN_BY_ID: Partial<Record<MethodDependencyCard['id'], string>> = {
    prerequisites: 'lg:col-span-1',
    formats: 'lg:col-span-1',
    bestPractices: 'md:col-span-2 xl:col-span-1',
};

export default function MethodDependenciesSection() {
    const content = getMethodDependenciesContent();

    return (
        <section id="dependances" aria-labelledby="dependances-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <Box className="w-3.5 h-3.5" aria-hidden />
                        <span>{content.badge}</span>
                    </span>

                    <h2 id="dependances-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        {content.title}
                    </h2>

                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">{content.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {content.cards.map((card) => {
                        const CardIcon = ICON_BY_KEY[card.icon];
                        const colSpan = CARD_COL_SPAN_BY_ID[card.id] ?? '';

                        return (
                            <article
                                key={card.id}
                                className={`group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${colSpan}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                        <CardIcon className="w-4 h-4" aria-hidden />
                                    </span>
                                    <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">{card.title}</h3>
                                </div>

                                <div className="mt-3 relative h-[2px] overflow-hidden">
                                    <div className="absolute inset-0 bg-sauge/20" />
                                    <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                                </div>

                                <ul className="mt-4 space-y-2">
                                    {card.items.map((item) => {
                                        const ItemIcon = ICON_BY_KEY[item.icon];

                                        return (
                                            <li key={item.label} className="flex items-start gap-2.5">
                                                <span className="grid place-content-center size-7 rounded-full border border-sauge/40 bg-sauge/10 text-sauge mt-0.5">
                                                    <ItemIcon className="w-3.5 h-3.5" aria-hidden />
                                                </span>
                                                <span className="text-sm text-foreground/80 leading-relaxed">{item.label}</span>
                                            </li>
                                        );
                                    })}
                                </ul>

                                {card.tags?.length ? (
                                    <div className="mt-auto pt-4 flex flex-wrap gap-2">
                                        {card.tags.map((tag) => {
                                            const TagIcon = ICON_BY_KEY[tag.icon];
                                            return (
                                                <span
                                                    key={tag.label}
                                                    className="inline-flex items-center gap-1 rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 text-xs"
                                                >
                                                    <TagIcon className="w-3.5 h-3.5" aria-hidden /> {tag.label}
                                                </span>
                                            );
                                        })}
                                    </div>
                                ) : null}

                                <div className="mt-3 rounded-xl border border-sauge/20 bg-sauge/5 p-3">
                                    <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-sauge/90">{card.exampleTitle}</p>
                                    <p className="mt-1 text-sm text-foreground/80 leading-relaxed">{card.exampleDescription}</p>
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
