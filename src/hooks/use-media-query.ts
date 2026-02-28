'use client';

import { useEffect, useState } from 'react';

type UseMediaQueryOptions = {
    initialValue?: boolean | null;
};

export function useMediaQuery(query: string, { initialValue = false }: UseMediaQueryOptions = {}) {
    const [matches, setMatches] = useState<boolean | null>(initialValue);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        const onChange = () => setMatches(mediaQuery.matches);

        onChange();
        mediaQuery.addEventListener('change', onChange);

        return () => mediaQuery.removeEventListener('change', onChange);
    }, [query]);

    return matches;
}
