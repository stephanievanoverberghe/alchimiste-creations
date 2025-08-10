// components/offers/IdealFit.tsx
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import packsRaw from '@/data/packs.json';
import { Check } from 'lucide-react';

type PackSlug = 'essentiel' | 'croissance' | 'signature';

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
                    <div role="tablist" aria-label="Choisir un pack" className="inline-flex items-center rounded-full border border-sauge/40 bg-background p-1 shadow-sm">
                        {(['essentiel', 'croissance', 'signature'] as PackSlug[]).map((s) => (
                            <button
                                key={s}
                                role="tab"
                                aria-selected={key === s}
                                onClick={() => onPackChange(s)}
                                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition cursor-pointer ${
                                    key === s ? 'bg-sauge/15 text-foreground' : 'text-foreground/70 hover:text-foreground'
                                }`}
                            >
                                {s === 'essentiel' ? 'Essentiel' : s === 'croissance' ? 'Croissance' : 'Signature'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        Idéal si…
                    </span>
                    <h2 id="ideal-fit-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        {fit.title}
                    </h2>
                    {fit.subtitle && <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">{fit.subtitle}</p>}
                </div>

                {/* Puces */}
                <ul className="grid gap-3 md:gap-4">
                    {fit.items.slice(0, 5).map((txt, i) => (
                        <li key={i} className="flex items-start gap-3 rounded-xl border border-sauge/30 bg-background px-4 py-3 shadow-sm">
                            <Check aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-terracotta" strokeWidth={2.5} />
                            <span className="text-sm md:text-base leading-relaxed text-foreground/90" dangerouslySetInnerHTML={{ __html: txt }} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
