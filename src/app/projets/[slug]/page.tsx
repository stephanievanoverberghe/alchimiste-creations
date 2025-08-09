'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ProjectPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    return (
        <section className="py-10 md:py-20 px-6 md:px-12 lg:px-[100px] xl:px-[150px] max-w-5xl mx-auto">
            {/* Bouton retour */}
            <Link href="/projets" className="inline-block mb-8 text-sm text-sauge hover:underline">
                ← Retour aux projets
            </Link>
        </section>
    );
}
