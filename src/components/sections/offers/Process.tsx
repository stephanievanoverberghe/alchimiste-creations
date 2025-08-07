'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

const steps = [
    {
        title: 'Écoute',
        description: 'Tu me parles de toi, de ton projet, de ce que tu ressens.',
        image: '/process/ecoute.png',
    },
    {
        title: 'Clarté',
        description: 'Je t’aide à poser les bases : structure, besoins, priorités.',
        image: '/process/clarte.png',
    },
    {
        title: 'Créations',
        description: 'Je développe ton site avec soin et transparence.',
        image: '/process/creations.png',
    },
    {
        title: 'Transmission',
        description: 'Je t’accompagne à le prendre en main (ou je continue à tes côtés).',
        image: '/process/transmission.png',
    },
];

export default function ProcessSection() {
    return (
        <section className="relative py-16 px-6 md:px-12 lg:px-[100px] xl:px-[150px] bg-background">
            <h2 className="text-center lg:text-start text-2xl lg:text-4xl font-title font-bold tracking-widest text-terracotta mb-6">
                Un accompagnement en 4 temps, du cœur à la création
            </h2>
            <p className="mb-10 text-sm md:text-base text-center lg:text-start">
                Chaque projet naît d’une rencontre. Je t’écoute, je clarifie avec toi l’essentiel, je crée un site vivant à ton image, puis je te transmets les clés. Parce que ton
                site, c’est plus qu’une vitrine : c’est une extension de toi.
            </p>
            <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 text-center md:text-left">
                {steps
                    .map((step, index) => (
                        <div key={step.title} className="flex flex-col items-center text-center md:text-left">
                            {/* Image + Titre + Texte */}
                            <Image src={step.image} alt={step.title} width={130} height={130} className="object-contain mb-4 mx-auto md:mx-0" />
                            <h3 className="text-base lg:text-xl font-bold tracking-wide md:tracking-widest mb-2.5">{step.title}</h3>
                            <p className="text-xs md:text-sm font-light text-center max-w-[180px]">{step.description}</p>
                        </div>
                    ))
                    .flatMap((component, index, array) => {
                        if (index < array.length - 1) {
                            return [
                                component,
                                <div key={`arrow-${index}`} className="hidden md:flex items-center justify-center w-[60px]">
                                    <FontAwesomeIcon icon={faArrowRightLong} className="text-sauge text-xl" />
                                </div>,
                            ];
                        }
                        return [component];
                    })}
            </div>
        </section>
    );
}
