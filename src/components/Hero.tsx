'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    Sparkles,
    IdCard,
    CalendarClock,
    ListChecks,
    Layers3,
    LayoutGrid,
    ShieldCheck,
    Code2,
    FileText,
    Leaf,
    TrendingUp,
    Gem,
    Palette,
    Search,
    PiggyBank,
    Clock as ClockIcon,
    BadgeCheck,
    ArrowRight,
} from 'lucide-react';

type HeroScanStyle = React.CSSProperties & {
    ['--scanW']?: string;
    ['--scanDur']?: string;
};

type PackSlug = 'essentiel' | 'croissance' | 'signature';
type CTA = { label: string; href: string };
type PageContent = { title: string; paragraph: string; cta?: CTA[]; bg?: string };

// — Styles boutons
const btnBase =
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold tracking-widest uppercase transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30';
const btnPrimary = `${btnBase} bg-terracotta hover:bg-terracotta/90 text-background border-b-2 border-r-2 border-ormat shadow-[0px_2px_6px_rgba(164,75,52,0.25)]`;
const btnSecondaryOnDark = `${btnBase} border border-white/40 bg-background/95 text-foreground hover:bg-white`;

function IconForLabel(label: string) {
    const l = label.toLowerCase();
    if (/appel|contact|devis/.test(l)) return CalendarClock;
    if (/offres|packs|comparer/.test(l)) return Layers3;
    if (/projets|portfolio/.test(l)) return LayoutGrid;
    if (/méthode|methode|process/.test(l)) return ListChecks;
    if (/propos|approche/.test(l)) return IdCard;
    return ArrowRight;
}

