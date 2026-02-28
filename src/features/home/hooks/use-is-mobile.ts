'use client';

import { useMediaQuery } from '@/hooks';

type UseIsMobileOptions = {
    query?: string;
};

const DEFAULT_QUERY = '(max-width: 639px)';

export function useIsMobile({ query = DEFAULT_QUERY }: UseIsMobileOptions = {}) {
    return useMediaQuery(query, { initialValue: null });
}
