'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const AtomBackgroundCanvas = dynamic(() => import('./atom-background-canvas').then((module) => module.AtomBackgroundCanvas), {
    ssr: false,
});

type WindowWithIdleCallback = Window & {
    requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
    cancelIdleCallback?: (id: number) => void;
};

export function AtomBackgroundCanvasLoader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [shouldRenderCanvas, setShouldRenderCanvas] = useState(false);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        const scheduleLoad = () => {
            const currentWindow = window as WindowWithIdleCallback;

            if (currentWindow.requestIdleCallback && currentWindow.cancelIdleCallback) {
                const idleId = currentWindow.requestIdleCallback(() => setShouldRenderCanvas(true), { timeout: 1200 });

                return () => currentWindow.cancelIdleCallback?.(idleId);
            }

            const timeoutId = globalThis.setTimeout(() => setShouldRenderCanvas(true), 150);

            return () => globalThis.clearTimeout(timeoutId);
        };

        if (!('IntersectionObserver' in window)) {
            return scheduleLoad();
        }

        let cancelScheduledLoad: (() => void) | undefined;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry?.isIntersecting || cancelScheduledLoad) {
                    return;
                }

                cancelScheduledLoad = scheduleLoad();
                observer.disconnect();
            },
            { rootMargin: '120px 0px' },
        );

        observer.observe(container);

        return () => {
            observer.disconnect();
            cancelScheduledLoad?.();
        };
    }, []);

    return (
        <div ref={containerRef} className="h-full w-full">
            {shouldRenderCanvas ? <AtomBackgroundCanvas /> : null}
        </div>
    );
}
