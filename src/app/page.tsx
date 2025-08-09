'use client';

import { useEffect } from 'react';
import OffersSection from '@/components/sections/home/Offers';
import CallToActionSection from '@/components/sections/home/CallToAction';
import PromiseSection from '@/components/sections/home/Promise';
import AboutPreviewSection from '@/components/sections/home/AboutPreview';
import WhyChooseSection from '@/components/sections/home/WhyChoose';
import ProjectsSection from '@/components/sections/home/ProjectsSection';

export default function HomePage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);
    return (
        <div>
            <PromiseSection />
            <AboutPreviewSection />
            <OffersSection />
            <WhyChooseSection />
            <ProjectsSection />
            <CallToActionSection />
        </div>
    );
}
