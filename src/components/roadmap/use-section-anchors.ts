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

type UseSectionAnchorsResult = {
    activeSectionId: string;
    anchors: SectionAnchor[];
};

const MOBILE_BREAKPOINT = 768;

export function useSectionAnchors(containerRef: RefObject<HTMLElement | null>, sections: RoadmapSection[]): UseSectionAnchorsResult {
    const [anchors, setAnchors] = useState<SectionAnchor[]>([]);
    const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id ?? '');

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

                const x = isMobile ? containerRect.width * 0.5 : containerRect.width * (index % 2 === 0 ? 0.26 : 0.74);

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

        const ratioBySection = new Map<string, number>();
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    ratioBySection.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
                });

                const mostVisible = sectionNodes.reduce<{ id: string; ratio: number } | null>((best, { section }) => {
                    const ratio = ratioBySection.get(section.id) ?? 0;
                    if (!best || ratio > best.ratio) {
                        return { id: section.id, ratio };
                    }
                    return best;
                }, null);

                if (mostVisible && mostVisible.ratio > 0) {
                    setActiveSectionId(mostVisible.id);
                }
            },
            {
                root: null,
                rootMargin: '-35% 0px -55% 0px',
                threshold: [0.2, 0.4, 0.6, 0.8],
            },
        );

        sectionNodes.forEach(({ node }) => observer.observe(node));

        const resizeObserver = new ResizeObserver(scheduleCompute);
        resizeObserver.observe(container);
        sectionNodes.forEach(({ node }) => resizeObserver.observe(node));

        window.addEventListener('resize', scheduleCompute);

        return () => {
            observer.disconnect();
            resizeObserver.disconnect();
            window.removeEventListener('resize', scheduleCompute);
            if (rafId !== 0) {
                window.cancelAnimationFrame(rafId);
            }
        };
    }, [containerRef, sections]);

    return { activeSectionId, anchors };
}
