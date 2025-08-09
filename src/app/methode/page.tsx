'use client';

import ApproachSection from '@/components/sections/method/Approach';
import CallToActionSection from '@/components/sections/method/CallToAction';
import NoGoSection from '@/components/sections/method/NoGo';
import ProcessSection from '@/components/sections/method/Process';
import TransformationSection from '@/components/sections/method/Transformation';
import { useEffect } from 'react';

export default function MethodPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    return (
        <div>
            <ApproachSection />
            <ProcessSection />
            <TransformationSection />
            <NoGoSection />
            <CallToActionSection />
        </div>
    );
}
