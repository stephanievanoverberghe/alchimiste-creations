'use client';

import Image from 'next/image';
import { HelpCircle } from 'lucide-react';
import FAQBareList from '@/components/FaqBareList';

export default function FaqSection() {
    return (
        <section aria-labelledby="faq-offres-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="" fill priority className="h-auto object-cover" />
            </div>

            <div className="relative max-w-5xl mx-auto space-y-8 md:space-y-10">
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <HelpCircle className="w-3.5 h-3.5" aria-hidden />
                        FAQ Offres
                    </span>
                    <h2 id="faq-offres-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Questions fréquentes
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        On clarifie l’essentiel : techno, délais, paiement, contenus et SEO — sans jargon.
                    </p>
                </div>

                <FAQBareList surface="offers" mode="compact" limit={4} techFilter="any" />
            </div>
        </section>
    );
}
