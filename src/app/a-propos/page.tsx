'use client';

import { useEffect } from 'react';

import IntroSection from '@/components/sections/about/Intro';
import ValueSection from '@/components/sections/about/Value';
import ApproachSection from '@/components/sections/about/Approach';
import VisionSection from '@/components/sections/about/Vision';

export default function AboutPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    return (
        <div>
            <IntroSection />
            <ValueSection />
            <VisionSection />
            <ApproachSection />
        </div>
    );
}
