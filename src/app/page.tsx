'use client';

import { useEffect } from 'react';

import IntroSection from '@/components/sections/home/Intro';
import TargetAudienceSection from '@/components/sections/home/TargetAudience';
import OffersSection from '@/components/sections/home/Offers';
import QuoteSection from '@/components/sections/home/Quote';
import CallToActionSection from '@/components/sections/home/CallToAction';

export default function HomePage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);
    return (
        <div>
            <IntroSection />
            <TargetAudienceSection />
            <OffersSection />
            <QuoteSection />
            <CallToActionSection />
        </div>
    );
}
