import { offersSchema } from './schemas';

export const offers = offersSchema.parse([
    {
        slug: 'audit-ux-conversion',
        name: 'Audit UX & Conversion',
        punchline: 'Un diagnostic clair + 3 actions prioritaires pour générer plus de demandes.',
        summary: 'En 20–45 min, on analyse votre page (message, structure, CTA, lisibilité mobile, frictions) et je vous remets un plan d’action concret.',
        timeline: '48h',
        priceFrom: 'Dès 290€',
        deliverables: ['Audit écrit ou vidéo', '3 priorités à fort impact', 'Plan d’action (quick wins + next steps)'],
        featured: false,

        icon: 'shield',
        bestFor: 'Si votre site existe déjà mais convertit mal',
        highlights: ['Clarté du message', 'CTA & parcours', 'Lisibilité mobile'],
        note: 'Option : si vous poursuivez sur une refonte, l’audit peut être déduit du devis.',
        image: { src: '/images/offer-audit.png', alt: 'Audit UX et conversion' },
    },
    {
        slug: 'refonte-optimisation',
        name: 'Refonte & Optimisation',
        punchline: 'On garde l’essentiel, on améliore le message, l’UX et le rendu premium.',
        summary: 'Refonte ciblée (1 à 5 pages) pour clarifier votre offre, moderniser l’UI et rendre la prise de contact évidente — sans repartir de zéro.',
        timeline: '1 à 2 semaines',
        priceFrom: 'Dès 1 200€',
        deliverables: ['Structure & hiérarchie de page', 'UI premium (composants + sections)', 'Optimisations performance & SEO de base', 'CTA et parcours optimisés'],
        featured: true,

        icon: 'sparkles',
        bestFor: 'Indépendants / PME qui veulent un site plus clair et plus “premium”',
        highlights: ['UI premium', 'Parcours orienté conversion', 'Perf & lisibilité'],
        note: 'Idéal si ton site ne donne pas confiance ou ne déclenche pas assez de contacts.',
        image: { src: '/images/offer-refonte.png', alt: 'Refonte et optimisation UI' },
    },
    {
        slug: 'site-vitrine-next',
        name: 'Site vitrine Next.js',
        punchline: 'Un site complet, moderne, rapide — avec une base propre et maintenable.',
        summary: 'Création d’un site vitrine sur-mesure (3 à 6 pages) : message clair, sections convaincantes, UI premium et base technique solide.',
        timeline: '2 à 3 semaines',
        priceFrom: 'Dès 2 400€',
        deliverables: ['Cadrage + structure (wireframe)', 'Design UI (tokens + composants)', 'Développement Next.js / TypeScript', 'SEO de base + tracking', 'Mise en ligne'],
        featured: false,

        icon: 'layout',
        bestFor: 'Créer une présence crédible qui déclenche des demandes',
        highlights: ['Design system léger', 'Responsive premium', 'Performance'],
        note: 'Parfait si tu pars de zéro et que tu veux un site sérieux (pas un template générique).',
        image: { src: '/images/offer-vitrine.png', alt: 'Site vitrine Next.js' },
    },
]);
