'use client';

import { HelpCircle } from 'lucide-react';
import FAQBareList from '@/components/FaqBareList';

export default function FaqDevisSection() {
    return (
        <section id="devis-faq" aria-labelledby="devis-faq-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-6xl mx-auto space-y-8 md:space-y-10">
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <HelpCircle className="w-3.5 h-3.5" aria-hidden />
                        FAQ devis
                    </span>
                    <h2 id="devis-faq-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Les questions juste avant d’envoyer ton brief
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Délais, contenu du devis, acompte, confidentialité… réponses rapides pour avancer sereinement.
                    </p>
                </div>

                <FAQBareList surface="method" mode="compact" limit={4} techFilter="any" />
            </div>
        </section>
    );
}
