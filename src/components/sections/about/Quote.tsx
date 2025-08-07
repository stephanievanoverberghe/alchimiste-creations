'use client';

import Image from 'next/image';

export default function QuoteSection() {
    return (
        <section className="relative py-10 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px] overflow-hidden">
            {/* Fond or avec opacité 10% UNIQUEMENT sur mobile */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />

            {/* Vague décorative visible uniquement à partir de md */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/home-wave.png" alt="Vague décorative" className="h-auto" fill priority />
            </div>
            {/* Citation */}
            <div className="relative z-10 max-w-4xl mx-auto text-center tracking-wide space-y-2">
                <p className="text-sm md:text-lg lg:text-xl italic font-bold">Créer, pour moi, c’est écouter le silence, et lui donner un visage.</p>
                <p className="tracking-widest text-xs italic text-center mt-6">Stéphanie - Alchimiste Créations</p>
            </div>
        </section>
    );
}
