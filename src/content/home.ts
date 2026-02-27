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
        badge: 'Création & refonte de sites web pour indépendants et petites entreprises',
        title: 'Votre site web doit expliquer clairement votre valeur et donner envie de vous contacter.',
        lead: 'Je crée ou refonds votre site pour transformer une visite en prise de contact qualifiée, avec un parcours simple et crédible.',
        highlightsTitle: 'En moins de 5 secondes, votre visiteur comprend :',
        highlights: ['Ce que vous proposez, clairement.', 'Pourquoi vous êtes la bonne personne pour son besoin.', 'Comment vous contacter en une action simple.'],
        assurances: ['Audit offert (20 min)', 'Plan clair et actionnable', 'Sans engagement'],
        ctaHint: 'Pendant l’audit, on identifie si vous avez besoin d’une refonte ciblée ou d’un nouveau site pensé pour convertir.',
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
        eyebrow: 'Parcours client',
        title: 'Une page pensée pour être claire, agréable et donner envie de passer à l’action.',
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
        eyebrow: 'Process',
        title: 'Un accompagnement simple en 4 étapes, pensé pour vous faire gagner du temps.',
        description: 'Vous savez toujours où on en est, ce qui arrive ensuite, et ce que vous recevez à chaque étape.',
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
            {
                title: '4. Mise en ligne et ajustements finaux',
                icon: 'rocket',
                duration: '0.5–1 jour',
                description: 'On publie votre nouvelle page, puis on ajuste les derniers détails pour maximiser les prises de contact.',
                deliverables: [
                    'Une mise en ligne propre et sans stress',
                    'Une vérification complète avant ouverture',
                    'Des optimisations ciblées sur les boutons et sections clés',
                ],
                validation: 'Vous donnez le feu vert final, puis on lance.',
            },
        ],
    },
    offers: {
        eyebrow: 'Offres',
        title: 'Des offres claires pour répondre à votre besoin du moment.',
        description: 'Vous choisissez selon votre priorité : obtenir plus de demandes, mieux présenter votre valeur, ou poser une base solide pour vendre avec régularité.',
        items: offers,
    },
    projects: {
        eyebrow: 'Projets',
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
