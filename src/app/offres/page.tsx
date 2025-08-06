'use client';

import { useEffect } from 'react';

export default function OffresPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    return (
        <div>
            <h1>Mes offres</h1>
        </div>
    );
}
