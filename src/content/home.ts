import { offers } from '@/content/offers';
import { projects } from '@/content/projects';
import { faqs } from '@/content/faq';
import type { FAQ, Offer, Project } from '@/content/schemas';

export type HomeHero = {
    badge: string;
    title: string;
    lead: string;
    highlightsTitle: string;
    highlights: string[];
    assurances: string[];
    ctaHint: string;
};

export type HomeQualificationItem = {
    title: string;
    description: string;
    icon: 'target' | 'sparkles' | 'gauge' | 'layout' | 'search' | 'shield';
    bullets: string[];
    image?: { src: string; alt: string };
    emphasis?: string;
};

export type HomeProofStat = {
    label: string;
    value: string;
    icon?: 'clock' | 'reply' | 'check' | 'bolt' | 'shield' | 'sparkles';
    hint?: string;
};

export type HomeProofCard = {
    title: string;
    description: string;
    icon: 'flow' | 'layers' | 'shield' | 'sparkles' | 'gauge' | 'search';
    bullets: string[];
    emphasis?: string;
    image?: { src: string; alt: string };
};

export type HomePillar = {
    title: string;
    text: string;
};

export type HomeProcessStep = {
    title: string;
    description: string;
};

export type HomeFaqItem = Pick<FAQ, 'question' | 'answer'>;

export type HomeContent = {
    hero: HomeHero;
    qualification: {
        eyebrow: string;
        title: string;
        description: string;
        journey: string[];
        items: HomeQualificationItem[];
    };
    proofs: {
        eyebrow: string;
        title: string;
        description: string;
        stats: HomeProofStat[];
        cards: HomeProofCard[];
    };
    architecture: {
        eyebrow: string;
        title: string;
        pillars: HomePillar[];
    };
    process: {
        eyebrow: string;
        title: string;
        description: string;
        steps: HomeProcessStep[];
    };
    offers: {
        eyebrow: string;
        title: string;
        description: string;
        items: Offer[];
    };
    projects: {
        eyebrow: string;
        title: string;
        description: string;
        items: Project[];
    };
    faq: {
        eyebrow: string;
        title: string;
        description: string;
        questions: HomeFaqItem[];
    };
};

