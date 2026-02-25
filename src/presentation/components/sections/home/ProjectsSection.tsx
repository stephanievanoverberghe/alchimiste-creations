'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/shared/utils/cn';
import { GalleryVerticalEnd, LayoutGrid } from 'lucide-react';
import { getHomeProjectCards } from '@/application/home';
import { homeProjectsCopy } from '@/infrastructure/content/home-copy';
import CardProject from '@/presentation/components/cards/CardProject';
import CardContactTeaser from '@/presentation/components/cards/CardContactTeaser';

export default function ProjectsSection({ ctaHref = '/projets' }: { ctaHref?: string }) {
    const projectCards = getHomeProjectCards();

    return (
        <section className="relative py-16 md:py-28 px-6 md:px-8 lg:px-25 xl:px-37.5">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-background via-ormat/20 to-background" />
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="" fill priority className="h-auto object-cover" />
            </div>

            <div className="relative mx-auto w-full max-w-7xl">
                <div className="group text-center lg:text-left mb-12">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <GalleryVerticalEnd className="w-3.5 h-3.5" aria-hidden />
                        <span>{homeProjectsCopy.badge}</span>
                    </span>

                    <h2 className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">{homeProjectsCopy.title}</h2>

                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">{homeProjectsCopy.intro}</p>
                </div>

                {/* Grid */}
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
                    {projectCards.map((p) => (
                        <li key={p.key} className="h-full">
                            <CardProject project={p} />
                        </li>
                    ))}
                    {/* Teaser contact */}
                    <li className="h-full">
                        <CardContactTeaser />
                    </li>
                </ul>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <Link
                        href={ctaHref}
                        className={cn(
                            'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl',
                            'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                            'border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]',
                        )}
                    >
                        <LayoutGrid className="w-4 h-4" aria-hidden />
                        {homeProjectsCopy.cta}
                    </Link>
                </div>
            </div>
        </section>
    );
}
