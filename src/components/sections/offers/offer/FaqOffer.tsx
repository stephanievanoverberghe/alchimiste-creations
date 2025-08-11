// components/sections/offers/offer/PackFAQ.tsx
'use client';

import { useSearchParams, usePathname } from 'next/navigation';
import FAQBareList from '@/components/FaqBareList';

type PackSlug = 'essentiel' | 'croissance' | 'signature';

export default function PackFAQ() {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    // /offres/[slug]
    const match = pathname.match(/^\/offres\/(essentiel|croissance|signature)\b/);
    const slug = (match?.[1] as PackSlug) ?? 'essentiel';

    // ?tech=react|wordpress -> any par défaut
    const techParam = (searchParams.get('tech') ?? '').toLowerCase();
    const techFromQuery: 'any' | 'wordpress' | 'react' = techParam === 'react' ? 'react' : techParam === 'wordpress' ? 'wordpress' : 'any';

    return (
        <section id="faq" aria-labelledby="pack-faq-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-5xl mx-auto space-y-8 md:space-y-10">
                <div className="text-center lg:text-left">
                    <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        FAQ du pack
                    </span>
                    <h2 id="pack-faq-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Questions fréquentes
                    </h2>
                </div>

                {/* exactement ce que tu as demandé */}
                <FAQBareList surface="offer" packSlug={slug} mode="compact" limit={4} techFilter={techFromQuery} />
            </div>
        </section>
    );
}
