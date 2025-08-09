'use client';

import Image from 'next/image';

export default function PromiseSection() {
    return (
        <section className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px] bg-ivory">
            {/* Liseré décoratif en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sauge via-terracotta to-sauge" />
            {/* Fond or avec opacité 10% UNIQUEMENT sur mobile */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />

            {/* Vague décorative visible uniquement à partir de md */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="Vague décorative" className="h-auto" fill priority />
            </div>

            <div className="relative max-w-4xl mx-auto text-center space-y-6">
                {/* Badge */}
                <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                    Ma promesse
                </span>

                {/* Phrase clé */}
                <h2 className="text-terracotta font-title text-2xl md:text-3xl lg:text-4xl font-bold tracking-widest leading-tight">
                    Transformer ton univers en une présence digitale vivante
                </h2>

                {/* Sous-phrase */}
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-2xl mx-auto">
                    Chaque site que je crée est pensé comme une pièce artisanale&nbsp;: alignée à ton essence, fluide, et conçue pour attirer naturellement les bonnes personnes.
                </p>
            </div>
        </section>
    );
}
