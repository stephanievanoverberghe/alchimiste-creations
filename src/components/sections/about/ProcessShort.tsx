'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

export default function ProcessShortSection() {
    const steps = [
        {
            title: 'Écoute & cadrage',
            description: 'On pose l’intention, l’arborescence et le cap en visio (30–60 min).',
            image: '/process/ecoute.png',
            alt: 'Écoute et cadrage du projet',
        },
        {
            title: 'Ambiance & design',
            description: 'Univers visuel léger, UI claire et cohérente avec ton énergie.',
            image: '/process/clarte.png',
            alt: 'Ambiance et design',
        },
        {
            title: 'Développement',
            description: 'WordPress ou React/Next.js, responsive + SEO de base.',
            image: '/process/creations.png',
            alt: 'Développement du site',
        },
        {
            title: 'Tests & mise en ligne',
            description: 'Recettes, accessibilité, perfs, tutoriel et passation.',
            image: '/process/transmission.png',
            alt: 'Tests et mise en ligne',
        },
    ];

    return (
        <section className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="max-w-5xl mx-auto space-y-12">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        Méthode
                    </span>
                    <h2 className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">4 temps pour un site clair, vivant et durable</h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">Une progression simple et humaine, du cadrage à la mise en ligne.</p>
                </div>

                {/* Frise courte */}
                <div className="flex flex-col md:flex-row items-stretch justify-between gap-10 md:gap-6 text-center">
                    {steps
                        .map((step) => (
                            <div key={step.title} className="group relative flex flex-col items-center text-center">
                                {/* Image */}
                                <div className="transition-transform duration-300 group-hover:scale-105">
                                    <Image src={step.image} alt={step.alt} width={120} height={120} className="object-contain mb-4" />
                                </div>

                                {/* Titre */}
                                <h3 className="text-base lg:text-xl font-bold tracking-wide md:tracking-widest text-terracotta mb-2">{step.title}</h3>

                                {/* Description (≤ 2 lignes) */}
                                <p className="text-xs md:text-sm text-foreground/80 max-w-[220px]">{step.description}</p>
                            </div>
                        ))
                        .flatMap((component, index, array) => {
                            if (index < array.length - 1) {
                                return [
                                    component,
                                    <div key={`arrow-${index}`} className="hidden md:flex items-center justify-center w-[50px]">
                                        <FontAwesomeIcon icon={faArrowRightLong} className="text-sauge text-lg" />
                                    </div>,
                                ];
                            }
                            return [component];
                        })}
                </div>

                {/* Micro-note + CTA */}
                <div className="flex flex-col items-center gap-4">
                    <p className="text-sm text-foreground/70 italic">
                        Je prends <span className="not-italic font-medium text-terracotta">1 projet à la fois</span> pour garder de la profondeur.
                    </p>
                    <Link
                        href="/methode"
                        className={cn(
                            'inline-block px-6 py-3 text-center rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                        )}
                    >
                        Voir la méthode en détail
                    </Link>
                </div>
            </div>
        </section>
    );
}
