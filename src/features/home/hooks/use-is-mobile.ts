'use client';

import { useEffect, useState } from 'react';

type UseIsMobileOptions = {
    query?: string;
};

const DEFAULT_QUERY = '(max-width: 639px)';

export function useIsMobile({ query = DEFAULT_QUERY }: UseIsMobileOptions = {}) {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia(query);
        const onChange = () => setIsMobile(mediaQuery.matches);

        onChange();
        mediaQuery.addEventListener('change', onChange);

        return () => mediaQuery.removeEventListener('change', onChange);
    }, [query]);

    return isMobile;
}
