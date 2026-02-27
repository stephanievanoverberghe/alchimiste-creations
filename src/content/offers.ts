import { offersSchema } from './schemas';

export const offers = offersSchema.parse([
    {
        slug: 'clarte-express',
        name: 'Clarté Express',
        punchline: 'Vos visiteurs regardent… mais ne vous contactent pas ? On clarifie votre promesse pour déclencher plus de prises de contact.',
        summary: 'En 20 à 45 minutes, on repère ce qui freine la décision et on corrige l’essentiel. Vous repartez avec un plan direct à appliquer.',
        timeline: 'Sous 48h ouvrées',
        priceFrom: 'Dès 290€',
        deliverables: ['Analyse claire de votre page actuelle', '3 actions prioritaires à mettre en place', 'Plan concret pour convertir plus de visiteurs'],
        featured: false,

        icon: 'shield',
        bestFor: 'Idéal si vous avez du trafic, mais pas assez de prospects qualifiés',
        highlights: ['Promesse limpide', 'Décision facilitée', 'Plus de demandes sérieuses'],
        note: 'Si vous lancez ensuite une refonte avec moi, ce montant est déduit du devis.',
        image: { src: '/images/offer-audit.png', alt: 'Audit de clarté et conversion' },
    },
    {
        slug: 'page-qui-convertit',
        name: 'Page qui Convertit',
        punchline: 'Votre page actuelle ne vend pas assez ? On la transforme en levier commercial clair, crédible et orienté action.',
        summary: 'On conserve vos points forts, on enlève les frictions et on reconstruit le parcours pour convaincre plus vite les bons clients.',
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
        bestFor: 'Parfait si votre expertise est solide, mais que votre page ne convertit pas à son niveau',
        highlights: ['Positionnement renforcé', 'Lecture persuasive', 'Plus de leads qualifiés'],
        note: 'C’est l’offre la plus demandée pour passer un cap sans tout refaire.',
        image: { src: '/images/offer-refonte.png', alt: 'Refonte orientée conversion' },
    },
    {
        slug: 'site-vitrine-complet',
        name: 'Site Vitrine Complet',
        punchline: 'Vous partez de zéro ? Je crée un site prêt à rassurer, convaincre et générer vos premiers rendez-vous.',
        summary: 'Un site vitrine complet pensé pour rendre votre offre évidente, installer la confiance rapidement et transformer les visites en contacts.',
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
        bestFor: 'Pour lancer une présence pro qui inspire confiance et soutient vos ventes',
        highlights: ['Crédibilité dès l’arrivée', 'Offre comprise en quelques secondes', 'Base rentable pour grandir'],
        note: 'Une solution clé en main pour lancer votre présence sans stress.',
        image: { src: '/images/offer-vitrine.png', alt: 'Création de site vitrine complet' },
    },
]);
