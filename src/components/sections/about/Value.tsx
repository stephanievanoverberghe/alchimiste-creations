'use client';

import Image from 'next/image';
import ValueCard from './ValueCard';

export default function ValueSection() {
    return (
        <section className="relative py-10 md:py-28 px-6 md:px-12 lg:px-[100px] xl:px-[150px]">
            {/* Fond or avec opacité 10% UNIQUEMENT sur mobile */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />

            {/* Vague décorative visible uniquement à partir de md */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="Vague décorative" className="h-auto" fill priority />
            </div>

            {/* Contenu principal */}
            <div className="relative z-10">
                <h2 className="text-center lg:text-start text-2xl lg:text-4xl font-semibold tracking-widest text-terracotta mb-5 md:mb-10">
                    À qui s’adresse Alchimiste Créations ?
                </h2>
                <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    <ValueCard title="Authenticité" color="ormat">
                        Je crée sans masque, avec sincérité et présence.
                    </ValueCard>
                    <ValueCard title="Simplicité" color="sauge">
                        Je rends le web accessible, fluide et apaisant.
                    </ValueCard>
                    <ValueCard title="Transformation" color="terracotta">
                        Chaque projet est une métamorphose, de l&apos;idée au site.
                    </ValueCard>
                    <ValueCard title="Co-création" color="brun">
                        Je marche avec toi, pas devant toi. On avance ensemble.
                    </ValueCard>
                </div>
            </div>
        </section>
    );
}
