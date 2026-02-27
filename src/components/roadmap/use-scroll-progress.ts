'use client';

import { useEffect, useRef, useState } from 'react';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const MOBILE_BREAKPOINT = 640;

export function useScrollProgress() {
    const [target, setTarget] = useState(0);
    const [smoothed, setSmoothed] = useState(0);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const targetRef = useRef(0);
    const smoothedRef = useRef(0);

    useEffect(() => {
        targetRef.current = target;
    }, [target]);

    useEffect(() => {
        smoothedRef.current = smoothed;
    }, [smoothed]);

    useEffect(() => {
        const reduceMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
        const mobileMedia = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

        const syncFlags = () => {
            setReducedMotion(reduceMedia.matches);
            setIsMobile(mobileMedia.matches);
        };

        syncFlags();
        reduceMedia.addEventListener('change', syncFlags);
        mobileMedia.addEventListener('change', syncFlags);

        return () => {
            reduceMedia.removeEventListener('change', syncFlags);
            mobileMedia.removeEventListener('change', syncFlags);
        };
    }, []);

    useEffect(() => {
        let rafId = 0;

        const updateProgress = () => {
            rafId = 0;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const next = maxScroll <= 0 ? 1 : clamp(window.scrollY / maxScroll, 0, 1);
            setTarget(next);
        };

        const onScrollLike = () => {
            if (rafId !== 0) {
                return;
            }
            rafId = window.requestAnimationFrame(updateProgress);
        };

        updateProgress();
        window.addEventListener('scroll', onScrollLike, { passive: true });
        window.addEventListener('resize', onScrollLike);

        return () => {
            window.removeEventListener('scroll', onScrollLike);
            window.removeEventListener('resize', onScrollLike);
            if (rafId !== 0) {
                window.cancelAnimationFrame(rafId);
            }
        };
    }, []);

    useEffect(() => {
        if (reducedMotion) {
            setSmoothed(targetRef.current);
            return;
        }

        let frameId = 0;
        const animate = () => {
            const next = smoothedRef.current + (targetRef.current - smoothedRef.current) * 0.08;
            const snapped = Math.abs(targetRef.current - next) < 0.0005 ? targetRef.current : next;
            setSmoothed(snapped);
            frameId = window.requestAnimationFrame(animate);
        };

        frameId = window.requestAnimationFrame(animate);
        return () => window.cancelAnimationFrame(frameId);
    }, [reducedMotion]);

    return { target, smoothed, reducedMotion, isMobile };
}
