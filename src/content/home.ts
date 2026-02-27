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
    needs: string[];
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
    title: 'Attire' | 'Convainc' | 'Convertit';
    headline: string;
    description: string;
    icon: 'sparkles' | 'shield' | 'target';
    bullets: string[];
    image?: { src: string; alt: string };
};

export type HomeProcessStep = {
    title: string;
    description: string;
    icon: 'scan' | 'layers' | 'code' | 'rocket';
    duration?: string;
    deliverables: string[];
    validation?: string;
};

export type HomeFaqItem = Pick<FAQ, 'question' | 'answer'>;

export type HomeContent = {
    hero: HomeHero;
    qualification: {
        eyebrow: string;
        title: string;
        description: string;
        transitionToMethod: string;
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
        transitionToOffers: string;
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
        badge: 'Création de sites vitrines pour indépendants et petites entreprises (refonte possible)',
        title: 'Je crée des sites vitrines clairs et crédibles pour indépendants et petites entreprises.',
        lead: 'Offre principale : création de site vitrine. Offre secondaire : refonte. Objectif : transformer vos visites en demandes qualifiées.',
        highlightsTitle: 'En 5 secondes, votre prospect doit capter :',
        highlights: ['Ce que vous faites et pour qui.', 'Pourquoi vous contacter maintenant.'],
        assurances: ['Accompagnement clair et concret', 'Sans jargon inutile'],
        needs: ['Message clair dès l’arrivée', 'Parcours qui incite à agir', 'Plus de contacts qualifiés'],
        ctaHint: 'Audit offert : on vérifie en 20 minutes si vous devez créer un nouveau site vitrine ou refondre l’existant.',
    },
    qualification: {
        eyebrow: 'Diagnostic rapide',
        title: 'Si votre site est visité mais contacté trop rarement, voici les blocages les plus fréquents.',
        description: 'On identifie vite ce qui freine la prise de contact : message flou, parcours hésitant, manque de preuve visible.',
        transitionToMethod: 'Ces blocages se corrigent avec une méthode simple en 3 étapes.',
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
        eyebrow: 'Preuve rapide',
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
        eyebrow: 'Méthode',
        title: 'Une méthode simple pour rendre votre site clair, crédible et orienté contact.',
        pillars: [
            {
                title: 'Attire',
                icon: 'sparkles',
                headline: 'En arrivant, on comprend tout de suite ce que vous faites.',
                description: 'Le message principal est lisible en un coup d’œil, avec un design moderne qui attire l’attention sans fatiguer la lecture.',
                bullets: ['Titre clair et direct dès le haut de page', 'Informations essentielles visibles sans effort', 'Visuels plus grands et utiles pour appuyer le message'],
                image: { src: '/images/arch-attract.png', alt: 'Mise en avant claire de la promesse avec un visuel lisible' },
            },
            {
                title: 'Convainc',
                icon: 'shield',
                headline: 'La lecture rassure naturellement et répond aux questions.',
                description: 'On met en avant ce qui compte pour vos prospects : preuves, méthode, résultats et réponses concrètes aux doutes les plus fréquents.',
                bullets: ['Éléments de confiance visibles au bon moment', 'Contenu structuré pour lever les hésitations', 'Ton humain et professionnel qui inspire confiance'],
                image: { src: '/images/arch-convince.png', alt: 'Preuves et repères qui renforcent la confiance du visiteur' },
            },
            {
                title: 'Convertit',
                icon: 'target',
                headline: 'Le visiteur sait quoi faire ensuite, sans hésiter.',
                description: 'Le parcours est fluide et rythmé : des appels à l’action visibles, des transitions dynamiques et un chemin simple vers la prise de contact.',
                bullets: [
                    'Boutons d’action bien placés sur toute la page',
                    'Navigation agréable avec une sensation de mouvement',
                    'Parcours court pour passer du “je regarde” au “je vous contacte”',
                ],
                image: { src: '/images/arch-convert.png', alt: 'Boutons visibles et parcours simple vers la prise de contact' },
            },
        ],
    },
    process: {
        eyebrow: 'Méthode en 3 étapes',
        title: 'Ces blocages se corrigent avec une méthode simple en 3 étapes.',
        description: 'On fusionne stratégie de contenu et exécution pour aller de la clarté à la prise de contact, sans jargon technique.',
        transitionToOffers: 'Choisissez maintenant l’option adaptée : créer votre site vitrine ou refondre l’existant.',
        steps: [
            {
                title: '1. On fait le point ensemble',
                icon: 'scan',
                duration: '20–45 min',
                description: 'Vous m’expliquez votre activité, vos objectifs et ce qui vous freine aujourd’hui.',
                deliverables: ['Un diagnostic clair de votre page actuelle', '3 priorités concrètes pour avancer vite', 'Un plan simple avec un objectif précis'],
                validation: 'Vous validez la direction pour démarrer sereinement.',
            },
            {
                title: '2. On construit le bon message',
                icon: 'layers',
                duration: '1–2 jours',
                description: 'On organise votre page pour que vos visiteurs comprennent, aient confiance et passent à l’action.',
                deliverables: ['Une structure de page facile à suivre', 'Des titres et boutons clairs, orientés client', 'Une maquette rapide pour visualiser le parcours'],
                validation: 'Vous validez le ton et l’expérience de lecture.',
            },
            {
                title: '3. Je crée une page moderne et dynamique',
                icon: 'code',
                duration: '3–7 jours',
                description: 'Je transforme tout ça en une page fluide, élégante et agréable à parcourir sur mobile comme sur ordinateur.',
                deliverables: ['Un design tendance, cohérent avec votre image', 'Des animations légères qui donnent du rythme', 'Une page rapide et confortable à consulter'],
                validation: 'Vous découvrez une version en ligne et validez le rendu.',
            },
        ],
    },
    offers: {
        eyebrow: 'Offres priorisées',
        title: 'Choisissez l’option adaptée : création de site vitrine ou refonte.',
        description: 'Offre principale : création de site vitrine. Offre secondaire : refonte de site existant pour améliorer clarté et conversion.',
        items: offers,
    },
    projects: {
        eyebrow: 'Preuves projets',
        title: 'Des exemples concrets de sites qui font passer de “je regarde” à “je vous contacte”.',
        description: 'On part d’un blocage client clair, puis on crée une expérience plus rassurante, plus lisible et plus engageante.',
        items: projects,
    },
    faq: {
        eyebrow: 'FAQ',
        title: 'Vos questions, en version simple et rassurante.',
        description: 'Des réponses claires, sans jargon, pour avancer en confiance.',
        questions: faqs,
    },
} satisfies HomeContent;
