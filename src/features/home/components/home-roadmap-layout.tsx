'use client';

import { type ReactNode } from 'react';
import { HomeRoadmapCanvas } from '@/features/home/components/home-roadmap-canvas';
import { useIsMobile } from '@/features/home/hooks';

type HomeRoadmapLayoutProps = {
    children: ReactNode;
};

export function HomeRoadmapLayout({ children }: HomeRoadmapLayoutProps) {
    const isMobile = useIsMobile();

    if (isMobile !== false) {
        return <>{children}</>;
    }

    return <HomeRoadmapCanvas isFancy={false}>{children}</HomeRoadmapCanvas>;
}
