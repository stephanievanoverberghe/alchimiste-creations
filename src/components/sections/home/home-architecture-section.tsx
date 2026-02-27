'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Target } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContent } from '@/content/home';
import { cn } from '@/lib/utils';

import { HomeRoadmapMobile } from './mobile/home-roadmap-mobile';

type Props = { content: HomeContent['architecture'] };

const ICONS = {
    sparkles: Sparkles,
    shield: ShieldCheck,
    target: Target,
} as const;

const STEP_BADGE: Record<string, string> = {
    Attire: '01',
    Convainc: '02',
    Convertit: '03',
};

const AUTO_PLAY_MS = 5200;

function mod(n: number, m: number) {
    return ((n % m) + m) % m;
}

export function HomeArchitectureSection({ content }: Props) {
    const items = content.pillars;
    const count = items.length;

    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isReducedMotion, setIsReducedMotion] = useState(false);

    const autoPlayTimerRef = useRef<number | null>(null);

    const goToIndex = useCallback(
        (index: number) => {
            if (count === 0) return;
            setActiveIndex(mod(index, count));
        },
        [count],
    );

    const goNext = useCallback(() => goToIndex(activeIndex + 1), [activeIndex, goToIndex]);
    const goPrev = useCallback(() => goToIndex(activeIndex - 1), [activeIndex, goToIndex]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updateMotion = () => setIsReducedMotion(mediaQuery.matches);

        updateMotion();
        mediaQuery.addEventListener('change', updateMotion);

        return () => mediaQuery.removeEventListener('change', updateMotion);
    }, []);

    useEffect(() => {
        if (count <= 1 || isPaused || isReducedMotion) return;

        autoPlayTimerRef.current = window.setInterval(() => {
            setActiveIndex((previous) => mod(previous + 1, count));
        }, AUTO_PLAY_MS);

        return () => {
            if (autoPlayTimerRef.current) window.clearInterval(autoPlayTimerRef.current);
            autoPlayTimerRef.current = null;
        };
    }, [count, isPaused, isReducedMotion]);

    const orderedSlides = useMemo(() => {
        return items.map((_, index) => {
            const offset = mod(index - activeIndex, count);
            return { index, offset };
        });
    }, [activeIndex, count, items]);

    if (count === 0) return null;

    return (
        <Section id="architecture">
            <Container>
                <SectionHeading eyebrow={content.eyebrow} title={content.title} />

                {/* ✅ Mobile + tablette : Swipe */}
                {/* (⚠️ Assure-toi que HomeRoadmapMobile a bien `className="lg:hidden ..."` côté section) */}
                <HomeRoadmapMobile pillars={items} />

                {/* ✅ Desktop : Carousel */}
                <div className="hidden lg:block">
                    <div
                        className="relative"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onFocusCapture={() => setIsPaused(true)}
                        onBlurCapture={() => setIsPaused(false)}
                        onKeyDown={(event) => {
                            if (event.key === 'ArrowRight') {
                                event.preventDefault();
                                goNext();
                            }
                            if (event.key === 'ArrowLeft') {
                                event.preventDefault();
                                goPrev();
                            }
                        }}
                        role="region"
                        aria-label="Carousel des étapes du tunnel de conversion"
                        tabIndex={0}
                    >
                        <div className="mb-5 flex items-center justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-2" aria-label="Étapes du tunnel de conversion">
                                {items.map((pillar, idx) => {
                                    const isActive = idx === activeIndex;
                                    return (
                                        <button
                                            key={pillar.title}
                                            type="button"
                                            className={cn(
                                                'rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-300 cursor-pointer',
                                                isActive
                                                    ? 'border-accent/60 bg-accent/10 text-text'
                                                    : 'border-border/70 bg-background/40 text-text-muted hover:border-accent/40 hover:text-text',
                                            )}
                                            onClick={() => goToIndex(idx)}
                                            aria-current={isActive}
                                        >
                                            {STEP_BADGE[pillar.title]} · {pillar.title}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* ✅ Desktop only, donc plus besoin de sm:hidden ici */}
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={goPrev}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full cursor-pointer border border-border/80 bg-background/70 text-text-muted transition hover:border-accent/60 hover:text-text"
                                    aria-label="Slide précédente"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={goNext}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full cursor-pointer border border-border/80 bg-background/70 text-text-muted transition hover:border-accent/60 hover:text-text"
                                    aria-label="Slide suivante"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-3xl">
                            <div className="flex w-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                                {items.map((pillar) => {
                                    const Icon = ICONS[pillar.icon];

                                    return (
                                        <div key={pillar.title} className="w-full shrink-0 px-1">
                                            <Card className="group relative overflow-hidden p-6 sm:p-8">
                                                <div
                                                    aria-hidden="true"
                                                    className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
                                                    style={{
                                                        background:
                                                            pillar.title === 'Attire'
                                                                ? 'rgba(122,84,255,0.16)'
                                                                : pillar.title === 'Convainc'
                                                                  ? 'rgba(19,209,255,0.14)'
                                                                  : 'rgba(122,84,255,0.12)',
                                                    }}
                                                />

                                                <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-start">
                                                    <div>
                                                        <div className="flex items-start gap-3">
                                                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-background/40">
                                                                <Icon className="h-5 w-5 text-accent" />
                                                            </span>
                                                            <div className="min-w-0">
                                                                <p className="text-xs font-semibold tracking-wide text-text-muted">
                                                                    {STEP_BADGE[pillar.title]} · <span className="text-accent">{pillar.title}</span>
                                                                </p>
                                                                <h3 className="mt-1 text-xl font-semibold leading-snug">{pillar.headline}</h3>
                                                            </div>
                                                        </div>

                                                        <p className="mt-3 text-sm text-text-muted sm:text-base">{pillar.description}</p>

                                                        <ul className="mt-5 space-y-2 text-sm sm:text-base">
                                                            {pillar.bullets.map((bullet) => (
                                                                <li key={bullet} className="flex gap-2 text-text-muted">
                                                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                                                    <span>{bullet}</span>
                                                                </li>
                                                            ))}
                                                        </ul>

                                                        <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-xs text-text-muted sm:text-sm">
                                                            <span>Impact</span>
                                                            <span className={cn('font-medium', pillar.title === 'Convertit' ? 'text-text' : 'text-text-muted')}>
                                                                {pillar.title === 'Attire' ? '↑ Attention' : pillar.title === 'Convainc' ? '↑ Confiance' : '↑ Prises de contact'}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {pillar.image ? (
                                                        <div className="overflow-hidden rounded-2xl border border-border/70 bg-background/30">
                                                            <div className="relative">
                                                                <Image
                                                                    src={pillar.image.src}
                                                                    alt={pillar.image.alt}
                                                                    width={640}
                                                                    height={420}
                                                                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                                />
                                                                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/25 to-transparent" />
                                                                <p className="absolute bottom-3 left-3 text-xs font-medium text-text sm:text-sm">
                                                                    {pillar.title === 'Attire'
                                                                        ? 'Clarté immédiate'
                                                                        : pillar.title === 'Convainc'
                                                                          ? 'Confiance renforcée'
                                                                          : 'Action évidente'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </Card>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-5 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2" role="tablist" aria-label="Navigation des slides">
                                {orderedSlides.map(({ index }) => (
                                    <button
                                        key={items[index].title}
                                        type="button"
                                        onClick={() => goToIndex(index)}
                                        className={cn('h-2 rounded-full cursor-pointer transition-all duration-300', index === activeIndex ? 'w-8 bg-accent' : 'w-2 bg-border')}
                                        aria-label={`Voir la slide ${index + 1}`}
                                        aria-selected={index === activeIndex}
                                        role="tab"
                                    />
                                ))}
                            </div>

                            <p className="text-xs font-medium text-text-muted sm:text-sm">
                                {STEP_BADGE[items[activeIndex]?.title] ?? '01'} / {String(items.length).padStart(2, '0')}
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
