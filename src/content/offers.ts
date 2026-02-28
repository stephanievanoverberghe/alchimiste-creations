import { offersSchema } from './schemas';

export const offers = offersSchema.parse([
    {
        slug: 'creation-landing-page',
        name: 'Création de landing page / site One Page',
        punchline: 'Besoin d’une présence en ligne rapide et efficace ? Je crée une page stratégique pensée pour convertir.',
        summary: 'Une page unique, claire et structurée, idéale pour présenter votre activité, lancer une offre ou générer des demandes de contact rapidement.',
        timeline: '7 à 10 jours ouvrés',
        priceFrom: 'À partir de 1 090€',
        deliverables: [
            'Page unique structurée (Hero, Services, À propos, Preuves sociales, Contact)',
            'Design moderne et professionnel',
            'Responsive mobile / tablette / desktop',
            'Structure optimisée pour la conversion',
            'Formulaire de contact intégré',
            'SEO technique de base (metas, structure)',
            'Mise en ligne accompagnée',
        ],
        featured: false,

        icon: 'layout',
        bestFor: 'Idéal pour indépendants, coachs et petites structures qui veulent une présence professionnelle sans projet lourd.',
        highlights: ['Rapide', 'Efficace', 'Optimisé conversion'],
        note: 'Projet 100% codé sur mesure (pas de template générique).',
        image: {
            src: '/images/offer-landing.png',
            alt: 'Création de landing page moderne et optimisée',
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
        featured: true,

        icon: 'layout',
        bestFor: 'Idéal pour lancer ou structurer votre présence en ligne avec une base solide.',
        highlights: ['Site complet', 'Crédibilité', 'Base évolutive'],
        note: 'Projet 100% codé sur mesure (pas de WordPress).',
        image: {
            src: '/images/offer-vitrine.png',
            alt: 'Création de site vitrine professionnel',
        },
    },

    {
        slug: 'refonte-site-internet',
        name: 'Refonte de site internet',
        punchline: 'Votre site est dépassé ou ne reflète plus votre niveau ? Je le modernise et clarifie votre message.',
        summary: 'Une refonte stratégique pour améliorer la lisibilité, la structure et l’image professionnelle de votre site (priorité : page d’accueil).',
        timeline: '3 à 6 semaines',
        priceFrom: 'À partir de 2 990€',
        deliverables: [
            'Refonte UX de la page d’accueil (narratif, hiérarchie, sections)',
            'Modernisation UI (responsive mobile / tablette / desktop)',
            'Clarification du message + optimisation des CTA',
            'Amélioration du parcours utilisateur (frictions, lisibilité, confiance)',
            'Optimisations de base (perf/SEO technique simple)',
        ],
        featured: false,

        icon: 'sparkles',
        bestFor: 'Parfait si votre activité a évolué mais que votre site ne suit plus.',
        highlights: ['Modernisation', 'Message clarifié', 'Image plus pro'],
        note: 'La bonne option si la base existe déjà, mais ne convertit pas assez.',
        image: {
            src: '/images/offer-refonte.png',
            alt: 'Refonte de site internet moderne',
        },
    },
]);
