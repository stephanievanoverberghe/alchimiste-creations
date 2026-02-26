import { projectsSchema } from './schemas';

export const projects = projectsSchema.parse([
    {
        slug: 'nova-studio',
        client: 'Nova Studio',
        sector: 'SaaS B2B',
        challenge: 'Trop de trafic froid, peu de demandes qualifiées.',
        solution: 'Refonte complète des messages, de la hiérarchie visuelle et du parcours CTA.',
        outcomes: ['+62% de clics sur CTA principal', '+38% de formulaires complétés'],
        stack: ['Next.js', 'TypeScript', 'Tailwind', 'Analytics'],
    },
    {
        slug: 'atelier-lumen',
        client: 'Atelier Lumen',
        sector: 'Studio créatif',
        challenge: 'Image premium mal perçue sur le site existant.',
        solution: 'Direction artistique immersive, bento storytelling et preuve sociale renforcée.',
        outcomes: ['Temps moyen x1.9', '3 contrats signés en 6 semaines'],
        stack: ['Next.js', 'Motion UI', 'SEO local'],
    },
    {
        slug: 'horizon-conseil',
        client: 'Horizon Conseil',
        sector: 'Cabinet conseil',
        challenge: 'Offres floues, visiteurs perdus dans la navigation.',
        solution: 'Simplification IA, pages offres distinctes, FAQ objections et tunnel contact optimisé.',
        outcomes: ['-29% de rebond', '+44% de leads qualifiés'],
        stack: ['UX writing', 'Next.js', 'Schema.org'],
    },
]);
