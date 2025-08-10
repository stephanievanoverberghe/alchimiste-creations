'use client';

import { useEffect } from 'react';

export default function ContactPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    return (
        <div>
            <h1 className="text-center text-base lg:text-5xl py-24">Page contact</h1>
        </div>
    );
}
