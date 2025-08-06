'use client';

import { useEffect } from 'react';

export default function AboutPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    return (
        <div>
            <h1 className="text-center text-base lg:text-5xl py-24">Page a propos</h1>
        </div>
    );
}
