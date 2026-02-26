'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
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

const AUTOPLAY_DELAY = 3800;

export function HomeArchitectureSection({ content }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused || content.pillars.length <= 1) return;

        const interval = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % content.pillars.length);
        }, AUTOPLAY_DELAY);

        return () => window.clearInterval(interval);
    }, [content.pillars.length, isPaused]);

    return (
        <Section>
            <Container>
                <SectionHeading eyebrow={content.eyebrow} title={content.title} />

                <div className="mb-6 flex flex-wrap items-center gap-3" aria-label="Étapes du tunnel de conversion">
                    {content.pillars.map((p, idx) => {
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
                                onClick={() => setActiveIndex(idx)}
                            >
                                {STEP_BADGE[p.title]} · {p.title}
                            </button>
                        );
                    })}
                </div>

                <div className="relative overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
                    <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                        {content.pillars.map((pillar) => {
                            const Icon = ICONS[pillar.icon];

                            return (
                                <div key={pillar.title} className="w-full shrink-0 px-0.5">
                                    <Card className="group relative overflow-hidden">
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
                                                        {pillar.title === 'Attire' ? 'Clarté immédiate' : pillar.title === 'Convainc' ? 'Confiance renforcée' : 'Action évidente'}
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

                    <div className="mt-5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            {content.pillars.map((pillar, idx) => (
                                <button
                                    key={pillar.title}
                                    type="button"
                                    onClick={() => setActiveIndex(idx)}
                                    className={cn('h-2 rounded-full transition-all duration-300', idx === activeIndex ? 'w-8 bg-accent' : 'w-2 bg-border')}
                                    aria-label={`Voir la slide ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <p className="text-xs font-medium text-text-muted">
                            {STEP_BADGE[content.pillars[activeIndex]?.title] ?? '01'} / {String(content.pillars.length).padStart(2, '0')}
                        </p>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
