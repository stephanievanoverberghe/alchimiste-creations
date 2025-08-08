'use client';

import { useEffect, useState } from 'react';
import OfferCard from './OfferCard';
import { faLeaf, faTint, faFire } from '@fortawesome/free-solid-svg-icons';
import { getPacks } from '@/lib/getPacks';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Pack {
    slug: string;
    titre: string;
    sousTitre: string;
    cible: string;
    inclus: string[];
    prix: string;
}

export default function OffersSection() {
    const [packs, setPacks] = useState<Pack[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getPacks();
            setPacks(data);
        }
        fetchData();
    }, []);

    const icons = [faLeaf, faTint, faFire];

    return (
        <section className="relative py-10 md:py-28 px-6 md:px-12 lg:px-[100px] xl:px-[150px] bg-background">
            <div className="relative z-10 text-foreground">
                <h2 className="text-center lg:text-start text-2xl lg:text-4xl font-semibold tracking-widest text-terracotta mb-5 md:mb-10">
                    Choisis la façon qui te ressemble pour créer ton site
                </h2>

                <p className="text-sm md:text-base text-center lg:text-start">
                    Chaque projet est une rencontre. J’écoute ton histoire, je m’imprègne de ton univers et je conçois un site web qui allie esthétique et fonction.
                </p>

                <p className="mt-4 mb-5 md:mb-10 text-sm md:text-base text-center lg:text-start">Tu trouveras ici l’offre qui correspond à ton énergie et à tes besoins :</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-5 md:mb-10">
                    {packs.map((pack, index) => (
                        <OfferCard
                            key={pack.slug}
                            slug={pack.slug}
                            title={pack.titre.replace('Pack ', '')}
                            subtitle={pack.sousTitre}
                            centralIcon={icons[index] || faLeaf}
                            items={pack.inclus}
                        />
                    ))}
                </div>

                <div className="flex justify-center mt-8">
                    <Link
                        href="/offres"
                        className={cn(
                            'inline-block px-6 py-3 text-center rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                        )}
                    >
                        Voir les détails des offres
                    </Link>
                </div>
            </div>
        </section>
    );
}
