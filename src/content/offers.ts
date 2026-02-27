import { offersSchema } from './schemas';

export const offers = offersSchema.parse([
    {
        slug: 'declic-express',
        name: 'Déclic Express',
        punchline: 'Vous recevez peu de demandes malgré vos visites ? On repère rapidement ce qui bloque vos prospects et on corrige le tir.',
        summary: 'En une session ciblée, vous repartez avec un plan simple pour rendre votre offre compréhensible en quelques secondes et déclencher plus de contacts utiles.',
        timeline: 'Sous 48h ouvrées',
        priceFrom: 'Dès 290€',
        deliverables: [
            'Un diagnostic ultra clair : pourquoi vos visiteurs n’avancent pas',
            '3 actions à mettre en place tout de suite, sans refonte complète',
            'Un plan d’amélioration concret pour générer plus de demandes qualifiées',
        ],
        featured: false,

        icon: 'shield',
        bestFor: 'Idéal si votre site attire du trafic, mais ne déclenche pas assez de prises de contact',
        highlights: ['Plan d’action immédiat', 'Message plus clair', 'Demandes plus pertinentes'],
        note: 'Si vous poursuivez avec une création de page, ce montant est déduit.',
        image: { src: '/images/offer-audit.png', alt: 'Diagnostic de conversion orienté client' },
    },
    {
        slug: 'page-signature',
        name: 'Page Signature',
        punchline: 'Votre offre mérite mieux qu’une page confuse. On crée une page claire, séduisante et orientée prise de rendez-vous.',
        summary: 'Cette offre transforme votre page en vrai outil commercial : vos prospects comprennent votre valeur, se projettent et passent à l’action.',
        timeline: '1 à 2 semaines',
        priceFrom: 'Dès 1 200€',
        deliverables: [
            'Une structure limpide pour capter l’attention dès les premières secondes',
            'Un design tendance qui valorise votre image de marque',
            'Des textes et boutons pensés pour augmenter les prises de rendez-vous',
            'Une page fluide et dynamique sur mobile et ordinateur',
        ],
        featured: true,

        icon: 'sparkles',
        bestFor: 'Parfait si vous voulez plus de clients sans refaire tout votre site',
        highlights: ['Image haut de gamme', 'Parcours plus convaincant', 'Plus de rendez-vous'],
        note: 'Notre offre la plus demandée pour augmenter les ventes rapidement.',
        image: { src: '/images/offer-refonte.png', alt: 'Refonte de page orientée conversion' },
    },
    {
        slug: 'site-business',
        name: 'Site Business',
        punchline: 'Vous avez besoin d’un site complet qui inspire confiance et génère des demandes régulières ? Cette offre est faite pour ça.',
        summary: 'On construit un site prêt à vendre : vos offres sont claires, votre différence est visible et vos prospects savent exactement comment vous contacter.',
        timeline: '2 à 3 semaines',
        priceFrom: 'Dès 2 400€',
        deliverables: [
            'Un site complet (3 à 6 pages) pensé pour convertir vos visiteurs',
            'Une identité visuelle moderne, cohérente et mémorable',
            'Un parcours simple qui transforme l’intérêt en demande concrète',
            'Une mise en ligne accompagnée de A à Z, sans complexité',
        ],
        featured: false,

        icon: 'layout',
        bestFor: 'Idéal pour lancer ou relancer votre activité avec une présence web solide',
        highlights: ['Crédibilité immédiate', 'Offres faciles à comprendre', 'Base prête pour grandir'],
        note: 'Une solution clé en main pour développer votre activité avec sérénité.',
        image: { src: '/images/offer-vitrine.png', alt: 'Création de site vitrine orienté business' },
    },
]);
