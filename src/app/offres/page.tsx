'use client';

import { useEffect, useState } from 'react';
import { getPacks } from '@/application/catalog/use-cases/getPacks';
import type { Tech } from '@/domain/offers/packs';
import PacksSection from '@/presentation/components/sections/offers/Packs';
import PacksComparison from '@/presentation/components/sections/offers/PacksComparison';
import AddonsGridSection from '@/presentation/components/sections/offers/AddonsGrid';
import MiniProcessSection from '@/presentation/components/sections/shared/MiniProcess';
import GuaranteesSection from '@/presentation/components/sections/shared/Guarantees';
import IdealFitSection from '@/presentation/components/sections/offers/IdealFit';
import FaqSection from '@/presentation/components/sections/offers/FaqOffers';
import ProjectsTeaserSection from '@/presentation/components/sections/offers/ProjectsTeaser';
import CallToActionSection from '@/presentation/components/sections/offers/CallToAction';

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
            <FaqSection />
            <ProjectsTeaserSection limit={3} />
            <CallToActionSection />
        </>
    );
}
