'use client';

import { useEffect, useState } from 'react';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function useScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let rafId = 0;

        const updateProgress = () => {
            rafId = 0;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (maxScroll <= 0) {
                setProgress(1);
                return;
            }

            setProgress(clamp(window.scrollY / maxScroll, 0, 1));
        };

        const onScroll = () => {
            if (rafId !== 0) {
                return;
            }
            rafId = window.requestAnimationFrame(updateProgress);
        };

        updateProgress();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (rafId !== 0) {
                window.cancelAnimationFrame(rafId);
            }
        };
    }, []);

    return progress;
}
