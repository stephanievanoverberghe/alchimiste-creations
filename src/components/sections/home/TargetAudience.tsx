'use client';

import Image from 'next/image';
import AudienceCard from './AudienceCard';

export default function TargetAudienceSection() {
    return (
        <section className="relative py-10 md:py-28 px-6 md:px-12 lg:px-[100px] xl:px-[150px]">
            {/* Fond or avec opacité 10% UNIQUEMENT sur mobile */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />

            {/* Vague décorative visible uniquement à partir de md */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/home-wave.png" alt="Vague décorative" className="h-auto" fill priority />
            </div>

            {/* Contenu principal */}
            <div className="relative z-10">
                <h2 className="text-center lg:text-start text-xl md:text-2xl lg:text-4xl font-semibold tracking-widest text-terracotta mb-5 md:mb-10">
                    À qui s’adresse Alchimiste Créations ?
                </h2>

                <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 text-center">
                    <AudienceCard
                        icon="/deco/icon-artist.png"
                        alt="Artistes"
                        title="Artistes & créatif·ves"
                        description="Vous avez besoin d’un site qui parle votre langage visuel et intérieur."
                    />
                    <AudienceCard
                        icon="/deco/icon-therapy.png"
                        alt="Thérapeutes"
                        title="Thérapeutes & praticien·nes du bien-être"
                        description="Vous cherchez un site rassurant, clair, à l’image de votre approche humaine."
                    />
                    <AudienceCard
                        icon="/deco/icon-business.png"
                        alt="Entrepreneurs"
                        title="Entrepreneurs du cœur"
                        description="Vous voulez une présence digitale alignée, sensible, et simple à prendre en main."
                    />
                </div>
            </div>
        </section>
    );
}
