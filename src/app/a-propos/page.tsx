'use client';

import StorySection from '@/components/sections/about/Story';
import IdealFitSection from '@/components/sections/about/IdealFit';
import ValuesSection from '@/components/sections/about/Value';
import GuaranteesSection from '@/components/sections/shared/Guarantees';
import MilestonesSection from '@/components/sections/about/Milestones';
import CallToActionSection from '@/components/sections/about/CallToAction';
import MiniProcessSection from '@/components/sections/shared/MiniProcess';

export default function AboutPage() {
    return (
        <div>
            <StorySection />
            <ValuesSection />
            <IdealFitSection />
            <MiniProcessSection />
            <GuaranteesSection />
            <MilestonesSection />
            <CallToActionSection />
        </div>
    );
}
