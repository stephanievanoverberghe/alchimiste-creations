'use client';

import { useEffect } from 'react';
import OffersSection from '@/presentation/components/sections/home//Offers';
import CallToActionSection from '@/presentation/components/sections/home/CallToAction';
import PromiseSection from '@/presentation/components/sections/home/Promise';
import AboutPreviewSection from '@/presentation/components/sections/home/AboutPreview';
import WhyChooseSection from '@/presentation/components/sections/home/WhyChoose';
import ProjectsSection from '@/presentation/components/sections/home/ProjectsSection';

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
