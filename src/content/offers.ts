import { offersSchema } from './schemas';

export const offers = offersSchema.parse([
    {
        slug: 'site-vitrine-signature',
        name: 'Site Vitrine Signature',
        punchline: 'Le package idéal pour poser une image premium et générer des demandes qualifiées.',
        summary: 'Un site vitrine sur-mesure pour raconter votre valeur, rassurer vos prospects et transformer le trafic en rendez-vous.',
        timeline: '2 à 3 semaines',
        priceFrom: 'Dès 2 900€',
        deliverables: ['Architecture de contenu', 'Direction artistique UI', 'Intégration React / Next.js', 'SEO local + tracking'],
        featured: true,
    },
    {
        slug: 'funnel-business-next',
        name: 'Funnel Business Next',
        punchline: 'Un écosystème web pensé pour vendre : pages, preuve sociale et conversion.',
        summary: 'Pour les business qui veulent une machine d’acquisition complète : pages stratégiques, tunnel et expérience ultra fluide.',
        timeline: '4 à 6 semaines',
        priceFrom: 'Dès 5 900€',
        deliverables: ['Parcours utilisateur complet', 'Design system évolutif', 'CMS headless MongoDB/Notion selon besoin', 'Automations CRM'],
    },
    {
        slug: 'cro-care-retainer',
        name: 'CRO Care Retainer',
        punchline: 'Optimisation continue pour faire monter vos conversions mois après mois.',
        summary: 'Un accompagnement mensuel pour itérer rapidement sur vos pages, corriger les frictions UX et améliorer vos KPI business.',
        timeline: 'Engagement 3 mois minimum',
        priceFrom: 'Dès 1 200€/mois',
        deliverables: ['Audit data + heatmaps', 'Roadmap priorisée', 'Sprints d’amélioration', 'Reporting mensuel orienté ROI'],
    },
]);
