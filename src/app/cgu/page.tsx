'use client';

import { useEffect } from 'react';

export default function CguPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    return (
        <div>
            <h1>Page CGU</h1>
        </div>
    );
}
