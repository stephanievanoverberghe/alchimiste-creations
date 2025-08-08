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
                <h2 className="text-center lg:text-start text-2xl lg:text-4xl font-semibold tracking-widest text-terracotta mb-5 md:mb-10">
                    Pour qui je crée des sites uniques et alignés
                </h2>

                <p className="text-sm mb-5 md:mb-10 md:text-base text-center lg:text-start">
                    Chaque métier a ses priorités : inspirer, rassurer, vendre ou créer du lien. Mon rôle est de traduire ton univers en une expérience digitale fidèle à ton
                    public, que ce soit via WordPress ou du développement sur mesure.
                </p>

                <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 text-center">
                    <AudienceCard
                        icon="/deco/icon-artist.png"
                        alt="Artistes"
                        title="Artistes & créatif·ves"
                        description=" Un site qui reflète ton univers visuel, valorise tes créations et attire les bons regards."
                    />
                    <AudienceCard
                        icon="/deco/icon-therapy.png"
                        alt="Thérapeutes"
                        title="Thérapeutes & bien-être"
                        description="Un espace clair et rassurant, à l’image de ton approche humaine, qui inspire confiance et facilite les rendez-vous."
                    />
                    <AudienceCard
                        icon="/deco/icon-business.png"
                        alt="Entrepreneurs"
                        title="Entrepreneur·es du cœur"
                        description="Une présence digitale alignée et sensible, simple à gérer, pour développer ton activité avec fluidité."
                    />
                </div>
            </div>
        </section>
    );
}