export default function Hero() {
    const pathname = usePathname();

    const textMap: Record<string, PageContent> = {
        '/': {
            title: 'Développeuse web freelance à Lille — sites WordPress & React',
            paragraph:
                'Création de site vitrine, portfolio et e-commerce léger. Design sensible, code propre, base SEO et performance. J’accompagne artistes, thérapeutes et indépendants — à Lille et à distance.',
            cta: [
                { label: 'Découvrir mes offres', href: '/offres' },
                { label: 'Me contacter', href: '/contact' },
            ],
            bg: '/hero/hero-accueil.png',
        },
        '/a-propos': {
            title: 'À propos — développeuse web WordPress & React à Lille',
            paragraph: 'Une approche humaine et structurée pour transformer ton univers en site clair et durable, sans jargon et avec une vraie exigence technique.',
            cta: [{ label: 'Découvrir mes offres', href: '/offres' }],
            bg: '/hero/hero-apropos.png',
        },
        '/contact': {
            title: 'Contact — devis site internet et appel découverte gratuit',
            paragraph: 'Partage ton besoin, ton budget et ton délai. Je te propose la formule la plus adaptée (WordPress ou React) et un devis sous 24–48h.',
            cta: [{ label: 'Réserver un appel', href: '/contact' }],
            bg: '/hero/hero-contact.png',
        },
        '/methode': {
            title: 'Méthode — de l’audit éditorial au SEO technique',
            paragraph: 'Cadrage, wireframes, design, intégration, tests mobiles, accessibilité et optimisation des perfs : un process clair et jalonné pour un site qui dure.',
            cta: [{ label: 'Voir les packs', href: '/offres' }],
            bg: '/hero/hero-methode.png',
        },
        '/offres': {
            title: 'Création de site internet — packs WordPress & React',
            paragraph: 'Essentiel, Croissance, Signature : trois niveaux pour lancer ou refondre ton site. Responsive, base SEO et accompagnement humain à chaque étape.',
            cta: [{ label: 'Demander un devis', href: '/contact' }],
            bg: '/hero/hero-packs.png',
        },
        '/projets': {
            title: 'Portfolio — réalisations WordPress & React',
            paragraph: 'Vitrines, portfolios et boutiques légères pensés pour convertir sans pression : design qui respire, fondations techniques solides.',
            cta: [{ label: 'Demander un devis', href: '/contact' }],
            bg: '/hero/hero-projets.png',
        },
    };

    const packMatch = pathname.match(/^\/offres\/(essentiel|croissance|signature)\/?$/);
    const slug = (packMatch?.[1] ?? '') as PackSlug | '';
    const packMap: Record<PackSlug, PageContent & { badge: string }> = {
        essentiel: {
            title: 'Pack Essentiel — site vitrine one-page ou mini-site',
            paragraph: 'Démarre vite avec une vitrine claire et efficace. Parcours simple, base SEO, design soigné et délai court.',
            cta: [{ label: 'Demander un devis', href: '/contact?pack=essentiel' }],
            bg: '/hero/hero-essentiel.png',
            badge: 'Lancement rapide',
        },
        croissance: {
            title: 'Pack Croissance — site vitrine complet et évolutif',
            paragraph: 'Navigation structurée, pages clés, options blog/RDV/multilingue et SEO de base. Idéal pour développer ta visibilité.',
            cta: [{ label: 'Demander un devis', href: '/contact?pack=croissance' }],
            bg: '/hero/hero-croissance.png',
            badge: 'Évolutif • conversion douce',
        },
        signature: {
            title: 'Pack Signature — site sur-mesure premium',
            paragraph: 'Identité renforcée, micro-interactions, performance et accessibilité avancées. Un site remarquable et durable.',
            cta: [{ label: 'Demander un devis', href: '/contact?pack=signature' }],
            bg: '/hero/hero-signature.png',
            badge: 'Sur-mesure',
        },
    };

    const packContent = slug ? packMap[slug] : undefined;
    const { title, paragraph, cta, bg } = packContent ?? textMap[pathname] ?? textMap['/'];

    type Badge = { label: string; Icon: React.ComponentType<{ className?: string }> };
    const badgeForPath = (path: string, slug?: PackSlug): Badge => {
        if (slug === 'essentiel') return { label: packMap.essentiel.badge, Icon: Leaf };
        if (slug === 'croissance') return { label: packMap.croissance.badge, Icon: TrendingUp };
        if (slug === 'signature') return { label: packMap.signature.badge, Icon: Gem };
        switch (path) {
            case '/':
                return { label: 'Développement web sur-mesure', Icon: Sparkles };
            case '/a-propos':
                return { label: 'Approche humaine & précise', Icon: IdCard };
            case '/methode':
                return { label: 'Process clair et jalonné', Icon: ListChecks };
            case '/offres':
                return { label: 'Packs WordPress & React', Icon: Layers3 };
            case '/projets':
                return { label: 'Réalisations récentes', Icon: LayoutGrid };
            case '/contact':
                return { label: 'Réponse sous 24–48h', Icon: CalendarClock };
            default:
                return { label: 'Alchimiste Créations', Icon: Sparkles };
        }
    };
    const { label: badgeLabel, Icon: BadgeIcon } = badgeForPath(pathname, slug || undefined);

    // chips (optionnel – inchangé)
    const chips: { label: string; Icon: React.ComponentType<{ className?: string }>; tone: 'sauge' | 'terracotta' | 'ormat' }[] =
        slug === 'essentiel'
            ? [
                  { label: 'One-page / mini-site', Icon: FileText, tone: 'sauge' },
                  { label: 'Délai court', Icon: ClockIcon, tone: 'terracotta' },
                  { label: 'Budget maîtrisé', Icon: PiggyBank, tone: 'ormat' },
              ]
            : slug === 'croissance'
            ? [
                  { label: 'Vitrine complète', Icon: Layers3, tone: 'sauge' },
                  { label: 'Évolutif', Icon: TrendingUp, tone: 'terracotta' },
                  { label: 'Conversion douce', Icon: BadgeCheck, tone: 'ormat' },
              ]
            : slug === 'signature'
            ? [
                  { label: 'Sur-mesure', Icon: Sparkles, tone: 'sauge' },
                  { label: 'Identité renforcée', Icon: Palette, tone: 'terracotta' },
                  { label: 'SEO optimisé', Icon: Search, tone: 'ormat' },
              ]
            : [
                  { label: 'React', Icon: Code2, tone: 'sauge' },
                  { label: 'WordPress', Icon: FileText, tone: 'terracotta' },
                  { label: 'Clair • durable', Icon: ShieldCheck, tone: 'ormat' },
              ];

    const toneCls = {
        sauge: 'border-sauge/30 bg-sauge/10 text-sauge',
        terracotta: 'border-terracotta/30 bg-terracotta/10 text-terracotta',
        ormat: 'border-ormat/30 bg-ormat/10 text-ormat',
    } as const;

    return (
        <section className="relative flex items-center pt-28 md:pt-44 pb-28 lg:pt-56 lg:pb-36 px-6 md:px-8 lg:px-[100px] xl:px-[150px] overflow-hidden">
            {bg && (
                <div className="absolute inset-0 -z-10">
                    <Image src={bg} alt="" fill priority className="object-cover object-center" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
            )}

            <div className="max-w-5xl text-center lg:text-left">
                {/* Badge haut cohérent + icône */}
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-background bg-terracotta/20 border border-terracotta/40 rounded-full px-4 py-1">
                    <BadgeIcon className="w-3.5 h-3.5" aria-hidden />
                    {badgeLabel}
                </span>

                <h1 className="mt-4 font-title text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-tight tracking-wide">{title}</h1>

                {/* Séparateur animé */}
                <div className="mt-4 relative h-[2px] overflow-hidden">
                    <div className="absolute inset-0 bg-white/20" aria-hidden />
                    <span
                        className="hero-scan absolute top-0 h-full bg-gradient-to-r from-sauge via-terracotta to-sauge"
                        style={{ '--scanW': '40%', '--scanDur': '2.8s' } as HeroScanStyle}
                        aria-hidden
                    />
                </div>

                <style jsx>{`
                    @keyframes hero-scan-to-end {
                        0% {
                            left: calc(-1 * var(--scanW, 40%));
                        }
                        100% {
                            left: 100%;
                        }
                    }
                    .hero-scan {
                        width: var(--scanW, 40%);
                        left: calc(-1 * var(--scanW, 40%));
                        animation: hero-scan-to-end var(--scanDur, 2.8s) linear infinite;
                        will-change: left;
                    }
                    @media (prefers-reduced-motion: reduce) {
                        .hero-scan {
                            animation: none;
                            left: 0;
                            width: 100%;
                        }
                    }
                `}</style>

                {/* chips contextuels */}
                <ul className="mt-5 flex flex-wrap items-center gap-2.5 justify-center lg:justify-start">
                    {chips.map(({ label, Icon, tone }) => (
                        <li key={label}>
                            <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] ${toneCls[tone]}`}>
                                <Icon className="w-3.5 h-3.5" aria-hidden />
                                {label}
                            </span>
                        </li>
                    ))}
                </ul>

                <p className="mt-5 text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">{paragraph}</p>

                {/* CTA */}
                {cta && (
                    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        {cta.map((button, i) => {
                            const Icon = IconForLabel(button.label);
                            const cls = i === 0 ? btnPrimary : btnSecondaryOnDark;
                            return (
                                <Link key={button.href} href={button.href} className={cls}>
                                    <Icon className="w-4 h-4" aria-hidden />
                                    {button.label}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
