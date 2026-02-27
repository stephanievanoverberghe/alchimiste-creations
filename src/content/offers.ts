import { offersSchema } from './schemas';

export const offers = offersSchema.parse([
    {
        slug: 'optimisation-conversion',
        name: 'Optimisation pour générer plus de demandes',
        punchline: 'Vous avez du trafic mais peu de contacts ? On restructure votre page pour augmenter les prises de contact.',
        summary: 'Analyse et optimisation stratégique pour transformer les visites en demandes qualifiées, sans reconstruire tout votre site.',
        timeline: '3 à 5 jours ouvrés',
        priceFrom: 'À partir de 490€',
        deliverables: [
            'Analyse UX complète de la page principale (message, structure, CTA, friction)',
            'Identification des points de friction (priorisés)',
            'Recommandations concrètes pour clarifier et augmenter la prise de contact',
            'Plan d’action priorisé (rapide → moyen terme)',
        ],
        featured: false,

        icon: 'shield',
        bestFor: 'Idéal pour améliorer vos résultats rapidement, sans lancer un gros projet.',
        highlights: ['Plus de contacts', 'Actions concrètes', 'Rapide à mettre en place'],
        note: 'Si vous poursuivez avec une refonte, ce montant peut être déduit.',
        image: {
            src: '/images/offer-audit.png',
            alt: 'Optimisation de site pour augmenter les demandes',
        },
    },

    {
        slug: 'refonte-site-internet',
        name: 'Refonte de site internet',
        punchline: 'Votre site est dépassé ou ne reflète plus votre niveau ? Je le modernise et clarifie votre message.',
        summary: 'Une refonte stratégique pour améliorer la lisibilité, la structure et l’image professionnelle de votre site (priorité : page d’accueil).',
        timeline: '2 à 3 semaines',
        priceFrom: 'À partir de 1 690€',
        deliverables: [
            'Refonte UX de la page d’accueil (narratif, hiérarchie, sections)',
            'Modernisation UI (responsive mobile / tablette / desktop)',
            'Clarification du message + optimisation des CTA',
            'Amélioration du parcours utilisateur (frictions, lisibilité, confiance)',
            'Optimisations de base (perf/SEO technique simple)',
        ],
        featured: true,

        icon: 'sparkles',
        bestFor: 'Parfait si votre activité a évolué mais que votre site ne suit plus.',
        highlights: ['Modernisation', 'Message clarifié', 'Image plus pro'],
        note: 'C’est l’offre la plus choisie : rapide, impactante, sans repartir de zéro.',
        image: {
            src: '/images/offer-refonte.png',
            alt: 'Refonte de site internet moderne',
        },
    },

    {
        slug: 'creation-site-vitrine',
        name: 'Création de site vitrine',
        punchline: 'Vous n’avez pas encore de site ? Je crée un site professionnel, clair et responsive.',
        summary: 'Un site vitrine moderne et structuré, pensé pour inspirer confiance et faciliter la prise de contact dès la première visite.',
        timeline: '3 à 5 semaines',
        priceFrom: 'À partir de 2 490€',
        deliverables: [
            'Site complet 3 à 5 pages (Accueil, À propos, Services, Contact + options)',
            'Design moderne et professionnel (cohérent avec votre activité)',
            'Responsive mobile / tablette / desktop',
            'Formulaire de contact optimisé',
            'SEO technique de base (metas, structure, indexabilité)',
            'Mise en ligne accompagnée',
        ],
        featured: false,

        icon: 'layout',
        bestFor: 'Idéal pour lancer ou structurer votre présence en ligne avec une base solide.',
        highlights: ['Site complet', 'Crédibilité', 'Base évolutive'],
        note: 'Projet 100% codé sur mesure (pas de WordPress).',
        image: {
            src: '/images/offer-vitrine.png',
            alt: 'Création de site vitrine professionnel',
        },
    },
]);
