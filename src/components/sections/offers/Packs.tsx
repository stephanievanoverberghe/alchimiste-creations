'use client';

import { useEffect, useState } from 'react';
import PackCard from './PacksCard';
import { faLeaf, faTint, faFire } from '@fortawesome/free-solid-svg-icons';
import { getPacks } from '@/lib/getPacks';

interface Pack {
    slug: string;
    titre: string;
    sousTitre: string;
    cible: string;
    inclus: string[];
    prix: string;
}

export default function PacksSection() {
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
                <h2 className="text-center lg:text-start text-2xl lg:text-4xl font-title tracking-widest text-terracotta mb-6">Trois façons d’incarner ce que tu portes</h2>
                <p className="mb-10 text-sm md:text-base text-center lg:text-start">
                    Essentiel pour se poser, Croissance pour se déployer, Signature pour s’aligner profondément. Ces trois propositions sont là pour accueillir ton projet avec
                    clarté et sens. Et si aucune ne te suffit, on co-crée la quatrième.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {packs.map((pack, index) => (
                        <PackCard
                            key={pack.slug}
                            title={pack.titre.replace('Pack ', '')}
                            subtitle={pack.sousTitre}
                            cible={pack.cible}
                            items={pack.inclus}
                            prix={pack.prix}
                            centralIcon={icons[index] || faLeaf}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
