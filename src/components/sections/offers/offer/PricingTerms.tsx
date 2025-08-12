'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import packsRaw from '@/data/packs.json';
import { CreditCard, Receipt, ShieldCheck, Info, BadgeEuro } from 'lucide-react';

type PackSlug = 'essentiel' | 'croissance' | 'signature';

type Pack = {
    slug: PackSlug;
    prix: string;
    inclus: string[];
    exclusions?: string[];
    delaiNote?: string;
    versions?: {
        wordpress?: { prix?: string; delai?: string };
        react?: { prix?: string; delai?: string };
    };
    paiement?: {
        etapes?: { pourcentage: number; quand: string }[];
        echelonnable?: boolean;
        moyens?: string[];
        notes?: string;
    };
};

const PACKS = packsRaw as unknown as Pack[];

function getPack(slug: PackSlug): Pack | undefined {
    return PACKS.find((p) => p.slug === slug);
}

function findMaintenance(inclus: string[]): string | undefined {
    return inclus.find((s) => /support|maintenance/i.test(s));
}

export default function PricingTermsSection() {
    const pathname = usePathname();
    const match = pathname.match(/^\/offres\/(essentiel|croissance|signature)\/?$/);
    const key = (match?.[1] as PackSlug) ?? 'essentiel';

    const pack = getPack(key);
    if (!pack) return null;

    const wpPrice = pack.versions?.wordpress?.prix ?? pack.prix;
    const rnPrice = pack.versions?.react?.prix;
    const maintenance = findMaintenance(pack.inclus);

    const steps = pack.paiement?.etapes ?? [];
    const moyens = pack.paiement?.moyens ?? [];
    const notePaiement = pack.paiement?.notes;
    const echelonnable = !!pack.paiement?.echelonnable;

    return (
        <section id="pricing-terms" aria-labelledby="pricing-terms-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            {/* Liseré décoratif en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            {/* Fond or (mobile only) */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            {/* Vague décorative (md+) */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="" fill loading="lazy" className="h-auto object-cover" />
            </div>

            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <BadgeEuro className="h-3.5 w-3.5" aria-hidden />
                        Tarifs & modalités
                    </span>
                    <h2 id="pricing-terms-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Clair, pratico-pratique, sans surprise
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Paiement échelonné, ce qui est inclus / non inclus, et un petit rappel sur l’hébergement et la maintenance.
                    </p>

                    {/* Chips de prix (WP / React) */}
                    <div className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-start">
                        {wpPrice && (
                            <span className="inline-flex items-center gap-2 rounded-full border border-sauge/40 bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
                                WordPress : {wpPrice}
                            </span>
                        )}
                        {rnPrice && (
                            <span className="inline-flex items-center gap-2 rounded-full border border-sauge/40 bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
                                React / Next : {rnPrice}
                            </span>
                        )}
                    </div>
                </div>

                {/* Grid cartes */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Carte Paiement */}
                    <article className="group rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <CreditCard className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Modalités de paiement</h3>
                        </div>
                        {/* Séparateur animé */}
                        <div className="mt-3 relative h-[2px] overflow-hidden" aria-hidden>
                            <div className="absolute inset-0 bg-sauge/20" />
                            <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                        </div>

                        {/* Échelonnement */}
                        {steps.length > 0 && (
                            <ol className="mt-3 space-y-2">
                                {steps.map((s, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <span className="inline-flex items-center justify-center size-7 rounded-full border border-ormat/30 bg-ormat/10 text-[11px] font-semibold text-ormat">
                                            {s.pourcentage}%
                                        </span>
                                        <span className="text-sm text-foreground/85">{s.quand}</span>
                                    </li>
                                ))}
                            </ol>
                        )}

                        {/* Moyens & échelonnage */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {moyens.map((m, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-2 rounded-full border border-sauge/30 bg-foreground/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground/80"
                                >
                                    {m}
                                </span>
                            ))}
                            {echelonnable && (
                                <span className="inline-flex items-center gap-2 rounded-full border border-sauge/30 bg-foreground/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground/80">
                                    Échelonnage possible
                                </span>
                            )}
                        </div>

                        {notePaiement && <p className="mt-3 text-xs text-foreground/70">{notePaiement}</p>}
                    </article>

                    {/* Carte Maintenance / Accompagnement hébergement */}
                    <article className="group rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <ShieldCheck className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Maintenance & accompagnement</h3>
                        </div>
                        <div className="mt-3 relative h-[2px] overflow-hidden" aria-hidden>
                            <div className="absolute inset-0 bg-sauge/20" />
                            <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                        </div>

                        <ul className="mt-3 space-y-2">
                            {maintenance && <li className="text-sm text-foreground/85">{maintenance}</li>}
                            <li className="text-sm text-foreground/85">
                                Hébergement & nom de domaine : <strong>non inclus</strong>, mais je t’accompagne pour le choix et la configuration.
                            </li>
                        </ul>
                        <p className="mt-3 text-xs text-foreground/70">Les frais d’hébergement/domaine sont facturés par le prestataire choisi (OVH, o2switch, Infomaniak…).</p>
                    </article>

                    {/* Carte Non compris */}
                    <article className="group rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <Receipt className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Ce qui n’est pas compris</h3>
                        </div>
                        <div className="mt-3 relative h-[2px] overflow-hidden" aria-hidden>
                            <div className="absolute inset-0 bg-sauge/20" />
                            <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                        </div>

                        {pack.exclusions && pack.exclusions.length > 0 ? (
                            <ul className="mt-3 space-y-2 list-disc pl-5">
                                {pack.exclusions.map((e, i) => (
                                    <li key={i} className="text-sm text-foreground/85">
                                        {e}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mt-3 text-sm text-foreground/80">Pas d’exclusions spécifiques indiquées pour ce pack.</p>
                        )}

                        {pack.delaiNote && (
                            <p className="mt-3 text-xs text-foreground/70">
                                <Info className="inline-block w-3.5 h-3.5 -mt-0.5 mr-1" aria-hidden /> {pack.delaiNote}
                            </p>
                        )}
                    </article>
                </div>
            </div>
        </section>
    );
}
