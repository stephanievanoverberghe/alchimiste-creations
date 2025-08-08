import { notFound } from 'next/navigation';
import { getPacks } from '@/lib/getPacks';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faLeaf, faTint, faFire } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface Pack {
    slug: string;
    titre: string;
    sousTitre: string;
    cible: string;
    inclus: string[];
    prix: string;
    technoChoix?: boolean;
    versions?: Record<string, { prix: string; delai: string }>;
    options?: { label: string; prix: string | { wordpress: string; react: string } }[];
    allersRetours?: string;
    delaiNote?: string;
    exclusions?: string[];
}

const iconMap: Record<string, IconDefinition> = {
    essentiel: faLeaf,
    croissance: faTint,
    signature: faFire,
};

interface PackPageProps {
    params: Promise<{ slug: string }>;
}

export default async function PackPage({ params }: PackPageProps) {
    const { slug } = await params;

    const packs = await getPacks();
    const pack = packs.find((p) => p.slug === slug);

    if (!pack) return notFound();

    return (
        <section className="py-10 md:py-20 px-6 md:px-12 lg:px-[100px] xl:px-[150px] max-w-5xl mx-auto">
            {/* Bouton retour */}
            <Link href="/offres" className="inline-block mb-8 text-sm text-sauge hover:underline">
                ← Retour aux packs
            </Link>

            {/* Icône + Titre */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start mb-6">
                {iconMap[pack.slug] && <FontAwesomeIcon icon={iconMap[pack.slug]} className="text-terracotta text-4xl mb-4 lg:mr-3" />}
                <h1 className="text-center lg:text-start text-2xl lg:text-4xl font-title font-bold tracking-widest text-terracotta">{pack.titre}</h1>
            </div>

            {/* Sous-titre + cible */}
            <p className="uppercase tracking-wider text-center lg:text-start text-sm md:text-base mb-4">{pack.sousTitre}</p>
            <p className="italic mb-10 text-sm md:text-base text-center lg:text-start">{pack.cible}</p>

            {/* Inclus */}
            <h2 className="text-base lg:text-xl font-bold tracking-wide md:tracking-widest">Inclus :</h2>
            <ul className="list-disc space-y-2 mb-8 text-sm md:text-base mt-3">
                {pack.inclus.map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                        <FontAwesomeIcon icon={faStarRegular} className="text-sauge mt-[2px] text-xs md:text-sm" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>

            {/* Versions */}
            {pack.technoChoix && pack.versions && (
                <div className="mb-8">
                    <h2 className="text-base lg:text-xl font-bold tracking-wide md:tracking-widest mb-3">Versions disponibles :</h2>
                    <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                        {Object.entries(pack.versions).map(([tech, info]) => (
                            <div key={tech} className="border border-sauge rounded-xl p-4">
                                <h3 className="first-letter:uppercase font-semibold mb-1">{tech}</h3>
                                <p className="text-terracotta font-bold">{info.prix}</p>
                                <p className="text-sm text-foreground/70">Délai : {info.delai}</p>
                            </div>
                        ))}
                    </div>
                    {pack.delaiNote && <p className="mt-4 text-sm italic">{pack.delaiNote}</p>}
                </div>
            )}

            {/* Options */}
            {pack.options && (
                <div className="mb-8">
                    <h2 className="text-base lg:text-xl font-bold tracking-wide md:tracking-widest mb-3">Options :</h2>
                    <ul className="space-y-3">
                        {pack.options.map((opt, idx) => (
                            <li key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-sauge/30 pb-2">
                                <span className="text-sm mb-1">{opt.label}</span>
                                {typeof opt.prix === 'string' ? (
                                    <span className="font-medium">{opt.prix}</span>
                                ) : (
                                    <div className="flex gap-6 text-sm justify-between">
                                        <span>WP : {opt.prix.wordpress}</span>
                                        <span>React : {opt.prix.react}</span>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Infos pratiques */}
            <div className="space-y-2">
                {pack.allersRetours && (
                    <p className="text-sm mb-5 md:text-base">
                        <strong>Allers-retours : </strong>
                        {pack.allersRetours}
                    </p>
                )}
                {pack.exclusions && (
                    <p className="text-sm italic md:text-base">
                        <strong>Exclusions : </strong>
                        {pack.exclusions.join(', ')}
                    </p>
                )}
            </div>

            {/* Prix */}
            <p className="text-terracotta font-semibold mt-8 text-center">{pack.prix}</p>

            {/* CTA */}
            <div className="mt-8 flex justify-center">
                <Link
                    href="/contact"
                    className={cn(
                        'inline-block px-6 py-3 text-center rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105'
                    )}
                >
                    Me contacter pour un devis
                </Link>
            </div>
        </section>
    );
}

export async function generateStaticParams() {
    const packs: Pack[] = await getPacks();
    return packs.map((p) => ({ slug: p.slug }));
}
