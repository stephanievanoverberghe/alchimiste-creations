'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Hero() {
    const pathname = usePathname();

    const textMap: Record<string, { title: string; paragraph: string; cta?: { label: string; href: string }[] }> = {
        '/': {
            title: 'Créer un site web sur mesure, sensible et aligné à ton énergie',
            paragraph:
                'Sites vitrines et boutiques en ligne, alliant esthétique, fluidité et sens. Que tu sois artiste, thérapeute, coach ou entrepreneur·e du cœur, je transforme tes idées en expériences digitales vivantes.',
            cta: [
                { label: 'Découvrir les offres', href: '/offres' },
                { label: 'Réserver un appel', href: '/contact' },
            ],
        },
        '/a-propos': {
            title: 'Développeuse web à Lille — WordPress & React/Next.js sur mesure',
            paragraph:
                'Je suis Stéphanie, fondatrice d’Alchimiste Créations. J’accompagne artistes, thérapeutes et entrepreneur·es du cœur à créer un site unique, esthétique et fonctionnel, aligné à leur univers et pensé pour attirer les bonnes personnes.',
            cta: [{ label: 'Découvrir mes offres', href: '/offres' }],
        },
        '/contact': {
            title: 'Entrer en lien, en douceur',
            paragraph:
                'Tu n’as pas besoin d’avoir toutes les réponses. Parfois, il suffit d’un appel, d’un message, d’une impulsion... pour commencer à poser les bonnes questions. Si tu ressens que c’est le moment de créer un espace en ligne qui te ressemble vraiment, je t’écoute.',
        },
        '/methode': {
            title: 'Chez moi, on ne démarre pas par le code, mais par une écoute',
            paragraph:
                'Chaque projet commence par un moment humain. Avant d’ouvrir un logiciel ou dessiner un bloc, je t’écoute. Ce que tu ressens. Ce que tu veux offrir. Ce qui t’habite. Car ton site est bien plus qu’une vitrine : c’est une extension de toi. Et on ne construit pas ça à la va-vite.',
        },
        '/offres': {
            title: 'Création de site web sur mesure — une approche humaine et vivante',
            paragraph:
                'Créer un site vivant, c’est d’abord une rencontre. Chaque projet commence par une écoute. Une respiration. Chez Alchimiste Créations, je ne propose pas de solutions toutes faites, mais un accompagnement façonné pour incarner ce que tu portes.',
        },
        '/projets': {
            title: 'Chaque site est une rencontre, un reflet, une vibration',
            paragraph:
                'Je ne crée pas des sites à la chaîne. Chaque projet naît d’un échange, d’un besoin de faire émerger ce qui ne demande qu’à vivre. Ici, je partage quelques créations. Elles ne disent pas tout. Mais elles témoignent de ce que j’aime faire : incarner l’âme d’un projet dans une interface douce, claire et vivante.',
        },
    };

    const { title, paragraph, cta } = textMap[pathname] || textMap['/'];

    return (
        <section className="min-h-screen flex flex-col justify-center items-center pb-28 md:pb-12 text-center lg:items-end lg:text-right px-6 md:px-8 lg:pr-12 lg:pl-56 xl:px-[150px] overflow-hidden">
            <h1 className="text-3xl md:text-6xl font-bold text-ormat leading-tight tracking-[0.16em]">{title}</h1>
            <p className="mt-6 md:mt-10 text-lg md:text-2xl font-light text-background/80 tracking-widest whitespace-pre-line">{paragraph}</p>

            {cta && (
                <div className="mt-12 md:mt-16 flex flex-col sm:flex-row justify-center lg:justify-end gap-4">
                    {cta.map((button) => (
                        <Link
                            key={button.href}
                            href={button.href}
                            className={`px-6 py-3 rounded-2xl ${
                                pathname === '/a-propos'
                                    ? 'bg-terracotta text-background'
                                    : button.label.includes('appel') || button.label.includes('Réserver')
                                    ? 'bg-terracotta text-background'
                                    : 'bg-ormat text-foreground'
                            } text-sm font-semibold uppercase tracking-widest transition hover:scale-105 border-b-2 border-r-2 border-background`}
                        >
                            {button.label}
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}
