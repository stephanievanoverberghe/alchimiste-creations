import Image from 'next/image';
import { HelpCircle } from 'lucide-react';
import FAQBareList from '@/components/FaqBareList';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function FaqPage() {
    return (
        <section aria-labelledby="faq-page-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px] bg-background">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="" fill priority className="h-auto object-cover" />
            </div>

            <div className="relative max-w-3xl mx-auto space-y-8 md:space-y-10">
                <Link href="/offres" className={cn('inline-block mb-8 text-sm text-sauge hover:underline')}>
                    ← Retour aux packs
                </Link>
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <HelpCircle className="w-3.5 h-3.5" aria-hidden />
                        FAQ — Offres, méthode & technique
                    </span>
                    <h1 id="faq-page-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Questions fréquentes
                    </h1>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Toutes les réponses pour y voir clair : packs, WordPress vs React, délais, SEO, paiements, maintenance…
                    </p>
                </div>

                <FAQBareList surface="faq" mode="full" techFilter="any" />
            </div>
        </section>
    );
}
