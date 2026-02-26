'use client';

import * as React from 'react';

const SCROLL_THRESHOLD = 8;
const COMPACT_HEADER_QUERY = '(max-width: 980px)';

export function useSiteHeaderState(pathname: string) {
    const [scrolled, setScrolled] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [isCompact, setIsCompact] = React.useState(true);

    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    React.useEffect(() => {
        setOpen(false);
    }, [pathname]);

    React.useEffect(() => {
        const mediaQuery = window.matchMedia(COMPACT_HEADER_QUERY);
        const syncCompactMode = (event: MediaQueryList | MediaQueryListEvent) => {
            setIsCompact(event.matches);
        };

        syncCompactMode(mediaQuery);
        mediaQuery.addEventListener('change', syncCompactMode);

        return () => mediaQuery.removeEventListener('change', syncCompactMode);
    }, []);

    React.useEffect(() => {
        if (!isCompact) {
            setOpen(false);
        }
    }, [isCompact]);

    React.useEffect(() => {
        if (!open) {
            return;
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [open]);

    const toggleOpen = React.useCallback(() => {
        setOpen((isOpen) => !isOpen);
    }, []);

    return {
        isCompact,
        open,
        scrolled,
        toggleOpen,
    };
}
