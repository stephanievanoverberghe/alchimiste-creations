'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Item = {
    date: string;
    title: string;
    desc: string;
};

const ITEMS: Item[] = [
    { date: '2021', title: 'BTS Graphiste multimédia — Studi (distanciel)', desc: 'Du dessin au digital : bases design & UI pour le web.' },
    { date: '2023', title: 'BTS Dev Web & Web Mobile — La Manu Amiens', desc: 'Front (JS/Bootstrap), back (PHP/SQL) & WordPress.' },
    { date: '12/2023', title: 'Certification Community Manager', desc: 'Réseaux sociaux, ligne édito & contenus qui convertissent.' },
    { date: '05/2025', title: 'Licence Concepteur·trice Dév. Logiciel — OpenClassrooms', desc: 'React, Next.js, TypeScript + Tailwind/SCSS.' },
    { date: '08/2025', title: 'Naissance d’Alchimiste Créations', desc: 'Sites alignés pour thérapeutes, artistes & indépendants.' },
    { date: '2025 →', title: 'Collaboration backend', desc: 'Avec Perrine Dassonville pour des sites codés de A à Z.' },
    { date: 'Fin 2025', title: 'Cap & prochaines marches', desc: 'Approfondir back JS, GraphQL, motion & accessibilité.' },
];

export default function MilestonesSlider() {
    const items = useMemo(() => ITEMS, []);
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const progressRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const startXRef = useRef<number | null>(null);
    const autoplayMs = 4500;

    // Respecte "réduire les animations"
    const [reduceMotion, setReduceMotion] = useState(false);
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReduceMotion(mq.matches);
        const onChange = () => setReduceMotion(mq.matches);
        mq.addEventListener?.('change', onChange);
        return () => mq.removeEventListener?.('change', onChange);
    }, []);

    // Autoplay + barre de progression reset à chaque slide
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

    // Swipe (mobile)
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

    // Keyboard
    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
    };

    return (
        <section className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-5xl mx-auto">
                {/* En-tête */}
                <div className="text-center lg:text-left mb-8 md:mb-10">
                    <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        Mon chemin
                    </span>
                    <h2 className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Une trajectoire qui relie le sensible et le code
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Défilement automatique, propre et lisible. Tu peux aussi cliquer sur les points.
                    </p>
                </div>

                {/* Barre de progression */}
                <div className="relative mb-4" aria-hidden>
                    <div className="h-1 w-full rounded-full bg-sauge/20" />
                    <div ref={progressRef} className="h-1 -mt-1 rounded-full bg-gradient-to-r from-sauge via-terracotta to-sauge w-0" />
                </div>

                {/* Slider */}
                <div
                    className="relative overflow-hidden rounded-[24px]"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onKeyDown={onKeyDown}
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Parcours"
                    tabIndex={0}
                >
                    {/* Tracker */}
                    <div
                        ref={trackRef}
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${index * 100}%)` }}
                        onPointerDown={onPointerDown}
                        onPointerUp={onPointerUp}
                    >
                        {items.map((it) => {
                            return (
                                <article key={it.date + it.title} className="w-full shrink-0 p-5 md:p-8 relative">
                                    {/* carte */}
                                    <div className="relative rounded-[20px] border border-sauge/30 bg-ormat/10 p-5 md:p-6 shadow-sm">
                                        {/* barre verticale colorée */}
                                        <time className="inline-block text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta bg-background border border-terracotta/30 rounded-md px-2.5 py-1">
                                            {it.date}
                                        </time>
                                        <h3 className="mt-3 text-sm md:text-base font-bold tracking-widest text-foreground">{it.title}</h3>
                                        <p className="mt-1 text-sm text-foreground/80">{it.desc}</p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {/* Controles */}
                    <button
                        type="button"
                        onClick={prev}
                        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 size-10 items-center justify-center rounded-full border border-sauge/30 bg-background shadow-sm hover:scale-105 transition"
                        aria-label="Slide précédent"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        type="button"
                        onClick={next}
                        className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 size-10 items-center justify-center rounded-full border border-sauge/30 bg-background shadow-sm hover:scale-105 transition"
                        aria-label="Slide suivant"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Pause/Play */}
                    <button
                        type="button"
                        onClick={() => setPaused((p) => !p)}
                        className="absolute right-3 bottom-3 lg:inline-flex items-center gap-2 rounded-full border border-sauge/30 bg-background/90 px-3 py-1.5 text-xs font-semibold hidden"
                        aria-pressed={paused}
                        aria-label={paused ? 'Relancer le défilement' : 'Mettre en pause le défilement'}
                    >
                        {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                        {paused ? 'Lecture' : 'Pause'}
                    </button>
                </div>

                {/* Journal */}
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

                {/* CTA */}
                <div className="mt-10 md:mt-12 text-center">
                    <Link
                        href="/contact"
                        className={cn(
                            'inline-block px-6 py-3 text-center rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                        )}
                    >
                        Discuter de ton projet
                    </Link>
                </div>
            </div>
            <style jsx>{`
                @keyframes grow {
                    from {
                        width: 0%;
                    }
                    to {
                        width: 66%;
                    }
                }
            `}</style>
        </section>
    );
}
