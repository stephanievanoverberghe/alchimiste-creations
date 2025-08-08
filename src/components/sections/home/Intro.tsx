'use client';

import Image from 'next/image';

export default function IntroSection() {
    return (
        <section className="relative py-10 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            {/* Triangle en haut à droite */}
            <div className="absolute top-[-70px] right-72 z-0 hidden lg:block">
                <Image src="/deco/triangle.png" alt="Décoration triangle" width={140} height={140} />
            </div>

            {/* Contenu principal */}
            <div className="relative z-10 mx-auto flex flex-col items-center md:flex-row text-center md:text-left gap-8 lg:gap-24">
                {/* Container photo + triangle */}
                <div className="relative shrink-0">
                    {/* Triangle derrière la photo */}
                    <div className="absolute -bottom-6 -right-6 z-0 hidden lg:block">
                        <Image src="/deco/triangle.png" alt="Décoration triangle" width={120} height={120} className="rotate-[25deg]" />
                    </div>

                    {/* Photo */}
                    <div className="relative z-10 w-32 md:w-48 lg:w-56 xl:w-64 aspect-square rounded-full overflow-hidden">
                        <Image src="/home/profil.jpeg" alt="Portrait Stéphanie" width={400} height={400} className="object-cover w-full h-full" />
                    </div>
                </div>

                {/* Texte */}
                <div className="text-sm md:text-base leading-relaxed">
                    <p>
                        Je suis Stéphanie, fondatrice d’<strong>Alchimiste Créations</strong>.
                    </p>
                    <p className="mt-4">
                        J’accompagne les <strong>artistes</strong>, <strong>thérapeutes</strong> et <strong>entrepreneur·es du cœur</strong> à créer un site unique, esthétique et
                        efficace, qui reflète leur univers et attire les bonnes personnes.
                    </p>
                    <p className="mt-4">
                        Ici, pas de modèles figés : chaque projet naît de ton énergie, de ta vision et de ton histoire, pour que ton site devienne un espace vivant, aligné et utile
                        au quotidien.
                    </p>
                </div>
            </div>
        </section>
    );
}
