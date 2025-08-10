'use client';

import { useEffect, useState } from 'react';
import { getPacks } from '@/lib/getPacks';
import type { Tech } from '@/lib/packs';
import PacksSection from '@/components/sections/offers/Packs';
import PacksComparison from '@/components/sections/offers/PacksComparison';

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
            <div className="mt-10">
                <PacksComparison packs={packs} tech={tech} onTechChange={setTech} />
            </div>
        </>
    );
}
