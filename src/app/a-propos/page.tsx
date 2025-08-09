'use client';

import { useEffect } from 'react';

import StorySection from '@/components/sections/about/Story';
import IdealFitSection from '@/components/sections/about/IdealFit';
import ProcessShortSection from '@/components/sections/about/ProcessShort';
import ValuesSection from '@/components/sections/about/Value';
import GuaranteesSection from '@/components/sections/about/Guarantees';
import MilestonesSection from '@/components/sections/about/Milestones';
import CallToActionSection from '@/components/sections/about/CallToAction';

export default function AboutPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    return (
        <div>
            <StorySection />
            <ValuesSection />
            <IdealFitSection />
            <ProcessShortSection />
            <GuaranteesSection />
            <MilestonesSection />
            <CallToActionSection />
        </div>
    );
}
