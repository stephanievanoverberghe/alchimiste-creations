'use client';

/**
 * HomeRoadmapLayout
 * - Ajouter une étape: ajoutez un item dans HOME_ROADMAP_SECTIONS avec { id, label }, puis donnez le même id à la section Home cible.
 * - Régler glow/perf: baissez PATH_GLOW_DESKTOP / PATH_GLOW_MOBILE, ou désactivez shimmer + noise sur mobile/reduced-motion.
 */

import { type RoadmapSection, useActiveSection } from '@/components/roadmap/use-active-section';
import { useRoadmapPath } from '@/components/roadmap/use-roadmap-path';
import { useScrollProgress } from '@/components/roadmap/use-scroll-progess';
import { cn } from '@/lib/utils';
import { type ReactNode, useEffect, useId, useRef, useState } from 'react';

const HOME_ROADMAP_SECTIONS: RoadmapSection[] = [
    { id: 'hero', label: 'Hero' },
    { id: 'qualification', label: 'Qualification' },
    { id: 'proofs', label: 'Preuves' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'process', label: 'Process' },
    { id: 'offers', label: 'Offres' },
    { id: 'projects', label: 'Projets' },
    { id: 'faq', label: 'FAQ' },
    { id: 'cta', label: 'CTA' },
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
    const { anchors, activeSectionId, visibilityScoreById } = useActiveSection(containerRef, HOME_ROADMAP_SECTIONS);

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

    const { pathData, dasharray, dashoffset, drawProgress, headPoint, stepProgressById } = useRoadmapPath({
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

                    {anchors.map((anchor) => {
                        const sectionProgress = stepProgressById[anchor.id] ?? 0;
                        const isLit = drawProgress >= sectionProgress;
                        const isActive = anchor.id === activeSectionId;
                        const score = visibilityScoreById[anchor.id] ?? 0;

                        return (
                            <button
                                key={anchor.id}
                                type="button"
                                className="focus-ring pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                                style={{ left: `${anchor.x}px`, top: `${anchor.y}px` }}
                                aria-label={`Aller à la section ${anchor.label}`}
                                onClick={() => {
                                    document.getElementById(anchor.id)?.scrollIntoView({
                                        behavior: reducedMotion ? 'auto' : 'smooth',
                                        block: 'start',
                                    });
                                }}
                            >
                                <span
                                    className={cn(
                                        'absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300',
                                        isActive || isLit ? 'border-accent/60 bg-accent/10 shadow-[0_0_24px_rgba(27,194,255,0.35)]' : 'border-border/70 bg-background/35',
                                    )}
                                />
                                <span
                                    className={cn(
                                        'relative block h-3.5 w-3.5 rounded-full border transition-all duration-300',
                                        isActive && !reducedMotion ? 'scale-125 border-accent bg-accent shadow-[0_0_18px_rgba(27,194,255,0.95)]' : '',
                                        !isActive && isLit ? 'scale-105 border-primary/80 bg-primary/80' : '',
                                        !isActive && !isLit ? 'border-primary/40 bg-background/75' : '',
                                    )}
                                />
                                <span className="sr-only">{Math.round(score * 100)}% visible</span>
                            </button>
                        );
                    })}
                </div>
            ) : null}

            <div className="relative z-10">{children}</div>
        </div>
    );
}
