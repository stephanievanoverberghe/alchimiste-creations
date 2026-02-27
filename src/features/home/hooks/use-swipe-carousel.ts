'use client';

import { type KeyboardEvent, type PointerEvent, useCallback, useMemo, useRef, useState } from 'react';

type UseSwipeCarouselOptions = {
    itemCount: number;
    reducedMotion?: boolean;
    initialIndex?: number;
    inertia?: number;
    onIndexChange?: (index: number) => void;
};

type BindProps = {
    onPointerDown: (event: PointerEvent<HTMLElement>) => void;
    onPointerMove: (event: PointerEvent<HTMLElement>) => void;
    onPointerUp: (event: PointerEvent<HTMLElement>) => void;
    onPointerCancel: (event: PointerEvent<HTMLElement>) => void;
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
};

const DRAG_THRESHOLD = 6;
const VELOCITY_FACTOR = 140;

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

export function useSwipeCarousel({ itemCount, reducedMotion = false, initialIndex = 0, inertia = 0.12, onIndexChange }: UseSwipeCarouselOptions) {
    const maxIndex = Math.max(0, itemCount - 1);
    const [activeIndex, setActiveIndex] = useState(() => clamp(initialIndex, 0, maxIndex));
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const targetXRef = useRef(0);
    const currentXRef = useRef(0);
    const frameRef = useRef<number | null>(null);
    const dragStartXRef = useRef(0);
    const dragStartYRef = useRef(0);
    const dragLastXRef = useRef(0);
    const dragLastTRef = useRef(0);
    const dragVelocityRef = useRef(0);
    const pointerIdRef = useRef<number | null>(null);
    const isHorizontalDragRef = useRef(false);

    const stopAnimation = useCallback(() => {
        if (frameRef.current !== null) {
            window.cancelAnimationFrame(frameRef.current);
            frameRef.current = null;
        }
    }, []);

    const animate = useCallback(() => {
        const step = () => {
            const factor = reducedMotion ? 1 : inertia;
            const next = currentXRef.current + (targetXRef.current - currentXRef.current) * factor;
            currentXRef.current = next;
            setDragOffset(next);

            if (Math.abs(targetXRef.current - next) < 0.35) {
                currentXRef.current = targetXRef.current;
                setDragOffset(targetXRef.current);
                frameRef.current = null;
                return;
            }

            frameRef.current = window.requestAnimationFrame(step);
        };

        stopAnimation();
        frameRef.current = window.requestAnimationFrame(step);
    }, [inertia, reducedMotion, stopAnimation]);

    const setIndex = useCallback(
        (index: number) => {
            const next = clamp(index, 0, maxIndex);
            setActiveIndex(next);
            onIndexChange?.(next);
            targetXRef.current = 0;
            animate();
        },
        [animate, maxIndex, onIndexChange],
    );

    const commitDrag = useCallback(() => {
        const velocityBoost = dragVelocityRef.current * VELOCITY_FACTOR;
        const projected = dragOffset + velocityBoost;
        const trigger = 56;

        let nextIndex = activeIndex;
        if (projected > trigger) nextIndex = activeIndex - 1;
        if (projected < -trigger) nextIndex = activeIndex + 1;

        setIndex(nextIndex);
    }, [activeIndex, dragOffset, setIndex]);

    const bind: BindProps = useMemo(
        () => ({
            onPointerDown: (event) => {
                if (event.button !== 0 && event.pointerType === 'mouse') return;
                pointerIdRef.current = event.pointerId;
                dragStartXRef.current = event.clientX;
                dragStartYRef.current = event.clientY;
                dragLastXRef.current = event.clientX;
                dragLastTRef.current = performance.now();
                dragVelocityRef.current = 0;
                isHorizontalDragRef.current = false;
                setIsDragging(true);
                (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
            },
            onPointerMove: (event) => {
                if (pointerIdRef.current !== event.pointerId || !isDragging) return;

                const diffX = event.clientX - dragStartXRef.current;
                const diffY = event.clientY - dragStartYRef.current;

                if (!isHorizontalDragRef.current && (Math.abs(diffX) > DRAG_THRESHOLD || Math.abs(diffY) > DRAG_THRESHOLD)) {
                    isHorizontalDragRef.current = Math.abs(diffX) > Math.abs(diffY);
                }
                if (!isHorizontalDragRef.current) return;

                event.preventDefault();
                const now = performance.now();
                const dt = Math.max(1, now - dragLastTRef.current);
                const dx = event.clientX - dragLastXRef.current;

                dragVelocityRef.current = dx / dt;
                dragLastXRef.current = event.clientX;
                dragLastTRef.current = now;
                currentXRef.current = diffX;
                targetXRef.current = diffX;
                setDragOffset(diffX);
            },
            onPointerUp: (event) => {
                if (pointerIdRef.current !== event.pointerId) return;
                pointerIdRef.current = null;
                setIsDragging(false);
                if (isHorizontalDragRef.current) {
                    commitDrag();
                    return;
                }
                targetXRef.current = 0;
                animate();
            },
            onPointerCancel: (event) => {
                if (pointerIdRef.current !== event.pointerId) return;
                pointerIdRef.current = null;
                setIsDragging(false);
                targetXRef.current = 0;
                animate();
            },
            onKeyDown: (event) => {
                if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    setIndex(activeIndex + 1);
                }
                if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    setIndex(activeIndex - 1);
                }
            },
        }),
        [activeIndex, animate, commitDrag, isDragging, setIndex],
    );

    return {
        activeIndex: clamp(activeIndex, 0, maxIndex),
        bind,
        setIndex,
        progress: itemCount <= 1 ? 1 : clamp(activeIndex, 0, maxIndex) / maxIndex,
        isDragging,
        dragOffset,
    };
}
