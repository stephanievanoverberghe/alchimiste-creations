'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContent } from '@/content/home';

import { Sparkles, ShieldCheck, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

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

// Vitesse du “roulement constant” (cards / seconde)
const SPEED = 0.22;

// Layout (ajuste si tu veux)
const MAIN_WIDTH = 520; // largeur card centrale (px)
const SIDE_WIDTH = 420; // largeur cards côtés (px)
const GAP = 26; // espacement logique (px)
const PEEK = 110; // “bout” visible des sides (px)

// Pour éviter 60 setState/sec (perf), on throttle un peu
const OFFSET_FPS = 30;

function mod(n: number, m: number) {
    return ((n % m) + m) % m;
}

function shortestLoopDistance(from: number, to: number, length: number) {
    let d = to - from;
    if (d > length / 2) d -= length;
    if (d < -length / 2) d += length;
    return d;
}

export function HomeArchitectureSection({ content }: Props) {
    const items = content.pillars;
    const count = items.length;

    const [activeIndex, setActiveIndex] = useState(0);

    // ✅ état “offset” utilisé pour le rendu
    const [offset, setOffset] = useState(0);

    // ✅ refs uniquement pour l’animation interne
    const offsetRef = useRef(0);
    const rafRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number | null>(null);
    const lastEmitRef = useRef<number>(0);

    const [isPaused, setIsPaused] = useState(false);

    const syncActiveFromOffset = useCallback(
        (nextOffset: number) => {
            if (count <= 0) return;
            const nearest = mod(Math.round(nextOffset), count);
            setActiveIndex(nearest);
        },
        [count],
    );

    // Raf: update offsetRef en continu + push dans setOffset (throttlé)
    useEffect(() => {
        if (count <= 1) return;

        const tick = (t: number) => {
            if (lastTimeRef.current == null) lastTimeRef.current = t;
            const dt = (t - lastTimeRef.current) / 1000;
            lastTimeRef.current = t;

            if (!isPaused) {
                offsetRef.current = offsetRef.current + dt * SPEED;

                // garder une valeur stable
                if (offsetRef.current > 1e6) offsetRef.current = mod(offsetRef.current, count);

                syncActiveFromOffset(offsetRef.current);

                // throttle du state offset
                const emitEveryMs = 1000 / OFFSET_FPS;
                if (t - lastEmitRef.current >= emitEveryMs) {
                    lastEmitRef.current = t;
                    setOffset(offsetRef.current);
                }
            }

            rafRef.current = window.requestAnimationFrame(tick);
        };

        rafRef.current = window.requestAnimationFrame(tick);

        return () => {
            if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
            lastTimeRef.current = null;
        };
    }, [count, isPaused, syncActiveFromOffset]);

    const goToIndex = useCallback(
        (idx: number) => {
            if (count <= 1) return;

            const current = offsetRef.current;
            const d = shortestLoopDistance(current, idx, count);

            offsetRef.current = current + d;

            syncActiveFromOffset(offsetRef.current);
            setOffset(offsetRef.current);
        },
        [count, syncActiveFromOffset],
    );

    // ✅ layout calculé uniquement depuis le state offset (pas de ref pendant render)
    const layout = useMemo(() => {
        const centerX = 0;
        const step = MAIN_WIDTH / 2 + SIDE_WIDTH / 2 + GAP;

        return items.map((_, i) => {
            const rel = shortestLoopDistance(offset, i, count); // ex: -1, 0, 1
            const abs = Math.abs(rel);

            const x = centerX + rel * step;

            const scale = abs < 0.5 ? 1 : abs < 1.5 ? 0.86 : 0.72;
            const opacity = abs < 0.5 ? 1 : abs < 1.5 ? 0.75 : 0.25;
            const blur = abs < 1.5 ? 0 : 1.5;
            const z = 100 - Math.round(abs * 10);

            return { x, scale, opacity, blur, z };
        });
    }, [items, count, offset]);

    return (
        <Section>
            <Container>
                <SectionHeading eyebrow={content.eyebrow} title={content.title} />

                <div className="mb-6 flex flex-wrap items-center gap-3" aria-label="Étapes du tunnel de conversion">
                    {items.map((p, idx) => {
                        const isActive = idx === activeIndex;

                        return (
                            <button
                                key={p.title}
                                type="button"
                                className={cn(
                                    'rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-300',
                                    isActive
                                        ? 'border-accent/60 bg-accent/10 text-text'
                                        : 'border-border/70 bg-background/40 text-text-muted hover:border-accent/40 hover:text-text',
                                )}
                                onClick={() => goToIndex(idx)}
                            >
                                {STEP_BADGE[p.title]} · {p.title}
                            </button>
                        );
                    })}
                </div>

                <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
                    <div className="relative overflow-hidden">
                        <div className="mx-auto" style={{ maxWidth: MAIN_WIDTH + PEEK * 2 }}>
                            <div className="relative h-[520px] sm:h-[540px]">
                                {items.map((pillar, idx) => {
                                    const Icon = ICONS[pillar.icon];
                                    const l = layout[idx];
                                    const isCenter = idx === activeIndex;
                                    const width = isCenter ? MAIN_WIDTH : SIDE_WIDTH;

                                    return (
                                        <div
                                            key={pillar.title}
                                            className="absolute left-1/2 top-0"
                                            style={{
                                                width,
                                                transform: `translateX(-50%) translateX(${l.x}px) scale(${l.scale})`,
                                                opacity: l.opacity,
                                                filter: l.blur ? `blur(${l.blur}px)` : 'none',
                                                zIndex: l.z,
                                                transition: isPaused
                                                    ? 'transform 420ms ease, opacity 420ms ease, filter 420ms ease'
                                                    : 'transform 120ms linear, opacity 120ms linear, filter 120ms linear',
                                            }}
                                            aria-hidden={!isCenter}
                                            onClick={() => goToIndex(idx)}
                                        >
                                            <Card className={cn('group relative cursor-pointer overflow-hidden', isCenter ? '' : 'hover:opacity-90')}>
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

                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="flex items-start gap-3">
                                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-background/40">
                                                            <Icon className="h-5 w-5 text-accent" />
                                                        </span>
                                                        <div className="min-w-0">
                                                            <p className="text-xs font-semibold tracking-wide text-text-muted">
                                                                {STEP_BADGE[pillar.title]} · <span className="text-accent">{pillar.title}</span>
                                                            </p>
                                                            <h3 className="mt-1 text-lg font-semibold leading-snug">{pillar.headline}</h3>
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className="mt-3 text-sm text-text-muted">{pillar.description}</p>

                                                {pillar.image ? (
                                                    <div className="mt-5 overflow-hidden rounded-2xl border border-border/70 bg-background/30">
                                                        <div className="relative">
                                                            <Image
                                                                src={pillar.image.src}
                                                                alt={pillar.image.alt}
                                                                width={640}
                                                                height={320}
                                                                className="h-36 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                            />
                                                            <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/25 to-transparent" />
                                                            <p className="absolute bottom-3 left-3 text-xs font-medium text-text">
                                                                {pillar.title === 'Attire'
                                                                    ? 'Clarté immédiate'
                                                                    : pillar.title === 'Convainc'
                                                                      ? 'Confiance renforcée'
                                                                      : 'Action évidente'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : null}

                                                <ul className="mt-5 space-y-2 text-sm">
                                                    {pillar.bullets.map((b) => (
                                                        <li key={b} className="flex gap-2 text-text-muted">
                                                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                                            <span>{b}</span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-xs text-text-muted">
                                                    <span>Impact</span>
                                                    <span className={cn('font-medium', pillar.title === 'Convertit' ? 'text-text' : 'text-text-muted')}>
                                                        {pillar.title === 'Attire' ? '↑ Attention' : pillar.title === 'Convainc' ? '↑ Confiance' : '↑ Prises de contact'}
                                                    </span>
                                                </div>
                                            </Card>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            {items.map((pillar, idx) => (
                                <button
                                    key={pillar.title}
                                    type="button"
                                    onClick={() => goToIndex(idx)}
                                    className={cn('h-2 rounded-full transition-all duration-300', idx === activeIndex ? 'w-8 bg-accent' : 'w-2 bg-border')}
                                    aria-label={`Voir la slide ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <p className="text-xs font-medium text-text-muted">
                            {STEP_BADGE[items[activeIndex]?.title] ?? '01'} / {String(items.length).padStart(2, '0')}
                        </p>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
