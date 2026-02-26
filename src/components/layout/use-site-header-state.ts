'use client';

import * as React from 'react';

const SCROLL_THRESHOLD = 8;
const COMPACT_HEADER_QUERY = '(max-width: 980px)';

export function useSiteHeaderState(pathname: string) {
    const [scrolled, setScrolled] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [isCompact, setIsCompact] = React.useState(true);
    const [hidden, setHidden] = React.useState(false);
    const previousScrollY = React.useRef(0);

    React.useEffect(() => {
        const onScroll = () => {
            const currentScrollY = window.scrollY;
            const isScrollingDown = currentScrollY > previousScrollY.current;
            setScrolled(currentScrollY > SCROLL_THRESHOLD);
            setHidden(isScrollingDown && currentScrollY > SCROLL_THRESHOLD * 6);
            previousScrollY.current = currentScrollY;
        };

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

        setHidden(false);

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
        hidden,
        isCompact,
        open,
        scrolled,
        toggleOpen,
    };
}
