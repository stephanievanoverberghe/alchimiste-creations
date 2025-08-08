'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ContactSection() {
    return (
        <section className="relative py-10 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px] overflow-hidden">
            {/* Fond or avec opacité 10% UNIQUEMENT sur mobile */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />

            {/* Vague décorative visible uniquement à partir de md */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/home-wave.png" alt="Vague décorative" className="h-auto" fill priority />
            </div>
            <div className="relative z-10 text-center tracking-wide space-y-2">
                <div className="text-sm md:text-base leading-relaxed font-light mb-4 md:mb-10">
                    <p>Je ne prends qu’un projet à la fois, pour créer avec présence et attention.</p>
                    <p className="mt-4">
                        Si tu ressens que c’est le bon moment, je t’invite à me partager ton projet. Juste un appel doux, sans engagement, pour faire connaissance.
                    </p>
                </div>
                <Link
                    href="/contact"
                    className={cn(
                        'inline-block px-6 py-3 text-center rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                    )}
                >
                    Entrer en lien
                </Link>
            </div>
        </section>
    );
}
