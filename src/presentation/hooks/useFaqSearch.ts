'use client';

import { useEffect, useMemo, useState } from 'react';
import { filterFaqItems, listFaqTags } from '@/application/faq/services/filterFaq';
import { getFaqItems } from '@/application/faq/use-cases/getFaqItems';
import type { FaqItem, FaqTag, PackSlug, Surface, Tech } from '@/domain/faq';

export function useFaqSearch({
    mode,
    limit,
    techFilter,
    surface,
    packSlug,
}: {
    mode: 'compact' | 'full';
    limit: number;
    techFilter: Tech;
    surface: Surface;
    packSlug?: PackSlug;
}): {
    items: FaqItem[];
    allTags: FaqTag[];
    rawQuery: string;
    activeTag: string | null;
    setRawQuery: (next: string) => void;
    setActiveTag: (next: string | null) => void;
} {
    const [rawQuery, setRawQuery] = useState('');
    const [query, setQuery] = useState('');
    const [activeTag, setActiveTag] = useState<string | null>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => setQuery(rawQuery), 180);
        return () => clearTimeout(timeoutId);
    }, [rawQuery]);

    const items = useMemo(() => {
        const faqItems = getFaqItems();
        return filterFaqItems({
            items: faqItems,
            query,
            activeTag,
            mode,
            limit,
            techFilter,
            surface,
            packSlug,
        });
    }, [query, activeTag, mode, limit, techFilter, surface, packSlug]);

    const allTags = useMemo(() => listFaqTags(getFaqItems(), mode), [mode]);

    useEffect(() => {
        setActiveTag(null);
        setRawQuery('');
    }, [mode, techFilter, surface, packSlug]);

    return {
        items,
        allTags,
        rawQuery,
        activeTag,
        setRawQuery,
        setActiveTag,
    };
}
