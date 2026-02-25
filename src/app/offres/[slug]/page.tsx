'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import IdealFitSection from '@/presentation/components/sections/offers/offer/IdealFit';
import IncludedSection from '@/presentation/components/sections/offers/offer/Icluded';
import OptionsGridSection from '@/presentation/components/sections/offers/offer/OptionsGrid';
import MiniProcessSection from '@/presentation/components/sections/offers/offer/MiniProcess';
import PricingTermsSection from '@/presentation/components/sections/offers/offer/PricingTerms';
import ProjectsNearbySection from '@/presentation/components/sections/offers/offer/ProjectsNearby';
import FAQSection from '@/presentation/components/sections/offers/offer/FaqOffer';
import MiniComparatorSection from '@/presentation/components/sections/offers/offer/MiniComparator';
import CallToActionSection from '@/presentation/components/sections/offers/offer/CallToAction';

type Tech = 'wordpress' | 'react';

export default function OfferPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // état local + init depuis ?tech=react|wordpress (fallback wordpress)
    const [tech, setTech] = useState<Tech>(() => (searchParams.get('tech') === 'react' ? 'react' : 'wordpress'));

    const onTechChange = (t: Tech) => {
        setTech(t);
        const qs = new URLSearchParams(searchParams.toString());
        qs.set('tech', t);
        router.replace(`${pathname}?${qs.toString()}`, { scroll: false });
    };

    return (
        <div>
            <IdealFitSection />
            <IncludedSection />
            <OptionsGridSection tech={tech} onTechChange={onTechChange} />
            <MiniProcessSection />
            <PricingTermsSection />
            <ProjectsNearbySection />
            <FAQSection />
            <MiniComparatorSection />
            <CallToActionSection />
        </div>
    );
}
