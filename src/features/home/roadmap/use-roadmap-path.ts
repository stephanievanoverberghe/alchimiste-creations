'use client';

import { buildRoadmapPath } from '@/features/home/roadmap/path';
import { type SectionAnchor } from '@/features/home/roadmap/use-active-section';
import { type RefObject, useCallback, useEffect, useMemo, useState } from 'react';

type Point = { x: number; y: number };

type UseRoadmapPathArgs = {
    anchors: SectionAnchor[];
    height: number;
    pathRef: RefObject<SVGPathElement | null>;
    progress: number;
    reducedMotion: boolean;
    width: number;
};

const SAMPLE_COUNT = 180;

export function useRoadmapPath({ anchors, width, height, pathRef, progress, reducedMotion }: UseRoadmapPathArgs) {
    const [pathLength, setPathLength] = useState(1);
    const [headPoint, setHeadPoint] = useState<Point | null>(null);
    const [stepProgressById, setStepProgressById] = useState<Record<string, number>>({});

    const pathData = useMemo(() => buildRoadmapPath(width, height, anchors), [anchors, height, width]);
    const drawProgress = reducedMotion ? 1 : progress;

    useEffect(() => {
        const pathElement = pathRef.current;
        if (!pathElement) {
            return;
        }

        const nextLength = Math.max(pathElement.getTotalLength(), 1);
        setPathLength(nextLength);
    }, [pathData, pathRef]);

    useEffect(() => {
        const pathElement = pathRef.current;
        if (!pathElement) {
            return;
        }

        const safeProgress = Math.min(1, Math.max(0, drawProgress));
        const point = pathElement.getPointAtLength(pathLength * safeProgress);
        setHeadPoint({ x: point.x, y: point.y });
    }, [drawProgress, pathLength, pathRef]);

    useEffect(() => {
        let frameId = 0;

        frameId = window.requestAnimationFrame(() => {
            const pathElement = pathRef.current;
            if (!pathElement || anchors.length === 0) {
                setStepProgressById({});
                return;
            }

            const sampled = Array.from({ length: SAMPLE_COUNT + 1 }, (_, index) => {
                const ratio = index / SAMPLE_COUNT;
                const point = pathElement.getPointAtLength(pathLength * ratio);
                return { ratio, x: point.x, y: point.y };
            });

            const nextEntries = anchors.map((anchor) => {
                let bestRatio = 0;
                let bestDistance = Number.POSITIVE_INFINITY;

                sampled.forEach((candidate) => {
                    const distance = Math.hypot(candidate.x - anchor.x, candidate.y - anchor.y);
                    if (distance < bestDistance) {
                        bestDistance = distance;
                        bestRatio = candidate.ratio;
                    }
                });

                return [anchor.id, bestRatio] as const;
            });

            setStepProgressById(Object.fromEntries(nextEntries));
        });

        return () => window.cancelAnimationFrame(frameId);
    }, [anchors, pathLength, pathData, pathRef]);

    const getPoint = useCallback(
        (value: number) => {
            const pathElement = pathRef.current;
            if (!pathElement) {
                return null;
            }

            const safeProgress = Math.min(1, Math.max(0, value));
            const point = pathElement.getPointAtLength(pathLength * safeProgress);
            return { x: point.x, y: point.y };
        },
        [pathLength, pathRef],
    );

    return {
        dasharray: pathLength,
        dashoffset: pathLength * (1 - drawProgress),
        drawProgress,
        getPoint,
        headPoint,
        pathData,
        pathLength,
        stepProgressById,
    };
}
