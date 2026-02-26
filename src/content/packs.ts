import { packsSchema, type Pack } from '@/content/schemas';

const rawPacks = [
    {
        slug: 'essentiel',
        title: 'Pack Essentiel',
        baseline: 'Une page claire et rassurante',
        idealFor: 'Lancer une présence pro rapidement',
        priceFrom: 'À partir de 650€',
        timeline: '2 à 3 semaines',
        highlights: ['One-page sur mesure', 'Formulaire de contact', 'SEO de base'],
        ctaHref: '/offres/essentiel',
        featured: false,
    },
    {
        slug: 'croissance',
        title: 'Pack Croissance',
        baseline: 'Structurer et faire évoluer votre activité',
        idealFor: 'Sites 4-6 pages avec parcours clair',
        priceFrom: 'À partir de 1400€',
        timeline: '4 à 6 semaines',
        highlights: ['Design personnalisé', 'Pages services + contact', 'Guide de prise en main'],
        ctaHref: '/offres/croissance',
        featured: true,
    },
    {
        slug: 'signature',
        title: 'Pack Signature',
        baseline: 'Expérience premium et identité forte',
        idealFor: 'Marques sensibles qui veulent se distinguer',
        priceFrom: 'À partir de 2200€',
        timeline: '6 à 8 semaines',
        highlights: ['Atelier de cadrage', 'UI kit + micro-animations', 'SEO + passation complète'],
        ctaHref: '/offres/signature',
        featured: false,
    },
] satisfies Pack[];

export const packs = packsSchema.parse(rawPacks);
