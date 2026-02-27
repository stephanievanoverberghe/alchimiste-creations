import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { HomePillar } from '@/content/home';

import { ARCHITECTURE_AUTO_PLAY_MS } from './home-architecture-section.data';

function mod(value: number, divisor: number) {
    return ((value % divisor) + divisor) % divisor;
}

type UseHomeArchitectureCarouselArgs = {
    items: HomePillar[];
};

export function useHomeArchitectureCarousel({ items }: UseHomeArchitectureCarouselArgs) {
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
        }, ARCHITECTURE_AUTO_PLAY_MS);

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

    return {
        count,
        activeIndex,
        orderedSlides,
        goToIndex,
        goNext,
        goPrev,
        setIsPaused,
    };
}
