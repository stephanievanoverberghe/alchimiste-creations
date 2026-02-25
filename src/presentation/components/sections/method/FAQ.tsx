// components/method/MethodFAQSection.tsx
'use client';

import Image from 'next/image';
import { HelpCircle } from 'lucide-react';

import FAQBareList from '@/presentation/components/FaqBareList';

type Tech = 'any' | 'wordpress' | 'react';
type PackSlug = 'essentiel' | 'croissance' | 'signature';

export default function FAQSection({
    mode = 'compact',
    techFilter = 'any',
    packSlug,
    limit = 4,
}: {
    mode?: 'compact' | 'full';
    techFilter?: Tech;
    packSlug?: PackSlug;
    limit?: number;
    ctaHref?: string;
}) {
    return (
        <section id="faq" aria-labelledby="faq-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            {/* Liseré décoratif en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            {/* Fond or discret sur mobile */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            {/* Vague décorative en ≥ md */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="" className="h-auto" fill priority />
            </div>

            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <HelpCircle className="w-3.5 h-3.5" aria-hidden />
                        <span>FAQ méthode</span>
                    </span>
                    <h2 id="faq-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Questions fréquentes — claires et sans détour
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Paiement, délais, contenus, SEO, WordPress vs React… Je réponds aux questions les plus courantes liées à ma méthode.
                    </p>
                </div>

                {/* Liste FAQ (surface=method pour prioriser les bonnes Q/R) */}
                <FAQBareList mode={mode} withJsonLd={false} techFilter={techFilter} surface="method" packSlug={packSlug} limit={limit} />
            </div>
        </section>
    );
}
