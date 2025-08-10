'use client';

import { useEffect, useState } from 'react';
import { getPacks } from '@/lib/getPacks';
import type { Tech } from '@/lib/packs';
import PacksSection from '@/components/sections/offers/Packs';
import PacksComparison from '@/components/sections/offers/PacksComparison';
import AddonsGridSection from '@/components/sections/offers/AddonsGrid';
import MiniProcessSection from '@/components/sections/offers/MiniProcess';
import GuaranteesSection from '@/components/sections/offers/Guarantees';
import IdealFitSection from '@/components/sections/offers/IdealFit';
import FAQSections from '@/components/sections/offers/faq';

// On infère le type des packs directement depuis la fonction
type Packs = Awaited<ReturnType<typeof getPacks>>;

export default function OffresPage() {
    const [packs, setPacks] = useState<Packs | null>(null);
    const [tech, setTech] = useState<Tech>('wordpress');

    useEffect(() => {
        getPacks().then(setPacks);
    }, []);

    return (
        <>
            <PacksSection tech={tech} onTechChange={setTech} packs={packs} />
            <PacksComparison packs={packs} tech={tech} onTechChange={setTech} />
            <AddonsGridSection tech={tech} onTechChange={setTech} />
            <MiniProcessSection />
            <GuaranteesSection />
            <IdealFitSection />
            <FAQSections tech={tech} />
        </>
    );
}