export const homeContent = {
    hero: {
        badge: 'Sites web orientés conversion pour indépendants, studios et PME',
        title: 'Votre site ne doit pas juste être beau : il doit générer des demandes qualifiées.',
        lead: 'Je conçois des expériences web qui rendent votre valeur évidente, rassurent vite et guident vers la prise de rendez-vous.',
        highlightsTitle: 'Ce que votre prospect comprend en arrivant sur votre site :',
        highlights: [
            'Ce que vous faites, pour qui, et pourquoi c’est crédible.',
            'Quelle offre choisir pour avancer sans hésiter.',
            'Quelle prochaine action faire pour lancer la conversation.',
        ],
        assurances: ['Audit offert (20 min)', 'Réponse sous 24h', 'Sans engagement'],
        ctaHint: 'Objectif de l’audit : identifier 3 leviers immédiats pour augmenter vos conversions.',
    },
    qualification: {
        eyebrow: 'Un site qui aide vos futurs clients à dire “oui”',
        title: 'Votre site devient une vraie vitrine qui rassure et donne envie de vous contacter.',
        description: 'Ici, pas de jargon : on simplifie votre message, on met en avant vos points forts et on guide naturellement vers la prise de contact.',
        journey: ['Compréhension immédiate de votre promesse.', 'Projection rapide sur la bonne offre.', 'Passage à l’action avec confiance.'],
        items: [
            {
                icon: 'target',
                title: 'Beaucoup de visites, mais trop peu de messages ?',
                description: 'On crée un parcours simple qui transforme les curieux en prospects motivés.',
                bullets: ['Boutons visibles au bon moment', 'Réponses claires aux questions fréquentes', 'Lecture fluide sur mobile comme sur ordinateur'],
                emphasis: '“C’est clair, je sais quoi faire ensuite.”',
                image: { src: '/images/qualif-convert.png', alt: 'Conversion et CTA' },
            },
            {
                icon: 'layout',
                title: 'Votre offre est excellente, mais elle manque de clarté en ligne ?',
                description: 'On reformule votre proposition pour que chaque visiteur comprenne votre valeur en quelques secondes.',
                bullets: ['Message simple et direct dès le haut de page', 'Offres présentées de façon lisible', 'Ton professionnel, humain et rassurant'],
                emphasis: '“Je comprends rapidement ce qui me convient.”',
                image: { src: '/images/qualif-clarity.png', alt: 'Clarté du message' },
            },
            {
                icon: 'gauge',
                title: 'Vous voulez un site moderne, rapide et agréable à utiliser ?',
                description: 'Je conçois une expérience fluide qui donne une impression premium et inspire confiance dès la première seconde.',
                bullets: ['Chargement rapide pour éviter de perdre des visiteurs', 'Navigation intuitive et confortable', 'Design soigné qui valorise votre image de marque'],
                emphasis: '“Cette entreprise est sérieuse, je peux leur faire confiance.”',
                image: { src: '/images/qualif-tech.png', alt: 'Qualité technique' },
            },
        ],
    },
    proofs: {
        eyebrow: 'Des preuves qui parlent à vos futurs clients',
        title: 'En quelques secondes, votre visiteur comprend pourquoi il peut vous faire confiance.',
        description: 'On met en scène les bonnes informations, au bon moment, pour que votre site inspire confiance et donne envie de passer à l’action.',
        stats: [
            { label: 'Temps moyen avant de comprendre votre offre', value: 'Moins de 10 secondes' },
            { label: 'Chemin vers la prise de contact', value: 'Simple et visible sur chaque page' },
            { label: 'Expérience ressentie', value: 'Clair, fluide et rassurant' },
        ],
        cards: [
            {
                icon: 'flow',
                title: 'Un parcours évident pour passer à l’action',
                description: 'Votre visiteur n’a jamais à se demander où cliquer : tout est pensé pour avancer naturellement.',
                bullets: [
                    'Des boutons bien placés, visibles au bon moment',
                    'Des réponses claires aux questions qui freinent la décision',
                    'Une lecture confortable sur mobile et ordinateur',
                ],
                emphasis: 'Résultat attendu : plus de prises de contact utiles.',
                image: { src: '/images/proof-flow.png', alt: 'Parcours et CTA' },
            },
            {
                icon: 'layers',
                title: 'Une image de marque moderne et mémorable',
                description: 'Votre site donne tout de suite une impression professionnelle, actuelle et cohérente avec votre niveau de service.',
                bullets: [
                    'Un style visuel aligné avec votre positionnement',
                    'Des détails soignés qui renforcent la crédibilité',
                    'Des transitions douces pour une navigation agréable',
                ],
                emphasis: 'Résultat attendu : une première impression forte et rassurante.',
                image: { src: '/images/proof-ui.png', alt: 'UI premium' },
            },
            {
                icon: 'gauge',
                title: 'Un site agréable, rapide et facile à utiliser',
                description: 'Les pages s’affichent vite, la navigation est fluide et vos visiteurs restent concentrés sur votre message.',
                bullets: ['Chargement rapide, même sur mobile', 'Textes lisibles et contenus bien structurés', 'Une base solide pour faire évoluer votre site dans le temps'],
                emphasis: 'Résultat attendu : une expérience qui met vos visiteurs en confiance.',
                image: { src: '/images/proof-tech.png', alt: 'Performance et qualité technique' },
            },
        ],
    },
    architecture: {
        eyebrow: 'Architecture',
        title: 'Une trame qui attire, convainc et convertit.',
        pillars: [
            {
                title: 'Attract',
                text: 'Positionnement clair + branding digital qui capte l’attention en moins de 5 secondes.',
            },
            {
                title: 'Convince',
                text: 'Structure narrative et preuves sociales pour transformer une visite en intention d’achat.',
            },
            {
                title: 'Convert',
                text: 'CTA, parcours utilisateur et performance technique optimisés pour maximiser les demandes entrantes.',
            },
        ],
    },
    process: {
        eyebrow: 'Process',
        title: 'Un déroulé simple en 4 étapes, du cadrage au lancement.',
        description: 'Vous savez à tout moment ce qui est en cours, ce que vous validez et ce qui arrive ensuite.',
        steps: [
            {
                title: '1. Audit & cadrage',
                description: 'On identifie vos objectifs business, vos frictions actuelles et vos priorités de conversion.',
            },
            {
                title: '2. Message & architecture',
                description: 'On construit une structure de page claire, orientée décision, avec des CTA sans ambiguïté.',
            },
            {
                title: '3. Design & production',
                description: 'Je conçois et développe une expérience fluide, rapide et alignée avec votre positionnement.',
            },
            {
                title: '4. Mise en ligne & optimisation',
                description: 'On lance, on mesure les signaux clés et on priorise les ajustements à fort impact.',
            },
        ],
    },
    offers: {
        eyebrow: 'Offres',
        title: 'Des formats pensés pour décider vite et bien.',
        description: 'Choisissez un cadre adapté à votre niveau de maturité, avec un objectif clair de conversion.',
        items: offers,
    },
    projects: {
        eyebrow: 'Projets',
        title: 'Des résultats concrets, pas juste un beau design.',
        description: 'Chaque projet montre comment une meilleure structure web améliore les demandes entrantes.',
        items: projects,
    },
    faq: {
        eyebrow: 'FAQ',
        title: 'Réponses courtes aux objections les plus fréquentes.',
        description: 'L’objectif : vous aider à décider sereinement, sans zone grise.',
        questions: faqs,
    },
} satisfies HomeContent;
