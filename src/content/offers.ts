import { offersSchema } from './schemas';

export const offers = offersSchema.parse([
    {
        slug: 'clarte-express',
        name: 'Déclic Express',
        punchline: 'Vous avez des visites mais peu de contacts ? On enlève les blocages qui empêchent vos futurs clients de vous écrire.',
        summary: 'En une session courte, on simplifie votre message et vos appels à l’action pour que votre site donne enfin envie de passer à l’étape suivante.',
        timeline: 'Sous 48h ouvrées',
        priceFrom: 'Dès 290€',
        deliverables: [
            'Diagnostic clair de ce qui freine vos demandes',
            '3 actions prioritaires à appliquer immédiatement',
            'Plan concret pour obtenir plus de prises de contact utiles',
        ],
        featured: false,

        icon: 'shield',
        bestFor: 'Idéal si votre site attire, mais ne transforme pas assez',
        highlights: ['Plus de clarté', 'Plus de confiance', 'Plus de messages entrants'],
        note: 'Si vous enchaînez avec une refonte, ce montant est déduit du devis.',
        image: { src: '/images/offer-audit.png', alt: 'Diagnostic de conversion orienté client' },
    },
    {
        slug: 'page-qui-convertit',
        name: 'Page Signature',
        punchline: 'Votre offre est bonne, mais votre page ne la vend pas assez ? On crée une page qui rassure, capte l’attention et déclenche des rendez-vous.',
        summary: 'On restructure votre page autour des vraies attentes clients : comprendre vite, se sentir en confiance, savoir quoi faire ensuite.',
        timeline: '1 à 2 semaines',
        priceFrom: 'Dès 1 200€',
        deliverables: [
            'Structure de page claire et orientée décision',
            'Design tendance, premium et lisible',
            'Messages et boutons qui donnent envie de vous contacter',
            'Page fluide et agréable sur mobile comme sur ordinateur',
        ],
        featured: true,

        icon: 'sparkles',
        bestFor: 'Parfait si vous voulez plus de rendez-vous sans refaire tout votre site',
        highlights: ['Image plus pro', 'Lecture plus persuasive', 'Hausse des demandes qualifiées'],
        note: 'C’est l’offre la plus choisie pour franchir un cap rapidement.',
        image: { src: '/images/offer-refonte.png', alt: 'Refonte de page orientée conversion' },
    },
    {
        slug: 'site-vitrine-complet',
        name: 'Site Business',
        punchline: 'Vous partez de zéro ou votre site n’est plus à la hauteur ? Je crée un site complet qui présente votre valeur et transforme vos visites en opportunités.',
        summary: 'Vous obtenez un site moderne et rassurant, pensé pour répondre aux vraies questions de vos prospects et les amener naturellement vers la prise de contact.',
        timeline: '2 à 3 semaines',
        priceFrom: 'Dès 2 400€',
        deliverables: [
            'Site complet de 3 à 6 pages orienté besoins clients',
            'Design cohérent avec votre positionnement et votre marché',
            'Parcours simple pour passer du besoin au rendez-vous',
            'Mise en ligne accompagnée, sans stress ni jargon',
        ],
        featured: false,

        icon: 'layout',
        bestFor: 'Pour installer une présence solide qui génère des demandes régulières',
        highlights: ['Crédibilité immédiate', 'Offres comprises rapidement', 'Base solide pour grandir'],
        note: 'Une solution clé en main pour vendre plus sereinement.',
        image: { src: '/images/offer-vitrine.png', alt: 'Création de site vitrine orienté business' },
    },
]);
