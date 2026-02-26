import { offersSchema } from './schemas';

export const offers = offersSchema.parse([
    {
        slug: 'landing-signature',
        name: 'Landing Signature',
        punchline: 'Page premium orientée conversion en un sprint.',
        summary: 'Pour valider une offre, lancer une campagne ou repositionner votre image avec impact immédiat.',
        timeline: '10 à 15 jours',
        priceFrom: 'Dès 2 400€',
        deliverables: ['Direction UI', 'Copy conversion', 'Intégration Next.js', 'SEO de base + analytics'],
        featured: true,
    },
    {
        slug: 'site-freelance-plus',
        name: 'Site Business Premium',
        punchline: 'Site multi-pages robuste, scalable et prêt à vendre.',
        summary: 'Pour structurer votre présence, vos offres et votre acquisition avec une expérience haut de gamme.',
        timeline: '3 à 5 semaines',
        priceFrom: 'Dès 4 800€',
        deliverables: ['Architecture pages', 'Design system interne', 'SEO technique', 'Composants réutilisables'],
    },
    {
        slug: 'optimisation-cro',
        name: 'Optimisation CRO UX',
        punchline: 'Audit + refonte ciblée pour convertir davantage.',
        summary: 'Pour supprimer les frictions, clarifier votre message et améliorer le rendement de votre trafic existant.',
        timeline: '7 à 12 jours',
        priceFrom: 'Dès 1 600€',
        deliverables: ['Audit parcours', 'Priorisation quick wins', 'Nouvelles sections', 'Suivi KPI 30 jours'],
    },
]);
