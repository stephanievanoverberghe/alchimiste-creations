'use client';

/**
 * HomeRoadmapLayout
 * - Pour ajouter une section: ajoutez son id et label dans HOME_ROADMAP_SECTIONS,
 *   puis assignez le même id au composant <Section id="..."> correspondant.
 * - Pour ajuster le tracé: modifiez les points calculés dans use-section-anchors.ts
 *   (x mobile/desktop) ou la génération de courbe dans path.ts.
 * - Responsive: le hook place le fil au centre sur mobile et en zig-zag sur desktop.
 */

import { buildRoadmapPath } from '@/components/roadmap/path';
import { type RoadmapSection, useSectionAnchors } from '@/components/roadmap/use-section-anchors';
import { useScrollProgress } from '@/components/roadmap/use-scroll-progess';
import { cn } from '@/lib/utils';
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';

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

export function HomeRoadmapLayout({ children, isFancy = true }: HomeRoadmapLayoutProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const scrollProgress = useScrollProgress();
    const [pathLength, setPathLength] = useState(1);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [reducedMotion, setReducedMotion] = useState(false);

    const { anchors, activeSectionId } = useSectionAnchors(containerRef, HOME_ROADMAP_SECTIONS);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        const onChange = () => setReducedMotion(mediaQuery.matches);
        onChange();
        mediaQuery.addEventListener('change', onChange);

        return () => mediaQuery.removeEventListener('change', onChange);
    }, []);

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

    const pathData = useMemo(() => buildRoadmapPath(size.width, size.height, anchors), [anchors, size.height, size.width]);

    useEffect(() => {
        const pathElement = pathRef.current;
        if (!pathElement) {
            return;
        }

        setPathLength(pathElement.getTotalLength());
    }, [pathData]);

    const visualProgress = reducedMotion ? 1 : scrollProgress;

    return (
        <div ref={containerRef} className="relative isolate">
            {size.width > 0 && size.height > 0 ? (
                <div className="pointer-events-none absolute inset-0 z-0">
                    <svg aria-hidden className="h-full w-full" viewBox={`0 0 ${size.width} ${size.height}`} preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="roadmap-gradient" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="hsl(var(--accent))" />
                                <stop offset="100%" stopColor="hsl(var(--primary))" />
                            </linearGradient>
                            <filter id="roadmap-glow" x="-30%" y="-30%" width="160%" height="160%">
                                <feGaussianBlur stdDeviation="8" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        <path d={pathData} stroke="hsl(var(--border))" strokeWidth="2" fill="none" opacity="0.65" />
                        {isFancy ? <path d={pathData} stroke="url(#roadmap-gradient)" strokeWidth="6" fill="none" opacity="0.25" filter="url(#roadmap-glow)" /> : null}
                        <path
                            ref={pathRef}
                            d={pathData}
                            stroke="url(#roadmap-gradient)"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray={pathLength}
                            strokeDashoffset={pathLength * (1 - visualProgress)}
                            className="motion-safe:transition-[stroke-dashoffset] motion-safe:duration-150"
                            opacity="0.95"
                        />
                    </svg>

                    {anchors.map((anchor, index) => {
                        const isActive = anchor.id === activeSectionId;

                        return (
                            <button
                                key={anchor.id}
                                type="button"
                                className="focus-ring pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                                style={{ left: `${anchor.x}px`, top: `${anchor.y}px` }}
                                aria-label={`Aller à la section ${anchor.label}`}
                                onClick={() => {
                                    const section = document.getElementById(anchor.id);
                                    section?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
                                }}
                            >
                                <span
                                    className={cn(
                                        'block h-4 w-4 rounded-full border transition-all duration-300',
                                        isActive
                                            ? 'scale-110 border-accent bg-accent shadow-[0_0_18px_rgba(27,194,255,0.85)] motion-safe:animate-pulse'
                                            : 'border-primary/55 bg-background/70',
                                    )}
                                />
                                <span
                                    className={cn(
                                        'absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide backdrop-blur-md',
                                        isActive ? 'border-accent/60 bg-surface/85 text-text' : 'border-border/80 bg-background/60 text-text-muted',
                                    )}
                                >
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                            </button>
                        );
                    })}
                </div>
            ) : null}

            <div className="relative z-10">{children}</div>
        </div>
    );
}
