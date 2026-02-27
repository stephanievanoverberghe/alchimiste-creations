'use client';

/**
 * HomeRoadmapLayout
 * - Ajouter une étape: ajoutez un item dans HOME_ROADMAP_SECTIONS avec { id, label }, puis donnez le même id à la section Home cible.
 * - Régler glow/perf: baissez PATH_GLOW_DESKTOP / PATH_GLOW_MOBILE, ou désactivez shimmer + noise sur mobile/reduced-motion.
 */

import { type RoadmapSection, useActiveSection } from '@/components/roadmap/use-active-section';
import { useRoadmapPath } from '@/components/roadmap/use-roadmap-path';
import { useScrollProgress } from '@/components/roadmap/use-scroll-progress';
import { type ReactNode, useEffect, useId, useRef, useState } from 'react';

const HOME_ROADMAP_SECTIONS: RoadmapSection[] = [
    { id: 'hero', label: 'Hero' },
    { id: 'diagnostic', label: 'Diagnostic' },
    { id: 'methode', label: 'Méthode' },
    { id: 'offers', label: 'Offres' },
    { id: 'projects', label: 'Projets' },
    { id: 'faq', label: 'FAQ' },
    { id: 'cta', label: 'CTA final' },
];

type HomeRoadmapLayoutProps = {
    children: ReactNode;
    isFancy?: boolean;
};

const PATH_GLOW_DESKTOP = 10;
const PATH_GLOW_MOBILE = 5;

export function HomeRoadmapLayout({ children, isFancy = true }: HomeRoadmapLayoutProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const uid = useId().replace(/:/g, '-');
    const gradientId = `roadmap-gradient-${uid}`;
    const glowFilterId = `roadmap-glow-${uid}`;
    const noiseFilterId = `roadmap-noise-${uid}`;

    const { target, smoothed, reducedMotion, isMobile } = useScrollProgress();
    const { anchors } = useActiveSection(containerRef, HOME_ROADMAP_SECTIONS);

    const [size, setSize] = useState({ width: 0, height: 0 });
    const [trailPoints, setTrailPoints] = useState<Array<{ x: number; y: number }>>([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const computeSize = () => {
            setSize({ width: container.clientWidth, height: container.clientHeight });
        };

        computeSize();
        const observer = new ResizeObserver(computeSize);
        observer.observe(container);

        return () => observer.disconnect();
    }, []);

    const { pathData, dasharray, dashoffset, headPoint } = useRoadmapPath({
        anchors,
        width: size.width,
        height: size.height,
        pathRef,
        progress: smoothed,
        reducedMotion,
    });

    useEffect(() => {
        let frameId = 0;
        frameId = window.requestAnimationFrame(() => {
            if (!headPoint || reducedMotion) {
                setTrailPoints([]);
                return;
            }
            setTrailPoints((previous) => [headPoint, ...previous].slice(0, isMobile ? 1 : 3));
        });

        return () => window.cancelAnimationFrame(frameId);
    }, [headPoint, isMobile, reducedMotion]);

    const glowParallaxOffset = reducedMotion || isMobile ? 0 : ((target - 0.5) * 10) / 2;

    const glowWidth = isMobile ? PATH_GLOW_MOBILE : PATH_GLOW_DESKTOP;
    const shimmerEnabled = !reducedMotion && !isMobile && isFancy;
    const showNoise = !reducedMotion && !isMobile && isFancy;

    return (
        <div ref={containerRef} className="relative isolate">
            {size.width > 0 && size.height > 0 ? (
                <div className="pointer-events-none absolute inset-0 z-0">
                    <svg aria-hidden className="h-full w-full" viewBox={`0 0 ${size.width} ${size.height}`} preserveAspectRatio="none">
                        <defs>
                            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="hsl(var(--accent))" />
                                <stop offset="50%" stopColor="hsl(var(--primary))" />
                                <stop offset="100%" stopColor="hsl(var(--accent))" />
                                {shimmerEnabled ? (
                                    <animateTransform attributeName="gradientTransform" type="translate" values="-0.24 0;0.24 0;-0.24 0" dur="6s" repeatCount="indefinite" />
                                ) : null}
                            </linearGradient>

                            <filter id={glowFilterId} x="-60%" y="-60%" width="220%" height="220%">
                                <feGaussianBlur stdDeviation={glowWidth} result="glow-blur" />
                                <feColorMatrix in="glow-blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.4 0" result="glow-color" />
                                <feMerge>
                                    <feMergeNode in="glow-color" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            <filter id={noiseFilterId} x="-10%" y="-10%" width="120%" height="120%">
                                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="2" result="grain" />
                                <feDisplacementMap in="SourceGraphic" in2="grain" scale="1.2" xChannelSelector="R" yChannelSelector="G" />
                            </filter>
                        </defs>

                        <g transform={`translate(0 ${glowParallaxOffset.toFixed(2)})`}>
                            <path d={pathData} stroke="hsl(var(--border))" strokeWidth="2" fill="none" opacity="0.5" />
                            {isFancy ? (
                                <path
                                    d={pathData}
                                    stroke={`url(#${gradientId})`}
                                    strokeWidth={isMobile ? 4 : 6}
                                    fill="none"
                                    opacity={isMobile ? 0.25 : 0.35}
                                    filter={`url(#${glowFilterId})`}
                                />
                            ) : null}
                            <path
                                ref={pathRef}
                                d={pathData}
                                stroke={`url(#${gradientId})`}
                                strokeWidth={isMobile ? 2.5 : 3}
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeDasharray={dasharray}
                                strokeDashoffset={dashoffset}
                                opacity="0.96"
                                filter={showNoise ? `url(#${noiseFilterId})` : undefined}
                            />
                        </g>

                        {headPoint && !reducedMotion ? (
                            <g>
                                {trailPoints.slice(1).map((point, index) => (
                                    <circle
                                        key={`${point.x}-${point.y}-${index}`}
                                        cx={point.x}
                                        cy={point.y}
                                        r={Math.max(1.5, 3 - index)}
                                        fill="hsl(var(--accent))"
                                        opacity={Math.max(0.12, 0.35 - index * 0.1)}
                                    />
                                ))}
                                <circle cx={headPoint.x} cy={headPoint.y} r={isMobile ? 4 : 5} fill="hsl(var(--accent))" opacity="0.95" />
                                <circle cx={headPoint.x} cy={headPoint.y} r={isMobile ? 8 : 12} fill="hsl(var(--accent))" opacity="0.25" filter={`url(#${glowFilterId})`} />
                            </g>
                        ) : null}
                    </svg>
                </div>
            ) : null}

            <div className="relative z-10">{children}</div>
        </div>
    );
}
