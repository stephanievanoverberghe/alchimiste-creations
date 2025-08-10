// components/Offers/PackCard.tsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';

interface PackCardProps {
    slug: string;
    title: string;
    subtitle: string;
    items: string[];
    price: string;
    delay?: string;
    micro?: string;
    centralIcon: IconDefinition;
    cible?: string;
}

export default function PackCard({ slug, title, subtitle, items, price, delay, centralIcon, cible }: PackCardProps) {
    return (
        <Link
            href={`/offres/${slug}`}
            className="group h-auto flex flex-col justify-start bg-background border border-sauge/30 rounded-3xl p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40"
            aria-label={`Découvrir le pack ${title}`}
        >
            <article>
                {/* Titre */}
                <div className="text-center">
                    <h3 className="text-base lg:text-xl tracking-widest text-terracotta font-bold">
                        Pack
                        <br />
                        <span className="uppercase font-bold tracking-wide md:tracking-widest">{title}</span>
                    </h3>

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
                    {cible && <p className="mt-1 text-xs md:text-sm italic text-foreground/75">{cible}</p>}
                </div>

                {/* Inclus — étoiles */}
                <ul className="mt-6 text-left flex flex-col gap-3">
                    {items.map((item, idx) => (
                        <li key={idx} className="flex gap-3 items-start">
                            <FontAwesomeIcon icon={faStarRegular} className="text-sauge mt-1 text-xs md:text-sm" aria-hidden />
                            <span className="text-xs md:text-sm leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>

                {/* Bas : prix / délai / CTA visuel (pas un lien) */}
                <div className="mt-8">
                    <div className="mb-5 flex flex-col items-center gap-1">
                        <p className="text-xl font-semibold text-terracotta">{price}</p>
                        {delay && <p className="text-xs tracking-wider uppercase text-foreground/70">Délai : {delay}</p>}
                    </div>

                    <div className="flex justify-center">
                        <span
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-terracotta group-hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition group-hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                            aria-hidden="true"
                        >
                            Découvrir ce pack
                            <svg
                                className="w-4 h-4 -mr-0.5 -translate-x-1 transition-transform group-hover:translate-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
