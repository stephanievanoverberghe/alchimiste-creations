'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface OfferCardProps {
    title: string;
    subtitle: string;
    cible: string;
    items: string[];
    prix: string;
    centralIcon: IconDefinition;
}

export default function PackCard({ title, subtitle, cible, items, prix, centralIcon }: OfferCardProps) {
    return (
        <div className="rounded-[50px] h-full border-2 border-sauge text-center px-4 py-8 md:px-6 md:py-10 flex flex-col items-center gap-3 bg-background">
            {/* Contenu principal */}
            <div className="flex flex-col gap-5 flex-grow">
                {/* Titre */}
                <h3 className="text-center text-base lg:text-xl tracking-widest text-terracotta font-bold">
                    Pack
                    <br />
                    <span className="uppercase font-bold tracking-wide md:tracking-widest">{title}</span>
                </h3>

                {/* Symbole central */}
                <div className="flex items-center justify-center gap-3 w-full max-w-xs mx-auto">
                    <span className="h-[1px] flex-1 bg-sauge" />
                    <FontAwesomeIcon icon={centralIcon} className="text-sauge text-xl shrink-0" />
                    <span className="h-[1px] flex-1 bg-sauge" />
                </div>

                {/* Sous-titre */}
                <p className="uppercase tracking-wider text-xs md:text-sm lg:text-base text-center">{subtitle}</p>

                {/* Cible */}
                <p className="text-xs md:text-sm italic text-center">{cible}</p>

                {/* Liste complète */}
                <div className="text-left">
                    <p className="font-bold mb-2">Inclus :</p>
                    <ul className="flex flex-col gap-2">
                        {items.map((item, idx) => (
                            <li key={idx} className="flex gap-3 items-start">
                                <FontAwesomeIcon icon={faStarRegular} className="text-sauge mt-[2px] text-xs md:text-sm" />
                                <span className="text-xs md:text-sm">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Prix + bouton toujours en bas */}
            <div className="mt-auto pt-6 flex flex-col items-center gap-2">
                <p className="text-sm font-semibold text-terracotta pb-6">{prix}</p>
                <Link
                    href="/contact"
                    className={cn(
                        'inline-block px-6 py-3 text-center rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                    )}
                >
                    Commencer avec ce pack
                </Link>
            </div>
        </div>
    );
}
