import { offersSchema } from './schemas';

export const offers = offersSchema.parse([
    {
        slug: 'creation-landing-page',
        name: 'One Page — offre d’entrée',
        punchline: 'Lancez une présence claire et crédible en quelques jours avec une page unique orientée prise de contact.',
        summary: 'Une One Page structurée pour présenter votre activité, rassurer rapidement et guider vers une seule action de conversion.',
        timeline: '7 à 14 jours ouvrés',
        priceFrom: 'À partir de 1 090€ HT',
        priceFactors: ['Volume de contenu', 'Niveau de rédaction', 'Fonctionnalités de prise de rendez-vous'],
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
        bestFor: 'Idéal pour indépendants et petites entreprises qui veulent démarrer vite avec un budget maîtrisé.',
        highlights: ['Lancement rapide', 'Message clair', 'Une action de conversion'],
        note: 'Projet 100% codé sur mesure (pas de template générique).',
        image: {
            src: '/images/offer-landing.png',
            alt: 'Création de landing page moderne et optimisée',
        },
    },

    {
        slug: 'creation-site-vitrine',
        name: 'Site vitrine — offre cœur de gamme',
        punchline: 'Créez un site complet pour structurer vos demandes et renforcer votre crédibilité.',
        summary: 'Un site vitrine de 4 à 8 pages pensé pour présenter vos services, améliorer votre visibilité et soutenir une acquisition régulière.',
        timeline: '3 à 5 semaines',
        priceFrom: 'À partir de 2 490 € HT',
        priceFactors: ['Nombre de pages', 'Travail SEO de base', 'Besoins multilingues'],
        deliverables: [
            'Site complet 4 à 8 pages (Accueil, À propos, Services, Contact + options)',
            'Design moderne et professionnel (cohérent avec votre activité)',
            'Responsive mobile / tablette / desktop',
            'Formulaire de contact optimisé',
            'SEO technique de base (metas, structure, indexabilité)',
            'Mise en ligne accompagnée',
        ],
        featured: true,

        icon: 'layout',
        bestFor: 'Parfait pour une activité installée qui veut plus de lisibilité et plus de demandes qualifiées.',
        highlights: ['Offre principale', 'Crédibilité forte', 'Base SEO solide'],
        note: 'Projet 100% codé sur mesure (pas de WordPress).',
        image: {
            src: '/images/offer-vitrine.png',
            alt: 'Création de site vitrine professionnel',
        },
    },

    {
        slug: 'refonte-site-internet',
        name: 'Refonte — optimisation business',
        punchline: 'Votre site est dépassé ou ne reflète plus votre niveau ? Je le modernise et clarifie votre message.',
        summary: 'Une refonte stratégique pour améliorer la lisibilité, la structure et l’image professionnelle de votre site (priorité : page d’accueil).',
        timeline: '3 à 6 semaines',
        priceFrom: 'À partir de 2 990€ HT',
        priceFactors: ['Niveau de refonte UX/UI', 'Réorganisation des contenus', 'Optimisations techniques nécessaires'],
        deliverables: [
            'Refonte UX de la page d’accueil (narratif, hiérarchie, sections)',
            'Modernisation UI (responsive mobile / tablette / desktop)',
            'Clarification du message + optimisation des CTA',
            'Amélioration du parcours utilisateur (frictions, lisibilité, confiance)',
            'Optimisations de base (perf/SEO technique simple)',
        ],
        featured: false,

        icon: 'sparkles',
        bestFor: 'Parfait si votre site existe déjà mais sous-performe sur la clarté et la conversion.',
        highlights: ['Repositionnement', 'Parcours optimisé', 'Montée en gamme'],
        note: 'La bonne option si la base existe déjà, mais ne convertit pas assez.',
        image: {
            src: '/images/offer-refonte.png',
            alt: 'Refonte de site internet moderne',
        },
    },
]);
