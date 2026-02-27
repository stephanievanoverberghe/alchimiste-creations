import { offersSchema } from './schemas';

export const offers = offersSchema.parse([
    {
        slug: 'clarte-express',
        name: 'Diagnostic Clarté & Conversion',
        punchline: 'Vous avez du trafic mais trop peu de demandes ? On identifie précisément ce qui bloque la décision.',
        summary: 'Session stratégique + mini audit orienté conversion pour clarifier votre message, vos offres et vos CTA en moins de 48h.',
        timeline: 'Sous 48h',
        priceFrom: 'Dès 290€',
        deliverables: ['Audit express de votre page actuelle', '3 optimisations prioritaires classées par impact', 'Plan d’action concret pour augmenter les prises de contact'],
        featured: false,

        icon: 'shield',
        bestFor: 'Idéal si vous recevez des visites mais peu de leads qualifiés',
        highlights: ['Promesse clarifiée', 'Freins levés', 'Passage à l’action facilité'],
        note: 'Si vous lancez ensuite une refonte avec moi, ce montant est déduit du devis.',
        image: { src: '/images/offer-audit.png', alt: 'Audit de clarté et conversion' },
    },
    {
        slug: 'landing-page-conversion',
        name: 'Landing Page Conversion',
        punchline: 'Une landing page premium conçue pour transformer votre trafic en rendez-vous ou en ventes.',
        summary: 'Structure, design, copy orienté bénéfices, preuves de confiance et CTA : tout est pensé pour maximiser votre taux de conversion.',
        timeline: '5 à 10 jours',
        priceFrom: 'Dès 1 400€',
        deliverables: [
            'Architecture de landing page orientée objectif business',
            'Design moderne avec micro-interactions dynamiques',
            'Sections de réassurance et arguments de vente clairs',
            'Optimisation mobile + performance + SEO de base',
        ],
        featured: true,

        icon: 'sparkles',
        bestFor: 'Parfait pour lancer une offre, une campagne ads ou un service à forte valeur',
        highlights: ['Plus de leads', 'Message impactant', 'Expérience premium et crédible'],
        note: 'C’est l’offre la plus rentable pour obtenir des résultats rapides sans refaire tout votre site.',
        image: { src: '/images/offer-refonte.png', alt: 'Création de landing page orientée conversion' },
    },
    {
        slug: 'site-vitrine-complet',
        name: 'Site Vitrine Complet',
        punchline: 'Un site professionnel complet pour installer votre crédibilité et soutenir votre croissance.',
        summary: 'De la stratégie au design jusqu’à la mise en ligne : je crée un site vitrine clair, rassurant et orienté prise de contact.',
        timeline: '2 à 3 semaines',
        priceFrom: 'Dès 2 400€',
        deliverables: [
            'Arborescence claire de 3 à 6 pages',
            'Design premium aligné avec votre positionnement',
            'Parcours utilisateur fluide jusqu’au formulaire de contact',
            'Mise en ligne + bases SEO + suivi de conversion',
        ],
        featured: false,

        icon: 'layout',
        bestFor: 'Pour structurer une présence en ligne solide et vendre votre valeur avec cohérence',
        highlights: ['Crédibilité immédiate', 'Offres lisibles', 'Base durable pour scaler'],
        note: 'Une solution clé en main si vous voulez un site performant, professionnel et prêt à convertir.',
        image: { src: '/images/offer-vitrine.png', alt: 'Création de site vitrine complet' },
    },
]);
