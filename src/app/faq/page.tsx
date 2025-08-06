'use client';

import { useEffect } from 'react';

export default function FaqPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    return (
        <div>
            <h1>Page Faq</h1>
        </div>
    );
}
