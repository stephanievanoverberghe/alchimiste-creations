'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { HomeRoadmapLayout as HomeRoadmapDesktop } from '@/components/roadmap/home-roadmap';

type HomeRoadmapProps = {
    children: ReactNode;
};

export function HomeRoadmap({ children }: HomeRoadmapProps) {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mediaQuery = window.matchMedia('(max-width: 639px)');
        const onChange = () => setIsMobile(mediaQuery.matches);
        onChange();
        mediaQuery.addEventListener('change', onChange);
        return () => mediaQuery.removeEventListener('change', onChange);
    }, []);

    if (isMobile !== false) {
        return <>{children}</>;
    }

    return <HomeRoadmapDesktop isFancy={false}>{children}</HomeRoadmapDesktop>;
}
