'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';

interface OfferCardProps {
    slug: string;
    title: string;
    subtitle: string;
    items: string[];
    price: string;
    centralIcon: IconDefinition;
}

export default function OfferCard({ slug, title, subtitle, items, price, centralIcon }: OfferCardProps) {
    return (
        <Link
            href={`/offres/${slug}`}
            className="group flex flex-col justify-between bg-background border border-sauge/30 rounded-3xl p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-2"
        >
            {/* En-tête */}
            <div className="text-center">
                {/* Badge prix */}
                <span
                    className="inline-flex items-center gap-2 mb-3 text-[11px] tracking-[0.15em] uppercase 
                 text-terracotta font-semibold
                 bg-sauge/10 border border-sauge/30 
                 rounded-md px-3 py-1 shadow-sm"
                >
                    {price}
                </span>

                {/* Titre */}
                <div className="text-center">
                    <h3 className="text-base lg:text-xl tracking-widest text-terracotta font-bold">
                        Pack
                        <br />
                        <span className="uppercase font-bold tracking-wide md:tracking-widest">{title}</span>
                    </h3>
                </div>

                {/* Séparateur + icône */}
                <div className="flex items-center justify-center gap-3 w-full max-w-xs mx-auto mt-4 mb-3 group">
                    <span className="h-[1px] flex-1 bg-sauge transition-colors duration-300 group-hover:bg-ormat" />
                    <FontAwesomeIcon
                        icon={centralIcon}
                        className="text-sauge text-xl shrink-0 transition-all duration-300 group-hover:scale-150 group-hover:text-ormat"
                        aria-hidden
                    />
                    <span className="h-[1px] flex-1 bg-sauge transition-colors duration-300 group-hover:bg-ormat" />
                </div>

                <p className="uppercase tracking-wider text-xs md:text-sm text-foreground/80">{subtitle}</p>
            </div>

            {/* Liste des inclus */}
            <ul className="mt-6 text-left flex flex-col gap-3">
                {items.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                        <FontAwesomeIcon icon={faStarRegular} className="text-sauge mt-1 text-xs md:text-sm" aria-hidden />
                        <span className="text-xs md:text-sm leading-relaxed">{item}</span>
                    </li>
                ))}
                <li className="flex gap-3 items-start italic">
                    <FontAwesomeIcon icon={faStarRegular} className="text-sauge mt-1 text-xs md:text-sm" aria-hidden />
                    <span className="text-xs md:text-sm">… et des ajustements selon ton univers</span>
                </li>
            </ul>

            {/* Micro‑CTA */}
            <div className="mt-6 text-center">
                <span
                    className="inline-flex items-center gap-1 text-[11px] tracking-[0.15em] uppercase 
                 text-sauge font-semibold
                 bg-background border border-sauge/30 rounded-md px-3 py-1 
                 transition-colors group-hover:bg-sauge/10"
                >
                    Voir le détail
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </span>
            </div>
        </Link>
    );
}
