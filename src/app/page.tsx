'use client';

import IntroSection from '@/components/sections/home/Intro';
import TargetAudienceSection from '@/components/sections/home/TargetAudience';
import OffersSection from '@/components/sections/home/Offers';
import QuoteSection from '@/components/sections/home/Quote';

export default function HomePage() {
    return (
        <div>
            <IntroSection />
            <TargetAudienceSection />
            <OffersSection />
            <QuoteSection />
        </div>
    );
}
