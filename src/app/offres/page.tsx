'use client';

import { useEffect } from 'react';

export default function OffresPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    return (
        <div>
            <h1 className="text-center text-base lg:text-5xl py-24">Page offres</h1>
        </div>
    );
}
