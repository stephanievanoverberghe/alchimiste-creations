'use client';

import Image from 'next/image';

export default function IntroSection() {
    return (
        <section className="relative">
            <div className="flex flex-col lg:flex-row min-h-[600px]">
                {/* Image avec width fixe */}
                <div className="relative w-full lg:w-[380px] h-[400px] lg:h-auto">
                    <Image src="/home/profil.jpeg" alt="Portrait de Stéphanie" fill priority className="object-cover object-center" />
                </div>

                {/* Texte fluide */}
                <div className="flex-1 flex flex-col justify-center py-10 md:py-28 px-6 md:px-12 lg:px-[100px] xl:px-[150px]">
                    <h2 className="text-center lg:text-start text-2xl lg:text-4xl font-semibold tracking-widest text-terracotta mb-5 md:mb-10">
                        Un parcours entre art, résilience et création
                    </h2>
                    <div className="text-sm md:text-base leading-relaxed font-light">
                        <p>
                            Avant de devenir développeuse, j’étais une <strong className="font-bold">exploratrice du sensible</strong> : dessin, peinture, spiritualité, quête de
                            sens.
                        </p>
                        <p className="mt-4">
                            J’ai vécu une reconversion profonde, motivée par l’envie de donner <strong className="font-bold">forme à l’invisible</strong>, de transformer des idées
                            en matière digitale.
                        </p>
                        <p className="mt-4">J’ai étudié à la Manu et à OpenClassrooms, avec une spécialisation front-end React/Next.js.</p>
                        <p className="mt-4">
                            Mais ce n’est pas la technique qui me définit : <strong className="font-bold">c’est ma capacité à ressentir, à écouter, à créer du web</strong> comme on
                            façonne un espace habité.
                        </p>
                    </div>
                </div>
            </div>

            {/* Triangle décoratif */}
            <div className="absolute top-[-60px] right-24 lg:right-72 z-0 hidden lg:block">
                <Image src="/deco/triangle.png" alt="Décoration triangle" width={140} height={140} />
            </div>
        </section>
    );
}
