'use client';

import * as React from 'react';

const SCROLL_THRESHOLD = 8;

export function useSiteHeaderState(pathname: string) {
    const [scrolled, setScrolled] = React.useState(false);
    const [open, setOpen] = React.useState(false);

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
        open,
        scrolled,
        toggleOpen,
    };
}
