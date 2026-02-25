'use client';

import StorySection from '@/presentation/components/sections/about/Story';
import IdealFitSection from '@/presentation/components/sections/about/IdealFit';
import ValuesSection from '@/presentation/components/sections/about/Value';
import GuaranteesSection from '@/presentation/components/sections/shared/Guarantees';
import MilestonesSection from '@/presentation/components/sections/about/Milestones';
import CallToActionSection from '@/presentation/components/sections/about/CallToAction';
import MiniProcessSection from '@/presentation/components/sections/shared//MiniProcess';

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
