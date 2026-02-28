'use client';

import { type ReactNode } from 'react';
import { HomeRoadmapLayout as HomeRoadmapDesktop } from '@/components/roadmap/home-roadmap';
import { useIsMobile } from '@/features/home/hooks';

type HomeRoadmapLayoutProps = {
    children: ReactNode;
};

export function HomeRoadmapLayout({ children }: HomeRoadmapLayoutProps) {
    const isMobile = useIsMobile();

    if (isMobile !== false) {
        return <>{children}</>;
    }

    return <HomeRoadmapDesktop isFancy={false}>{children}</HomeRoadmapDesktop>;
}
