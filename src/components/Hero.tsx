'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    const pathname = usePathname();

    const textMap: Record<string, { title: string; paragraph: string; cta?: { label: string; href: string }[]; bg?: string }> = {
        '/': {
            title: 'Des sites qui capturent ton essence et la révèlent au monde',
            paragraph:
                'J’allie design sensible et code précis pour créer des sites uniques, alignés à ton univers, qui attirent les bonnes personnes et soutiennent ta croissance.',
            cta: [
                { label: 'Découvrir mes offres', href: '/offres' },
                { label: 'Me contacter', href: '/contact' },
            ],
            bg: '/hero/hero-accueil.png',
        },
        '/a-propos': {
            title: 'Développeuse web à Lille — WordPress & React/Next.js sur mesure',
            paragraph:
                'Je suis Stéphanie, fondatrice d’Alchimiste Créations. J’accompagne artistes, thérapeutes et entrepreneurs du cœur à créer un site unique, esthétique et fonctionnel, aligné à leur univers et pensé pour attirer les bonnes personnes.',
            cta: [{ label: 'Découvrir mes offres', href: '/offres' }],
            bg: '/hero/hero-apropos.png',
        },
        '/contact': {
            title: 'Entrer en lien, en douceur',
            paragraph:
                'Tu n’as pas besoin d’avoir toutes les réponses. Parfois, il suffit d’un appel, d’un message, d’une impulsion... pour commencer à poser les bonnes questions. Si tu ressens que c’est le moment de créer un espace en ligne qui te ressemble vraiment, je t’écoute.',
            bg: '/hero/hero-contact.png',
        },
        '/methode': {
            title: 'Ma méthode — créer un site qui te ressemble vraiment',
            paragraph:
                'Ma façon de travailler, c’est du sur-mesure, mais pas seulement dans le design. Je pars de toi, de ce que tu veux transmettre, pour créer un site fluide, beau et pensé pour durer.',
            bg: '/hero/hero-methode.png',
        },
        '/offres': {
            title: 'Création de site web sur mesure — une approche humaine et vivante',
            paragraph:
                'Créer un site vivant, c’est d’abord une rencontre. Chaque projet commence par une écoute. Une respiration. Chez Alchimiste Créations, je ne propose pas de solutions toutes faites, mais un accompagnement façonné pour incarner ce que tu portes.',
            bg: '/hero/hero-packs.png',
        },
        '/projets': {
            title: 'Chaque site est une rencontre, un reflet, une vibration',
            paragraph:
                'Je ne crée pas des sites à la chaîne. Chaque projet naît d’un échange, d’un besoin de faire émerger ce qui ne demande qu’à vivre. Ici, je partage quelques créations. Elles ne disent pas tout. Mais elles témoignent de ce que j’aime faire : incarner l’âme d’un projet dans une interface douce, claire et vivante.',
            bg: '/hero/hero-projets.png',
        },
    };

    const { title, paragraph, cta, bg } = textMap[pathname] || textMap['/'];

    return (
        <section className="relative flex items-center pt-44 pb-28 lg:pt-56 lg:pb-36 px-6 md:px-8 lg:px-[100px] xl:px-[150px] overflow-hidden">
            {/* Image de fond qui englobe le header */}
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
                    {pathname === '/' ? 'Développement web sur-mesure' : 'Alchimiste Créations'}
                </span>

                {/* Titre */}
                <h1 className="font-title text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-tight tracking-wide">{title}</h1>

                {/* Paragraphe */}
                <p className="text-base md:text-lg text-background/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">{paragraph}</p>

                {/* Boutons */}
                {cta && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        {cta.map((button) => (
                            <Link
                                key={button.href}
                                href={button.href}
                                className={`px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-widest transition hover:scale-105 border-b-2 border-r-2 border-background ${
                                    button.label.includes('contact') ? 'bg-terracotta text-background hover:bg-terracotta/90' : 'bg-ormat text-foreground hover:bg-ormat/90'
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
