import { offersSchema } from './schemas';

export const offers = offersSchema.parse([
    {
        slug: 'clarte-express',
        name: 'Clarté Express',
        punchline: 'Votre site est beau, mais vos visiteurs hésitent ? On clarifie votre message pour obtenir plus de demandes.',
        summary: 'En 20 à 45 minutes, on identifie les points qui bloquent la prise de contact. Vous repartez avec un plan simple et actionnable.',
        timeline: 'Sous 48h ouvrées',
        priceFrom: 'Dès 290€',
        deliverables: ['Analyse claire de votre page actuelle', '3 actions prioritaires à mettre en place', 'Plan concret pour convertir plus de visiteurs'],
        featured: false,

        icon: 'shield',
        bestFor: 'Idéal si vous avez des visites mais peu de messages',
        highlights: ['Message plus clair', 'Parcours plus simple', 'Plus de prises de contact'],
        note: 'Si vous lancez ensuite une refonte avec moi, ce montant est déduit du devis.',
        image: { src: '/images/offer-audit.png', alt: 'Audit de clarté et conversion' },
    },
    {
        slug: 'page-qui-convertit',
        name: 'Page qui Convertit',
        punchline: 'On transforme votre page actuelle en un vrai levier commercial, clair, moderne et rassurant.',
        summary: 'On garde ce qui fonctionne, on simplifie ce qui freine, et on restructure votre page pour aider vos prospects à passer à l’action.',
        timeline: '1 à 2 semaines',
        priceFrom: 'Dès 1 200€',
        deliverables: [
            'Nouvelle structure orientée client',
            'Design plus premium et plus lisible',
            'Textes et boutons qui donnent envie de vous contacter',
            'Optimisations vitesse et visibilité',
        ],
        featured: true,

        icon: 'sparkles',
        bestFor: 'Parfait si votre offre est bonne mais que votre site ne la met pas en valeur',
        highlights: ['Image plus pro', 'Lecture fluide', 'Davantage de demandes qualifiées'],
        note: 'C’est l’offre la plus demandée pour passer un cap sans tout refaire.',
        image: { src: '/images/offer-refonte.png', alt: 'Refonte orientée conversion' },
    },
    {
        slug: 'site-vitrine-complet',
        name: 'Site Vitrine Complet',
        punchline: 'Vous partez de zéro ? Je crée un site prêt à vendre votre valeur dès la première visite.',
        summary: 'Un site vitrine complet, pensé pour inspirer confiance, expliquer votre offre clairement et déclencher des prises de rendez-vous.',
        timeline: '2 à 3 semaines',
        priceFrom: 'Dès 2 400€',
        deliverables: [
            'Arborescence claire de 3 à 6 pages',
            'Design moderne aligné avec votre image',
            'Parcours simple pour aller du besoin à la prise de contact',
            'Mise en ligne + bases SEO et suivi',
        ],
        featured: false,

        icon: 'layout',
        bestFor: 'Pour créer une présence en ligne sérieuse qui rassure et convertit',
        highlights: ['Crédibilité immédiate', 'Offres faciles à comprendre', 'Base solide pour grandir'],
        note: 'Une solution clé en main pour lancer votre présence sans stress.',
        image: { src: '/images/offer-vitrine.png', alt: 'Création de site vitrine complet' },
    },
]);
