'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

export default function ProcessSection() {
    const steps = [
        {
            title: 'Écoute',
            description: 'Tu me partages ton univers, tes besoins et tes intuitions.',
            image: '/process/ecoute.png',
        },
        {
            title: 'Clarté',
            description: 'On définit ensemble la structure, les priorités et le fil rouge.',
            image: '/process/clarte.png',
        },
        {
            title: 'Création',
            description: 'Je développe un site sur-mesure, esthétique et fluide.',
            image: '/process/creations.png',
        },
        {
            title: 'Transmission',
            description: 'Je te forme à l’utiliser et reste disponible si tu le souhaites.',
            image: '/process/transmission.png',
        },
    ];

    return (
        <section className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Titre */}
                <div className="text-center">
                    <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        Ma méthode
                    </span>
                    <h2 className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">4 étapes pour créer un site qui te ressemble</h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                        Une méthode simple, humaine et créative pour transformer ton idée en un site sur-mesure qui reflète ton essence et attire les bonnes personnes.
                    </p>
                </div>

                {/* Étapes */}
                <div className="flex flex-col md:flex-row items-stretch justify-between gap-10 md:gap-6 text-center">
                    {steps
                        .map((step) => (
                            <div key={step.title} className="flex flex-col items-center text-center group">
                                {/* Image */}
                                <div className="transition-transform duration-300 group-hover:scale-105">
                                    <Image src={step.image} alt={step.title} width={130} height={130} className="object-contain mb-4" />
                                </div>

                                {/* Titre */}
                                <h3 className="text-base lg:text-xl font-bold tracking-wide md:tracking-widest text-terracotta mb-2">{step.title}</h3>

                                {/* Description */}
                                <p className="text-xs md:text-sm text-foreground/80 max-w-[200px]">{step.description}</p>
                            </div>
                        ))
                        .flatMap((component, index, array) => {
                            if (index < array.length - 1) {
                                return [
                                    component,
                                    <div key={`arrow-${index}`} className="hidden md:flex items-center justify-center w-[60px]">
                                        <FontAwesomeIcon icon={faArrowRightLong} className="text-sauge text-lg" />
                                    </div>,
                                ];
                            }
                            return [component];
                        })}
                </div>
            </div>
        </section>
    );
}
