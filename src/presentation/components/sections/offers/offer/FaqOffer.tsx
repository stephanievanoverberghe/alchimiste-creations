'use client';

import { useSearchParams, usePathname } from 'next/navigation';
import { HelpCircle } from 'lucide-react';
import Image from 'next/image';
import FAQBareList from '@/presentation/components/FaqBareList';

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
            {/* Liseré décoratif en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            {/* Fond or (mobile only) */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            {/* Vague décorative (md+) */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="" fill loading="lazy" className="h-auto object-cover" />
            </div>
            <div className="relative max-w-5xl mx-auto space-y-8 md:space-y-10">
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <HelpCircle className="w-3.5 h-3.5" aria-hidden />
                        FAQ du pack
                    </span>
                    <h2 id="pack-faq-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Questions fréquentes
                    </h2>
                </div>

                <FAQBareList surface="offer" packSlug={slug} mode="compact" limit={4} techFilter={techFromQuery} />
            </div>
        </section>
    );
}
