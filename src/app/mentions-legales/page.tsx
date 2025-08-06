'use client';

import { useEffect } from 'react';

export default function LegalsMentionsPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    return (
        <div>
            <h1>Page Mentions légales</h1>
        </div>
    );
}
