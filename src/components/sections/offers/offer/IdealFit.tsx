// components/offers/IdealFit.tsx
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import packsRaw from '@/data/packs.json';
import { ListChecks, BadgeCheck, CalendarClock } from 'lucide-react';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faTint, faFire } from '@fortawesome/free-solid-svg-icons';

type PackSlug = 'essentiel' | 'croissance' | 'signature';

const PACK_FA_ICONS: Record<PackSlug, IconDefinition> = {
    essentiel: faLeaf,
    croissance: faTint,
    signature: faFire,
};

type Pack = {
    slug: PackSlug;
    titre: string;
    sousTitre: string;
    cible?: string;
    inclus: string[];
    prix: string;
    technoChoix?: boolean;
    versions?: {
        wordpress?: { prix?: string; delai?: string };
        react?: { prix?: string; delai?: string };
    };
    options?: { label: string; prix: string | { wordpress?: string; react?: string } }[];
    exclusions?: string[];
    delaiNote?: string;
};

type Fit = { title: string; subtitle?: string; items: string[] };

const PACKS = packsRaw as unknown as Pack[];

function getPack(slug: PackSlug): Pack | undefined {
    return PACKS.find((p) => p.slug === slug);
}

/** Construit les 3–5 puces "idéal si..." à partir du JSON (avec <strong>) */
function buildFit(pack: Pack): Fit {
    const wpDelay = pack.versions?.wordpress?.delai;
    const reactDelay = pack.versions?.react?.delai;
    const blogOption = pack.options?.some((o) => o.label.toLowerCase().includes('blog'));
    const booking = pack.options?.some((o) => o.label.toLowerCase().includes('réservation'));
    const multi = pack.options?.some((o) => o.label.toLowerCase().includes('multilingue'));
    const seoAdv = pack.options?.some((o) => o.label.toLowerCase().includes('seo avancé'));
    const ecommerce = pack.options?.some((o) => /e-?commerce|woocommerce/i.test(o.label));
    const pagesItem = pack.inclus.find((s) => /\bpages?\b/i.test(s));
    const cleanedPages = pagesItem
        ? pagesItem
              .replace(/^\s*[-•]\s*/, '')
              .replace(/\(.*?\)/g, '')
              .trim()
        : undefined;
    const hasOnePage = !!pack.inclus.find((s) => /one-page|une page/i.test(s));

    if (pack.slug === 'essentiel') {
        return {
            title: 'Pour qui c’est fait — quand choisir Essentiel',
            subtitle: pack.cible,
            items: [
                hasOnePage ? 'Tu veux une présence simple et claire en <strong>one-page</strong>.' : 'Tu veux une présence simple et claire.',
                `Tes contenus sont (presque) prêts et tu vises un <strong>délai court</strong> (${wpDelay ?? 'WP : 2–3 sem.'}${
                    reactDelay ? ` / ${reactDelay.replace(' à ', '–')} en React` : ''
                }).`,
                'Tu as besoin d’un <strong>formulaire de contact simple</strong>, pas d’e-commerce.',
                'Tu veux un <strong>socle propre</strong> : responsive, SEO de base, mini-guide.',
                'Budget <strong>maîtrisé</strong> pour démarrer sereinement.',
            ],
        };
    }

    if (pack.slug === 'croissance') {
        return {
            title: 'Pour qui c’est fait — quand choisir Croissance',
            subtitle: pack.cible,
            items: [
                cleanedPages ? `Tu as <strong>${cleanedPages}</strong> à structurer.` : 'Tu as plusieurs pages à structurer (vitrine complète).',
                'Tu veux une <strong>navigation claire</strong> + <strong>design personnalisé</strong> avec animations légères.',
                'Tu veux <strong>convertir</strong> (formulaire, preuve sociale) et de meilleures bases <strong>SEO</strong>.',
                blogOption || booking || multi || seoAdv
                    ? 'Tu prévois des <strong>évolutions</strong> (blog, réservation, multilingue, SEO avancé…).'
                    : 'Tu veux une base <strong>évolutive</strong> pour ajouter des modules plus tard.',
                'Tu apprécies un <strong>accompagnement</strong> (guide et support 30 jours).',
            ],
        };
    }

    // Signature
    return {
        title: 'Pour qui c’est fait — quand choisir Signature',
        subtitle: pack.cible,
        items: [
            'Tu veux un <strong>site sur-mesure</strong>, soigné, aligné à ta vision.',
            'Tu veux une <strong>identité renforcée</strong> (charte web + <strong>logo essentiel</strong> inclus).',
            'Tu as <strong>6 à 9 pages</strong> et un <strong>blog inclus</strong> à mettre en musique.',
            'Tu attends des <strong>micro-animations</strong>, de la <strong>perf</strong>, de l’<strong>accessibilité</strong> et un <strong>SEO optimisé</strong>.',
            ecommerce
                ? 'Tu envisages des besoins avancés (multilingue, réservations, copywriting… et e-commerce <strong>WooCommerce</strong> côté WordPress).'
                : 'Tu envisages des besoins avancés (multilingue, réservations, copywriting…).',
        ],
    };
}

