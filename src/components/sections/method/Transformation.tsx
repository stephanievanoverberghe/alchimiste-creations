'use client';

import Image from 'next/image';

export default function TransformationSection() {
    const benefits = [
        'Un site qui te ressemble et attire naturellement les bonnes personnes',
        'Une présence en ligne claire, professionnelle et alignée à ton univers',
        'Plus de sérénité : ton site devient un allié qui travaille pour toi',
        'Une expérience fluide qui donne envie de rester et d’explorer',
        'Un outil évolutif qui grandit avec ton activité, sans tout recommencer',
        'La fierté de partager un lien qui reflète vraiment qui tu es',
    ];

    return (
        <section className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            {/* Liseré décoratif en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            {/* Fond or avec opacité 10% UNIQUEMENT sur mobile */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />

            {/* Vague décorative visible uniquement à partir de md */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="Vague décorative" className="h-auto" fill priority />
            </div>

            <div className="relative max-w-5xl mx-auto space-y-12">
                {/* Titre + intro */}
                <div className="text-center lg:text-left">
                    <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        Le résultat
                    </span>
                    <h2 className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">Ce que ça change pour toi</h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 max-w-3xl leading-relaxed">
                        Imagine un site qui <strong>parle pour toi</strong> et <strong>travaille pour toi</strong>. Un espace qui respire ton énergie, attire les bonnes personnes
                        et te libère l’esprit. Chaque détail est pensé pour que tu en sois fier·e, et pour qu’il évolue avec toi.
                    </p>
                </div>

                {/* Liste des bénéfices */}
                <div className="bg-background rounded-[30px] border border-sauge/30 p-8 shadow-sm">
                    <ul className="grid sm:grid-cols-2 gap-y-5 gap-x-8">
                        {benefits.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <svg aria-hidden viewBox="0 0 24 24" className="mt-1 h-5 w-5 shrink-0 text-sauge" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-base md:text-lg leading-snug">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
