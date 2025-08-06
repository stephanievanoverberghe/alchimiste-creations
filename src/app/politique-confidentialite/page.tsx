'use client';

import { useEffect } from 'react';

export default function PrivacyPolicyPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    return (
        <div>
            <h1>Page politique de confidentialité</h1>
        </div>
    );
}
