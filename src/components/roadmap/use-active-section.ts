'use client';

import { RefObject, useEffect, useState } from 'react';

export type RoadmapSection = {
    id: string;
    label: string;
};

export type SectionAnchor = RoadmapSection & {
    index: number;
    x: number;
    y: number;
};

type UseActiveSectionResult = {
    activeSectionId: string;
    anchors: SectionAnchor[];
    visibilityScoreById: Record<string, number>;
};

const DESKTOP_LEFT = 0.24;
const DESKTOP_RIGHT = 0.76;
const MOBILE_BREAKPOINT = 768;

export function useActiveSection(containerRef: RefObject<HTMLElement | null>, sections: RoadmapSection[]): UseActiveSectionResult {
    const [anchors, setAnchors] = useState<SectionAnchor[]>([]);
    const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id ?? '');
    const [visibilityScoreById, setVisibilityScoreById] = useState<Record<string, number>>({});

    useEffect(() => {
        const container = containerRef.current;
        if (!container || sections.length === 0) {
            return;
        }

        const sectionNodes = sections
            .map((section) => ({ section, node: document.getElementById(section.id) }))
            .filter((entry): entry is { section: RoadmapSection; node: HTMLElement } => Boolean(entry.node));

        if (sectionNodes.length === 0) {
            return;
        }

        const computeAnchors = () => {
            const containerRect = container.getBoundingClientRect();
            const containerTop = containerRect.top + window.scrollY;
            const isMobile = window.innerWidth < MOBILE_BREAKPOINT;

            const nextAnchors: SectionAnchor[] = sectionNodes.map(({ node, section }, index) => {
                const nodeRect = node.getBoundingClientRect();
                const y = nodeRect.top + window.scrollY - containerTop + nodeRect.height * 0.5;
                const x = isMobile ? containerRect.width * 0.5 : containerRect.width * (index % 2 === 0 ? DESKTOP_LEFT : DESKTOP_RIGHT);

                return { ...section, index, x, y };
            });

            setAnchors(nextAnchors);
        };

        let rafId = 0;
        const scheduleCompute = () => {
            if (rafId !== 0) {
                return;
            }
            rafId = window.requestAnimationFrame(() => {
                rafId = 0;
                computeAnchors();
            });
        };

        computeAnchors();

        const scoreMap = new Map<string, number>();
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const rect = entry.boundingClientRect;
                    const viewportCenter = window.innerHeight * 0.5;
                    const sectionCenter = rect.top + rect.height * 0.5;
                    const centerDistance = Math.abs(viewportCenter - sectionCenter);
                    const centerWeight = Math.max(0, 1 - centerDistance / (window.innerHeight * 0.55));
                    const score = entry.isIntersecting ? entry.intersectionRatio * 0.6 + centerWeight * 0.4 : 0;
                    scoreMap.set(entry.target.id, score);
                });

                const visibilityEntries = sectionNodes.map(({ section }) => [section.id, scoreMap.get(section.id) ?? 0] as const);
                setVisibilityScoreById(Object.fromEntries(visibilityEntries));

                const best = visibilityEntries.reduce<{ id: string; score: number } | null>((acc, [id, score]) => {
                    if (!acc || score > acc.score) {
                        return { id, score };
                    }
                    return acc;
                }, null);

                if (best && best.score > 0) {
                    setActiveSectionId(best.id);
                }
            },
            {
                root: null,
                rootMargin: '-40% 0px -40% 0px',
                threshold: [0.1, 0.2, 0.35, 0.5, 0.7, 0.9],
            },
        );

        sectionNodes.forEach(({ node }) => observer.observe(node));

        const resizeObserver = new ResizeObserver(scheduleCompute);
        resizeObserver.observe(container);
        sectionNodes.forEach(({ node }) => resizeObserver.observe(node));

        window.addEventListener('resize', scheduleCompute);
        window.addEventListener('scroll', scheduleCompute, { passive: true });

        return () => {
            observer.disconnect();
            resizeObserver.disconnect();
            window.removeEventListener('resize', scheduleCompute);
            window.removeEventListener('scroll', scheduleCompute);
            if (rafId !== 0) {
                window.cancelAnimationFrame(rafId);
            }
        };
    }, [containerRef, sections]);

    return { activeSectionId, anchors, visibilityScoreById };
}
