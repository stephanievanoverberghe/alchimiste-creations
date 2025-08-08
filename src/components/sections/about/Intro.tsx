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
                        Mon parcours — entre art, résilience et création
                    </h2>
                    <div className="text-sm md:text-base leading-relaxed font-light">
                        <p>
                            Avant de devenir développeuse, j’étais exploratrice du sensible : dessin, peinture, spiritualité, quête de sens. J’ai vécu une reconversion profonde,
                            portée par l’envie de donner forme à l’invisible, de traduire une énergie en matière digitale.
                        </p>
                        <p className="mt-4">
                            Formée au développement web à la Manu et sur OpenClassrooms (spécialisation React et Next.js), j’ai uni technique et sensibilité pour créer des sites
                            qui ne sont pas que des outils, mais de véritables espaces vivants.
                        </p>
                        <p className="mt-4">
                            Ce qui me définit avant tout : ma capacité à ressentir, à écouter, et à créer un site web comme un espace aligné et utile au quotidien.
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
