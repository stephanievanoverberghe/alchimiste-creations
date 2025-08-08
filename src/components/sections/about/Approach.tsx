'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export default function ApproachSection() {
    return (
        <section className="relative py-10 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px] overflow-hidden">
            {/* Fond or sur mobile */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />

            {/* Vague décorative desktop */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/home-wave.png" alt="Vague décorative" className="h-auto" fill priority />
            </div>

            {/* Contenu + bouton centré */}
            <div className="relative z-10 text-foreground flex flex-col justify-center items-center text-center">
                <h2 className="text-2xl lg:text-4xl font-semibold tracking-widest text-terracotta mb-5 md:mb-10">Et si on créait ensemble ton site web ?</h2>
                <p className="mb-5 md:mb-10 text-sm md:text-base">
                    Je t’invite à réserver un appel découverte offert pour parler de ton projet, définir tes besoins, et voir comment le concrétiser ensemble.
                </p>

                <Link
                    href="/contact"
                    className={cn(
                        'px-6 py-3 rounded-2xl text-center bg-terracotta hover:bg-terracotta/90 cursor-pointer text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                    )}
                >
                    Réserver mon appel
                </Link>
            </div>
        </section>
    );
}