export default function IdealFitSection({ slug }: { slug?: PackSlug }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const match = pathname.match(/^\/offres\/(essentiel|croissance|signature)\/?$/);
    const derived = (match?.[1] as PackSlug | undefined) ?? undefined;
    const key = slug ?? derived ?? 'essentiel';

    // action du switch : navigue vers le bon slug en préservant les query params (ex. ?tech=react)
    const onPackChange = (next: PackSlug) => {
        if (next === key) return;
        const qs = new URLSearchParams(searchParams.toString());
        router.replace(`/offres/${next}?${qs.toString()}`, { scroll: false });
    };

    const pack = getPack(key);
    if (!pack) return null;

    const fit = buildFit(pack);

    return (
        <section id="ideal-fit" aria-labelledby="ideal-fit-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            {/* Liseré décoratif en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            {/* Fond or mobile only */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            {/* Vague décorative (md+) */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="" fill priority className="h-auto object-cover" />
            </div>

            <div className="relative max-w-5xl mx-auto space-y-8 md:space-y-10">
                {/* Bouton retour */}
                <Link href="/offres" className="inline-block mb-6 text-sm text-sauge hover:underline">
                    ← Retour aux offres
                </Link>

                {/* Switch packs (en-tête de section) */}
                <div className="flex justify-center lg:justify-start">
                    <div
                        role="tablist"
                        aria-label="Choisir un pack"
                        className="inline-grid grid-cols-3 sm:inline-flex rounded-2xl border border-sauge/30 bg-background p-1 w-full sm:w-auto"
                    >
                        {(['essentiel', 'croissance', 'signature'] as PackSlug[]).map((p) => {
                            const active = key === p;
                            const label = p === 'essentiel' ? 'Essentiel' : p === 'croissance' ? 'Croissance' : 'Signature';
                            return (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => onPackChange(p)}
                                    aria-pressed={active}
                                    aria-current={active ? 'true' : undefined}
                                    aria-label={label}
                                    title={label}
                                    className={`inline-flex items-center justify-center gap-2 w-full px-2 py-2 sm:px-3 sm:py-2 rounded-xl
                    text-xs tracking-[0.14em] uppercase font-semibold transition transform
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/40 focus-visible:ring-offset-2
                    ${active ? 'bg-terracotta text-background shadow-sm' : 'cursor-pointer text-terracotta hover:bg-terracotta/10 hover:-translate-y-[1px] hover:shadow-sm'}`}
                                >
                                    <FontAwesomeIcon icon={PACK_FA_ICONS[p]} className="text-[18px] sm:text-[14px]" aria-hidden />
                                    <span className="hidden sm:inline">{label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <ListChecks className="w-3.5 h-3.5" aria-hidden />
                        Idéal si…
                    </span>
                    <h2 id="ideal-fit-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        {fit.title}
                    </h2>
                    {fit.subtitle && <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">{fit.subtitle}</p>}
                </div>

                {/* Carte "fit" avec motif discret + puces */}
                <div className="group relative overflow-hidden rounded-[22px] border border-sauge/30 bg-background/70 p-5 md:p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    {/* motif discret */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                        aria-hidden
                    />

                    {/* chips header */}
                    <div className="relative z-[1] mb-4 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-2 rounded-xl border border-sauge/30 bg-sauge/10 text-sauge px-3 py-1.5 text-sm">
                            <FontAwesomeIcon icon={PACK_FA_ICONS[key]} className="text-[14px]" aria-hidden />
                            {pack.titre.replace(/^Pack\s+/i, '')}
                        </span>
                        {pack.delaiNote && (
                            <span className="inline-flex items-center gap-2 rounded-xl border border-ormat/30 bg-ormat/10 text-ormat px-3 py-1.5 text-xs">{pack.delaiNote}</span>
                        )}
                    </div>

                    {/* Liste des points */}
                    <ul className="relative z-[1] grid gap-3 md:gap-3">
                        {fit.items.slice(0, 5).map((txt, i) => (
                            <li key={i} className="flex items-start gap-3 rounded-xl border border-sauge/30 bg-background/70 px-4 py-3">
                                <BadgeCheck aria-hidden="true" className="mt-0.5 h-4 w-4 flex-none text-sauge" />
                                <span className="text-sm md:text-base leading-relaxed text-foreground/90" dangerouslySetInnerHTML={{ __html: txt }} />
                            </li>
                        ))}
                    </ul>

                    {/* CTA doux */}
                    <div className="relative z-[1] mt-5 flex justify-center lg:justify-start">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl
                bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase
                border-b-2 border-r-2 border-ormat transition hover:scale-105
                shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                        >
                            <CalendarClock className="w-4 h-4" aria-hidden />
                            Discuter de ton contexte
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
