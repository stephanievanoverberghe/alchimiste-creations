'use client';

import CallToActionSection from '@/components/sections/offers/CallToAction';
import ContactSection from '@/components/sections/offers/Contact';
import PacksSection from '@/components/sections/offers/Packs';
import ProcessSection from '@/components/sections/offers/Process';
import { useEffect } from 'react';

export default function OffresPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    return (
        <div>
            <PacksSection />
            <CallToActionSection />
            <ProcessSection />
            <ContactSection />
        </div>
    );
}
