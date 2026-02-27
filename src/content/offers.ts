import { offersSchema } from './schemas';

export const offers = offersSchema.parse([
    {
        slug: 'clarte-express',
        name: 'Diagnostic Conversion Express',
        punchline: 'Vous avez des visites, mais peu de demandes ? On identifie ce qui bloque et on corrige les messages qui freinent vos futurs clients.',
        summary: 'En 20 à 45 minutes, on simplifie votre discours et vos appels à l’action pour que les visiteurs comprennent vite et passent à l’étape suivante.',
        timeline: 'Sous 48h ouvrées',
        priceFrom: 'Dès 290€',
        deliverables: ['Diagnostic clair de votre page actuelle', '3 actions prioritaires faciles à appliquer', 'Plan concret pour obtenir plus de demandes utiles'],
        featured: false,

        icon: 'shield',
        bestFor: 'Idéal si vos visiteurs hésitent et quittent votre site sans vous écrire',
        highlights: ['Message clarifié', 'Freins levés', 'Plus de demandes concrètes'],
        note: 'Si vous lancez ensuite une refonte avec moi, ce montant est déduit du devis.',
        image: { src: '/images/offer-audit.png', alt: 'Audit de clarté et conversion' },
    },
    {
        slug: 'page-qui-convertit',
        name: 'Refonte Page Impact',
        punchline: 'Votre page ne transforme pas assez vos visites en contacts ? On la refait pour qu’elle rassure, donne envie et pousse à l’action.',
        summary: 'On garde le meilleur de votre activité, on retire les zones de confusion et on construit un parcours fluide qui donne envie de vous contacter.',
        timeline: '1 à 2 semaines',
        priceFrom: 'Dès 1 200€',
        deliverables: [
            'Nouvelle structure orientée client',
            'Design plus premium et plus lisible',
            'Textes et boutons qui donnent envie de vous contacter',
            'Page fluide, rapide et agréable à parcourir',
        ],
        featured: true,

        icon: 'sparkles',
        bestFor: 'Parfait si votre expertise est forte mais que votre page ne reflète pas votre niveau',
        highlights: ['Image plus pro', 'Lecture plus convaincante', 'Plus de rendez-vous'],
        note: 'C’est l’offre la plus demandée pour passer un cap sans tout refaire.',
        image: { src: '/images/offer-refonte.png', alt: 'Refonte orientée conversion' },
    },
    {
        slug: 'site-vitrine-complet',
        name: 'Site Vitrine Prêt à Vendre',
        punchline: 'Vous partez de zéro ? Je crée un site complet qui explique votre valeur, rassure vos prospects et déclenche des prises de contact.',
        summary: 'Vous obtenez un site clair, moderne et facile à naviguer, conçu pour que vos futurs clients comprennent vite pourquoi vous choisir.',
        timeline: '2 à 3 semaines',
        priceFrom: 'Dès 2 400€',
        deliverables: [
            'Arborescence claire de 3 à 6 pages',
            'Design moderne aligné avec votre image',
            'Parcours simple pour aller du besoin à la prise de contact',
            'Mise en ligne complète et accompagnement de départ',
        ],
        featured: false,

        icon: 'layout',
        bestFor: 'Pour lancer une présence en ligne solide qui commence à générer des demandes rapidement',
        highlights: ['Confiance immédiate', 'Offre comprise rapidement', 'Base saine pour développer votre activité'],
        note: 'Une solution clé en main pour lancer votre présence sans stress.',
        image: { src: '/images/offer-vitrine.png', alt: 'Création de site vitrine complet' },
    },
]);
