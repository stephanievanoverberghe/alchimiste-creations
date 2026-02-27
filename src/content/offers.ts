import { offersSchema } from './schemas';

export const offers = offersSchema.parse([
    {
        slug: 'declic-express',
        name: 'Déclic Express',
        punchline: 'Vous avez des visites, mais presque aucun message ? On identifie ce qui bloque vos prospects et on le corrige rapidement.',
        summary: 'Vous repartez avec un plan ultra concret pour clarifier votre message, rassurer plus vite et récupérer des demandes qualifiées dès les prochains jours.',
        timeline: 'Sous 48h ouvrées',
        priceFrom: 'Dès 290€',
        deliverables: [
            'Un diagnostic précis : les points qui font fuir ou hésiter vos visiteurs',
            '3 actions immédiates à appliquer sans refaire tout votre site',
            'Un plan priorisé pour obtenir plus de demandes utiles rapidement',
        ],
        featured: false,

        icon: 'shield',
        bestFor: 'Idéal si vous avez besoin de résultats rapides sans lancer un gros chantier',
        highlights: ['Résultats rapides', 'Actions concrètes', 'Demandes plus qualifiées'],
        note: 'Si vous poursuivez avec une création de page, ce montant est déduit.',
        image: { src: '/images/offer-audit.png', alt: 'Diagnostic de conversion orienté client' },
    },
    {
        slug: 'page-signature',
        name: 'Page Signature',
        punchline: 'Votre page actuelle ne convertit pas assez ? On la transforme en page qui capte, rassure et fait passer à l’action.',
        summary: 'Vous obtenez une page moderne qui explique votre valeur de façon limpide et donne envie de réserver un appel ou demander un devis.',
        timeline: '1 à 2 semaines',
        priceFrom: 'Dès 1 200€',
        deliverables: [
            'Une structure claire pour capter l’attention en quelques secondes',
            'Un design tendance qui vous positionne immédiatement comme professionnel',
            'Des textes et CTA orientés prise de rendez-vous ou demande de devis',
            'Une expérience fluide et dynamique sur mobile comme sur ordinateur',
        ],
        featured: true,

        icon: 'sparkles',
        bestFor: 'Parfait si vous voulez augmenter les demandes sans repartir de zéro',
        highlights: ['Message clair', 'Image premium', 'Plus de demandes'],
        note: 'C’est l’offre la plus choisie quand le besoin est clair : vendre plus vite avec une page forte.',
        image: { src: '/images/offer-refonte.png', alt: 'Refonte de page orientée conversion' },
    },
    {
        slug: 'site-business',
        name: 'Site Business',
        punchline: 'Vous partez de zéro ou votre site ne reflète plus votre niveau ? On crée un site complet pensé pour générer des demandes en continu.',
        summary: 'Vous obtenez un site solide, clair et crédible qui valorise votre activité, répond aux objections courantes et facilite le passage à l’action.',
        timeline: '2 à 3 semaines',
        priceFrom: 'Dès 2 400€',
        deliverables: [
            'Un site complet (3 à 6 pages) conçu pour convertir vos visiteurs en prospects',
            'Une identité visuelle moderne et cohérente avec votre positionnement',
            'Un parcours client clair qui transforme l’intérêt en action concrète',
            'Une mise en ligne accompagnée, sans charge technique pour vous',
        ],
        featured: false,

        icon: 'layout',
        bestFor: 'Idéal si vous voulez une base fiable pour vendre régulièrement et grandir sereinement',
        highlights: ['Site complet', 'Crédibilité forte', 'Base pour scaler'],
        note: 'Une solution clé en main pour structurer votre croissance et rassurer vos futurs clients à chaque visite.',
        image: { src: '/images/offer-vitrine.png', alt: 'Création de site vitrine orienté business' },
    },
]);
