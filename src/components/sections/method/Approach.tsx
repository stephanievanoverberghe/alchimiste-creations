'use client';

import Image from 'next/image';

export default function ApproachSection() {
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
                {/* Titre et intro */}
                <div className="text-center lg:text-left">
                    <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        Sur-mesure, pensé pour toi
                    </span>
                    <h2 className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Pourquoi un site sur-mesure change vraiment la donne
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Un site, c’est plus qu’un écran et quelques clics. C’est ton <strong>ancrage en ligne</strong>, l’espace où ton univers doit respirer, toucher, engager.
                        Ici, rien n’est figé&nbsp;: chaque détail est pensé pour refléter ton essence et inviter les bonnes personnes à entrer.
                    </p>
                </div>

                {/* Grille contenu */}
                <div className="grid md:grid-cols-2 gap-10">
                    {/* Texte principal */}
                    <div className="space-y-5 text-base md:text-lg leading-relaxed">
                        <p>
                            Chez <strong>Alchimiste Créations</strong>, pas de modèles préfabriqués, ni de solutions impersonnelles. Je conçois{' '}
                            <strong>des sites web sur-mesure</strong> — esthétiques, fluides, alignés à ce que tu veux transmettre — pour qu’ils deviennent un véritable
                            prolongement de toi.
                        </p>
                        <p>
                            Mon approche repose sur <strong>l’écoute profonde</strong>, la compréhension de tes valeurs, et la création d’un espace en ligne qui évolue avec toi.
                            Ton site ne sera pas juste beau&nbsp;: <strong>il vivra, il parlera, il convertira naturellement</strong>.
                        </p>
                    </div>

                    {/* Bloc bénéfices */}
                    <div className="bg-background rounded-[30px] border border-sauge/30 p-8 shadow-sm">
                        <h3 className="text-sm md:text-base font-semibold tracking-widest text-terracotta mb-5">Concrètement, ce que ça t’apporte</h3>
                        <ul className="grid sm:grid-cols-1 gap-y-4">
                            {[
                                'Un site vitrine unique, pensé comme une pièce artisanale',
                                'Une expérience fluide qui met en lumière ce que tu fais de mieux',
                                'Un design conçu pour convertir et engager naturellement',
                                'Un outil qui grandit avec toi, sans avoir à tout refaire dans 2 ans',
                            ].map((line, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <svg aria-hidden viewBox="0 0 24 24" className="mt-1 h-5 w-5 shrink-0 text-sauge" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>{line}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
