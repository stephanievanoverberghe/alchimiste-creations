'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Milestone, Mail } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import Link from 'next/link';
import { aboutMilestonesCopy } from '@/infrastructure/content/about-copy';

export default function MilestonesSlider() {
    const items = aboutMilestonesCopy.items;
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const progressRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const startXRef = useRef<number | null>(null);
    const autoplayMs = 4500;

    const [reduceMotion, setReduceMotion] = useState(false);
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReduceMotion(mq.matches);
        const onChange = () => setReduceMotion(mq.matches);
        mq.addEventListener?.('change', onChange);
        return () => mq.removeEventListener?.('change', onChange);
    }, []);

    useEffect(() => {
        if (paused || reduceMotion) return;
        const bar = progressRef.current;
        if (bar) {
            bar.style.transition = 'none';
            bar.style.width = '0%';
            void bar.offsetWidth;
            bar.style.transition = `width ${autoplayMs}ms linear`;
            bar.style.width = '100%';
        }
        const t = setTimeout(() => setIndex((i) => (i + 1) % items.length), autoplayMs);
        const cancel = () => {
            clearTimeout(t);
            if (bar) {
                bar.style.transition = 'width 180ms ease';
                bar.style.width = '0%';
            }
        };
        return cancel;
    }, [index, paused, reduceMotion, items.length]);

    const goTo = (i: number) => setIndex((i + items.length) % items.length);
    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    const onPointerDown = (e: React.PointerEvent) => {
        startXRef.current = e.clientX;
    };
    const onPointerUp = (e: React.PointerEvent) => {
        const start = startXRef.current;
        if (start == null) return;
        const dx = e.clientX - start;
        startXRef.current = null;
        const threshold = 40;
        if (dx > threshold) prev();
        else if (dx < -threshold) next();
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
    };

    return (
        <section className="relative py-16 md:py-28 px-6 md:px-8 lg:px-25 xl:px-37.5 overflow-hidden">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
            />

            <div className="relative max-w-6xl mx-auto">
                <div className="text-center lg:text-left mb-8 md:mb-10">
                    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <Milestone className="w-3.5 h-3.5" aria-hidden />
                        {aboutMilestonesCopy.badge}
                    </span>

                    <h2 className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">{aboutMilestonesCopy.title}</h2>

                    <p className="mt-3 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">{aboutMilestonesCopy.intro}</p>
                </div>

                <div className="relative mb-4" aria-hidden>
                    <div className="h-1 w-full rounded-full bg-sauge/20" />
                    <div ref={progressRef} className="h-1 -mt-1 rounded-full bg-linear-to-r from-sauge via-terracotta to-sauge w-0" />
                </div>

                <div
                    className="relative overflow-hidden rounded-[22px] border border-sauge/30 bg-background/70 shadow-sm"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onKeyDown={onKeyDown}
                    role="region"
                    aria-roledescription="carousel"
                    aria-label={aboutMilestonesCopy.regionAriaLabel}
                    tabIndex={0}
                >
                    <div
                        ref={trackRef}
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${index * 100}%)` }}
                        onPointerDown={onPointerDown}
                        onPointerUp={onPointerUp}
                    >
                        {items.map((it) => (
                            <article key={it.date + it.title} className="w-full shrink-0 p-5 md:p-7 relative">
                                <div
                                    className="pointer-events-none absolute inset-0 opacity-10"
                                    style={{
                                        backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
                                        backgroundSize: '16px 16px',
                                        color: 'var(--color-ormat)',
                                    }}
                                    aria-hidden
                                />
                                <div className="relative rounded-[18px] border border-sauge/30 bg-ormat/10 p-5 md:p-6 shadow-sm">
                                    <time className="inline-block text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta bg-background border border-terracotta/30 rounded-md px-2.5 py-1">
                                        {it.date}
                                    </time>
                                    <h3 className="mt-3 text-sm md:text-base font-bold tracking-widest text-foreground">{it.title}</h3>
                                    <p className="mt-1 text-sm text-foreground/80">{it.desc}</p>
                                </div>
                            </article>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={prev}
                        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 size-10 items-center justify-center rounded-full border border-sauge/30 bg-background/90 backdrop-blur shadow-sm hover:scale-105 transition"
                        aria-label={aboutMilestonesCopy.previousSlideAriaLabel}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        type="button"
                        onClick={next}
                        className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 size-10 items-center justify-center rounded-full border border-sauge/30 bg-background/90 backdrop-blur shadow-sm hover:scale-105 transition"
                        aria-label={aboutMilestonesCopy.nextSlideAriaLabel}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    <button
                        type="button"
                        onClick={() => setPaused((p) => !p)}
                        className="hidden lg:inline-flex absolute right-3 bottom-3 items-center gap-2 rounded-full border border-sauge/30 bg-background/90 px-3 py-1.5 text-xs font-semibold"
                        aria-pressed={paused}
                        aria-label={paused ? aboutMilestonesCopy.resumeAriaLabel : aboutMilestonesCopy.pauseAriaLabel}
                    >
                        {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                        {paused ? aboutMilestonesCopy.playLabel : aboutMilestonesCopy.pauseLabel}
                    </button>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2">
                    {items.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            aria-label={`Aller au jalon ${i + 1}`}
                            className={cn('h-2 rounded-full transition-all', i === index ? 'w-8 bg-terracotta' : 'w-2 bg-sauge/40 hover:bg-sauge/70')}
                        />
                    ))}
                </div>

                <div className="mt-10 md:mt-12 text-center">
                    <Link
                        href="/contact"
                        className={cn(
                            'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl',
                            'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                            'border-b-2 border-r-2 border-ormat transition hover:scale-105',
                            'shadow-[0px_2px_6px_rgba(164,75,52,0.25)]',
                        )}
                    >
                        <Mail className="w-4 h-4" aria-hidden />
                        {aboutMilestonesCopy.ctaLabel}
                    </Link>
                </div>
            </div>

            <style jsx>{`
                @keyframes hero-scan-loop {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                .hero-scan {
                    animation: hero-scan-loop 2.8s linear infinite;
                    will-change: transform;
                }
                @media (prefers-reduced-motion: reduce) {
                    .hero-scan {
                        animation: none;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </section>
    );
}
