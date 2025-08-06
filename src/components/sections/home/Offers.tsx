'use client';

import { useEffect, useState } from 'react';
import OfferCard from './OfferCard';
import { faLeaf, faTint, faFire } from '@fortawesome/free-solid-svg-icons';
import { getPacks } from '@/lib/getPacks';
import Link from 'next/link';
import Button from '@/components/ui/Button';

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
                <h2 className="text-center lg:text-start text-xl md:text-2xl lg:text-4xl font-semibold tracking-widest text-terracotta mb-5 md:mb-10">Mes accompagnements</h2>
                <p className="mb-5 md:mb-10 text-sm md:text-base text-center lg:text-start">
                    Chaque projet est une rencontre. J’écoute, je ressens, je co-crée avec vous un site qui vous ressemble.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-5 md:mb-10">
                    {packs.map((pack, index) => (
                        <OfferCard key={pack.slug} title={pack.titre.replace('Pack ', '')} subtitle={pack.sousTitre} centralIcon={icons[index] || faLeaf} items={pack.inclus} />
                    ))}
                </div>

                <div className="text-center">
                    <Link href="/offres">
                        <Button>Découvrir les offres</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
