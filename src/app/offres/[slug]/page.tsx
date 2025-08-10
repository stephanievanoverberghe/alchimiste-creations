'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import IdealFitSection from '@/components/sections/offers/offer/IdealFit';
import IncludedSection from '@/components/sections/offers/offer/Icluded'; // <-- corrige "Icluded"
import OptionsGridSection from '@/components/sections/offers/offer/OptionsGrid';

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
        </div>
    );
}
