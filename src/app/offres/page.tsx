'use client';

import PacksSection from '@/components/sections/offers/Packs';
import { useEffect } from 'react';

export default function OffresPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    return (
        <div>
            <PacksSection />
        </div>
    );
}
