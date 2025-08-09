'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function CallToActionSection() {
    return (
        <section className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px] bg-background">
            {/* Fond or avec opacité 10% UNIQUEMENT sur mobile */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />

            {/* Vague décorative visible uniquement à partir de md */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/home-wave.png" alt="Vague décorative" className="h-auto" fill priority />
            </div>

            <div className="relative max-w-5xl mx-auto text-center space-y-8">
                {/* Badge */}
                <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                    Appel découverte · 30 min
                </span>

                {/* Titre */}
                <h2 className="text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">On crée un site vivant, clair et durable</h2>

                {/* Texte */}
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-2xl mx-auto">On clarifie besoin, budget et délais — sans jargon, sans pression.</p>

                {/* Bouton */}
                <Link
                    href="/contact"
                    className={cn(
                        'inline-block px-6 py-3 text-center rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                    )}
                >
                    Me contacter
                </Link>
            </div>
        </section>
    );
}
