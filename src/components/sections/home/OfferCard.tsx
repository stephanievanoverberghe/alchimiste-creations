'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

interface OfferCardProps {
    title: string;
    subtitle: string;
    items: string[];
    centralIcon: IconDefinition;
}

export default function OfferCard({ title, subtitle, items, centralIcon }: OfferCardProps) {
    return (
        <div className="rounded-[50px] h-full border-2 border-sauge text-center px-4 py-8 md:px-6 md:py-10 flex flex-col items-center gap-3 bg-background">
            {/* Titre */}
            <div className="text-center">
                <h3 className="text-base lg:text-xl tracking-widest text-terracotta font-bold">
                    Pack
                    <br />
                    <span className="uppercase font-bold tracking-wide md:tracking-widest">{title}</span>
                </h3>
            </div>

            {/* Symbole central */}
            <div className="flex items-center justify-center gap-3 w-full max-w-xs">
                <span className="h-[1px] flex-1 bg-sauge" />
                <FontAwesomeIcon icon={centralIcon} className="text-sauge text-xl shrink-0" />
                <span className="h-[1px] flex-1 bg-sauge" />
            </div>

            {/* Sous-titre */}
            <p className="uppercase tracking-wider text-xs md:text-sm lg:text-base">{subtitle}</p>

            {/* Liste */}
            <ul className="text-left flex flex-col gap-3 mt-2">
                {items.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                        <FontAwesomeIcon icon={faStarRegular} className="text-sauge mt-[2px] text-[10px] md:text-sm lg:text-base" />
                        <span className="text-xs md:text-sm lg:text-base">{item}</span>
                    </li>
                ))}
                <li className="flex gap-3 items-start italic">
                    <FontAwesomeIcon icon={faStarRegular} className="text-sauge mt-[2px] text-[10px] md:text-sm lg:text-base" />
                    <span className="text-xs md:text-sm lg:text-base">… et bien plus encore</span>
                </li>
            </ul>
        </div>
    );
}
