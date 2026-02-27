'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Sparkles, ShieldCheck, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { HomeContent } from '@/content/home';
import { useSwipeCarousel } from './use-swipe-carousel';

type HomeRoadmapMobileProps = {
    pillars: HomeContent['architecture']['pillars'];
};

const ICONS = {
    sparkles: Sparkles,
    shield: ShieldCheck,
    target: Target,
} as const;

const IMPACT_LABEL: Record<HomeContent['architecture']['pillars'][number]['title'], string> = {
    Attire: '↑ Attention',
    Convainc: '↑ Confiance',
    Convertit: '↑ Contacts',
};

const STEP_BADGE: Record<HomeContent['architecture']['pillars'][number]['title'], string> = {
    Attire: '01',
    Convainc: '02',
    Convertit: '03',
};

export function HomeRoadmapMobile({ pillars }: HomeRoadmapMobileProps) {
    const [reducedMotion, setReducedMotion] = useState(false);
    const [hapticFlash, setHapticFlash] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [hintReady, setHintReady] = useState(false);
    const [hintOffset, setHintOffset] = useState(0);
    const sectionRef = useRef<HTMLElement | null>(null);

    const triggerHapticFlash = useCallback(() => {
        setHapticFlash(true);
        window.setTimeout(() => setHapticFlash(false), 120);
    }, []);

    const { activeIndex, bind, setIndex, progress, isDragging, dragOffset } = useSwipeCarousel({
        itemCount: pillars.length,
        reducedMotion,
        inertia: 0.12,
        onIndexChange: triggerHapticFlash,
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updateReducedMotion = () => setReducedMotion(mediaQuery.matches);
        updateReducedMotion();
        mediaQuery.addEventListener('change', updateReducedMotion);
        return () => mediaQuery.removeEventListener('change', updateReducedMotion);
    }, []);

    useEffect(() => {
        if (reducedMotion || hasInteracted) return;
        const node = sectionRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setHintReady(true);
                }
            },
            { threshold: 0.55 },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [hasInteracted, reducedMotion]);

    useEffect(() => {
        if (!hintReady || reducedMotion || hasInteracted) return;
        let rafId = 0;
        let start = 0;
        const duration = 800;

        const run = (time: number) => {
            if (start === 0) start = time;
            const elapsed = time - start;
            const t = Math.min(1, elapsed / duration);
            const ease = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
            setHintOffset(Math.sin(ease * Math.PI) * 10);

            if (t < 1) {
                rafId = window.requestAnimationFrame(run);
            } else {
                setHintOffset(0);
            }
        };

        rafId = window.requestAnimationFrame(run);
        return () => window.cancelAnimationFrame(rafId);
    }, [hasInteracted, hintReady, reducedMotion]);

    const onInteraction = () => {
        if (!hasInteracted) {
            setHasInteracted(true);
        }
    };

    const trackStyle = useMemo(() => {
        const offset = isDragging ? dragOffset : 0;
        return {
            transform: `translate3d(calc(${-activeIndex * 100}% + ${offset + hintOffset}px), 0, 0)`,
        };
    }, [activeIndex, dragOffset, hintOffset, isDragging]);

    if (pillars.length === 0) return null;

    return (
        <section id="conversion-journey-mobile" ref={sectionRef} className="lg:hidden relative z-20  bg-background/80" role="region" aria-label="Conversion journey mobile">
            <div className="z-10 mb-3">
                <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1" aria-label="Étapes du conversion journey">
                    {pillars.map((pillar, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <button
                                key={pillar.title}
                                type="button"
                                aria-current={isActive ? 'true' : undefined}
                                onClick={() => {
                                    onInteraction();
                                    setIndex(index);
                                }}
                                className={cn(
                                    'shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-300',
                                    isActive
                                        ? 'border-accent/70 bg-accent/15 text-text shadow-[0_0_16px_rgba(27,194,255,0.25)]'
                                        : 'border-border/70 bg-background/50 text-text-muted',
                                )}
                            >
                                {pillar.title}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div
                className="relative overflow-hidden px-2"
                style={{ touchAction: 'pan-y' }}
                onPointerDown={bind.onPointerDown}
                onPointerMove={(event) => {
                    onInteraction();
                    bind.onPointerMove(event);
                }}
                onPointerUp={bind.onPointerUp}
                onPointerCancel={bind.onPointerCancel}
                onKeyDown={bind.onKeyDown}
                tabIndex={0}
                aria-label="Carousel swipe du parcours de conversion"
            >
                <div className="flex gap-0 transition-transform duration-300" style={trackStyle}>
                    {pillars.map((pillar, index) => {
                        const isActive = index === activeIndex;
                        const Icon = ICONS[pillar.icon];
                        const parallaxX = isActive ? (isDragging ? dragOffset * 0.08 : 0) : 0;
                        return (
                            <article
                                key={pillar.title}
                                className="w-full shrink-0 "
                                aria-hidden={!isActive}
                                style={{
                                    transform: isActive ? 'scale(1)' : 'scale(0.92)',
                                    opacity: isActive ? 1 : 0.55,
                                    filter: reducedMotion || isActive ? 'none' : 'blur(1.5px)',
                                    transition: 'transform 240ms ease, opacity 240ms ease, filter 240ms ease',
                                }}
                            >
                                <div
                                    className={cn(
                                        'relative min-h-107.5 rounded-3xl border border-border/70 bg-linear-to-b from-background/95 to-background/70 p-4 shadow-[0_20px_40px_rgba(0,0,0,0.3)]',
                                        isActive && 'border-accent/55',
                                        isActive && hapticFlash && 'scale-[1.01] shadow-[0_0_40px_rgba(27,194,255,0.35)]',
                                    )}
                                >
                                    <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,rgba(27,194,255,0.18),transparent_60%)]" />
                                    <div className="relative z-10 flex h-full flex-col">
                                        <div className="flex items-start gap-3">
                                            <span className="rounded-2xl border border-border/70 bg-background/40 p-2 backdrop-blur">
                                                <Icon className="h-5 w-5 text-accent" />
                                            </span>
                                            <div>
                                                <p className="text-xs text-text-muted">
                                                    {STEP_BADGE[pillar.title]} · <span className="text-accent">{pillar.title}</span>
                                                </p>
                                                <h3 className="mt-1 text-base font-semibold leading-snug">{pillar.headline}</h3>
                                            </div>
                                        </div>

                                        <p className="mt-3 text-sm text-text-muted">{pillar.description}</p>
                                        <ul className="mt-3 space-y-2 text-sm text-text-muted">
                                            {pillar.bullets.slice(0, 3).map((bullet) => (
                                                <li key={bullet} className="flex gap-2">
                                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {pillar.image ? (
                                            <div className="relative mt-3 overflow-hidden rounded-2xl border border-border/70">
                                                <Image
                                                    src={pillar.image.src}
                                                    alt={pillar.image.alt}
                                                    width={540}
                                                    height={300}
                                                    className="h-36 w-full object-cover"
                                                    style={{ transform: `translate3d(${parallaxX}px,0,0) scale(1.03)` }}
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
                                            </div>
                                        ) : null}

                                        <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3 text-xs text-text-muted">
                                            <span>Impact</span>
                                            <span className="font-semibold text-text">{IMPACT_LABEL[pillar.title]}</span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border/70">
                <div
                    className="h-full rounded-full bg-linear-to-r from-accent via-primary to-accent transition-all duration-300"
                    style={{ width: `${Math.max(8, progress * 100)}%` }}
                />
            </div>
        </section>
    );
}
