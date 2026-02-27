'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContent } from '@/content/home';
import { cn } from '@/lib/utils';

import { ArchitecturePillarCard } from './architecture-pillar-card';
import { ARCHITECTURE_GLOW_BY_PILLAR, ARCHITECTURE_STEP_BADGE } from './home-architecture-section.data';
import { HomeRoadmapMobile } from './mobile/home-roadmap-mobile';
import { useHomeArchitectureCarousel } from './use-home-architecture-carousel';

type Props = { content: HomeContent['architecture'] };

export function HomeArchitectureSection({ content }: Props) {
    const items = content.pillars;
    const { activeIndex, count, goNext, goPrev, goToIndex, orderedSlides, setIsPaused } = useHomeArchitectureCarousel({ items });

    if (count === 0) return null;

    return (
        <Section id="architecture">
            <Container>
                <SectionHeading eyebrow={content.eyebrow} title={content.title} />
                <HomeRoadmapMobile pillars={items} />

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
                                                'cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-300',
                                                isActive
                                                    ? 'border-accent/60 bg-accent/10 text-text'
                                                    : 'border-border/70 bg-background/40 text-text-muted hover:border-accent/40 hover:text-text',
                                            )}
                                            onClick={() => goToIndex(idx)}
                                            aria-current={isActive}
                                        >
                                            {ARCHITECTURE_STEP_BADGE[pillar.title]} · {pillar.title}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={goPrev}
                                    className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border/80 bg-background/70 text-text-muted transition hover:border-accent/60 hover:text-text"
                                    aria-label="Slide précédente"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={goNext}
                                    className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border/80 bg-background/70 text-text-muted transition hover:border-accent/60 hover:text-text"
                                    aria-label="Slide suivante"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-3xl">
                            <div className="flex w-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                                {items.map((pillar) => (
                                    <div key={pillar.title} className="w-full shrink-0 px-1">
                                        <Card className="group relative overflow-hidden p-6 sm:p-8">
                                            <div
                                                aria-hidden
                                                className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full blur-3xl"
                                                style={{ background: `radial-gradient(circle, ${ARCHITECTURE_GLOW_BY_PILLAR[pillar.title]}, transparent 70%)` }}
                                            />
                                            <ArchitecturePillarCard pillar={pillar} variant="desktop" />
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-5 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2" role="tablist" aria-label="Navigation des slides">
                                {orderedSlides.map(({ index }) => (
                                    <button
                                        key={items[index].title}
                                        type="button"
                                        onClick={() => goToIndex(index)}
                                        className={cn('h-2 cursor-pointer rounded-full transition-all duration-300', index === activeIndex ? 'w-8 bg-accent' : 'w-2 bg-border')}
                                        aria-label={`Voir la slide ${index + 1}`}
                                        aria-selected={index === activeIndex}
                                        role="tab"
                                    />
                                ))}
                            </div>

                            <p className="text-xs font-medium text-text-muted sm:text-sm">
                                {ARCHITECTURE_STEP_BADGE[items[activeIndex]?.title] ?? '01'} / {String(items.length).padStart(2, '0')}
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
