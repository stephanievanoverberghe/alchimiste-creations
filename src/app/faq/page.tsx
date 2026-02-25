// app/faq/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HelpCircle, Mail, Home } from 'lucide-react';
import FAQBareList from '@/presentation/components/FaqBareList';

export const metadata: Metadata = {
    title: 'FAQ — Offres, méthode & technique',
    description: 'Toutes les réponses pour y voir clair : packs, WordPress vs React, délais, SEO, paiements, maintenance…',
    alternates: { canonical: '/faq' },
    openGraph: {
        title: 'FAQ — Offres, méthode & technique',
        description: 'Packs, WordPress vs React, délais, SEO, paiements, maintenance…',
    },
};

export default async function FaqPage() {
    return (
        <section aria-labelledby="faq-page-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px] bg-background">
            {/* Liseré haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" aria-hidden />

            {/* Fond mobile */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" aria-hidden />
            {/* Vague décorative md+ */}
            <div className="absolute inset-0 hidden md:block z-0" aria-hidden>
                <Image src="/deco/about-wave.png" alt="" role="presentation" fill priority className="object-cover" sizes="100vw" />
            </div>

            <div className="relative z-[1] max-w-5xl mx-auto space-y-6 md:space-y-8">
                {/* Breadcrumb */}
                <nav aria-label="Fil d’Ariane" className="text-sm">
                    <ol className="flex flex-wrap items-center gap-2 text-foreground/70">
                        <li className="inline-flex items-center gap-1">
                            <Home className="w-4 h-4" aria-hidden />
                            <Link href="/" className="underline underline-offset-4 hover:text-ormat">
                                Accueil
                            </Link>
                        </li>
                        <li aria-hidden className="opacity-60">
                            /
                        </li>
                        <li>
                            <span className="text-foreground">CGU</span>
                        </li>
                    </ol>
                </nav>

                {/* En-tête */}
                <header className="text-center lg:text-left space-y-4">
                    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <HelpCircle className="w-3.5 h-3.5" aria-hidden />
                        FAQ — Offres, méthode & technique
                    </span>

                    <h1 id="faq-page-title" className="text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Questions fréquentes
                    </h1>

                    <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Toutes les réponses pour y voir clair&nbsp;: packs, WordPress vs React, délais, SEO, paiements, maintenance…
                    </p>
                </header>

                {/* Bloc FAQ */}
                <div className="rounded-[22px] border border-sauge/30 bg-background/70 p-5 md:p-6 shadow-sm">
                    <FAQBareList surface="faq" mode="full" techFilter="any" withJsonLd className="mt-2" />
                </div>

                {/* Aide discrète */}
                <aside aria-label="Besoin d’aide" className="grid gap-3 sm:grid-cols-2">
                    <div className="inline-flex items-center gap-2 rounded-xl border border-sauge/30 bg-sauge/10 px-3 py-2 text-xs text-foreground/80">
                        💡 Astuce&nbsp;: cherche «&nbsp;paiement&nbsp;», «&nbsp;délais&nbsp;», «&nbsp;SEO&nbsp;», «&nbsp;WordPress&nbsp;».
                    </div>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-terracotta/30 bg-terracotta/10 px-3 py-2 text-xs font-semibold text-terracotta hover:bg-terracotta/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/40"
                    >
                        <Mail className="w-4 h-4" aria-hidden />
                        Une autre question&nbsp;? Écris-moi
                    </Link>
                </aside>
            </div>
        </section>
    );
}
