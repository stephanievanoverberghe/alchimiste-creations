'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

type PackSlug = 'essentiel' | 'croissance' | 'signature';

export default function Hero() {
    const pathname = usePathname();

    // 1) Pages "statiques"
    const textMap: Record<string, { title: string; paragraph: string; cta?: { label: string; href: string }[]; bg?: string }> = {
        '/': {
            title: 'Développeuse web — sites WordPress & React/Next.js',
            paragraph:
                'Je crée des sites vitrine, portfolios et petites boutiques e-commerce qui te ressemblent : design sensible, code propre, SEO de base et performance. Pour artistes, thérapeutes et indépendants — à Lille et à distance.',
            cta: [
                { label: 'Découvrir mes offres', href: '/offres' },
                { label: 'Me contacter', href: '/contact' },
            ],
            bg: '/hero/hero-accueil.png',
        },
        '/a-propos': {
            title: 'Stéphanie — développeuse web à Lille (WordPress & React/Next.js)',
            paragraph: 'Je crée des sites vivants, durables et alignés à ton univers, avec une approche humaine et claire.',
            cta: [{ label: 'Découvrir mes offres', href: '/offres' }],
            bg: '/hero/hero-apropos.png',
        },
        '/contact': {
            title: 'Contact — parlons de ton site web (appel découverte gratuit)',
            paragraph: 'Écris-moi pour un appel découverte gratuit : on clarifie besoin, budget et délais, puis on choisit la meilleure formule.',
            bg: '/hero/hero-contact.png',
        },
        '/methode': {
            title: 'Méthode de création — de l’écoute à la mise en ligne',
            paragraph: 'De l’intention à la mise en ligne : cadrage, design, dev, tests mobile, accessibilité et performance pour un site qui dure.',
            bg: '/hero/hero-methode.png',
        },
        '/offres': {
            title: 'Création de site internet — Packs WordPress & sur-mesure React',
            paragraph: 'Trois packs — Essentiel, Croissance, Signature. Responsive, SEO de base et accompagnement humain pour lancer ou faire évoluer ton site.',
            cta: [{ label: 'Demander un devis', href: '/contact' }],
            bg: '/hero/hero-packs.png',
        },
        '/projets': {
            title: 'Portfolio — sites WordPress & React pour artistes, thérapeutes et indépendants',
            paragraph: 'Vitrine, portfolio, e-commerce léger, prise de RDV : des sites sur-mesure WordPress & React pensés pour convertir en douceur.',
            bg: '/hero/hero-projets.png',
        },
    };

    // 2) Pages dynamiques /offres/[slug]
    const packMatch = pathname.match(/^\/offres\/(essentiel|croissance|signature)\/?$/);
    const slug = (packMatch?.[1] ?? '') as PackSlug | '';

    const packMap: Record<
        PackSlug,
        {
            title: string;
            paragraph: string;
            cta: { label: string; href: string }[];
            bg: string;
            badge: string; // nouveau
        }
    > = {
        essentiel: {
            title: 'Pack Essentiel',
            paragraph: "Pour lancer une vitrine claire et efficace — l'essentiel, bien fait.",
            cta: [{ label: 'Demander un devis', href: '/contact?pack=essentiel' }],
            bg: '/hero/hero-essentiel.png',
            badge: 'Lancement rapide',
        },
        croissance: {
            title: 'Pack Croissance',
            paragraph: 'Pour une vitrine complète, évolutive, pensée conversion & SEO de base.',
            cta: [{ label: 'Demander un devis', href: '/contact?pack=croissance' }],
            bg: '/hero/hero-croissance.png',
            badge: 'Évolutif · orienté conversion',
        },
        signature: {
            title: 'Pack Signature',
            paragraph: 'Pour un site hautement personnalisé, sur-mesure et remarquable.',
            cta: [{ label: 'Demander un devis', href: '/contact?pack=signature' }],
            bg: '/hero/hero-signature.png',
            badge: 'Haute personnalisation',
        },
    };

    // Sélection du contenu : dynamique (pack) > statique > fallback home
    const packContent = slug ? packMap[slug] : undefined;
    const { title, paragraph, cta, bg } = packContent ?? textMap[pathname] ?? textMap['/'];

    // Badge dynamique (utilise le micro-tag du pack)
    const badgeLabel = slug ? packContent!.badge : pathname === '/' ? 'Développement web sur-mesure' : 'Alchimiste Créations';

    return (
        <section className="relative flex items-center pt-44 pb-28 lg:pt-56 lg:pb-36 px-6 md:px-8 lg:px-[100px] xl:px-[150px] overflow-hidden">
            {/* BG pleine largeur */}
            {bg && (
                <div className="absolute inset-0 -z-10">
                    <Image src={bg} alt="Section Hero" fill priority className="object-cover object-center" />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
            )}

            {/* Contenu */}
            <div className="max-w-4xl text-center lg:text-left space-y-6">
                {/* Badge */}
                <span className="inline-block text-xs tracking-[0.25em] uppercase text-background bg-terracotta/20 border border-terracotta/40 rounded-full px-4 py-1">
                    {badgeLabel}
                </span>

                {/* Titre */}
                <h1 className="font-title text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-tight tracking-wide">{title}</h1>

                {/* Paragraphe */}
                <p className="text-base md:text-lg text-background/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">{paragraph}</p>

                {/* CTA(s) */}
                {cta && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        {cta.map((button) => (
                            <Link
                                key={button.href}
                                href={button.href}
                                className={`px-6 py-3 rounded-2xl text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-background transition hover:scale-105 ${
                                    button.label.toLowerCase().includes('contact') || button.label.toLowerCase().includes('devis')
                                        ? 'bg-terracotta text-background hover:bg-terracotta/90'
                                        : 'bg-ormat text-foreground hover:bg-ormat/90'
                                }`}
                            >
                                {button.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
