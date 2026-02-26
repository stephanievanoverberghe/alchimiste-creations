'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { getMethodCaseStudyCards, type MethodCaseStudyProject } from '@/application/method/use-cases/getMethodCaseStudyCards';
import { methodCaseStudiesCopy } from '@/infrastructure/content/method-copy';

import rawData from '@/infrastructure/content/projects.json';
import CardProject from '@/presentation/components/cards/CardProject';
import CardContactTeaser from '@/presentation/components/cards/CardContactTeaser';

export default function MethodCaseStudiesSection({ projects, ctaHref = '/projets' }: { projects?: MethodCaseStudyProject[]; ctaHref?: string }) {
    const source: MethodCaseStudyProject[] = Array.isArray(projects) && projects.length ? projects : (rawData as MethodCaseStudyProject[]);
    const projectCards = getMethodCaseStudyCards(source, 2);

    return (
        <section id="etudes-de-cas" aria-labelledby="cases-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-25 xl:px-37.5">
            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <Sparkles className="w-3.5 h-3.5" aria-hidden />
                        <span>{methodCaseStudiesCopy.badge}</span>
                    </span>
                    <h2 id="cases-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        {methodCaseStudiesCopy.title}
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">{methodCaseStudiesCopy.description}</p>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
                    {projectCards.map((project) => (
                        <li key={project.key} className="h-full">
                            <CardProject project={project} />
                        </li>
                    ))}

                    <li className="h-full md:col-span-2 md:hidden lg:block  lg:col-span-1">
                        <div className="h-full">
                            <CardContactTeaser />
                        </div>
                    </li>
                </ul>

                <div className="mt-6 md:mt-8 text-center">
                    <Link
                        href={ctaHref}
                        className="inline-block px-6 py-3 rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                    >
                        {methodCaseStudiesCopy.ctaLabel}
                    </Link>
                </div>
            </div>
        </section>
    );
}
