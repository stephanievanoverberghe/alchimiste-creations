'use client';

import { useEffect } from 'react';

export default function DevisPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    return (
        <div>
            <h1>Page devis</h1>
        </div>
    );
}
