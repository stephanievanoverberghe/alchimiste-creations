import { type ReactNode } from 'react';
import { HomeRoadmapLayout } from '@/features/home/components';

type HomeRoadmapProps = {
    children: ReactNode;
};

export function HomeRoadmap({ children }: HomeRoadmapProps) {
    return <HomeRoadmapLayout>{children}</HomeRoadmapLayout>;
}
