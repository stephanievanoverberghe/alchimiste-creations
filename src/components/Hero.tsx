'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import Button from '@/components/ui/Button';

export default function Hero() {
    const pathname = usePathname();

    const textMap: Record<string, { title: string; paragraph: string }> = {
        '/': {
            title: 'Transformer vos idées en expériences digitales vivantes',
            paragraph: 'Je crée des sites web sensibles, intuitifs et porteurs de sens, pour celles et ceux qui veulent une présence digitale alignée avec leur énergie.',
        },
        '/a-propos': {
            title: 'Derrière Alchimiste Créations, une femme qui crée du lien',
            paragraph:
                'Je m’appelle Stéphanie. Je suis développeuse web front-end et alchimiste digitale. J’accompagne les artistes, thérapeutes et indépendants du coeur à créer un site vivant,  qui leur ressemble profondément.',
        },
        '/contact': {
            title: 'Entrer en lien, en douceur',
            paragraph:
                'Tu n’as pas besoin d’avoir toutes les réponses. Parfois, il suffit d’un appel, d’un message, d’une impulsion... pour commencer à poser les bonnes questions. Si tu ressens que c’est le moment de créer un espace en ligne qui te ressemble vraiment, je t’écoute.',
        },
        '/methode': {
            title: 'Chez moi, on ne démarre pas par le code, mais par une écoute',
            paragraph:
                'Chaque projet commence par un moment humain. Avant d’ouvrir un logiciel ou dessiner un bloc, je t’écoute. Ce que tu ressens. Ce que tu veux offrir. Ce qui t’habite. Car ton site est bien plus qu’une vitrine : c’est une extension de toi. Et on ne construit pas ça à la va-vite',
        },
        '/offres': {
            title: 'Créer un site vivant, c’est d’abord une rencontre',
            paragraph:
                'Chaque projet commence par une écoute. Une respiration. Chez Alchimiste Créations, je ne propose pas des solutions toutes faites, mais des accompagnements sur mesure, pensés pour incarner ce que vous êtes.',
        },
        '/projets': {
            title: 'Chaque site est une rencontre, un reflet, une vibration',
            paragraph:
                'Je ne crée pas des sites à la chaîne. Chaque projet naît d’un échange, d’un besoin de faire émerger ce qui ne demande qu’à vivre. Ici, je partage quelques créations. Elles ne disent pas tout. Mais elle témoignent de ce que j’aime faire : incarner l’âme d’un projet dans une interface douce, claire et vivante.',
        },
    };

    const { title, paragraph } = textMap[pathname] || textMap['/'];

    return (
        <section className="text-center lg:text-right px-6 md-px-8 lg:pr-12 lg:pl-56 xl:px-[150px]">
            <h1 className="text-3xl md:text-6xl font-bold text-ormat leading-tight tracking-[0.16em]">{title}</h1>
            <p className="mt-6 md:mt-10 text-lg md:text-2xl font-light text-background/80 tracking-widest">{paragraph}</p>

            {pathname === '/' && (
                <div className="mt-12 md:mt-16 flex flex-col sm:flex-row justify-center lg:justify-end gap-4">
                    <Link
                        href="/offres"
                        className="px-6 py-3 rounded-2xl bg-ormat text-foreground text-sm font-semibold tracking-widest transition hover:scale-105 border-b-2 border-r-2 border-background"
                    >
                        DÉCOUVRIR LES OFFRES
                    </Link>
                    <Link
                        href="/contact"
                        className="px-6 py-3 rounded-2xl bg-[#A44B34] text-background text-sm font-semibold tracking-widest transition hover:scale-105 border-b-2 border-r-2 border-background"
                    >
                        RÉSERVER UN APPEL
                    </Link>
                </div>
            )}
        </section>
    );
}
