'use client';

import { type ReactNode, useEffect, useMemo, useState } from 'react';
import type { HomeContent } from '@/content/home';
import { HomeRoadmapLayout as HomeRoadmapDesktop } from '@/components/roadmap/home-roadmap';
import { HomeRoadmapMobile } from './mobile/home-roadmap-mobile';

type HomeRoadmapProps = {
    children: ReactNode;
    pillars: HomeContent['architecture']['pillars'];
};

export function HomeRoadmap({ children, pillars }: HomeRoadmapProps) {
    const [isMobile, setIsMobile] = useState(false);
    const mobilePillars = useMemo(() => pillars.slice(0, 3), [pillars]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mediaQuery = window.matchMedia('(max-width: 639px)');
        const onChange = () => setIsMobile(mediaQuery.matches);
        onChange();
        mediaQuery.addEventListener('change', onChange);
        return () => mediaQuery.removeEventListener('change', onChange);
    }, []);

    if (isMobile) {
        return (
            <>
                <HomeRoadmapMobile pillars={mobilePillars} />
                {children}
            </>
        );
    }

    return <HomeRoadmapDesktop>{children}</HomeRoadmapDesktop>;
}
